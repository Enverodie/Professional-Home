<script>
    import { NAVIGABLE_ROUTES, INCOMPLETE_ROUTES, getRouteName, printClass, splitPascalCase } from '../../constants/navigableRoutes'
    import HumbleAnchor from "../buttons/humbleAnchor.svelte";

    let path = window.location.pathname;
</script>

<div class="navElements">
    {#each NAVIGABLE_ROUTES.filter(r => r !== path) as route, index}
        <HumbleAnchor 
            href="{route}"
            class="{printClass(index, 0, "navFirstChild")}"
            >
            {splitPascalCase(getRouteName(route))}
        </HumbleAnchor>
    {/each}
    {#each INCOMPLETE_ROUTES as iroute, index}
        <HumbleAnchor 
            href="{iroute}"
            deadLink={true}
            class="{printClass(index, INCOMPLETE_ROUTES.length-1, "navLastChild")}"
            >
            {splitPascalCase(getRouteName(iroute))}
        </HumbleAnchor>
    {/each}
</div>

<style lang="scss">
    .navElements {
        display: flex;
        row-gap: .75em;
        flex-wrap: nowrap;
        overflow-x: auto;
        padding: 0.5em 0.5em;

        &>:global(.navFirstChild) {
            margin-left: 0;
        }

        &>:global(.navLastChild) {
            margin-right: 0;
        }
    }

    @media only screen and (max-width: 900px) {
        
        .navElements {
            font-size: 16px;
        }
    }

    @media only screen and (max-width: 400px) {
        .navElements {
            font-size: 10px;
        }
    }

</style>