<script>

    export let imageData;
    let { 
        imgData, row, col, 
        moveUpAmount, moveLeftAmount, 
        expandHeight, expandWidth 
    } = imageData;

</script>
<div 
    class={($$props.class || '') + 'showcaseItem'} 
    style={($$props.style || '') + `
        --rowsDown: ${row}; 
        --colsDown: ${col}; 
        --numTakenH: ${imgData.width}; 
        --numTakenV: ${imgData.height};
    `}>

    <div class='itemAnchor'>
        <div class='itemResizer' style='
            --resizeW: {expandWidth};
            --resizeH: {expandHeight};
            --moveLeft: {moveLeftAmount};
            --moveUp: {moveUpAmount};
        '>
            <img src='{imgData.src}' alt={imgData.alt || ''} />
            <div class='attribution'>{imgData.description || ''}</div>
        </div>
    </div>

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
    &:hover { z-index: 5; animation: none; }
    animation: zIndexReset var(--transitionStyle) forwards;

    .itemAnchor {

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

            img {
                position: absolute;
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 5px;
            }

            .attribution {
                --horizontalPadding: 0;
                position: absolute;
                top: 0;
                right: 0;
                width: 0%;
                overflow: hidden;
                color: white;
                box-sizing: border-box;
                padding: .5em var(--horizontalPadding);
                transition: width var(--transitionStyle) .1s, padding var(--transitionStyle) .1s;
                white-space: nowrap;
            }
        }

        &:hover .itemResizer {
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

            .attribution {
                --horizontalPadding: .5ch;
                width: 100%;
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

</style>