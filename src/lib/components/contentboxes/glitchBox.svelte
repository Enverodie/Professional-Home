<script>
    export let scrollable = false;
    export let zIndex = 1;
</script>
<div class="glitch" style={`z-index: ${zIndex};`}>
    <div class="glitchContents" style={$$props.style + (scrollable? '; overflow: auto;' : '')}>
        <slot />
    </div>
</div>
<style lang="scss">
    .glitch {
        flex: 1;
        position: relative;
        border: var(--boxStrokeSize) solid var(--color2);
        // padding: 1em;
        height: 100%;
        box-sizing: border-box;

        &::before, &::after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            outline-style: solid;
            outline-width: var(--boxStrokeSize);
            z-index: -1;
        }
        &::before {
            outline-color: hsla(var(--color6H), var(--color6S), var(--color6L), .4);
            outline-offset: 2px;
            animation: borderGlitch 1.9s infinite -.2s;
        }
        &::after {
            // outline-color: hsla(var(--color5H), var(--color5S), var(--color5L), .5);
            outline-color: hsla(var(--color6H), var(--color6S), var(--color6L), .7);
            outline-offset: -1px;
            animation: borderGlitch 1.6s infinite -.53s reverse;
        }
    }

    .glitchContents {
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 100%;
        // padding: 0 2ch 0 1ch;
        box-sizing: border-box;
    }

    @keyframes borderGlitch {
        0% {
            top: 1px;
            left: -2px;
        }
        16% {
            top: 1px;
            left: -2px;
        }
        17% {
            top: -1px;
            left: 1px;
        }
        35% {
            top: -1px;
            left: 1px;
        }
        36% {
            top: -2px;
            left: -2px;
        }
        43% {
            top: -2px;
            left: -2px;
        }
        44% {
            top: 0px;
            left: 1px;
        }
        53% {
            top: 0px;
            left: 1px;
        }
        62% {
            top: 0px;
            left: 1px;
        }
        63% {
            top: 1px;
            left: -2px;
        }
        67% {
            top: 1px;
            left: -2px;
        }
        68% {
            top: -1px;
            left: -3px;
        }
        79% {
            top: -1px;
            left: -3px;
        }
        80% {
            top: 2px;
            left: 1px;
        }
        89% {
            top: 2px;
            left: 1px;
        }
        90% {
            top: -3px;
            left: 2px;
        }
        100% {
            top: -3px;
            left: 2px;
        }
    }

</style>