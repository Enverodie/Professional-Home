<script>
    
    import { onMount } from 'svelte';
    import { fabric } from 'fabric';
	import Controls from './controls.svelte';

    const textToFill = "I was here!";
    const fontSize = 20;
    const canvasSize = 3000;
    
    let containerWidth, containerHeight;
    let canvas, placeCanvas, canvasContainer;
    
    let rotationNumber, color;
    let lastClickPosition = {x: 0, y:0};
    // TODO: consider reserving a specific color for mobile users

    let fabricText = new fabric.Text(textToFill, {
        left: 0,
        top: 0,
        fill: color,
        originX: "center",
        originY: "center",
        evented: false,
        fontFamily: "Lato",
        fontSize: fontSize
    });

    $: { // set rotation value when GUI number changes
        if (canvas) {
            fabricText.set('angle', rotationNumber);
            canvas.renderAll();

        }
    }

    $: { // change color when GUI color changes
        if (canvas) {
            fabricText.set('fill', color);
            canvas.renderAll();
        }
    }

    $: { // set canvas size when dependencies change
        if (canvas) {
            canvas.setWidth(containerWidth);
            canvas.setHeight(containerHeight);
        }
    }

    $: { // set the text to the last clicked position
        if (canvas) {
            fabricText.set('left', Math.min(Math.max(lastClickPosition.x, 0), canvasSize-fontSize));
            fabricText.set('top', Math.min(Math.max(lastClickPosition.y, 0), canvasSize-fontSize));
            canvas.renderAll();            
        }
    }

    onMount(() => {

        canvas = new fabric.Canvas('placeCanvas');
        canvas.selection = false;
        lastClickPosition = {x: containerWidth/2, y: containerHeight/2}; // lets the text be initially positioned in a visible spot

        canvas.add(fabricText);

        canvas.forEachObject((obj) => {obj.selectable = false})

        canvas.on('mouse:down', function(opt) {
            opt.e.preventDefault();
            opt.e.stopPropagation();
            lastClickPosition = opt.absolutePointer;
        });
        // algorithm from: 
        // http://fabricjs.com/fabric-intro-part-5
        // additional readings:
        // http://fabricjs.com/docs/fabric.Canvas.html
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform
        canvas.on('mouse:wheel', function(opt) {
            const maxZoom = 20;
            const minZoom = .01;
            opt.e.preventDefault();
            opt.e.stopPropagation();
            var delta = opt.e.deltaY;
            var zoom = canvas.getZoom();
            console.log(zoom);
            zoom *= 0.999 ** delta;
            if (zoom > maxZoom) zoom = maxZoom;
            if (zoom < minZoom) zoom = minZoom;
            canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            var vpt = this.viewportTransform;
            // vpt[0]: horizontal scaling
            // vpt[1]: vertical skewing
            // vpt[2]: horizontal skewing
            // vpt[3]: vertical scaling
            // vpt[4]: horizontal translation
            // vpt[5]: vertical translation

            if (zoom < 400 / canvasSize) { // this controls when the canvas starts shrinking
                console.log("Threshold crossed")
                vpt[4] = 200 - canvasSize * zoom / 2;
                vpt[5] = 200 - canvasSize * zoom / 2;
            } 
            else {
                if (vpt[4] >= 0) {
                    vpt[4] = 0;
                } else if (vpt[4] < canvas.getWidth() - canvasSize * zoom) {
                    vpt[4] = canvas.getWidth() - canvasSize * zoom;
                }
                if (vpt[5] >= 0) {
                    vpt[5] = 0;
                } else if (vpt[5] < canvas.getHeight() - canvasSize * zoom) {
                    vpt[5] = canvas.getHeight() - canvasSize * zoom;
                }
            }
        });
    });

</script>

<div class="canvasContainer" bind:this={canvasContainer} bind:clientWidth={containerWidth} bind:clientHeight={containerHeight}>
    <div class="information">
        <h2>I was here</h2>
        <div class="controls">
            <Controls bind:color bind:rotationNumber />
        </div>
    </div>
    <canvas id="placeCanvas" />
    <!-- <canvas id="hereCanvas" bind:this={placeCanvas} width={containerWidth} height={containerHeight} /> -->
    <!-- <canvas id="hereCanvas" bind:this={canvas} width={containerWidth} height={containerHeight} /> -->
</div>

<style lang="scss">

    .canvasContainer {
        width: 100%;
        height: 60vh;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin: 0;
        padding: 0;
        position: relative;
    }

    .information {
        position: absolute;
        top: 0;
        left: 0;
        width: 40%;
        background-color: hsla(var(--color1H), var(--color1S), 20%, 50%);
        z-index: 2;

        .controls {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 2em;
        }
    }
    
    canvas {
        position: absolute;
        top: 0;
        left: 0;
    }

</style>