<script context="module">

    export const gridColumns = 8;
    export const mainColumn = 7;
    export const sidebarColumn = gridColumns - mainColumn;

</script>
<script>
    
    /* The GridWSideNav component establishes a main section with horizontal spacing, 
     * allowing for a side navigation component, aligning with a background grid image. 
     */
    
    import { onMount } from 'svelte';
    import Navigation from '../navigation/navigation.svelte';
	import Footer from './../footer.svelte';
	import { SQUARE_IMG_SIZE, SQUARE_IMG_WHITESPACE } from './../../constants/grid.js';
    import SidebarNav from '../sidebarNav.svelte';
	import IntersectionHandler from './../intersectionHandler.svelte';
    
    // component properties

    export let navigation = true;
    export let footer = true;
    export let showSideNav = false;
    export let trackedIDs = []; // optional value - if no tracked ids, remove side nav
    export let position = 0;
    export let backgroundPosition = "absolute";

    // component internal state

    let mainElement; // we assign this to <main> on load to get its bounding box
    let primaryNavContainerElement; // we assign this to the main <nav> on load to get its bounding box

    let windowHeight;
    let mainHeight, mainClientY;
    let navboxH = 0, navboxClientY;

    let width = 0;
    let divWidth = 0;

    // $: showSideNav = trackedIDs.length > 0;

    // this function's primary use in in accurately resizing the side navigation container
    // (so the side nav can be properly "centered" on the screen)
    function updateGeometryData() {
        if (mainElement) {
            let mE = mainElement.getBoundingClientRect();
            mainHeight = mE.height;
            mainClientY = mE.y;
        } 
        if (primaryNavContainerElement) {
            let nCE = primaryNavContainerElement.getBoundingClientRect();
            navboxClientY = nCE.y;
            navboxH = windowHeight - navboxClientY - Math.max((-mainHeight - mainClientY + windowHeight), 0);
        }
    }

    onMount(() => {
        updateGeometryData();
    })

</script>

<!-- Performs logic that updates integer value of element being viewed -->
<IntersectionHandler bind:trackedIDs bind:position />

<svelte:window 
    bind:innerHeight={windowHeight} 
    on:resize={() => {updateGeometryData()}} 
    on:scroll={updateGeometryData} />

<!-- Navigation stuff -->
{#if (navigation && showSideNav)}
    <Navigation>
        <!-- The diamonds + bounding box for diamonds on the side of the screen -->
        <div 
            slot="inPageNav" 
            class="inPageNav" 
            style="
                --height: {navboxH}px; 
                --gridColumns: {gridColumns};
                --sidebarColumns: {sidebarColumn};
                " 
            bind:this={primaryNavContainerElement}>

            <!-- The diamonds component -->
            <SidebarNav bind:scrollToSections={trackedIDs} bind:position />
        </div>
    </Navigation>
{:else if (navigation)}
    <Navigation />
{/if}

<!-- Main content holder -->
<main 
    class="{showSideNav? 'mainGridWithSideNav' : ''}" 
    style="
        --bPosition: {backgroundPosition};
        --mainColumnFR: {mainColumn}fr;
        --sidebarColumnFR: {sidebarColumn}fr;
        --baseSpacingLeftValue: {((((width/2.0) - (SQUARE_IMG_SIZE/2.0)) % SQUARE_IMG_SIZE) + SQUARE_IMG_WHITESPACE)}px;
        --baseSpacingRightValue: {(((divWidth/2.0) - ((width - divWidth)/2) -(SQUARE_IMG_SIZE/2.0)) % SQUARE_IMG_SIZE) + SQUARE_IMG_WHITESPACE}px;
        " 
    bind:this={mainElement} 
    bind:clientWidth={width} 
    >
    
    <!-- This element can get spacing based on the background grid -->
    <div 
        bind:clientWidth={divWidth} 
        class="container" 
        >
        <slot></slot>
    </div>
    {#if (showSideNav)}
        <aside class="stickyItem"></aside> <!-- May be useful later; otherwise used as whitespace for the sidebar nav -->
    {/if}
</main>

<!-- Footer -->
{#if (footer)}
    <Footer />
{/if}
    

<style lang="scss">

    @import '../route-specific/background.scss';

    .mainGridWithSideNav {
        display: grid;
        grid-template-columns: 1fr;
    }

    main {
        --extraBoxRight: 0; 
        --extraBoxLeft: var(--extraBoxRight);

        padding-bottom: var(--boxImgSize);
        position: relative;
        
        &:before {
            content: '';
            width: 100%;
            height: 100%;
            position: var(--bPosition);
            @include gridBackgroundImageNoFilter();
            z-index: -1;
        }

        :global(.wrapperPositioned) {
            padding-left: calc(var(--baseSpacingLeftValue) + (var(--boxImgSize) * var(--extraBoxLeft)));
            padding-right: calc(var(--baseSpacingRightValue) + (var(--boxImgSize) * var(--extraBoxRight)));
        }

    }

    .stickyItem {
        position: sticky;
        top: 0;
    }
    
    .inPageNav {
        display: none;
        position: relative;
        margin: 0 auto;
        width: calc((100vw / var(--gridColumns)) * var(--sidebarColumns));
        height: var(--height);
        justify-content: center;
        align-items: center;
    }

    @media only screen and (max-width: 390px) {
        .container {
            padding: 0 !important;
        }
    }

    @media only screen and (min-width: 550px) {
        main { --extraBoxRight: 1; }
    }

    @media only screen and (min-width: 700px) {
        .mainGridWithSideNav {
            --extraBoxLeft: 1;
            --extraBoxRight: 0;

            grid-template-columns: var(--mainColumnFR) var(--sidebarColumnFR);
        }

        .inPageNav {
            display: flex;
        }
    }

    @media only screen and (min-width: 1200px) {
        main { --extraBoxRight: 2; }
    }

    @media only screen and (min-width: 1500px) {
        main { --extraBoxRight: 3; }
    }

</style>