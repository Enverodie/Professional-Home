<script>

	/* GlitchController accumulates all the glitch scenes in one and scrolls through them on a fixed time interval. */

	import RiverGlitch from './riverGlitch.svelte';
	import CityGlitch from './cityGlitch.svelte';

	const renderableGlitchScenes = [RiverGlitch, CityGlitch]; // Update this when a new glitch scene is created and imported
	const switchTiming = 6000; // in milliseconds
	let currentView = renderableGlitchScenes[0] || null;
	
	// uses closure to make sure each call to incrementActiveGlitch() can only increment a number up to the length of the array
	const incrementActiveGlitch = (() => new function() {
		let activeGlitchIndex = 0;
		function inc() {
			activeGlitchIndex = (activeGlitchIndex + 1) % renderableGlitchScenes.length;
			console.log(activeGlitchIndex);
			return activeGlitchIndex;
		}
		return inc;
	})();

	setInterval(() => {
		currentView = renderableGlitchScenes[incrementActiveGlitch()];
	}, switchTiming);

</script>

<!-- Using this to preload all the components, to prevent a jump cut -->
{#each renderableGlitchScenes as rgs}
	<div style:display="none"><svelte:component this={rgs} /></div>
{/each}

<svelte:component this={currentView} class="{$$props.class}"></svelte:component>