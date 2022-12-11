<script>
	
    import SimulationCanvas from './simulationCanvas.svelte';

    export let images = [{src: "/", alt:"image not found", description: "image not found"}];
    export let displayImg = "";
    export let alt = "";

    let carouselIndex = 0;

    function setCarouselIndex(increment) {
        carouselIndex = (carouselIndex + increment) % images.length;
    }

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

    .figureContainer {

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        box-sizing: border-box;

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

            // transition: background linear 50ms;

            &:hover {
                background-color: hsla(var(--color2H), var(--color2S), var(--color2L), .8);
            }

            &:active {
                transition: none;
                background-color: hsla(var(--color2H), var(--color2S), var(--color2L), .2);
            }
        }
    }

    .content {
        position: relative;
        z-index: 2;
        box-sizing: border-box;
        background-color: hsla(var(--color1H), var(--color1S), var(--color1L), .5);
        // background-color: aqua;
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