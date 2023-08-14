<script>
	
	export let taperDimensions = [8, 12, 16, 20];
	export let flip = false;
	export let onTop = true;
	export let onBottom = true;
	export let aestheticOnly = false;

	let mirroredTaper = [...taperDimensions].reverse();
	
	$: taperTop = flip? mirroredTaper : taperDimensions;
	$: taperBottom = flip? taperDimensions : mirroredTaper;

</script>

<div class={$$props.class} class:hasContent={!aestheticOnly}>
	{#if onTop}
		{#each taperTop as amount}
			<div class="gridlikeBox" style="height: {amount}px"></div>
		{/each}
	{/if}
	{#if !aestheticOnly}
		<div class="gridlikeBox main">
			<slot />
		</div>
	{/if}
	{#if onBottom}
		{#each taperBottom as amount}
			<div class="gridlikeBox" style="height: {amount}px"></div>
		{/each}
	{/if}
</div>

<style lang="scss">

	.hasContent .gridlikeBox {
		&:first-child { margin-top: 0; }
		&:last-child { margin-bottom: 0; }
	}

    .gridlikeBox {
		padding: 0;
		margin: 2px 0;

		&.main {
			min-height: 100px;
			background-color: hsla(var(--color1H), var(--color1S), var(--color1L), .7);
		}
	}
    
</style>