<script>

    import { page, navigating } from '$app/stores';
    import { getRouteName } from "$lib/constants/navigableRoutes.js";
    import { onMount } from 'svelte';

    let title = "Enverodie";
    let shortTitle = title;
    function setTitle() {
        shortTitle = getRouteName($page.url.pathname);
        title = `${title} - ${shortTitle}`;
    }
    
    $: if ($navigating === null) setTitle();

</script>

<svelte:head>
    <title>{title}</title>
    <meta property="og:title" content={shortTitle} />
    <meta property="twitter:title" content={shortTitle} />
</svelte:head>
<slot></slot>

<style global lang="scss">
    @import "src/lib/styles/global.scss";
</style>