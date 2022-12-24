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

    let path = window.location.pathname;
    let windowWidth;

    let nav;
    let displayed = false;

    $: nav && navbar.set(nav);

</script>

<svelte:window bind:innerWidth={windowWidth} />

<MobileNavLinks bind:displayed />
<div class="stickToTop">
    <nav bind:this={nav}>
        <div class="icon">
            <EnverodieIcon />
            <span>{getRouteName(path)}</span>
        </div>
        {#if (windowWidth < 800)}
            <HamburgerNavElements bind:displayed />
        {:else}
            <HorizontalNavElements />
        {/if}
    </nav>
    <div style="position: absolute; right: 0; overflow: hidden;">
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

    nav {
        background-color: var(--color5);
        padding: .5em 1em;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .icon {
        font-weight: 700;
        font-size: 2em;
        margin-right: 1em;
        display: flex;
        align-items: center;
        gap: 1em;
    }

    @media only screen and (max-width: 400px) {
        .icon {
            font-size: 18px;
        }

    }

</style>