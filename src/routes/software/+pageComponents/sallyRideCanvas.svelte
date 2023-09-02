<script>
    
    let shuttles = [
        'M1 35.4203C335.026 79.9614 428.719 -35.4203 701 14.0927',
        'M1 52.1267C407.898 -49.0905 701 30.799 701 30.799',
        'M1 34.7189C407.898 -66.4982 217.909 100.109 701 13.3912',
        'M1 22.4734C1 22.4734 517.207 88.3585 701 1.14575',
    ];

</script>

<div class="canvas">
    {#each shuttles as shuttle, index}
        <div class="rotatorContainer">
            <div class="rotator" style={`--animation-delay: -${Math.ceil(Math.random() * 74 * index)}s; --animation-speed: ${Math.ceil(Math.random() * 25) + 10}s`}>
                <img class="shuttle" class:hidden={false} style={`--path: path("${shuttle}");`} src="/svgs/shuttle.svg" alt="" aria-hidden="true"/>
            </div>
        </div>
    {/each}
</div>

<style lang="scss">

    .canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
        opacity: .5;
        pointer-events: none;
    }

    .rotatorContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        
        .rotator {
            --animation-delay: -2s;
            --animation-speed: 20s;
            margin: auto;
            width: 100%;
            height: 50%;
            transform-origin: center center;
            animation: rotate infinite var(--animation-speed) linear var(--animation-delay);
        }
    }


    img.shuttle {
        width: 3vw;
        min-width: 35px;
        offset-path: var(--path);
        animation: move 8000ms linear infinite;
    }

    .hidden {
        display: none;
    }

    @keyframes rotate {
        0% {}
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes move {
        0% {
            offset-distance: 0%;
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            offset-distance: 100%;
            opacity: 0;
        }
    }

</style>