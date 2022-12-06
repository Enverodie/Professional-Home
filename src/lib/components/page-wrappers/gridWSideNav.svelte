<script>
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
        <!-- style="--leftPadding: {leftPaddingPx}px; --rightPadding: {rightPaddingPx}px;" -->
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
        grid-template-columns: 1fr;
        position: relative;

        // &>.container {
            // padding-left: calc(var(--boxImgSize) + var(--leftPadding));
            // padding-right: var(--boxImgSize);
        // }
        
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
            margin-left: 55px; // SQUARE_IMG_SIZE
        }
    }

</style>