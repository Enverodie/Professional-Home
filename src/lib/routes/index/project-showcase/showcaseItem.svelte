<script>

    export let href = "#";
    export let item;
    export let backgroundImage = "";

    $: display = (item === 4) ? "Show more" : "Showcase " + item;

</script>

<a class="{$$props.class}" style="{$$props.style}; --bkgImg: url({backgroundImage})" href={href}>
    <div>
        <p>
            <i class="fa-solid fa-arrow-left"></i>
            {display} 
            <!-- <FontAwesomeIcon icon="fa-solid fa-arrow-right" /> -->
        </p>
    </div>
</a>

<style lang="scss">
    @import '_centerEverything.scss';

    a {
        $margin: 1.5em;
        width: calc(100% - $margin);
        height: calc(100% - $margin);
        position: relative;
        color: var(--color7);
        text-decoration: none;
        
        &>div {
            @include centerEverything();

            width: 100%;
            height: 100%;
            background-color: rgba(#15024F, .4);
            z-index: 2;
        }

        &::before {
            content: '';
            position: absolute;
            background-image: var(--bkgImg);
            background-position: center;
            background-size: 100%;
            z-index: 1;
            width: 100%;
            height: 100%;

            transition: background-size .2s ease-out;
        }

        &:hover, &:focus {
            &::before {
                background-size: 175%;
            }
        }

        &:visited {
            color: var(--color7);
        }

        @include centerEverything();

        p {
            font-size: 28px;
            padding: .4em .7em;
            // background-color: var(--color7);
            background-color: rgba(#15024F, .7);
            border-radius: 8px;
            color: var(--color4);

            color: var(--color3);
        }
    }
</style>