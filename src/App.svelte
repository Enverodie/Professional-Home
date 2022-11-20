<script>
	import Index from './lib/routes/index/index.svelte';
	import PageWrapper from './lib/components/page-wrappers/defaultPageWrapper.svelte'
	import GlitchText from './lib/components/enverodieNameGlitch.svelte';
	import Showcase from './lib/routes/index/project-showcase/projectShowcase.svelte';

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
	<PageWrapper>
		<GlitchText fontSize="128px" />
		<Showcase />
	</PageWrapper>
</main>

<style lang="scss">

</style>
