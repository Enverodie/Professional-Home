<script>

    /* The ProjectShowcaseLink component is meant to handle the unique content of a ProjectShowcase component.
     * Its entire purpose is to be nested inside exactly one ProjectShowcase component.
     */

    export let href = "#";
    export let backgroundImage = "";

    $: classList = $$props.class.split(' ');

</script>

<a class="{classList[0]}" style="--bkgImg: url({backgroundImage})" href={href} target={$$props.target}>
    <div class="{classList[1]}" style="{$$props.style}">
        <div class="textFlex">
            <img src="/svgs/arrows/arrow.svg" alt="<-" aria-hidden />
            <span>
                <slot></slot>
            </span>
        </div>
    </div>
</a>

<style lang="scss">
    @import '../../../lib/styles/centerEverything';

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
            background-color: hsla(var(--color5H), var(--color5S), var(--color5L), .4);
            z-index: 2;
        }

        /* This is where the showcase image goes */
        &::before {
            content: '';
            position: absolute;
            background-image: var(--bkgImg);
            background-position: center;
            background-size: cover;
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

        /* Contains the descriptive text (and arrow) that explain the showcased item */
        div.textFlex {
            display: flex;
            gap: .4em;
            align-items: center;
            width: min-content;
            font-size: 24px;
            padding: .4em .7em;
            background-color: hsla(var(--color5H), var(--color5S), var(--color5L), .7);
            border-radius: 8px;
            color: var(--color4);

            &>span {
                display: inline-block;
            }

            & * {
                color: inherit;
            }

            img {
                height: .8em;
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