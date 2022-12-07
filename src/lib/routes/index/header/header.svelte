<script>
    import GlitchText from '../../../components/enverodieNameGlitch.svelte';
	import CityGlitch from './../../../components/scenesGlitch/cityGlitch.svelte';

</script>

<header>
    <GlitchText fontSize="11.5vw" />
    <CityGlitch width="44vw" />
</header>

<style lang="scss">
    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 4vh 4vw;
    }
</style>