<script context="module">

    export const spacingFunctionName = "setSpacingArticle";
    
</script>

<div
    class="wrapperPositioned {spacingFunctionName}"
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