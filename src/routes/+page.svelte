<script>
	import PositionInWrapper from './../lib/components/positionInWrapper.svelte';
	
	/* This is the base component for the "/" route. */
	
	import Header from '$lib/components/route-specific/index/header/header.svelte';
	import PageWrapper from '$lib/components/page-wrappers/grid.svelte'
	import About from '$lib/components/route-specific/index/about/about.svelte';
	import Showcase from '$lib/components/route-specific/index/project-showcase/projectShowcase.svelte';
	import ArticleBox from '$lib/components/articleBox.svelte';

	const borderColor = "var(--color7)";

	let trackedIDs = ["about", "showcase"]; // must be in order of appearance on page
	let viewportPosition;

</script>
<Header />
<PageWrapper bind:trackedIDs bind:position={viewportPosition} showSideNav={true}>

	<PositionInWrapper>
		<ArticleBox id={trackedIDs[0]} extraStyles={(viewportPosition === 0) ? `border-color: ${borderColor}` : ''} >
			<About />
		</ArticleBox>
	</PositionInWrapper>

	<PositionInWrapper>
		<ArticleBox id={trackedIDs[1]} extraStyles={(viewportPosition === 1) ? `border-color: ${borderColor}` : ''}>
			<Showcase />
		</ArticleBox>
	</PositionInWrapper>
		
</PageWrapper>
