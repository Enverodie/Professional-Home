<script>

    /* ArticleBox is an essential component for every article on any page.
     * It provides the <article> tag, as well as nice spacing and borders.
     * These things can be styled specifically by updating the extraStyles prop.
     */

	import { SQUARE_IMG_SIZE } from './../constants/grid.js';

    export let extraStyles = "";

    let article, height;
    
    let buffer = 0; 
    let padding = 0; 

    $: if (article !== undefined && height !== undefined) {
        console.log(height, SQUARE_IMG_SIZE, height % SQUARE_IMG_SIZE)
        padding = height % SQUARE_IMG_SIZE;
    }

</script>

<div style="margin-top:58px" />
<article 
    id={$$props.id}
    bind:this={article}
    bind:clientHeight={height}
    style='{extraStyles}; --padding-adjust-bottom:{padding}px;'
    >
    <div class="slotContainer">
        <slot></slot>
    </div>
</article>
<div class="marginCollapseFix"></div>

<style lang="scss">

    /* marginCollapseFix is a way of removing the default margin-collapse behavior, 
     * so as to not mess up future height calculations to match the background grid.
     */
    .marginCollapseFix {
        display: flex;
        width: 100%;
        height: 0px;
    }

    article {

        --defaultPadding: 1em;
        // --padding-adjust-bottom: 0px;

        box-sizing: border-box;
        float: left;
        background-color: var(--color1);
        border: 2px solid hsla(var(--color2H), var(--color2S), var(--color2L), .1); // tied to opacity of square image in _background.scss
        padding:
            // calc(var(--defaultPadding) + (var(--padding-adjust-bottom) / 2)) 
            var(--defaultPadding);
        // margin-bottom: calc(var(--boxImgSize) * 2 - var(--padding-adjust-bottom));
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        
        
    }

    /* slotContainer and its corresponding before and after tags are an attempt to get the top and bottom of the articles to align with a background grid. */
    .slotContainer {
        // margin: 1em;
    }

    .slotContainer::before, .slotContainer::after {
        content: '';
        display: flex;
        width: 100%;
        height: var(--squaresBuffer);
    }

</style>