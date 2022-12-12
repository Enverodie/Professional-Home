<script>

    /* The Navbar component is a universal component that provides site navigation at the top of the page.
     * It displays the icon to go to the homepage, as well as buttons for every available (and some not-yet-available)
     * routes to navigate to.
     */

	import EnverodieIcon from './buttons/enverodieIcon.svelte';
	import HumbleAnchor from './buttons/humbleAnchor.svelte';

    const NAVIGABLE_ROUTES = ['/', '/Projects'];
    const INCOMPLETE_ROUTES = ['/Hire', '/Writings', '/CreatedGraphics', '/Blog', '/MinecraftBuilds', '/ContactMe']
    let path = window.location.pathname;

    // Gets the name of a route string of the format provided in NAVIGABLE_ROUTES
    function getRouteName(route) {
        return route.slice(1) || "Home";
    }

    // A helper function to decide whether or not the provided cssClass should be applied
    function printClass(index, target, cssClass) {
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
    <div class="icon">
        <EnverodieIcon />
        <span>{getRouteName(path)}</span>
    </div>
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
            padding: 0.5em 0.5em;

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
        display: flex;
        align-items: center;
        gap: 1em;
    }

    @media only screen and (max-width: 900px) {
        
        .navElements {
            font-size: 16px;
        }
    }

    @media only screen and (max-width: 400px) {
        .icon {
            font-size: 18px;
        }
        
        nav>.navElements {
            font-size: 10px;
        }
    }

</style>