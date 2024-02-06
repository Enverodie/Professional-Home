<script>

    import * as Dimensions from "$lib/constants/cssDimensions";
    import { xor } from "$lib/constants/logicFunctions";

    export let useHorizontalScroll = false;
    export let stickToBottom = false;
    export let stickToRight = false;

    export let windowPadding = {
        top: Dimensions.NAVBAR_HEIGHT,
        left: 0,
        right: 0,
        bottom: 0
    }

    let altAxis = useHorizontalScroll? 'height' : 'width';    
    let altDimensionSize = `0px`;

    let childWidth, childHeight, childStyle;

    let container, sideIsFixed, sideIsStuck;

    function updateSideIsFixed() {
        let viewloc, size, childSize, padding1, padding2;
        let dimensions = container?.getBoundingClientRect();
        if (typeof dimensions?.x !== "number") return;
        altDimensionSize = `${dimensions[altAxis]}px`
        // TODO: make this work with stickToBottom/stickToRight
        if (useHorizontalScroll) {
            viewloc = dimensions.x;
            size = dimensions.width;
            childSize = childWidth;
            padding1 = windowPadding.left;
            padding2 = windowPadding.right;
        }
        else {
            viewloc = dimensions.y;
            size = dimensions.height;
            childSize = childHeight;
            padding1 = windowPadding.top;
            padding2 = windowPadding.bottom;
        }
        let isDragging = ((viewloc || 0) <= padding1);
        sideIsStuck = !((padding1 -(viewloc || 0) <= (size || 0) - childSize));
        sideIsFixed = isDragging && !sideIsStuck;        
    }
    
    $: childStyle = `${altAxis}: ${(sideIsFixed? altDimensionSize : '100%')};` + `${
        (useHorizontalScroll? 
            (xor(stickToRight, sideIsStuck)? 
                'right: ' + (windowPadding.right * sideIsFixed) : 
                'left: ' + (windowPadding.left * sideIsFixed)
            ) : 
            (xor(stickToBottom, sideIsStuck)? 
                'bottom: ' + (windowPadding.bottom * sideIsFixed) : 
                'top: ' + (windowPadding.top * sideIsFixed)
            )
        )
    }px;`;

</script>

<svelte:window on:scroll={updateSideIsFixed} on:resize={updateSideIsFixed} />

<div bind:this={container} class={"viewport " + ($$props.class || '')} style={($$props.style || '')}>
    <div 
        class={"child " + (sideIsFixed? 'fixed' : '')}
        style={childStyle}
        bind:clientHeight={childHeight}
        bind:clientWidth={childWidth}>
        <slot />
    </div>
</div>

<style lang="scss">

    .viewport {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;

        /* border: 1px solid blue; */
    }

    .child {
        /* ideally starts out at the same size as the parent, the "bounding box", but can be much smaller */
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        position: absolute;
        display: inline-block;
        width: 100%;
        overflow: hidden;

        /* border: 1px solid red; */

        &.fixed {
            position: fixed;
        }
    }

</style>