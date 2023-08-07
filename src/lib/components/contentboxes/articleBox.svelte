<script>

    /* ArticleBox provides the <article> tag.
     */

    import { navbar } from '$lib/stores/gui.js';

    export let boxesAbove = 1;
    export let overflow = false;
    if (!boxesAbove) boxesAbove = 0;

    let navbarHeight = 0;
    
    navbar.subscribe(newNavbar => {
        if (newNavbar) {
            navbarHeight = newNavbar.getBoundingClientRect().height;
        }
    })

</script>

<article 
    id={$$props.id} 
    class={"gridlikeBox " + ($$props.class || '')} 
    style={($$props.style?  $$props.style + ';' : '') + ` --jumpTo-Margin: ${navbarHeight}px; --boxesAbove: ${boxesAbove};`}>

    <!-- 
        provides ::before and ::after pseudoelements 
        in an attempt to vertical align 
        the articles with the background.
    -->
    <div class="slotContainer" style={overflow? "overflow: auto;" : ''}>
        <!-- The article's content -->
        <slot />
    </div>
</article>


<style lang="scss">

    article {

        float: left;
        margin-top: calc((var(--boxImgSize) * var(--boxesAbove)) + var(--boxOutsideSize));
        display: flex;
        justify-content: center;
        flex-direction: column;
        scroll-margin-top: calc(var(--jumpTo-Margin) + 1em);
        transition: border .5s ease;
        
    }

    .slotContainer::before, .slotContainer::after {
        content: '';
        display: flex;
        width: 100%;
    }

</style>