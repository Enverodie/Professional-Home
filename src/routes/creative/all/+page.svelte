<script>
	import HeadMetadata from '$lib/components/utilities/headMetadata.svelte';
	import Pagination from './../../../lib/components/forms/pagination/pagination.svelte';

    import PageWrapper from "$lib/components/layout/grid.svelte";
    import SectionHeader from "$lib/components/texts/sectionHeader.svelte";
    import PositionInWrapper from "$lib/components/utilities/positionInWrapper.svelte";
    import ArticleBox from '$lib/components/contentboxes/articleBox.svelte';
    import Showcase from '$lib/components/specialFX/showcase/showcase.svelte';
    import Filters from "./filters.svelte";

    export let data;

</script>

<HeadMetadata 
    title="All posts - Enverodie"
    description="See all the creative stuff I've posted!"
/>

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
                    <!-- {console.log("result of allPosts: ", result)} -->
                    <Showcase images={result.results} cols={5} />
                {:catch error}
                    <Showcase fillBoxText={error.message} />
                {/await}
            </div>
            <div class="pagination">
                {#await data.streamed.allPosts}
                    <Pagination />
                {:then result}
                    <Pagination usedPageNumber={data.pageNumber} postsCount={result.sizeBeforeSkip} onSetPage={(query) => {
                        query.set('rp', 'f');
                    }} />
                {/await}
            </div>
        </ArticleBox>
    </PositionInWrapper>

</PageWrapper>

<style lang="scss">
    .results {
        height: 70vh;
        padding: .75ch;
        border: var(--boxStrokeSize) solid hsla(var(--color2H), var(--color2S), var(--color2L), var(--boxOpacity));
        margin: var(--defaultPadding) 0;

        :global(.showcase) {
            border: none;
        }
    }
</style>