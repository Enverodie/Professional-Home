<script>
	import PositionInWrapper from './../../lib/components/utilities/positionInWrapper.svelte';
    
    import PageWrapper from '$lib/components/layout/grid.svelte';
    import MountainsBottomLayer from './mountainsBottomLayer.svelte';
    import MountainsTopLayer from './mountainsTopLayer.svelte';
    import IntroductionBox from './introductionBox.svelte';
	import NameGlitch from '$lib/components/texts/nameGlitch.svelte';
	import HumbleAnchor from '$lib/components/buttons/humbleAnchor.svelte';
    import Experience from './experience.svelte';

</script>

<PageWrapper backgroundPosition="fixed">

	<div class="scenery">
		<PositionInWrapper>
			<div class="topInfoFlex">
				<div class="me"></div>
				<IntroductionBox class="introductionBoxContainer">
					<div class="introduction">
						<div>
							<p>Imagine</p>
							<h2>Stephen M. Smith</h2>
						</div>
						<div>
							<p>As your</p>
							<NameGlitch style="font-size: var(--titleLarge);">Web Developer</NameGlitch>
						</div>
						<HumbleAnchor href="#">Why me?</HumbleAnchor>
					</div>
				</IntroductionBox>
			</div>
		</PositionInWrapper>
		<div class="bottomOfShowcase">
			<MountainsBottomLayer class="bottomLayerMountains" />
			<MountainsTopLayer class="topLayerMountains" />
		</div>
	</div>
	<section class="experience">
		<PositionInWrapper>
			<Experience />
			<h2>See skills in action</h2>
			<HumbleAnchor href="/software">Projects</HumbleAnchor>
		</PositionInWrapper>
	</section>

</PageWrapper>

<style lang='scss'>

	.scenery {
		height: 400px;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
	}

	.topInfoFlex {
		margin: var(--boxImgSize) 0;
		display: grid;
		grid-template-columns: 1fr;

		.me { display: none; flex: 1; }
		:global(.introductionBoxContainer) { 
			z-index: 1;
		}
	}

	.introduction {
		display: flex;
		flex-direction: column;
		padding: calc(var(--defaultPadding) * 2) var(--boxImgSize);
		p { 
			margin: 0; 
			font-weight: bold;
			font-style: italic;
		}
		h2 { margin: 0; }
		gap: calc(var(--defaultPadding) * 2);
	}

	.bottomOfShowcase {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		width: 100%;

		:global(.bottomLayerMountains) {
			width: 100%;
			z-index: 0;
			margin: 0;
			bottom: calc(100% - 2px);
		}

		:global(.topLayerMountains) {
			width: 100%;
			z-index: 0;
			margin: -2px 0 0;
		}
	}

	.experience {
		margin-top: -1px;
		padding: var(--boxImgSize) 0;
		background-color: var(--color1);
	}

	@media (min-width: 1000px) {
		.scenery {
			height: 50vw;
			max-height: 850px;
		}

		.topInfoFlex {
			grid-template-columns: 1fr 1fr;
			.me { display: block; }
			:global(.introductionBoxContainer) { 
				--boxesWide: 9;

				margin: 0 calc((var(--boxImgSize)/2) + var(--boxOutsideSize));
				width: calc((var(--boxesWide) * var(--boxImgSize)) - (var(--boxOutsideSize) * 2))
			}
		}
	}

</style>