<script>

    /* ArticleBox provides the <article> tag.
     */

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

</script>

<!-- 
    We need a div with padding 
    surrounding the article 
    as opposed to margin applied to the article
    because this component's parent needs its width,
    and box-sizing cannot include margin in width calculations.
-->

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


<style lang="scss">

    article {

        --defaultPadding: 1em;

        box-sizing: border-box;
        float: left;
        background-color: var(--color1);
        border: 2px solid hsla(var(--color2H), var(--color2S), var(--color2L), .1); // tied to opacity of square image in _background.scss
        padding: var(--defaultPadding);
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