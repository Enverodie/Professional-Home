<script>
	import Index from './lib/routes/index/index.svelte';
	import Header from './lib/routes/index/header/header.svelte';
	import PageWrapper from './lib/components/page-wrappers/indexPageWrapper.svelte'
	import Navbar from './lib/components/navbar.svelte';
	import Showcase from './lib/routes/index/project-showcase/projectShowcase.svelte';
</script>


<Header />
<Navbar />
<PageWrapper>
	<!-- <h1 on:mouseenter={writeHello}>
		Hello there <span>World</span>
	</h1>
	<span>Not green</span>
	<Index /> -->
	<article>
		<Showcase />
	</article>
	
</PageWrapper>

	
<style lang="scss">

	article {

		background-color: var(--color1);
		border: 2px solid hsla(var(--color2H), var(--color2S), var(--color2L), .1); // tied to opacity of square image in _background.scss
		padding: 1em;
	}

</style>
