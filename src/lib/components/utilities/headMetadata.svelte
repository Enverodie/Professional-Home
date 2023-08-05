<script>
	import { page } from '$app/stores';

    export let title = false; // title also handled in layout
    export let description = false;
    export let image = false; // accepts a file path
    export let type = 'website';

    if (typeof image === 'string') images = [images];
</script>

<svelte:head>

    {#if title}         <title>{title}</title> <meta property="og:title" content={title} /> <meta property="twitter:title" content={title} /> {/if}

    {#if description}   <meta property="og:description" content={description} /> {/if}

    {#if image}{#each image as img}
        <meta property="og:image" content={img} />
    {/each}{/if}
    <slot name="extraImages" />

    <meta property="og:author" content="Stephen M. Smith" />
    <slot name="articleAuthor" />

    <meta property="og:url" content={$page.url.origin + $page.url.pathname} />
    <meta property="og:type" content={type} />
    <meta property="og:site_name" content="Enverodie" />

    <meta property="twitter:card" content="summary_large_image" />

</svelte:head>