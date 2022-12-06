<script>
	import Footer from './../footer.svelte';
	import { SQUARE_IMG_SIZE, SQUARE_IMG_WHITESPACE } from './../../constants/grid.js';

    let divSection; // set the style on this element directly
    let width;
    let divWidth;
    
    $: if (divSection !== undefined && width !== undefined) {
        let padding = `${
            (
                (
                    (
                        (width/2.0) - 
                        (SQUARE_IMG_SIZE/2.0)
                    ) % SQUARE_IMG_SIZE
                ) + SQUARE_IMG_WHITESPACE
            )
        }px`;

        divSection.style.paddingLeft = padding;
        divSection.style.paddingRight = padding;
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
</main>
<Footer />
    
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

</style>