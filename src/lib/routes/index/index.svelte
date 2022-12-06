<script>
	import Header from '../../routes/index/header/header.svelte';
	import PageWrapper from '../../components/page-wrappers/gridWSideNav.svelte'
	import Navbar from '../../components/navbar.svelte';
	import About from '../../routes/index/about/about.svelte';
	import Showcase from '../../routes/index/project-showcase/projectShowcase.svelte';
	import ArticleBox from './../../components/articleBox.svelte';

</script>

<Header />
<Navbar />
<PageWrapper>

	<ArticleBox extraStyles="border-color: var(--color7)">
		<About />
	</ArticleBox>

	<ArticleBox>
		<Showcase />
	</ArticleBox>
	
</PageWrapper>