<script>
    import PageWrapper from '../page-wrappers/grid.svelte';
    import HumbleAnchor from '../buttons/humbleAnchor.svelte';
    import { getRouteName, splitPascalCase, NAVIGABLE_ROUTES, INCOMPLETE_ROUTES } from '../../constants/navigableRoutes'
    import Hamburger from './hamburger.svelte';

    export let displayed = false;

    let path = window.location.pathname;

</script>

<div class="mobileNavMenu" class:active={displayed}>
    <div class="navButtons">
        
        <div style="display: flex; justify-content: end; margin-bottom: 2em;">
            <Hamburger class="hamburgerAdjust" bind:displayed />
        </div>
        {#each NAVIGABLE_ROUTES.filter(item => item !== path) as route}
            <HumbleAnchor class="navButton" href={route}>
                {splitPascalCase(getRouteName(route))}
            </HumbleAnchor>
        {/each}
        {#each INCOMPLETE_ROUTES as route}
            <HumbleAnchor 
                class="navButton" 
                deadLink={true} 
                href={route}>
                {splitPascalCase(getRouteName(route))}
            </HumbleAnchor>
        {/each}

    </div>
</div>

<style lang="scss">

    .mobileNavMenu {

        --animationTime: 1s;
        --animationTimingFunction: ease;

        position: fixed;
        display: flex; // would be flex but initially is none so it doesn't get rendered
        visibility: hidden;
        flex-direction: column;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 100;
        background-color: hsla(var(--color5H), var(--color5S), var(--color5L), .95);
        transform: translate(0, -100vh);
        transition: 
            transform var(--animationTime) var(--animationTimingFunction), 
            visibility var(--animationTime) linear;
    }

    .active {
        visibility: visible;
        transform: translate(0, 0vh);
    }

    :global(.hamburgerAdjust) {
        padding: 0;
    }

    .navButtons {
        overflow-y: auto;
        overflow-x: hidden;
        margin: auto 2em;

        
        &>:global(.navButton) {
            margin: 1em 0;
        }
    }


</style>