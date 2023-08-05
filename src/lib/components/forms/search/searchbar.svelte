<script>
    
    import debounce from 'lodash.debounce';
    import { page } from '$app/stores';
    import { goto } from "$app/navigation";
	import SearchResult from './searchResult.svelte';
    
    export let results = [];

    export let inputField = $page.url.searchParams.get('q') || '';
    if (typeof history !== 'undefined' && history.scrollPos) {
        document.documentElement.scrollTop = document.body.scrollTop = history.scrollPos
    };

    export let onInputFinished = (newUrlSearchParams) => {}
    
    const debouncedInput = debounce(() => {
        let query = new URLSearchParams($page.url.searchParams.toString());
        query.set('q', inputField);
        onInputFinished(query);
        goto(`?${query.toString()}`);
    }, 200);

</script>
<div class={"searchbar " + $$props.class}>
    <div class="searchSection">
        <input class="typehere" type="text" autocomplete="off" placeholder="Search..." on:input={debouncedInput} bind:value={inputField} />
        <!-- Caution: I don't know how adding autofocus on the *image* works but adding it to input doesn't. Keep an eye on this... -->
        <!-- svelte-ignore a11y-autofocus -->
        <img class="searchIcon" src="/svgs/Magnifying glass.svg" alt="search" autofocus={ ((typeof history !== 'undefined') && history?.reactivateSearch) || false } />
    </div>
    {#await results}
    <div class="resultsSection">
        Loading...
    </div>
    {:then resolvedResults}
        {#if (resolvedResults.length > 0)}
            <div class="resultsSection">
                {#each resolvedResults as result}
                    <SearchResult searchedString={inputField} postData={result} />
                {/each}
            </div>
        {/if}
    {:catch error}
        <div class="resultsSection">
            {error.message}
        </div>
    {/await}
</div>
<style lang="scss">
    
    .searchbar {
        --normalSpacing: 1.2em;
        --smallerSpacing: .5em;

        background-color: var(--color1);
        padding: var(--normalSpacing);
        border: var(--defaultBackgroundBoxBorder);
        color: var(--color3);
        position: relative;
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
            width: 100%;
            &:focus { outline: none; }
        }
        .searchIcon { height: 100%; }
    }

    .resultsSection {

        position: absolute;
        left: calc(-1 * var(--boxStrokeSize));
        box-sizing: border-box;
        width: calc(100% + (2 * var(--boxStrokeSize)));
        z-index: 7;
        background-color: var(--color1);
        border: var(--defaultBackgroundBoxBorder);
        display: grid;
        flex-direction: column;
        grid-auto-flow: row;
        grid-template-columns: 1fr;
        margin-top: var(--normalSpacing);
        padding-top: var(--normalSpacing);
        border-top: hsla(var(--color2H), var(--color2S), var(--color2L), var(--boxOpacity)) solid 1px;
    }

    @media (min-width: 1000px) {
        .resultsSection {
            grid-auto-flow: column;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);
        }
    }

</style>