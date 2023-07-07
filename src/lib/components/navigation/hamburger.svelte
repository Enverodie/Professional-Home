<script>
    import AnimatedHamburger from "../specialFX/animatedHamburger/animatedHamburger.svelte";


    export let displayed;

    const animationDuration = 0.1; // in seconds
    $: animating = false;

    function clickHamburger() {
        displayed = !displayed;
        animating = true;
        setTimeout(() => {animating = false}, animationDuration*1000);
    }

</script>

<button 
    class={($$props.class || '') + " button"}
    on:click={clickHamburger}>
    <div class="innerIcon">
        <AnimatedHamburger class="icon" style={"--animatingClassAnimationDuration: " + animationDuration + 's;'} {animating} />    
    </div>
</button>

<style lang="scss">

    .button {
        
        box-sizing: border-box;
        color: var(--color4);
        background: none;
        border: none;
        font-size: 2em;
        margin: 0;
        cursor: pointer;
        transition: transform 150ms ease;

        &:focus .innerIcon :global(.icon) {
            transition: filter 150ms ease;
            filter: drop-shadow(.1em .05em .05em var(--color2))
        }
        
        &>.innerIcon {
            display: flex;
            justify-content: center;
            align-items: center;

            :global(.icon) {
                height: 1.2em;
                width: 100%;
            }
            
        }
    }

</style>