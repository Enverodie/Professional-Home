<script>

    import { page, navigating } from '$app/stores';
    import { getRouteName } from "$lib/constants/navigableRoutes.js";
    import { onMount } from 'svelte';

    let title = "Enverodie";
    function setTitle() {
        title = `Enverodie - ${getRouteName($page.url.pathname)}`;
    }
    
    $: if ($navigating === null) setTitle();

</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>
<slot></slot>

<style global lang="scss">
    @import "src/lib/styles/global.scss";
</style>