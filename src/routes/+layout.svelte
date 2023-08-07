<script>

    // import { page, navigating } from '$app/stores';
    // import { getRouteName } from "$lib/constants/navigableRoutes.js";

    // let title = "Enverodie";
    // let shortTitle = title;
    // function setTitle() {
    //     shortTitle = getRouteName($page.url.pathname);
    //     title = `${title} - ${shortTitle}`;
    // }
    
    // $: if ($navigating === null) setTitle();

</script>

<!-- <svelte:head>
    <title>{title}</title>
    <meta property="og:title" content={shortTitle} />
    <meta property="twitter:title" content={shortTitle} />
</svelte:head> -->
<slot></slot>

<style global lang="scss">
    @import "src/lib/styles/globals/global.scss";
    @import "src/lib/styles/globals/color.scss";
    @import "src/lib/styles/globals/text.scss";
    @import "src/lib/styles/globals/markup.scss";
    @import "src/lib/styles/globals/class.scss";
</style>