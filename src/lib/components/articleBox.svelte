<script context="module">

    export const spacingFunctionName = "setSpacingArticle";
    
</script>
<script>

    /* ArticleBox is an essential component for every article on any page.
     * It provides the <article> tag, as well as nice spacing and borders.
     */

    import { getContext, onMount } from 'svelte';
    import { SQUARE_IMG_SIZE, SQUARE_IMG_WHITESPACE } from '$lib/constants/grid.js';
    import { navbar } from '../stores/gui.js';

    export let extraStyles = "";

    let article;
    let navbarHeight = 0;
    
    navbar.subscribe(newNavbar => {
        if (newNavbar) {
            navbarHeight = newNavbar.getBoundingClientRect().height;
        }
    })

    let height;

    let spacingLeft, spacingRight, spacingTop, spacingBottom;

    const getSpacing = getContext(spacingFunctionName);
    function setSpacing() {
        let spacing = getSpacing();
        
        spacingLeft = spacing.spacingLeft || 0;
        spacingRight = spacing.spacingRight || 0;
        spacingTop = spacing.spacingTop || 0;
        spacingBottom = spacing.spacingBottom || 0;
    }

    onMount(() => {
        setSpacing();
    })

</script>


<!-- 
    We need a div with padding 
    surrounding the article 
    as opposed to margin applied to the article
    because this component's parent needs its width,
    and box-sizing cannot include margin in width calculations.
-->
<div style="
    padding-bottom: {spacingBottom}px;
    padding-top: {spacingTop}px;
    padding-left: {spacingLeft}px;
    padding-right: {spacingRight}px;
    ">
    <article 
        id={$$props.id}
        bind:offsetHeight={height}
        style="
            {extraStyles};
            --jumpTo-Margin: {navbarHeight}px;
            "
        >

        <!-- 
            provides ::before and ::after pseudoelements 
            in an attempt to vertical align 
            the articles with the background.
         -->
        <div class="slotContainer">

            <!-- The article's content -->
            <slot />

        </div>
    </article>

</div>

<!-- 
    marginCollapseFix is a way of 
    removing the default margin-collapse behavior
    so as to not mess up future height calculations 
    to match the background grid.
 -->
<div class="marginCollapseFix"></div>

<style lang="scss">

    .marginCollapseFix {
        display: flex;
        width: 100%;
        height: 0px;
    }

    article {

        --defaultPadding: 1em;

        box-sizing: border-box;
        float: left;
        background-color: var(--color1);
        border: 2px solid hsla(var(--color2H), var(--color2S), var(--color2L), .1); // tied to opacity of square image in _background.scss
        padding:
            // calc(var(--defaultPadding) + (var(--padding-adjust-bottom) / 2)) 
            var(--defaultPadding);
        // margin-bottom: calc(var(--boxImgSize) * 2 - var(--padding-adjust-bottom));
        margin-top: 58px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        scroll-margin-top: calc(var(--jumpTo-Margin) + 1em);
        transition: border .5s ease;
        
    }

    .slotContainer {
        // margin: 1em;
    }

    .slotContainer::before, .slotContainer::after {
        content: '';
        display: flex;
        width: 100%;
        // padding-top: var(--squaresBuffer);
    }

</style>