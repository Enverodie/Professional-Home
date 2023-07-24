<script>
    
    import PageWrapper from "$lib/components/layout/grid.svelte";
    import SectionHeader from "$lib/components/texts/sectionHeader.svelte";
	import Searchbar from '$lib/components/forms/search/searchbar.svelte';
	import PositionInWrapper from '$lib/components/utilities/positionInWrapper.svelte';
	import ArticleBox from '$lib/components/contentboxes/articleBox.svelte';
	import Showcase from '$lib/components/specialFX/showcase/showcase.svelte';

    export let data;

    let dbResponse = data.props.dbResponse;

</script>

<PageWrapper>
    <SectionHeader rowsUsed={2}>Creative Showcase</SectionHeader>

    <PositionInWrapper>
        <ArticleBox style="margin-top: var(--boxOutsideSize);">
            <Searchbar />
        </ArticleBox>
    </PositionInWrapper>

    <PositionInWrapper>
        <ArticleBox>
            <SectionHeader withinGrid={false} style="margin: 0 0 1em; background-image: none;" rowsUsed={1}>
                Artwork
            </SectionHeader>
            <Showcase class="creativePageShowcase" images={dbResponse.successful? dbResponse.data.topPosts2DRenders : []} />
        </ArticleBox>
    </PositionInWrapper>
    
    <PositionInWrapper>
        <ArticleBox>
            <SectionHeader withinGrid={false} style="margin: 0 0 1em; background-image: none;" rowsUsed={1}>
                Written Works
            </SectionHeader>
            <Showcase class="creativePageShowcase" images={dbResponse.successful? dbResponse.data.topPostsTexts : []} />
        </ArticleBox>
    </PositionInWrapper>
    
    <PositionInWrapper>
        <ArticleBox>
            <SectionHeader withinGrid={false} style="margin: 0 0 1em; background-image: none;" rowsUsed={1}>
                Personal & Gaming
            </SectionHeader>
            <Showcase class="creativePageShowcase" images={dbResponse.successful? dbResponse.data.topPostsPersonal : []} />
        </ArticleBox>
    </PositionInWrapper>
    
</PageWrapper>
<style lang="scss">

    :global(.creativePageShowcase) {
        height: 20vh !important;
        box-shadow: none !important;
    }
    
    @media only screen and (min-width: 600px) {
        :global(.creativePageShowcase) {
            height: 30vh !important;
        }
    }

    @media only screen and (min-width: 800px) {
        :global(.creativePageShowcase) {
            height: 35vh !important;
        }
    }

    @media only screen and (min-width: 1000px) {
        :global(.creativePageShowcase) {
            height: 42vh !important;
        }
    }

</style>