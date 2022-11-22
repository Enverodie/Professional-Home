<script>

    export let href = "#";
    export let backgroundImage = "";

    // $: display = (item === 4) ? "Show more" : "Showcase " + item;

    $: classList = $$props.class.split(' ');

</script>

<a class="{classList[0]}" style="--bkgImg: url({backgroundImage})" href={href}>
    <div class="{classList[1]}" style="{$$props.style}">
        <div class="textFlex">
            <i class="fa-solid fa-arrow-left"></i>
            <!-- {display}  -->
            <span>
                <slot></slot>
            </span>
            <!-- <FontAwesomeIcon icon="fa-solid fa-arrow-right" /> -->
        </div>
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

            // padding-right: calc(100% - (2 * 10px));
        }

        &::before {
            content: '';
            position: absolute;
            background-image: var(--bkgImg);
            background-position: center;
            background-size: cover;
            // background-size: 100%;
            z-index: 1;
            width: 100%;
            height: 100%;

            transition: transform .2s ease-out;
        }

        &:hover, &:focus {
            &::before {
                // background-size: 175%;
                transform: scale(1.75);
            }

            .textFlex {
                box-shadow: 
                    var(--color2) 0 0 10px,
                    var(--color2) 0 0 10px;
            }
        }

        &:visited {
            color: var(--color7);
        }

        @include centerEverything();

        div.textFlex {
            display: flex;
            gap: .4em;
            align-items: center;
            width: min-content;
            font-size: 24px;
            padding: .4em .7em;
            // background-color: var(--color7);
            background-color: rgba(#15024F, .7);
            border-radius: 8px;
            color: var(--color4);

            &>span {
                display: inline-block;
            }

            & * {
                color: inherit;
            }
        }
    }

    @media only screen and (min-width: 900px) {
        a div.textFlex {
            font-size: 16px;
        }
    }

    @media only screen and (min-width: 950px) {
        a div.textFlex {
            font-size: 22px;
        }
    }

    @media only screen and (min-width: 1100px) {
        a div.textFlex {
            font-size: 25px;
        }
    }

    @media only screen and (min-width: 1300px) {
        a div.textFlex {
            font-size: 32px;
        }
    }
</style>