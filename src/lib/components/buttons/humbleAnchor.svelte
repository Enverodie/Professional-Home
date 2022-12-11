<script>
    export let deadLink = false;

</script>

<a 
    href={$$props.href}
    target={$$props.target}
    class="{deadLink ? "deadLink" : ""} {$$props.class}"
    >
    <slot></slot>
    {#if $$slots.icon}
        <span class="noUnderline">
            <slot name="icon" />
        </span>
    {/if}
</a>

<style lang="scss">
a {
    
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    // this is what I have to do to get text to align vertically. smh.

    --color: var(--color1);
    background-color: var(--color2);
    color: var(--color);
    padding: .5em 2em;
    margin: 0em .75em;
    font-weight: 900;
    gap: .5em;

    &>.noUnderline {
        text-decoration: none !important;
    }

    
    &:visited {
        color: var(--color);
    }

    &:hover, &:focus {
        /*
        text-shadow: 
            1px 1px 1px var(--color7),
            1px -1px 1px var(--color7),
            -1px 1px 1px var(--color7),
            -1px -1px 1px var(--color7);
        */
    }

    &.deadLink {
        background-color: transparent;
        border: 4px double var(--colorAlert);
        color: var(--color4);

        &:visited {
            background-color: var(--colorAlert);
        }
    }
}
</style>