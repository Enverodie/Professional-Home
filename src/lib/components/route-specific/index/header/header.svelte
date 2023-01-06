<script>

    /* This Header component is only meant to be featured on the Index page.
     * Contains all the pretty, fancy splash stuff.
     */

    import GlitchText from '$lib/components/nameGlitch.svelte';
	import GlitchController from '$lib/components/scenesGlitch/glitchController.svelte';

</script>

<header>
    <GlitchText class="headerText">Enverodie.</GlitchText>
    <GlitchController class="headerGraphic" />
</header>

<style lang="scss">

    header {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 1vh 4vw 0;

        &>:global(.headerText) {
            font-size: 20vw;
        }
        
        &>:global(.headerGraphic) {
            width: 100%;
        }
    }
    
    @media only screen and (min-width: 700px) {
        header {
            padding: 4vh 4vw;
            flex-direction: row;

            &>:global(.headerText) {
                font-size: 11.5vw;
            }
            
            &>:global(.headerGraphic) {
                width: 44vw;
            }
        }
    }

</style>