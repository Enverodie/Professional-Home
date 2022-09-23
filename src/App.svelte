<script>
	export let variable;

	function writeHello() {
		console.log("hello world");
	}
</script>

<main>
	<h1 on:mouseenter={writeHello}>
		Hello there <span>World</span>
	</h1>
	<span>Not green</span>
</main>

<style lang="scss">
	
	h1 {
		color: blue;

		span {
			color: green;
		}
	}
</style>
