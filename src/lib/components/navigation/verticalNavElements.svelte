<script>

    /* The VerticalNavElements component provides an overlay for navigating 
     * to available/unavailable routes, links given in a vertical layout for small displays.
     */

    import { page } from '$app/stores';
    import HumbleAnchor from '../buttons/humbleAnchor.svelte';
    import { getRouteName, splitPascalCase, NAVIGABLE_ROUTES, INCOMPLETE_ROUTES } from '../../constants/navigableRoutes'
    import { createBackgroundGridImage } from '../../constants/grid';

    export let displayed = false;

    const maskImage = createBackgroundGridImage('white');
    let path = $page.url.pathname;

</script>

<div class="mobileNavMenu" class:active={displayed} style="--backgroundMask: url({maskImage});">
    <div class="navButtons">
        
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

        --animationTime: .4s;
        --animationTimingFunction: ease;

        position: fixed;
        display: flex;
        visibility: hidden;
        flex-direction: column;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 9;
        background-color: hsla(var(--color5H), var(--color5S), var(--color5L), .95);
        transform: translate(0, -100vh);
        transition: 
            transform var(--animationTime) var(--animationTimingFunction), 
            visibility var(--animationTime) linear;

        &::before {
            --color: var(--color2);
            z-index: -2;
        }

        &::after {
            --offset: 3px;
            --color: var(--color5);
            --maskPosition: calc(50% + var(--offset)) calc(50% + var(--offset)); 
            z-index: 1;
            mask-position: var(--maskPosition) !important;
            -webkit-mask-position: var(--maskPosition) !important;
        }

        &.active {
            visibility: visible;
            transform: translate(0, 0vh);

            --startTimeOffset: -.3s;
            --timeSpent: 10s; // for testing
            --timeSpent: 1.8s;
            --timingFunction: cubic-bezier(.65,0,0,1.0);

            &::before, &::after {
                --loopOpacity: .4;
                opacity: 1;
                animation: 
                    deployNavigation var(--timeSpent) var(--timingFunction) var(--startTimeOffset),
                    gridAnimation var(--timeSpent) var(--timingFunction) calc(var(--startTimeOffset) + var(--timeSpent) + 1s) infinite;
            }

        }

        &::before, &::after {

            --transparencyGradientAmount: 4%;
            --visibleAmount: 5%;

            content: '';
            pointer-events: none;
            background-image: linear-gradient(180deg, 
                transparent 0%, 
                var(--color) var(--transparencyGradientAmount), 
                var(--color) calc(var(--transparencyGradientAmount) + var(--visibleAmount)), 
                transparent calc(var(--transparencyGradientAmount) + var(--visibleAmount) + var(--transparencyGradientAmount))
                );
            background-position-y: -50vh;
            background-size: 200% 200%;
            mask: var(--backgroundMask) repeat center;
            -webkit-mask: var(--backgroundMask) repeat center;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
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

    @keyframes deployNavigation {
        to {
            background-position-y: 100vh;
        }
    }

    @keyframes gridAnimation {
        from {
            opacity: var(--loopOpacity);
        }
        to {
            background-position-y: 100vh;
            opacity: var(--loopOpacity);
        }
    }

</style>