<script>

    export let imageData;
    let { 
        imgData, row, col, 
        moveUpAmount, moveLeftAmount, 
        expandHeight, expandWidth 
    } = imageData;

    let displayImage = true;
    let hexTo = '#0000', hexFrom = "#0000";
    if (imgData.fd.title) {
        displayImage = false;
        let workedTitle = imgData.fd.title;
        while (workedTitle.length < 3) workedTitle += ' ';
        const hexOptions = 256;
        const strlen = 5;
        let numString0 = workedTitle.split('').filter((item, i) => {return i % 3 === 0}).reduce((accumulator, currentItem) => accumulator += currentItem.charCodeAt(0), '');
        let numString0Reversed = numString0.split('').reverse().join('');
        
        let numString1 = workedTitle.split('').filter((item, i) => {return i % 3 === 1}).reduce((accumulator, currentItem) => accumulator += currentItem.charCodeAt(0), '');
        let numString1Reversed = numString1.split('').reverse().join('');
        
        let numString2 = workedTitle.split('').filter((item, i) => {return i % 3 === 2}).reduce((accumulator, currentItem) => accumulator += currentItem.charCodeAt(0), '');
        let numString2Reversed = numString2.split('').reverse().join('');

        hexFrom = `rgb(${numString0Reversed.substring(0, strlen) % hexOptions}, ${numString1Reversed.substring(0, strlen) % hexOptions}, ${numString2Reversed.substring(0, strlen) % hexOptions})`;
        hexTo = `rgb(${numString0.substring(0, strlen) % hexOptions}, ${numString1.substring(0, strlen) % hexOptions}, ${numString2.substring(0, strlen) % hexOptions})`;
        
    } 


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
            {#if displayImage}
                <img class="itemDisplay" src='{imgData.fd.src}' alt={imgData.fd.alt || ''} />
            {:else}
                <div class="itemDisplay" style="--hexTo: {hexTo}; --hexFrom: {hexFrom};">{imgData.fd.title}</div>
            {/if}
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

            .itemDisplay {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                color: var(--color1);
                font-weight: bold;
                text-shadow: 0px 0px 2px var(--color3);
                text-align: center;
                overflow: hidden;
                object-fit: cover;
                background-size: cover;
                border-radius: 5px;
                background-image: linear-gradient(135deg, var(--hexFrom), var(--hexTo));
            }

            .attribution {
                --horizontalPadding: 0;
                position: absolute;
                top: 0;
                right: 0;
                width: 0%;
                height: 100%;
                overflow: hidden;
                color: white;
                box-sizing: border-box;
                padding: .5em var(--horizontalPadding);
                transition: width var(--transitionStyle) .1s, padding var(--transitionStyle) .1s;
                white-space: nowrap;
                background-color: hsla(var(--color1H), var(--color1S), var(--color1L), .8);
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