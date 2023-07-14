<script context="module">

    export const spacingFunctionName = "setSpacingArticle";
    
</script>
<script>

    import { getContext, onMount } from 'svelte';

    const heightFunction = getContext('getHeight');

    let element;
    // let newHeight;
    
    $: newHeight = heightFunction(element?.children[0]);
    // onMount(() => {
    // })

</script>

<div
    bind:this={element}
    class={"wrapperPositioned" + " " + spacingFunctionName + " " + ($$props.class || '')}
    style={($$props.style || '') + (newHeight ? `--height: ${newHeight}px;` : '')}
    >
    <slot />
</div>

<!-- 
    marginCollapseFix is a way of 
    removing the default margin-collapse behavior
    so as to not mess up future height calculations 
    to match the background grid.
 -->
<div class="marginCollapseFix"></div>

<style lang="scss">
    
    .marginCollapseFix {
        display: flex;
        width: 100%;
        height: 0px;
    }
    
</style>