<script>
	
	/* This is the base component for the "/" route. */
	
	import Header from '$lib/components/route-specific/index/header/header.svelte';
	import PageWrapper from '$lib/components/page-wrappers/gridWSideNav.svelte'
	import About from '$lib/components/route-specific/index/about/about.svelte';
	import Showcase from '$lib/components/route-specific/index/project-showcase/projectShowcase.svelte';
	import ArticleBox from '$lib/components/articleBox.svelte';
	import IWasHere from '$lib/components/route-specific/index/i-was-here/iWasHere.svelte';

	const borderColor = "var(--color7)";

	let trackedIDs = ["about", "showcase", "iWasHere"]; // must be in order of appearance on page
	let viewportPosition;

	$: viewportPositionFull = Math.floor(viewportPosition);

</script>
<Header />
<PageWrapper bind:trackedIDs bind:position={viewportPosition}>

	<ArticleBox id={trackedIDs[0]} extraStyles={(viewportPositionFull === 0) ? `border-color: ${borderColor}` : ''} >
		<About />
	</ArticleBox>

	<ArticleBox id={trackedIDs[1]} extraStyles={(viewportPositionFull === 1) ? `border-color: ${borderColor}` : ''}>
		<Showcase />
	</ArticleBox>

	<ArticleBox id={trackedIDs[2]} extraStyles="padding: 0; {(viewportPositionFull === 2) ? `border-color: ${borderColor}` : ''}" >
		<IWasHere />
	</ArticleBox>
	
</PageWrapper>
