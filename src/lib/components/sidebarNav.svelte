<script>

    // export let scrollToSections = ["about", "test", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "showcase"];
    export let scrollToSections = [];
    export let position = 0;
    $: positionInt = Math.floor(position);
    $: positionFloat = position - positionInt;

    // let manualAdjustPosition = null;

    let altText = "Navigate to ";

    // function setManualAdjust(index) {
    //     manualAdjustPosition = index;
    // }

    // function updatePositionWithManual() {
    //     if (manualAdjustPosition !== null) {
    //         position = manualAdjustPosition;
    //         manualAdjustPosition = null;
    //     }
    // }

</script>

<div class="sidebarNavContainer">

    {#each scrollToSections as location, index}
    <a href="#{location}">
        {#if (index === 0)}

            {#if (index === positionInt)}
                <span class="navDiamond" style="--topPercent: {positionFloat * 100}%">
                    <img src="/svgs/sidebarNav/locationDiamondSized.svg" alt="Diamond" />
                </span>
            {/if}
            <img 
                src="/svgs/sidebarNav/endcapDiamond.svg" 
                alt={altText + location} 
                />

        {:else if (index >= scrollToSections.length - 1)}

            {#if (index === positionInt)}
                <span class="navDiamond" style="--topPercent: {positionFloat * 100}%">
                    <img src="/svgs/sidebarNav/locationDiamondSized.svg" alt="Diamond" />
                </span>
            {/if}
            <img 
                src="/svgs/sidebarNav/endcapDiamond.svg" 
                alt={altText + location} 
                style="transform: rotate(180deg);"
                />

        {:else}

            {#if (index === positionInt)}
                <span class="navDiamond" style="--topPercent: {positionFloat * 100}%">
                    <img src="/svgs/sidebarNav/locationDiamondSized.svg" alt="Diamond" />
                </span>
            {/if}
            <img
                src="/svgs/sidebarNav/middleDiamond.svg"
                alt={altText + location}
                />

        {/if}
    </a>
    {/each}
</div>

<style lang="scss">

    a {
        position: relative;
    }
    
    .navDiamond {
        position: absolute;
        top: var(--topPercent);
        z-index: 1;
        user-select: none;
        pointer-events: none;
    }

    .sidebarNavContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        // background-color: hsla(var(--color5H), var(--color5S), var(--color5L), .7);


        &>a {
            display: flex; // for some reason fixes the spacing issue between elements

            img {
                width: auto;
            }
        }
    }

</style>