<script>
	import { onMount } from 'svelte';

    import debounce from 'lodash.debounce';
    import { page } from '$app/stores';
    import { goto, invalidate } from "$app/navigation";

    const sampleDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    const regexFilterSearchChars = /[,.;:]/g;
    function searchMatches(inputWords, searchedWord) {
        return inputWords
            .split(" ")
            .map(item => item
                .toLowerCase()
                .replace(regexFilterSearchChars, ''))
            .includes(searchedWord
                .toLowerCase()
                .replace(regexFilterSearchChars, ''));
    }

    function separateKeyString(baseString, keyString) {
        let returnArray = [];
        let index; 
        while (true) {
            index = baseString.indexOf(keyString);
            if (index === -1 || keyString.length === 0) {
                returnArray.push(baseString);
                return returnArray;
            }
            returnArray.push(baseString.substr(0, index));
            returnArray.push(baseString.substr(index, keyString.length));
            baseString = baseString.substr(index + keyString.length);
        }
        throw new Error("This condition will never be triggered");
    }

    /**
     * Properties expected of each result object:
     *
     * required:
     *  GETparam: a unique URL parameter string to find the target page
     *  title: a string for the title
     *  description: a string for the description
    */
    export let results = [
        {title: "John Doe", description: sampleDescription, GETparam: Math.trunc(Math.random()*100000).toString()},
        {title: "John Ipsum", description: sampleDescription, GETparam: Math.trunc(Math.random()*100000).toString()},
        {title: "Lorem Doe", description: sampleDescription, GETparam: Math.trunc(Math.random()*100000).toString()},
    ];

    // let searchbar = null; // would be bound to div class="searchbar"
    export let inputField = "";
    let searchInput;

    const debouncedInput = debounce(() => {
        let query = new URLSearchParams($page.url.searchParams.toString());
        query.set('q', inputField);
        // invalidate('app:postSearched');
        goto(`?${query.toString()}`, { reactivateSearch: true });
    }, 200);

    // $: resultsActive = (searchbar && searchbar.contains(document.activeElement));

</script>
<div class="searchbar">
    <div class="searchSection">
        <input class="typehere" type="text" autocomplete="off" placeholder="Search..." on:input={debouncedInput} bind:value={inputField} />
        <img class="searchIcon" src="/svgs/Magnifying glass.svg" alt="search" autofocus={ ((typeof history !== 'undefined') && history?.reactivateSearch) || false } />
    </div>
    {#if (results.length > 0)}
        <div class={"resultsSection"}>
            {#each results as result}
                <a class="result" href={$page.url.pathname + '/post?id=' + result.GETparam}>

                    <b class="title">
                        {#each (result.title.split(" ")) as word}
                            {#if searchMatches(inputField, word)}
                                <span class="searchedKeyword">{word + ' '}</span>
                            <!-- {:else if (inputField.some(keyword => word.indexOf(keyword) !== -1))}
                                {}<span class="searchedKeyword">{}</span>{} -->
                            {:else}
                                {word + ' '}
                            {/if}
                        {/each}
                    </b>

                    <span class="description">
                        {#each (result.description.split(" ")) as word}
                            {#if searchMatches(inputField, word)}
                                <span class="searchedKeyword">{word + ' '}</span>
                            {:else}
                                {word + ' '}
                            {/if}
                        {/each}
                    </span>
                </a>
            {/each}
        </div>
    {/if}
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

        --defaultDisplay: flex;
        // display: none;
        // &.resultsActive { display: var(--defaultDisplay); }

        flex-direction: column;
        margin-top: var(--normalSpacing);
        padding-top: var(--normalSpacing);
        border-top: hsla(var(--color2H), var(--color2S), var(--color2L), .1) solid 1px;

        .result {

            color: var(--color6);
            padding: var(--smallerSpacing);
            height: 1em;
            overflow: hidden;
            display: flex;
            gap: var(--normalSpacing);
            align-items: center;

            &:hover {
                background-color: hsla(var(--color2H), var(--color2S), var(--color2L), .1);
            }

            .description {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .searchedKeyword {
            color: var(--color7);
        }
    }

</style>