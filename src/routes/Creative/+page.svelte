<script>
    
    import PageWrapper from "$lib/components/layout/grid.svelte";
    import SectionHeader from "$lib/components/texts/sectionHeader.svelte";
	import Searchbar from '$lib/components/forms/search/searchbar.svelte';
	import PositionInWrapper from '$lib/components/utilities/positionInWrapper.svelte';
	import ArticleBox from '$lib/components/contentboxes/articleBox.svelte';
	import Showcase from '$lib/components/specialFX/showcase/showcase.svelte';

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
                2D & Renders
            </SectionHeader>
            <Showcase class="creativePageShowcase" images={[
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
                {fd: {title: "The Planet"}, description: 'I made a planet'},
                {fd: {title: "This is a test title"}, description: 'I made a planet'},
                {fd: {title: "I wonder what happens if I do this"}, description: 'I made a planet'},
                {fd: {title: "Short title"}, description: 'I made a planet'},
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
            ]} />
        </ArticleBox>
    </PositionInWrapper>
    
    <PositionInWrapper>
        <ArticleBox>
            <SectionHeader withinGrid={false} style="margin: 0 0 1em; background-image: none;" rowsUsed={1}>
                Written works
            </SectionHeader>
            <Showcase class="creativePageShowcase" images={[
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
                {fd: {title: "The Planet"}, description: 'I made a planet'},
                {fd: {title: "This is a test title"}, description: 'I made a planet'},
                {fd: {title: "I wonder what happens if I do this"}, description: 'I made a planet'},
                {fd: {title: "Short title"}, description: 'I made a planet'},
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
            ]} />
        </ArticleBox>
    </PositionInWrapper>
    
    <PositionInWrapper>
        <ArticleBox>
            <SectionHeader withinGrid={false} style="margin: 0 0 1em; background-image: none;" rowsUsed={1}>
                Minecraft builds!
            </SectionHeader>
            <Showcase class="creativePageShowcase" images={[
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
                {fd: {title: "The Planet"}, description: 'I made a planet'},
                {fd: {title: "This is a test title"}, description: 'I made a planet'},
                {fd: {title: "I wonder what happens if I do this"}, description: 'I made a planet'},
                {fd: {title: "Short title"}, description: 'I made a planet'},
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
            ]} />
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