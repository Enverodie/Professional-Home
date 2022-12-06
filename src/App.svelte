<script>
	import page from 'page'
	
	import Index from './lib/routes/index/index.svelte';
	import Projects from './lib/routes/projects/projects.svelte';

	let display, params;

	page('/', () => display = Index);
	page('/index', () => display = Index);
	page('/home', () => display = Index);
	page('/Projects', () => display = Projects);
	page('*', () => display = NotFound);

	page.start();
</script>

<svelte:component this={display} {params} />
