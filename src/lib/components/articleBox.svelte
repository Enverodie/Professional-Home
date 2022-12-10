<script>
	import { SQUARE_IMG_SIZE } from './../constants/grid.js';

    export let extraStyles = "";

    let article, height;
    
    let buffer = 0; 
    let padding = 0; 

    $: if (article !== undefined && height !== undefined) {
        console.log(height, SQUARE_IMG_SIZE, height % SQUARE_IMG_SIZE)
        padding = height % SQUARE_IMG_SIZE;
    }

</script>
<article 
bind:this={article}
bind:clientHeight={height}
style='{extraStyles}; --padding-adjust-bottom:{padding}px;'
>
<div class="slotContainer">
    <slot></slot>
</div>
</article>
<div class="marginCollapseFix"></div>

<style lang="scss">

.marginCollapseFix {
    display: flex;
    width: 100%;
    height: 0px;
}

article {

    --defaultPadding: 1em;
    // --padding-adjust-bottom: 0px;

    box-sizing: border-box;
    float: left;
    background-color: var(--color1);
    border: 2px solid hsla(var(--color2H), var(--color2S), var(--color2L), .1); // tied to opacity of square image in _background.scss
    padding:
        // calc(var(--defaultPadding) + (var(--padding-adjust-bottom) / 2)) 
        var(--defaultPadding);
    margin-top: 58px;
    // margin-bottom: calc(var(--boxImgSize) * 2 - var(--padding-adjust-bottom));
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    
    
}

.slotContainer {
    // margin: 1em;
}

.slotContainer::before, .slotContainer::after {
    content: '';
    display: flex;
    width: 100%;
    height: var(--squaresBuffer);
}

</style>