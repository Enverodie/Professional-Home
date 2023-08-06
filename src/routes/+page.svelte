<script>
	import HeadMetadata from '$lib/components/utilities/headMetadata.svelte';
	import PositionInWrapper from '$lib/components/utilities/positionInWrapper.svelte';
	
	/* This is the base component for the "/" route. */
	
	import Header from './+pageComponents/header/header.svelte';
	import PageWrapper from '$lib/components/layout/grid.svelte'
	import About from './+pageComponents/about/about.svelte';
	import Showcase from './+pageComponents/project-showcase/projectShowcase.svelte';
	import ArticleBox from '$lib/components/contentboxes/articleBox.svelte';

	const borderColor = "var(--color7)";

	let trackedIDs = ["about", "showcase"]; // must be in order of appearance on page
	let viewportPosition;

</script>

<HeadMetadata 
	title="Home - Enverodie"
	description="The homepage of Stephen M. Smith, professional full-stack web developer and tech enthusiast." 
	image="/Homepage image.jpg"
	/>

<Header />
<PageWrapper bind:trackedIDs bind:position={viewportPosition} showSideNav={true}>

	<PositionInWrapper>
		<ArticleBox id={trackedIDs[0]} style={(viewportPosition === 0) ? `border-color: ${borderColor}` : ''} >
			<About />
		</ArticleBox>
	</PositionInWrapper>

	<PositionInWrapper>
		<ArticleBox id={trackedIDs[1]} style={(viewportPosition === 1) ? `border-color: ${borderColor}` : ''}>
			<Showcase />
		</ArticleBox>
	</PositionInWrapper>
		
</PageWrapper>
