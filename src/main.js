import App from './App.svelte';

// add additional sass/scss files to compile here
import '../public/global.scss';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;