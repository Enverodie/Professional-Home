<script>
    import { page } from '$app/stores';
    import { NAVIGABLE_ROUTES, getRouteName, printClass, splitPascalCase } from '../../constants/navigableRoutes';
    import HumbleAnchor from "../buttons/humbleAnchor.svelte";

</script>

<div class="navElements">
    {#each NAVIGABLE_ROUTES.filter(r => !(r === '/' && $page.url.pathname === r)) as route, index}
        <HumbleAnchor 
            href="{route}"
            class="{printClass(index, 0, "navFirstChild")}"
            >
            {splitPascalCase(getRouteName(route))}
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