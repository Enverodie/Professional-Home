<script>

    /* The GridWSideNav component establishes a main section with horizontal spacing, 
     * allowing for a side navigation component, aligning with a background grid image. 
     */

	import Footer from './../footer.svelte';
	import { SQUARE_IMG_SIZE, SQUARE_IMG_WHITESPACE } from './../../constants/grid.js';

    let divSection; // set the style on this element directly
    let width;
    let divWidth;

    $: if (divSection !== undefined && width !== undefined) {
        divSection.style.paddingLeft = `${
            (
                (
                    (
                        (width/2.0) - 
                        (SQUARE_IMG_SIZE/2.0)
                    ) % SQUARE_IMG_SIZE
                ) + SQUARE_IMG_WHITESPACE
            )
        }px`;
        divSection.style.paddingRight = `${
            (
                
                (
                    (divWidth/2.0) - 
                    ((width - divWidth)/2) -
                    (SQUARE_IMG_SIZE/2.0)
                ) % SQUARE_IMG_SIZE
            ) + SQUARE_IMG_WHITESPACE
        }px`;
    }

</script>

<main bind:clientWidth={width} >
    <div 
        bind:this={divSection} 
        bind:clientWidth={divWidth} 
        class="container" 
        >
        <slot></slot>
    </div>
    <aside>
        <div class="stickyItem">
            <p></p>
        </div>
    </aside>
</main>
<Footer />
    
<style lang="scss">

    @import '../../routes/background.scss';

    main {
        display: grid;
        padding-bottom: var(--boxImgSize);
        grid-template-columns: 1fr;
        position: relative;
        
        &:before {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            @include gridBackgroundImageNoFilter();
            z-index: -1;
        }

    }
    
    aside {
        // TODO: Finish this
        margin: 0 auto;
    }
    
    aside .stickyItem {
        position: sticky;
        width: 100%;
        top: 50vh;
    }

    @media only screen and (min-width: 700px) {
        main {
            grid-template-columns: 7fr 1fr;
        }
        
        main>div.container {
            margin-left: var(--boxImgSize);
        }
    }

</style>