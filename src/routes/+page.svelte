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
		<div class="flexbox">
			<ArticleBox id={trackedIDs[0]} class="aboutBox" style={(viewportPosition === 0 ? `border-color: ${borderColor};` : '')} >
				<About />
			</ArticleBox>
			<div class="flexitem">
				<img class="wavingMascot" src="/images/about.png" alt="Enverodie mascot waving" />
			</div>
		</div>
	</PositionInWrapper>

	<PositionInWrapper>
		<ArticleBox id={trackedIDs[1]} style={(viewportPosition === 1) ? `border-color: ${borderColor}` : ''}>
			<Showcase />
		</ArticleBox>
	</PositionInWrapper>
		
</PageWrapper>

<style lang="scss">

	:global(.aboutBox) {
		width: 100%;
	}

	.flexbox {
		display: flex;
		justify-content: space-between;

		.flexitem {
			flex: 1;
			align-items: center;
			justify-content: center;
			&>* { width: 90%; }
			display: none;
		}

		.wavingMascot {
			// transform: scaleX(-1);
		}

	}

@media only screen and (min-width: 1000px) {

	:global(.aboutBox) {
		width: calc((var(--boxImgSize) * 10) - (var(--boxOutsideSize) * 2));
		box-sizing: border-box;
	}

	.flexbox .flexitem {
		display: flex;
	}

    // .flexbox {
    //     grid-template-columns: 3fr 3fr;

    //     &>* {
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;

    //         &:last-child {
    //             padding: 1em;
    //         }

    //         img {
    //             max-width: 100%;
    //         }
    //     }
    // }
}

</style>