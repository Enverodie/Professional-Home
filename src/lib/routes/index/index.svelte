<script>
    import Header from '../../routes/index/header/header.svelte';
	import PageWrapper from '../../components/page-wrappers/indexPageWrapper.svelte'
	import Navbar from '../../components/navbar.svelte';
	import Showcase from '../../routes/index/project-showcase/projectShowcase.svelte';
</script>

<Header />
<Navbar />
<PageWrapper>

	<article style="--heightExtension: {0}px; --marginLeftExtension: {0}px; --marginRightExtension: {0}px">
		<Showcase />
	</article>
	
</PageWrapper>

<style lang="scss">

	article {

		background-color: var(--color1);
		border: 2px solid hsla(var(--color2H), var(--color2S), var(--color2L), .1); // tied to opacity of square image in _background.scss
		padding: 1em;
        margin-top: 58px;
        margin-left: var(--marginLeftExtension);
        margin-right: var(--marginRightExtension);
        margin-bottom: 0;
        height: auto; // change this later
	}

</style>