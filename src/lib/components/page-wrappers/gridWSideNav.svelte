<script>

    /* The GridWSideNav component establishes a main section with horizontal spacing, 
     * allowing for a side navigation component, aligning with a background grid image. 
     */

    import { onMount } from 'svelte';
    import Navigation from '../navigation/navigation.svelte';
	import Footer from './../footer.svelte';
	import { SQUARE_IMG_SIZE, SQUARE_IMG_WHITESPACE } from './../../constants/grid.js';
    import SidebarNav from '../sidebarNav.svelte';

    export let navigation = true;
    export let footer = true;

    let mainElement, navContainerElement;

    let windowHeight;
    let mainH, mainClientY;
    let navboxH = 0, navboxClientY;

    let divSection; // set the style on this element directly
    let width;
    let divWidth;

    function updateGeometryData() {
        if (mainElement) {
            let mE = mainElement.getBoundingClientRect();
            mainH = mE.height;
            mainClientY = mE.y;
        } 
        if (navContainerElement) {
            let nCE = navContainerElement.getBoundingClientRect();
            navboxClientY = nCE.y;
            console.log(windowHeight + "-" + navboxClientY + "-" + Math.max((-mainH - mainClientY + windowHeight), 0));
            navboxH = windowHeight - navboxClientY - Math.max((-mainH - mainClientY + windowHeight), 0);
        }
    }

    onMount(() => {
        updateGeometryData();
    })

    $: if (divSection !== undefined && width !== undefined) {
        divSection.style.paddingLeft = `${
            (
                (
                    (
                        (width/2.0) - 
                        (SQUARE_IMG_SIZE/2.0)
                    ) % SQUARE_IMG_SIZE
                ) + SQUARE_IMG_WHITESPACE
            )
        }px`;
        divSection.style.paddingRight = `${
            (
                
                (
                    (divWidth/2.0) - 
                    ((width - divWidth)/2) -
                    (SQUARE_IMG_SIZE/2.0)
                ) % SQUARE_IMG_SIZE
            ) + SQUARE_IMG_WHITESPACE
        }px`;
    }

</script>

<svelte:window bind:innerHeight={windowHeight} on:resize={updateGeometryData} on:scroll={updateGeometryData} />

{#if (navigation)}
    <Navigation>
        <!-- <div class="mainGrid" slot="inPageNav">
            <div class="blank" style="width: 100%; height: 0;" aria-hidden="true"></div>
            <div class="inPageNav" style="--height: {navboxH}px" bind:this={navContainerElement}>
                <SidebarNav />
            </div>
        </div> -->
        <div slot="inPageNav" class="inPageNav" style="--height: {navboxH}px" bind:this={navContainerElement}>
            <SidebarNav />
        </div>
    </Navigation>
{/if}
<main class="mainGrid" bind:this={mainElement} bind:clientWidth={width} >
    <div 
        bind:this={divSection} 
        bind:clientWidth={divWidth} 
        class="container" 
        >
        <slot></slot>
    </div>
    <aside class="stickyItem"></aside> <!-- May be useful later -->
</main>
{#if (footer)}
    <Footer />
{/if}
    
<style lang="scss">

    @import '../../routes/background.scss';

    .blank {
        pointer-events: none;
        user-select: none;
        height: 0;
        width: 0;
        visibility: hidden;
    }

    .mainGrid {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;

    }

    main {
        padding-bottom: var(--boxImgSize);
        position: relative;
        
        &:before {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            @include gridBackgroundImageNoFilter();
            z-index: -1;
        }

    }

    .stickyItem {
        position: sticky;
        top: 0;
    }
    
    .inPageNav {
        // TODO: Finish this
        // grid-column: 2;
        display: none;
        position: relative;
        margin: 0 auto;
        width: calc(100vw / 8);
        height: var(--height);
        justify-content: center;
        align-items: center;
    }

    @media only screen and (max-width: 390px) {
        .container {
            padding: 0 !important;
        }
    }

    @media only screen and (min-width: 700px) {
        .mainGrid {
            grid-template-columns: 7fr 1fr;
        }
        
        main>div.container {
            margin-left: var(--boxImgSize);
        }

        .inPageNav {
            display: flex;
        }
    }

</style>