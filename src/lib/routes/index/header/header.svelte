<script>
    import GlitchText from '../../../components/enverodieNameGlitch.svelte';
	import GlitchController from './../../../components/scenesGlitch/glitchController.svelte';

</script>

<header>
    <GlitchText class="headerText" />
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