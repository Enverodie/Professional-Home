<script>

    /* The SimulationCanvas component is meant to fill an optional slot in ShowcaseItem
     * components. This one fits the theme of Simulation Sandbox. It draws a canvas
     * with pseudo-randomly placed boxes every X amount of time.
     * 
     * While it's true I would probably have included something like this *anyway*,
     * I know there's a javascript requirement for this final, so I'm creating this
     * canvas component *now* so I can guarantee without a shadow of a doubt that I
     * met the javascript requirement. While Svelte is javascript, it might be 
     * considered cheating a little bit, so I didn't want to create that ambiguity.
     */

    import { onMount } from 'svelte';
    
    const potentialSquareColors = ['#5C6CFF', '#F36BFA', '#9805FA']
    const squareSize = 15;
    const waitB4DrawingSquares = 400;
    const cursorPositionOnCanvas = {x: 0, y: 0};
    let canvas, ctx, container, containerWidth, containerHeight;

    // solution from Adam Grant (Oct. 15, 2021):
    // https://stackoverflow.com/a/28222246/15818885
    function getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    function handleCursorMove({pageX, pageY}) {
        let cbr = getOffset(container);
        let [offsetX, offsetY] = [Math.floor(cbr.left), Math.floor(cbr.top)];
        cursorPositionOnCanvas.x = pageX - offsetX;
        cursorPositionOnCanvas.y = pageY - offsetY;
    }

    function drawNextSquare(ctx) {

        if (canvas) { // so that whenever someone navigates to another route this won't continue running

            // clear canvas trick: "gman", Aug. 18, 2016
            // https://stackoverflow.com/a/2142549/15818885
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            let cursorXSquare = Math.floor(cursorPositionOnCanvas.x / squareSize);
            let cursorYSquare = Math.floor(cursorPositionOnCanvas.y / squareSize);
            let numSquares = Math.ceil(Math.random() * 7);
            
            for (let i = 0; i < numSquares; i++) {
                let isNegativeX = Math.floor(Math.random() * 2);
                let isNegativeY = Math.floor(Math.random() * 2);
                let offsetX = Math.floor(Math.random() * 6);
                let offsetY = Math.floor(Math.random() * 6);
                
                ctx.fillStyle = potentialSquareColors[Math.floor(Math.random() * potentialSquareColors.length)];

                ctx.fillRect(
                    (cursorXSquare + (offsetX * (isNegativeX ? -1 : 1)) ) * squareSize,
                    (cursorYSquare + (offsetY * (isNegativeY ? -1 : 1)) ) * squareSize,
                    squareSize,
                    squareSize
                );
            }

            // TODO: Consider using requestAnimationFrame as I believe it is more resource friendly
            setTimeout(() => {
                drawNextSquare(ctx);
            }, waitB4DrawingSquares);
        }
    }

    onMount(() => {
        ctx = canvas.getContext('2d');
        drawNextSquare(ctx);
    })


</script>

<svelte:window on:mousemove={handleCursorMove} />

<div 
    class="container" 
    bind:this={container}
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
    >
    <canvas 
        bind:this={canvas}
        width={containerWidth}
        height={containerHeight}
        >
    </canvas>
</div>

<style>

    .container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        opacity: .5;
        pointer-events: none;
        
    }

</style>

