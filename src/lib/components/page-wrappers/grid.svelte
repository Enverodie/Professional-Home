<script>

    /* The Grid component establishes a full-page main section with horizontal spacing aligning with a background grid image. */

    import { onMount, setContext } from 'svelte';
	import Footer from './../footer.svelte';
	import { SQUARE_IMG_SIZE, SQUARE_IMG_WHITESPACE } from './../../constants/grid.js';
    import Navigation from '../navigation/navigation.svelte';
    export let navigation = true;
    export let footer = true;
    export let backgroundPosition = "absolute";

    const boxesFromEdges = 2;
    let divSection; // set the style on this element directly
    let width;
    let divWidth;

    function getPadding() {
        if (!width) return 0;
        let padding = (
            (
                (
                    (width/2.0) - 
                    (SQUARE_IMG_SIZE/2.0)
                ) % SQUARE_IMG_SIZE
            ) + SQUARE_IMG_WHITESPACE
        );
        return padding;
    }

    function updatePadding(outputElement = false) {
        let padding = getPadding();

        // THIS IS WHERE THE PADDING IS PUT INTO THE STYLE
        function setPadding(HTMLElement) {
            HTMLElement.style.paddingLeft = `${padding}px`;
            HTMLElement.style.paddingRight = `${padding}px`;
        }
        if (outputElement) setPadding(outputElement);
        else setContext("setPadding", setPadding);
    }

    onMount(() => {
        updatePadding(divSection);
    });
  

</script>

<svelte:window on:resize={() => {updatePadding(divSection)}} />

{#if (navigation)}
    <Navigation />
{/if}
<main style="--bPosition: {backgroundPosition}" bind:clientWidth={width} >
    <slot name="nonPadded"></slot>
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