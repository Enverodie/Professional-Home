<script context="module">

    export const spacingFunctionName = "setSpacingArticle";
    
</script>
<script>
    
    import { getContext, onMount } from 'svelte';

    let spacingLeft, spacingRight, spacingTop, spacingBottom;

    const getSpacing = getContext(spacingFunctionName);
    function setSpacing() {
        let spacing = getSpacing();
        
        spacingLeft = spacing.spacingLeft || 0;
        spacingRight = spacing.spacingRight || 0;
        spacingTop = spacing.spacingTop || 0;
        spacingBottom = spacing.spacingBottom || 0;
    }

    onMount(() => {
        setSpacing();
    })

</script>

<svelte:window on:resize={() => setSpacing()} />

<div style="
    padding-bottom: {spacingBottom}px;
    padding-top: {spacingTop}px;
    padding-left: {spacingLeft}px;
    padding-right: {spacingRight}px;
    ">
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