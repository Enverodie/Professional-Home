<script>

    import PageWrapper from "$lib/components/layout/grid.svelte";
    import SectionHeader from "$lib/components/texts/sectionHeader.svelte";
    import PositionInWrapper from "$lib/components/utilities/positionInWrapper.svelte";
    import ArticleBox from '$lib/components/contentboxes/articleBox.svelte';
    import Showcase from '$lib/components/specialFX/showcase/showcase.svelte';
    import Filters from "./filters.svelte";

    export let data;

</script>

<PageWrapper>
    <SectionHeader rowsUsed={2}>Creative Showcase</SectionHeader>

    <PositionInWrapper>
        <ArticleBox style="margin-top: var(--boxOutsideSize);">
            <div class="filters">
                <Filters categories={data.categories} sortBy={data.sortBy} />
            </div>
            <div class="results">
                {#await data.streamed.allPosts}
                    <Showcase fillBoxText='Loading...' />
                {:then result} 
                    <Showcase images={result} cols={5} />
                {:catch error}
                    <Showcase fillBoxText={error.message} />
                {/await}
            </div>
        </ArticleBox>
    </PositionInWrapper>

</PageWrapper>

<style lang="scss">
    .results {
        height: 70vh;

        :global(.showcase) {
            border: none;
        }
    }
</style>