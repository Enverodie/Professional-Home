<script>

    // export let scrollToSections = ["about", "test", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "showcase"];
    export let scrollToSections = [];
    export let positionPercent = 0;

    let altText = "Navigate to ";

</script>

<div class="sidebarNavContainer">
    {#each scrollToSections as location, index}
    <a href="#{location}">
        {#if (index === 0)}
            <img 
                src="/static/svgs/sidebarNav/endcapDiamond.svg" 
                alt={altText + location} 
                />
        {:else if (index >= scrollToSections.length - 1)}
            <img 
                src="/static/svgs/sidebarNav/endcapDiamond.svg" 
                alt={altText + location} 
                style="transform: rotate(180deg);"
                />
        {:else}
            <img
                src="/static/svgs/sidebarNav/middleDiamond.svg"
                alt={altText + location}
                />
        {/if}
    </a>
    {/each}
</div>

<style lang="scss">

    .sidebarNavContainer {
        display: flex;
        flex-direction: column;
        // background-color: hsla(var(--color5H), var(--color5S), var(--color5L), .7);
        padding: 2em;

        &>a {
            display: flex; // for some reason fixes the spacing issue between elements

            img {
                width: auto;
            }
        }
    }

</style>