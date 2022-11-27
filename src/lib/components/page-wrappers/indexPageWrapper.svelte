<script>

    const squareImgSize = 55;
    const whitespace = 3;

    let divSection; // set the style on this element directly
    let width;
    let divWidth;

    $: if (divSection !== undefined && width !== undefined) {
        divSection.style.paddingLeft = `${
            (
                (
                    (
                        (width/2.0) - 
                        (squareImgSize/2.0)
                    ) % squareImgSize
                ) + whitespace
            )
        }px`;
        divSection.style.paddingRight = `${
            (
                
                (
                    (divWidth/2.0) - 
                    ((width - divWidth)/2) -
                    (squareImgSize/2.0)
                ) % squareImgSize
            ) + whitespace
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
            margin-left: 55px; // squareImgSize
        }
    }

</style>