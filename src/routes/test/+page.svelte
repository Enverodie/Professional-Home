<script>
	import PageWrapper from '$lib/components/layout/grid.svelte';
	import ArticleBox from './../../lib/components/contentboxes/articleBox.svelte';
	import Showcase from './../../lib/components/specialFX/showcase/showcase.svelte';

</script>
<PageWrapper>
    <ArticleBox>
        <Showcase style="height: 40vh" images={[
            {src: '/creativePosts/Planet Project.png', alt: 'planet', description: 'I made a planet'},
            {src: '/creativePosts/Planet Project.png', alt: 'planet', description: 'I made a planet'},
            {src: '/creativePosts/Planet Project.png', alt: 'planet', description: 'I made a planet'},
            {src: '/creativePosts/Planet Project.png', alt: 'planet', description: 'I made a planet'},
            {src: '/creativePosts/Planet Project.png', alt: 'planet', description: 'I made a planet'},
            {src: '/creativePosts/Planet Project.png', alt: 'planet', description: 'I made a planet'},
            {src: '/creativePosts/Planet Project.png', alt: 'planet', description: 'I made a planet'},
            {src: '/creativePosts/Planet Project.png', alt: 'planet', description: 'I made a planet'},
        ]} />
    </ArticleBox>
</PageWrapper>