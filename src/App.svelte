<script>
	import Index from './lib/routes/index/index.svelte';
	import Header from './lib/routes/index/header/header.svelte';
	import PageWrapper from './lib/components/page-wrappers/indexPageWrapper.svelte'
	import Navbar from './lib/components/navbar.svelte';
	import Showcase from './lib/routes/index/project-showcase/projectShowcase.svelte';

	// TODO: USE OR REMOVE
	import hexToHsl from 'hex-to-hsl';

	// Sets the color for the background squares. 
	// Should match one of the brand colors (such as in global.scss). 
	// Not set automatically.
	const squareColor = '#F36BFA'; 

	let hsl = hexToHsl(squareColor);

	
	// assign these to a css variable to transfer.
	// TODO: USE OR REMOVE
	$: squareHueRotate = `${hsl[0]}`; 
	$: squareSaturationModifier = `${hsl[1]}`;
	$: squareLightnessModifier = `${hsl[2]}`;


	console.log(hexToHsl(squareColor));
</script>

<div style="
	--squareHueRotate: {squareHueRotate}deg; 
	--squareSaturationModifier: {squareSaturationModifier}%; 
	--squareLightnessModifier: {squareLightnessModifier}%;
">
	<Header />
	<Navbar />
	<PageWrapper squareH='{squareHueRotate}deg' squareS='{squareSaturationModifier}%' squareL='{squareLightnessModifier}%'>
		<!-- <h1 on:mouseenter={writeHello}>
			Hello there <span>World</span>
		</h1>
		<span>Not green</span>
		<Index /> -->
		<article>
			<Showcase />
		</article>
		
	</PageWrapper>
</div>
	
<style lang="scss">

	article {

		background-color: var(--color1);
		border: 2px solid hsla(var(--color2H), var(--color2S), var(--color2L), .1); // tied to opacity of square image in _background.scss
		padding: 1em;
	}

</style>
