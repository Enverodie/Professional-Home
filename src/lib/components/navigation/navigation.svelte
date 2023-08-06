<script>

    /* The Navigation component is a universal component that provides site navigation at the top of the page.
     * It displays the icon to go to the homepage, as well as buttons for every available (and some not-yet-available)
     * routes to navigate to.
     */

	import EnverodieIcon from '../buttons/enverodieIcon.svelte';
    import { getRouteName } from '../../constants/navigableRoutes'
    import HorizontalNavElements from './horizontalNavElements.svelte';
    import HamburgerNavElements from './hamburger.svelte';
    import MobileNavLinks from './verticalNavElements.svelte';
    import { navbar } from '../../stores/gui.js'
    import { page } from '$app/stores'

    const desktopNavBreakpoint = 800;

    let path = $page.error ? "Enverodie.com" : $page.url.pathname.split('/').reduce((previousValue, currentValue) => {return (previousValue? (getRouteName('/' + previousValue) + " > ") : previousValue) + getRouteName('/' + currentValue)});
    let windowWidth;

    let nav;
    let displayed = false;

    $: nav && navbar.set(nav);

</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if (windowWidth < desktopNavBreakpoint)}
    <MobileNavLinks bind:displayed />
    {#if (displayed)}
        <div class="navSizeReplica" style={"--navHeight: " + nav?.getBoundingClientRect().height + 'px;'} />
    {/if}
{/if}
<div class={"stickToTop" + ((displayed && windowWidth < desktopNavBreakpoint)? ' mobileLinksDisplayed' : '')}>
    <nav bind:this={nav}>
        <div class="icon">
            <EnverodieIcon />
            <span>{path}</span>
        </div>
        {#if (windowWidth >= desktopNavBreakpoint)}
            <HorizontalNavElements bind:displayed />
        {:else}
            <HamburgerNavElements bind:displayed />
        {/if}
    </nav>
    <div class="inPageNavContainer">
        <slot name="inPageNav"></slot>
    </div>
</div>

<style lang="scss">

    .stickToTop {
        position: sticky;
        top: 0;
        z-index: 10;
        margin: 0;
    }

    .mobileLinksDisplayed {
        position: fixed;
        width: 100%;

        .inPageNavContainer {
            visibility: hidden;
        }
    }

    nav {
        background-color: var(--color5);
        padding: .5em 1em;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .icon {
            font-weight: 700;
            font-size: 2em;
            margin-right: 1em;
            display: flex;
            align-items: center;
            gap: 1em;
        }
    }

    .navSizeReplica {
        background-color: var(--color5);
        height: var(--navHeight);
    }

    .inPageNavContainer {
        position: absolute;
        right: 0;
        overflow: hidden;
    }

    @media only screen and (max-width: 400px) {
        .icon {
            font-size: 18px;
        }

    }

</style>