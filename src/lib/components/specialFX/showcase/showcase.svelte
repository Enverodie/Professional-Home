<script>
	import ShowcaseItem from './showcaseItem.svelte';

    // all 4 of these values can be individually retrieved from a database and used to adjust each item individually
    const height = 1;
    const expandHeight = 1;
    const width = 1;
    const expandWidth = 1;

    /**
     * Properties expected of each image object:
     *
     * required:
     *  fd: object(src: string, alt: string) / object (title: string)
     *  description: a small description of the image
     * 
     * optional:
     *  height: how many slots high the image takes by default
     *  expandHeight: how many slots high the image grows when expanded
     *  width: how many slots wide the image takes by default
     *  expandWidth: how many slots wide the image grows when expanded
     * 
     * do not use:
     *  used
     * 
    */
    export let images = [];
    export let labelBoxSize = 'large';
    export let fillBoxText = '';
    export let limit;

    let imageCount = Math.min(
        (typeof limit !== 'undefined' ? limit : images.length), 
        images.length
    );
    
    export let rows = Math.floor(Math.sqrt(imageCount));
    export let cols = Math.ceil(imageCount / rows) || 0;
    let filteredImages = [];

    if (imageCount > 0) {

        images.forEach(img => {
            
            // substitute undefined values:
            // (values I know don't exist yet)
            img.height = img.height || height;
            img.expandHeight = img.expandHeight || expandHeight;
            img.width = img.width || width;
            img.expandWidth = img.expandWidth || expandWidth;

            // not expected property from source
            img.used = false;

        });
        let taken = Array.from(Array(rows), () => new Array(cols));

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let nextImage = images.find(image => {
                    let allSlotsClear = taken.slice(i, i+image.height).every(col => col.slice(j, j+image.width).every(coord => coord === undefined));
                    return (
                        allSlotsClear &&
                        (image.width <= cols-j) && // fits horizontally
                        (image.height <= rows-i) && // fits vertically
                        !image.used
                    );
                });
                if (nextImage) {
                    nextImage.used = true;
                    
                    for (let k = i; k < i+nextImage.height && k < taken.length; k++) {
                        for (let l = j; l < j+nextImage.width && l < taken[k].length; l++) {
                            taken[k][l] = 1;
                        }
                    }

                    // move up amount
                    let fullExpandedHeight = nextImage.height + nextImage.expandHeight;
                    let moveUpAmount = Math.floor(Math.random() * fullExpandedHeight);
                    if (moveUpAmount > fullExpandedHeight / 2) moveUpAmount = Math.floor(fullExpandedHeight/2);
                    if (moveUpAmount > i) moveUpAmount = i; // top border
                    moveUpAmount = Math.max(moveUpAmount, nextImage.expandHeight - (rows - (i+nextImage.height))); // bottom border

                    // move left amount
                    let fullExpandedWidth = nextImage.width + nextImage.expandWidth;
                    let moveLeftAmount = Math.floor(Math.random() * (fullExpandedWidth));
                    if (moveLeftAmount > fullExpandedWidth / 2) moveLeftAmount = Math.floor(fullExpandedWidth/2);
                    if (moveLeftAmount > j) moveLeftAmount = j; // left border
                    moveLeftAmount = Math.max(moveLeftAmount, nextImage.expandWidth - (cols - (j+nextImage.width))); // right border

                    let expandHeight = nextImage.expandHeight;
                    let expandWidth = nextImage.expandWidth;

                    if (nextImage.height + nextImage.expandHeight > rows) {
                        expandHeight = Math.max(0, rows-nextImage.height);
                        if (moveUpAmount > i) moveUpAmount = i; // top border
                    } 
                    if (nextImage.width + nextImage.expandWidth > cols) {
                        expandWidth = Math.max(0, cols-nextImage.width);
                        if (moveLeftAmount > j) moveLeftAmount = j; // left border
                    }

                    filteredImages.push({ imgData: nextImage, row: i, col: j, moveUpAmount, moveLeftAmount, expandHeight, expandWidth });

                }
                else {
                    // no available image to fill this slot
                }
            }
        }
    }

    let showcaseWidth;

</script>

<div 
    bind:clientWidth={showcaseWidth}
    class={"showcase" + ($$props.class? " " + $$props.class : '') }
    style={($$props.style? $$props.style + ';' : '') + `
        --clientWidth: ${showcaseWidth? showcaseWidth + 'px' : '0px'};
        --numHorizontal: ${cols};
        --numVertical: ${rows};
    `}>
    {#if fillBoxText.length > 0}
        <div class="fullContainerText">
            <h3>{fillBoxText}</h3>
        </div>
    {:else}
        {#each filteredImages as image}
            <ShowcaseItem 
                imageData={image} labelBoxSize={labelBoxSize} style="
                    --numHorizontal: {cols};
                    --numVertical: {rows};
                "/>
        {/each}
    {/if}
</div>

<style lang="scss">

.showcase {
  
    --backgroundColor: transparent;

    display: block;
    position: relative;
    background-color: var(--backgroundColor);
    overflow: hidden;
    border: var(--boxStrokeSize) solid hsla(var(--color2H), var(--color2S), var(--color2L), var(--boxOpacity));
    box-sizing: border-box;
    // box-shadow: 0px 0px 1em var(--color2);
    // border-radius: 5px;

    width: 100%;
    height: calc((var(--clientWidth) / var(--numHorizontal)) * var(--numVertical));

}

.fullContainerText {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>