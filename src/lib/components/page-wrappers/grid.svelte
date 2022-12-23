<script>

    /* The Grid component establishes a full-page main section with horizontal spacing aligning with a background grid image. */

	import Footer from './../footer.svelte';
	import { SQUARE_IMG_SIZE, SQUARE_IMG_WHITESPACE } from './../../constants/grid.js';
    import Navigation from '../navigation/navigation.svelte';
    export let navigation = true;
    export let footer = true;

    const boxesFromEdges = 2;
    let divSection; // set the style on this element directly
    let width;
    let divWidth;
    
    $: if (divSection !== undefined && width !== undefined) {
        let padding = (
            (
                (
                    (width/2.0) - 
                    (SQUARE_IMG_SIZE/2.0)
                ) % SQUARE_IMG_SIZE
            ) + SQUARE_IMG_WHITESPACE
        );

        divSection.style.paddingLeft = `${padding}px`;
        divSection.style.paddingRight = `${padding}px`;
    }

</script>

{#if (navigation)}
    <Navigation />
{/if}
<main bind:clientWidth={width} >
    <div class="staticPadding">
        <div 
            bind:this={divSection} 
            bind:clientWidth={divWidth} 
            class="container" 
            >
            <slot></slot>
        </div>
    </div>
</main>
{#if (footer)}
    <Footer />
{/if}
    
<style lang="scss">

    @import '../../routes/background.scss';

    main {
        position: relative;
        padding-bottom: var(--boxImgSize);
        
        &:before {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            @include gridBackgroundImageNoFilter();
            z-index: -1;
        }

    }

    .staticPadding {
        --numberOfBoxes: 0;
        padding: 0 calc(var(--boxImgSize) * var(--numberOfBoxes));
    }

    @media only screen and (min-width: 550px) {
        .staticPadding {
            --numberOfBoxes: 1;
        }
    }

    @media only screen and (min-width: 1200px) {
        .staticPadding {
            --numberOfBoxes: 2;
        }
    }

    @media only screen and (min-width: 1500px) {
        .staticPadding {
            --numberOfBoxes: 3;
        }
    }

</style>