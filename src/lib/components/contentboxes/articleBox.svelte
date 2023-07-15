<script>

    /* ArticleBox provides the <article> tag.
     */

    import { navbar } from '$lib/stores/gui.js';

    let navbarHeight = 0;
    
    navbar.subscribe(newNavbar => {
        if (newNavbar) {
            navbarHeight = newNavbar.getBoundingClientRect().height;
        }
    })

</script>

<article id={$$props.id} style="{$$props.style}; --jumpTo-Margin: {navbarHeight}px;">

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

        box-sizing: border-box;
        float: left;
        background-color: var(--color1);
        border: var(--boxStrokeSize) solid hsla(var(--color2H), var(--color2S), var(--color2L), .1);
        padding: var(--defaultPadding);
        margin-top: calc(var(--boxImgSize) + var(--boxOutsideSize));
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        scroll-margin-top: calc(var(--jumpTo-Margin) + 1em);
        transition: border .5s ease;
        
    }

    .slotContainer::before, .slotContainer::after {
        content: '';
        display: flex;
        width: 100%;
    }

</style>