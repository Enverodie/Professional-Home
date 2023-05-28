<script>

    /* The Grid component establishes a full-page main section with horizontal spacing aligning with a background grid image. */

	import Footer from './../footer.svelte';
    import Navigation from '../navigation/navigation.svelte';
    export let navigation = true;
    export let footer = true;
    export let backgroundPosition = "absolute";

</script>

{#if (navigation)}
    <Navigation />
{/if}
<main style="--bPosition: {backgroundPosition}" >
    <slot></slot>
</main>
{#if (footer)}
    <Footer />
{/if}
    
<style lang="scss">

    @import '../route-specific/background.scss';

    main {
        position: relative;
        padding-bottom: var(--boxImgSize);
        
        &:before {
            content: '';
            width: 100%;
            height: 100%;
            position: var(--bPosition);
            @include gridBackgroundImageNoFilter();
            z-index: -1;
        }

    }

</style>