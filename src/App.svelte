<script>
	import Index from './lib/routes/index/index.svelte';
	import GlitchText from './lib/components/enverodieNameGlitch.svelte';

	export let variable;

	function writeHello() {
		console.log("hello world");
	}
</script>

<main>
	<!-- <h1 on:mouseenter={writeHello}>
		Hello there <span>World</span>
	</h1>
	<span>Not green</span>
	<Index /> -->
	<GlitchText fontSize="128px" />
</main>

<style lang="scss">
	
	h1 {
		color: blue;

		span {
			color: green;
		}
	}
</style>
