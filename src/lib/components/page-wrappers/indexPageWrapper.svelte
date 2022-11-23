<script>

    const squareImgSize = 55;
    const whitespace = 3;

    $: width = document.body.clientWidth;
    // $: width = window.innerWidth;

    $: leftPaddingPx = ((width) % squareImgSize); // how much further to the right must the padding push the container to align with the next grid box
    // $: leftPaddingPx = 0;
    let rightPaddingPx = 0;
</script>

<main>
    <div class="container" style="--leftPadding: {leftPaddingPx}px; --rightPadding: {rightPaddingPx}px;">
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
        // padding: 2em 3.5em;
        display: grid;
        grid-template-columns: 7fr 1fr;
        position: relative;

        &>.container {
            padding-left: calc(var(--boxImgSize) + var(--leftPadding));
            padding-right: var(--boxImgSize);
        }
        
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
</style>