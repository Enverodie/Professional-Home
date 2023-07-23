<script>
	import PositionInWrapper from '$lib/components/utilities/positionInWrapper.svelte';
	import Searchbar from './../../lib/components/forms/search/searchbar.svelte';
	import PageWrapper from '$lib/components/layout/grid.svelte';
	import ArticleBox from './../../lib/components/contentboxes/articleBox.svelte';
	import Showcase from './../../lib/components/specialFX/showcase/showcase.svelte';

</script>
<PageWrapper>
    <PositionInWrapper>
        <Searchbar />
    </PositionInWrapper>
    <PositionInWrapper>
        <ArticleBox>
            <Showcase style="height: 40vh" images={[
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
                {fd: {title: "The Planet"}, description: 'I made a planet'},
                {fd: {title: "This is a test title"}, description: 'I made a planet'},
                {fd: {title: "I wonder what happens if I do this"}, description: 'I made a planet'},
                {fd: {title: "I wonder what happens if I do that"}, description: 'I made a planet'},
                {fd: {title: "omg it's so pretti"}, description: 'I made a planet'},
                {fd: {title: "Short title"}, description: 'I made a planet'},
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
                {fd: {src: '/creativePosts/Planet Project.png', alt: 'planet'}, description: 'I made a planet'},
            ]} />
        </ArticleBox>
    </PositionInWrapper>
</PageWrapper>