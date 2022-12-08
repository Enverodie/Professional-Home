<script>
	import HumbleAnchor from './buttons/humbleAnchor.svelte';

    const NAVIGABLE_ROUTES = ['/', '/Projects'];
    const INCOMPLETE_ROUTES = ['/Hire', '/Writings', '/CreatedGraphics', '/Blog', '/MinecraftBuilds', '/ContactMe']
    let path = window.location.pathname;

    function getRouteName(route) {
        return route.slice(1) || "Home";
    }

    function printClass(index, target, cssClass) {
        console.log(index, target, cssClass);
        if (index === target) {
            return cssClass;
        }
        else return "";
    }

    // Solution provided by Teneff on StackOverflow:
    // https://stackoverflow.com/a/7888303/15818885
    function splitPascalCase(string) {
        return string.split(/(?=[A-Z])/).join(' ');
    }
</script>

<nav>
    <div class="icon">{getRouteName(path)}</div>
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
</nav>

<style lang="scss">
    
    nav {
        position: sticky;
        top: 0;
        z-index: 10;
        margin: 0;
        background-color: var(--color5);
        padding: .5em 1em;
        // margin-bottom: 2em;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        &>.navElements {
            display: flex;
            row-gap: .75em;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding: 0.15em 0.5em;

            &>:global(.navFirstChild) {
                margin-left: 0;
            }

            &>:global(.navLastChild) {
                margin-right: 0;
            }
        }
    }

    .icon {
        font-weight: 700;
        font-size: 2em;
        margin-right: 1em;
    }

</style>