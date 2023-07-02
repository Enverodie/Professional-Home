<script>

    /* The Grid component establishes a full-page main section with horizontal spacing aligning with a background grid image. */

    import { setContext } from 'svelte';
	import Footer from './../footer.svelte';
	import { SQUARE_IMG_SIZE, SQUARE_IMG_WHITESPACE } from './../../constants/grid.js';
    import Navigation from '../navigation/navigation.svelte';
    export let navigation = true;
    export let footer = true;
    export let backgroundPosition = "absolute";
    import { spacingFunctionName } from '../articleBox.svelte';

    const boxesFromEdges = 2;
    let width;

    /*
        Spacings represent the amount of room
        between each child in px

        REQUIRED OF EACH GRID WRAPPER
    */

    function getSpacingRightLeft() {
        if (!width) return 0;
        let spacing = (
            (
                (
                    (width/2.0) - 
                    (SQUARE_IMG_SIZE/2.0)
                ) % SQUARE_IMG_SIZE
            ) + SQUARE_IMG_WHITESPACE
        );

        let boxes;
        console.log(width);
        switch(true) {
            case (width >= 1500):
                boxes = 3;
                break;
            case (width >= 1200):
                boxes = 2;
                break;
            case (width >= 550):
                boxes = 1;
                break;
            default:
                boxes = 0;
        }
        console.log("spacing b4: " + spacing);
        spacing += boxes * SQUARE_IMG_SIZE;
        console.log("spacing after  : " + spacing, boxes, width >= 550);
        return spacing;
    }

    function updateSpacingFunction() {
        
        function setSpacing() {
            let spacing = getSpacingRightLeft();

            return { spacingLeft: spacing, spacingRight: spacing };
        }
        setContext(spacingFunctionName, setSpacing);
    }
    
    updateSpacingFunction();
  

</script>

<svelte:window on:resize={() => {updateSpacingFunction()}} />

{#if (navigation)}
    <Navigation />
{/if}
<main style="--bPosition: {backgroundPosition}" bind:clientWidth={width} >
    <slot name="nonPadded"></slot>
    <div class="staticPadding">
        <slot></slot>
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

    /*
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
    */
</style>