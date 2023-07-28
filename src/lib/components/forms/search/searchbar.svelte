<script>
    
    import debounce from 'lodash.debounce';
    import { page } from '$app/stores';
    import { goto } from "$app/navigation";
    import { getFileExtension } from '$lib/constants/fileExtension.js';
	import SearchResult from './searchResult.svelte';
    
    export let results;

    export let inputField = $page.url.searchParams.get('q') || '';

    const debouncedInput = debounce(() => {
        let query = new URLSearchParams($page.url.searchParams.toString());
        query.set('q', inputField);
        goto(`?${query.toString()}`, { reactivateSearch: true });
    }, 200);

</script>
<div class="searchbar">
    <div class="searchSection">
        <input class="typehere" type="text" autocomplete="off" placeholder="Search..." on:input={debouncedInput} bind:value={inputField} />
        <!-- Caution: I don't know how adding autofocus on the *image* works but adding it to input doesn't. Keep an eye on this... -->
        <!-- svelte-ignore a11y-autofocus -->
        <img class="searchIcon" src="/svgs/Magnifying glass.svg" alt="search" autofocus={ ((typeof history !== 'undefined') && history?.reactivateSearch) || false } />
    </div>
    {#await results}
        Loading...
    {:then resolvedResults}
        {#if (resolvedResults.length > 0)}
            <div class={"resultsSection"}>
                {#each resolvedResults as result}
                    <SearchResult searchedString={inputField} postData={result} />
                {/each}
            </div>
        {/if}
    {:catch error}
            {error.message}
    {/await}
</div>
<style lang="scss">
    
    .searchbar {
        --normalSpacing: 1.2em;
        --smallerSpacing: .5em;

        background-color: var(--color1);
        padding: var(--normalSpacing);
        border: hsla(var(--color2H), var(--color2S), var(--color2L), .1) solid var(--boxStrokeSize);
        color: var(--color3);
    }
    
    .searchSection {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 2rem;

        .typehere { 
            flex: 1; 
            background-color: transparent;
            border: none;
            margin: 0;
            color: var(--color3);
            &:focus { outline: none; }
        }
        .searchIcon { height: 100%; }
    }

    .resultsSection {

        display: grid;
        flex-direction: column;
        grid-auto-flow: row;
        grid-template-columns: 1fr;
        margin-top: var(--normalSpacing);
        padding-top: var(--normalSpacing);
        border-top: hsla(var(--color2H), var(--color2S), var(--color2L), .1) solid 1px;
    }

    @media (min-width: 1000px) {
        .resultsSection {
            grid-auto-flow: column;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);
        }
    }

</style>