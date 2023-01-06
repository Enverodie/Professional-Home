<script>
	
	/* This is the base component for the "/" route. */
	
	import Header from '$lib/components/route-specific/index/header/header.svelte';
	import PageWrapper from '$lib/components/page-wrappers/gridWSideNav.svelte'
	import About from '$lib/components/route-specific/index/about/about.svelte';
	import Showcase from '$lib/components/route-specific/index/project-showcase/projectShowcase.svelte';
	import ArticleBox from '$lib/components/articleBox.svelte';

	let trackedIDs = ["about", "showcase"]; // must be in order of appearance on page

</script>
<Header />
<PageWrapper bind:trackedIDs>

	<ArticleBox id="about" extraStyles="border-color: var(--color7)">
		<About />
	</ArticleBox>

	<ArticleBox id="showcase">
		<Showcase />
	</ArticleBox>
	
</PageWrapper>
