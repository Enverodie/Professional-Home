<script>
	
    /* The ShowcaseItem component establishes the structure of a showcase.
     * It is intended to be included as a direct child of an ArticleBox component 
     * (though it doesn't have to be).
     * 
     * Note: will accept an optional slot "containedEffects" that will be 
     * inserted between the image layer and the text layer to display additional
     * visual effects (such as rendered with an HTML canvas).
     */

    export let images = [{src: "/", alt:"image not found", description: "image not found"}];

    let carouselIndex = 0;

    function setCarouselIndex(increment) {
        carouselIndex = (carouselIndex + increment) % images.length;
        if (carouselIndex < 0) carouselIndex = images.length - 1;
    }

    let cursorPosition;

</script>

<div style="width: 100%; height: 100%; position: relative; box-sizing: border-box;">
    <slot name="containedEffects" cursorPosition={cursorPosition} />
    <div class="grid">
        <div class="figureContainer">
            <figure class="showcaseImage">
                <img src={images[carouselIndex].src} alt={images[carouselIndex].alt} >
                <figcaption>{images[carouselIndex].description}</figcaption>
            </figure>
            <div class="buttons">
                <button class="prev" on:click={() => {setCarouselIndex(-1)}}>&lsaquo;</button>
                <button class="next" on:click={() => {setCarouselIndex(1)}}>&rsaquo;</button>
            </div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</div>

<style lang="scss">

    /* The outer grid - contains the image and description */
    .grid {
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 1fr;

        &>* {
            width: 100%;
            height: fit-content;
            margin: 0;
            padding: 1em;
        }
    }

    /* figureContainer contains the image, image caption, and change image buttons */
    .figureContainer {

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        box-sizing: border-box;

        /* the class that contains the image and caption */
        .showcaseImage {

            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            gap: .75em;
            box-sizing: border-box;
    
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }


    }

    /* container for image carousel forward and backward buttons */
    .buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        box-sizing: border-box;
        
        &>button {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: .1em;
            padding: 0.2em;
            color: var(--color4);
            background-color: hsla(var(--color2H), var(--color2S), var(--color2L), .5);
            border: none;
            cursor: pointer;

            &:hover {
                background-color: hsla(var(--color2H), var(--color2S), var(--color2L), .8);
            }

            &:active {
                background-color: hsla(var(--color2H), var(--color2S), var(--color2L), .2);
            }
        }
    }

    .content {
        position: relative;
        z-index: 2;
        box-sizing: border-box;
        background-color: hsla(var(--color1H), var(--color1S), var(--color1L), .5);
    }

    @media only screen and (min-width: 900px) {
        .grid {
            grid-template-columns: 1fr 1fr;
        }
    }
    
    @media only screen and (min-width: 1300px) {
        .grid {
            grid-template-columns: 3fr 4fr;
        }

        figure {
            grid-template-rows: 2fr 1fr;
        }
    }

</style>