<script>

	/* GlitchController accumulates all the glitch scenes in one and scrolls through them on a fixed time interval. */

	import { onDestroy } from 'svelte';
	import RiverGlitch from './riverGlitch.svelte';
	import CityGlitch from './cityGlitch.svelte';

	const renderableGlitchScenes = [RiverGlitch, CityGlitch]; // Update this when a new glitch scene is created and imported
	const switchTiming = 6000; // in milliseconds
	
	// uses closure to make sure each call to incrementActiveGlitch() can only increment a number up to the length of the array
	const incrementActiveGlitch = (() => new function() {
		let activeGlitchIndex = Math.floor(Math.random() * renderableGlitchScenes.length);
		function inc() {
			activeGlitchIndex = (activeGlitchIndex + 1) % renderableGlitchScenes.length;
			return activeGlitchIndex;
		}
		return inc;
	})();

	let currentView = null;
	function setNewScene() {
		currentView = renderableGlitchScenes[incrementActiveGlitch()];
	}
	setNewScene();

	let renderGlitchScenesID = setInterval(() => {
		setNewScene();
	}, switchTiming);

	onDestroy(() => clearInterval(renderGlitchScenesID))

</script>

<!-- Using this to preload all the components, to prevent a jump cut -->
{#each renderableGlitchScenes as rgs}
	<div style:display="none"><svelte:component this={rgs} /></div>
{/each}

<div class="glitchTransition" style="--switchTimingMS: {switchTiming}ms">
	<svelte:component this={currentView} class="{$$props.class} glitchItem1" />
	<svelte:component this={currentView} class="{$$props.class} glitchItem2 glitchItemAbsolute" />
	<svelte:component this={currentView} class="{$$props.class} glitchItem3 glitchItemAbsolute" />
</div>

<style lang="scss">
	.glitchTransition {

		position: relative;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */

		--transitionInSpeed: .16s;
		--transitionOutSpeed: .08s;

		&>:global(.glitchItem1) {
			transform: translate(-100%, 0%);
			clip-path: polygon(0 0, 100% 0, 100% 10%, 0 35%);
			animation: 
				glitchInFromLeft var(--transitionInSpeed) steps(4) 0.4s forwards,
				glitchOutToRight var(--transitionOutSpeed) steps(4) calc(var(--switchTimingMS) - var(--transitionOutSpeed));

		}
		
		&>:global(.glitchItem2) {
			transform: translate(-100%, 0%);
			clip-path: polygon(0 53%, 100% 78%, 100% 10%, 0 35%);
			animation: 
				glitchInFromLeft var(--transitionInSpeed) steps(3) 0.37s forwards,
				glitchOutToRight var(--transitionOutSpeed) steps(3) calc(var(--switchTimingMS) - var(--transitionOutSpeed));

		}

		&>:global(.glitchItem3) {
			transform: translate(-100%, 0%);
			clip-path: polygon(0 53%, 100% 78%, 100% 100%, 0 100%);
			animation: 
				glitchInFromLeft var(--transitionInSpeed) steps(6) 0.3s forwards,
				glitchOutToRight var(--transitionOutSpeed) steps(6) calc(var(--switchTimingMS) - var(--transitionOutSpeed));

		}

		&>:global(.glitchItemAbsolute) {
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	@keyframes glitchInFromLeft {
		to {
			transform: translate(0%, 0%);
		}
	}

	@keyframes glitchOutToRight {
		to {
			transform: translate(100%, 0%);
		}
	}
</style>