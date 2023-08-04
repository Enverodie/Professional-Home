<script>

    export let pageNumber;// = $page.url.searchParams.get('p') || '';

    function setPageNumber(offset) {
        let query = new URLSearchParams($page.url.searchParams.toString());
        let currentPage = query.get('p');
        
        query.set('p', inputField);
        goto(`?${query.toString()}`);
    }

</script>

<div class="pagination">
    <button class="button1" on:click={() => {}}>&lsaquo;</button>
    <button class="button1" on:click={() => {}}>&rsaquo;</button>
</div>