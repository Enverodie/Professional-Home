<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

    export let usedPageNumber;
    export let postsCount;
    export let onSetPage = (newURLSearchParams) => {}

    let pageNumber = 1;
    if (usedPageNumber) pageNumber = parseInt(usedPageNumber);
    else if ($page.url.searchParams.get('p')) pageNumber = parseInt($page.url.searchParams.get('p'));
    
    $: maxPages = Math.ceil(postsCount / 25);

    function setPageNumber(newPage) {
        let query = new URLSearchParams($page.url.searchParams.toString());
        if (newPage < 1) newPage = 1;
        if ((typeof maxPages !== 'undefined') && newPage > maxPages) newPage = maxPages;
        
        query.set('p', newPage);
        onSetPage(query);
        goto(`?${query.toString()}`);
    }

</script>

<div class="pagination">
    <button class="button1" class:inactive={pageNumber <= 1} on:click={() => {setPageNumber(pageNumber - 1)}}>&lsaquo;</button>
    <div class="label">
        <input class="paginationNumber" value={pageNumber} type="text" autocomplete="off" placeholder="#" on:change|preventDefault={(e) => {setPageNumber(e.target.value)}} />
        {#if postsCount}
            {' / '}
            <div class="paginationNumber">{maxPages}</div>
        {/if}
    </div>
    <button class="button1" class:inactive={(typeof maxPages !== undefined) && usedPageNumber >= maxPages} on:click={() => {setPageNumber(pageNumber + 1)}}>&rsaquo;</button>
</div>

<style lang="scss">

    .pagination {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .paginationNumber {
        display: inline-block;
        box-sizing: content-box;
        width: 3ch;
        background-color: transparent;
        border: none;
        margin: 0;
        color: var(--color4);
        text-align: center;
    }

    button {
        flex: 1;

        &.inactive {
            visibility: hidden;
        }
    }

</style>