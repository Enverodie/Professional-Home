<script>

	/* This is the base component for the "/" route. */

	import Header from '../../routes/index/header/header.svelte';
	import PageWrapper from '../../components/page-wrappers/gridWSideNav.svelte'
	import About from '../../routes/index/about/about.svelte';
	import Showcase from '../../routes/index/project-showcase/projectShowcase.svelte';
	import ArticleBox from './../../components/articleBox.svelte';

</script>

<Header />
<PageWrapper>

	<ArticleBox id="about" extraStyles="border-color: var(--color7)">
		<About />
	</ArticleBox>

	<ArticleBox id="showcase">
		<Showcase />
	</ArticleBox>
	
</PageWrapper>