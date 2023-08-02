<script>
    import { page } from '$app/stores';
    import { goto } from "$app/navigation";
    import Dropdown from "$lib/components/buttons/dropdown.svelte";
    import Searchbar from "$lib/components/forms/search/searchbar.svelte";

    export let categories = [];
    export let sortBy = [];

</script>

<div class="filtersContainer">
    <Dropdown type="checkbox" class="category" options={categories} onClickOption={() => {
        let query = new URLSearchParams($page.url.searchParams.toString());
        let indexes = categories.reduce((previousValue, currentValue, currentIndex) => {
            console.log(previousValue, currentValue, currentIndex);
            if (previousValue !== '' && currentValue.active) previousValue += ',';
            if (currentValue.active) return previousValue + currentIndex
            else return previousValue;
        }, '');
        query.set('c', indexes);
        goto(`?${query.toString()}`);
    }}>Filter by category</Dropdown>
    <Dropdown class="sort" options={sortBy} onClickOption={(index) => {
        let query = new URLSearchParams($page.url.searchParams.toString());
        query.set('s', index);
        goto(`?${query.toString()}`);
    }}>Sort by</Dropdown>
    <Searchbar class="spacing" />
</div>

<style lang="scss">
    .filtersContainer {
        display: flex;
        gap: 1em;


        :global(.category), :global(.sort) { flex: 1; }
        :global(.category button), :global(.sort button) { height: 100%; }
        :global(.category .button1), :global(.sort .button1) { padding: 1.2em; }

        :global(.spacing) { flex: 2; }
    }
</style>