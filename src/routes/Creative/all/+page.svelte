<script>

    import PageWrapper from "$lib/components/layout/grid.svelte";
    import SectionHeader from "$lib/components/texts/sectionHeader.svelte";
    import PositionInWrapper from "$lib/components/utilities/positionInWrapper.svelte";
    import ArticleBox from '$lib/components/contentboxes/articleBox.svelte';
    import Showcase from '$lib/components/specialFX/showcase/showcase.svelte';

</script>

<PageWrapper>
    <SectionHeader rowsUsed={2}>Creative Showcase</SectionHeader>

    <PositionInWrapper>
        <ArticleBox style="margin-top: var(--boxOutsideSize);">
            <div class="filters">

            </div>
            <div class="results">
                <Showcase />
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