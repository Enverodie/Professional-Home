<script>

    import { page } from '$app/stores';
    import { titleGradientGenerator } from '$lib/constants/titleGradientGen.js';
    import { getFileExtension, imgFileTypes } from '$lib/constants/fileExtension.js';

    export let imageData;

    let { 
        imgData, row, col, 
        moveUpAmount, moveLeftAmount, 
        expandHeight, expandWidth 
    } = imageData;

    let displayImage = true;
    let colorTo = '#0000', colorFrom = "#0000";
    let fileName = (typeof imgData.fileName === "string")? imgData.fileName : imgData.fileName[0];
    if (!imgFileTypes.includes(getFileExtension(fileName))) {
        displayImage = false;
        let rgb = titleGradientGenerator(imgData.postName);
        colorTo = rgb.rgbTo;
        colorFrom = rgb.rgbFrom;
    } 

    $: linkHasFocus = false;

</script>
<div 
    class={($$props.class || '') + 'showcaseItem' + (linkHasFocus? ' linkHasFocus' : '')} 
    style={($$props.style || '') + `
        --rowsDown: ${row}; 
        --colsDown: ${col}; 
        --numTakenH: ${imgData.width}; 
        --numTakenV: ${imgData.height};
    `}>

    <a class='itemAnchor' href={$page.url.pathname + "/post?id="+imgData._id} on:focus={() => linkHasFocus = true} on:blur={() => linkHasFocus = false}>
        <div class='itemResizer' style='
            --resizeW: {expandWidth};
            --resizeH: {expandHeight};
            --moveLeft: {moveLeftAmount};
            --moveUp: {moveUpAmount};
        '>
            {#if displayImage}
                <img class="itemDisplay" src='/creativePosts/{fileName}' alt={imgData.description || ''} />
            {:else}
                <div class="itemDisplay" style="--hexTo: {colorTo}; --hexFrom: {colorFrom}; padding: 2ch;">{imgData.postName}</div>
            {/if}
            {#if imgData.description}
                <div class='labelBox'>
                    <div class="labelBoxText">
                        <div class="title">{imgData.postName}</div>
                        {imgData.description || ''}
                    </div>
                </div>
            {/if}
        </div>
    </a>

</div>
<style lang="scss">

.showcaseItem {
    --rowsDown: 0;
    --colsDown: 0;
    --numTakenH: 1;
    --numTakenV: 1;

    --padding: .75ch;
    --transitionStyle: .2s ease-in-out;

    display: inline-block;
    position: absolute;
    width: calc(100% *    (var(--numTakenH) / var(--numHorizontal)) );
    height: calc(100% *   (var(--numTakenV) / var(--numVertical))   );
    top: calc(100% *      (var(--rowsDown)  / var(--numVertical))   );
    left: calc(100% *     (var(--colsDown)  / var(--numHorizontal)) );

    padding: var(--padding);
    box-sizing: border-box;
    z-index: 1;

    &:hover { z-index: 6; }
    &.linkHasFocus { z-index: 5; }
    &:hover, &.linkHasFocus { animation: none; }
    animation: zIndexReset var(--transitionStyle) forwards;

    .itemAnchor {

        display: block;
        position: relative;
        width: 100%;
        height: 100%;

        .itemResizer {
            --resizeW: 0;
            --resizeH: 0;
            --moveUp: 0;
            --moveLeft: 0;

            --widthSingleBox: calc(
                (
                    100% - 
                    (var(--padding) * 2 * max(var(--numTakenH) - 1, 0)) /* all the paddings */
                ) /* the total percentage of all the squares together if padding didn't exist */
                * (1 / var(--numTakenH))
            );
            --heightSingleBox: calc(
                (100% - (var(--padding) * 2 * max(var(--numTakenV) - 1, 0)) ) *
                (1 / var(--numTakenV))
            );
            width: 100%;
            height: 100%;

            position: relative;
            display: block;
            overflow: hidden;

            bottom: 0;
            right: 0;

            pointer-events: none;
            background-color: var(--backgroundColor);
            transition: width var(--transitionStyle), height var(--transitionStyle), top var(--transitionStyle), right var(--transitionStyle), left var(--transitionStyle), bottom var(--transitionStyle);

            &:before {
                content: '';
                position: absolute;
                display: block;
                top: calc(-2 * var(--padding));
                left: calc(-2 * var(--padding));
                width: 100%;
                height: 100%;
                border: calc(var(--padding)*2) solid var(--backgroundColor);
            }

            .itemDisplay {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                color: var(--color3);
                font-weight: bold;
                box-sizing: border-box;
                // text-shadow: 0px 0px 2px var(--color3);
                text-align: center;
                overflow: hidden;
                object-fit: cover;
                background-size: cover;
                // border-radius: 5px;
                background-image: linear-gradient(var(--defaultThumbnailGradientAngle), var(--hexFrom), var(--hexTo));
            }

            .labelBox {
                position: relative;
                top: 0;
                left: 0;
                width: 100%;
                height: inherit;
                transform: translateX(100%);
                overflow: clip;
                color: white;
                box-sizing: border-box;
                transition: transform var(--transitionStyle) .1s, padding var(--transitionStyle) .1s;
                // white-space: nowrap;
                
                .labelBoxText {
                    text-align: center;
                    position: absolute;
                    box-sizing: border-box;
                    top: 0;
                    left: 0;
                    height: inherit;
                    width: 100%;
                    min-width: min-content;
                    padding: 1em;
                    background-color: hsla(var(--color1H), var(--color1S), var(--color1L), .8);
                    
                    .title {
                        font-weight: bold;
                        color: var(--color6);
                        margin: 0 0 1em;
                    }
                }
            }
        }

        &:focus {
            outline: none;
            .itemResizer {
                outline: var(--focusOutlineStyle);
            }
        }

        &:hover .itemResizer, &:focus .itemResizer {
            
            width: calc(
                100% + 
                (var(--widthSingleBox) * var(--resizeW)) +
                (2 * var(--padding) * var(--resizeW))
            );
            height: calc(
                100% +
                (var(--heightSingleBox) * var(--resizeH)) +
                (2 * var(--padding) * var(--resizeH))
            );
            right: calc(
                var(--widthSingleBox) * var(--moveLeft) +
                (2 * var(--padding) * var(--moveLeft))
            );
            bottom: calc(
                var(--heightSingleBox) * var(--moveUp) +
                (2 * var(--padding) * var(--moveUp))
            );

            .labelBox {
                transform: translateX(0%);
            }
        }

    }
}

@keyframes zIndexReset {
    from {
        z-index: 4;
    }
    to {
        z-index: 0;
    }
}

@media (min-width: 800px) {
    .labelBoxText {
        width: 50% !important;
    }
}

@media (min-width: 1000px) {
    .labelBoxText {
        width: calc(100% / 3) !important;
    }
}

</style>