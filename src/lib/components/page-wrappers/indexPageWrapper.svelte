<script>

    export let squareH = "0deg";
    export let squareS = "100%";
    export let squareL = "100%";

</script>

<main style="--squareHRotate: {squareH}; --squareS: {squareS}; --squareL: {squareL};">
    <slot></slot>
    <aside>
        <div class="stickyItem">
            <p></p>
        </div>
    </aside>
</main>
    
<style lang="scss">

    @import '../../routes/background.scss';

    main {
        padding: 2em 3.5em;
        display: grid;
        grid-template-columns: 7fr 1fr;
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
        margin: 0 auto;
        
    }
    
    aside .stickyItem {
        position: sticky;
        width: 100%;
        top: 50vh;
    }
</style>