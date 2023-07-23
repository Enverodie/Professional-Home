<script context="module">
    
    import { createBackgroundGridImage } from '$lib/constants/grid.js'
    
    const gridImageData = createBackgroundGridImage('hsl(234, 100%, 78%)'); // color6
    const gridImageDataError = createBackgroundGridImage('hsl(360, 100%, 39%)'); // colorAlert

</script>
<script>
    import NameGlitch from './nameGlitch.svelte';
    import PositionInWrapper from "../utilities/positionInWrapper.svelte";

    export let withinGrid = true;
    export let useErrorStyle = false;
    export let rowsUsed = 1;

    let mainColor = useErrorStyle? "var(--color4)" : "var(--color7)";
    let altColor = useErrorStyle? "var(--colorAlert)" : "var(--color2)";

</script>

{#if (withinGrid)}
    <header
        class:withinGrid
        class:useErrorStyle
        style={
            ($$props.style || '') + 
            ` --gridImageData: url('${useErrorStyle? gridImageDataError : gridImageData}');` + 
            ` --rowsUsed: ${rowsUsed};`
        }>
        <PositionInWrapper style="display: flex; height: 100%;">
            <div class="textBox">
                <span class="text">
                    <NameGlitch mainColor={mainColor} altColor={altColor}>
                        <slot />
                    </NameGlitch>
                </span>
            </div>
        </PositionInWrapper>
    </header>
    {:else}
    <header
        class:withinGrid
        class:useErrorStyle
        style={
            ($$props.style || '') + 
            ` --gridImageData: url('${useErrorStyle? gridImageDataError : gridImageData}');`
        }>
        <div class="textBox">
            <slot />
        </div>
    </header>
{/if}

<style lang="scss">
    
    @import '../../styles/background';

    header {

        @include gridBackgroundImage(var(--gridImageData));

        box-sizing: border-box;
        padding: var(--boxOutsideSize) 0;
        margin: var(--boxImgSize) 0;
        
        .textBox {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--color1);
            color: var(--color7);
            border: var(--boxStrokeSize) solid var(--color6);
            font-weight: bold;
            padding: 1em 0;

            .text {
                margin: calc(var(--defaultPadding) * 2);
            }
        }
    }

    .withinGrid {
        height: calc(var(--boxImgSize) * var(--rowsUsed));
        .textBox {
            width: 100%;
        }
    }

    .useErrorStyle {
        .textBox {
            border: var(--boxStrokeSize) solid var(--colorAlert);
        }
    }

</style>