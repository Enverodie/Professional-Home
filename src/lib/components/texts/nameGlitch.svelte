<script>

    /* The NameGlitch component creates a fancy styled H2 with a glitch effect.
     *
     * Note: The NameGlitch component is heavily inspired by Kevin Powell's youtube tutorial on Glitch text.
     * https://www.youtube.com/watch?v=7Xyg8Ja7dyY
     */

    export let mainColor = "var(--color2)";
    export let altColor = "var(--color7)";

</script>

<h1 
    class="{$$props.class} glitch" 
    style={
            ($$props.style || '') + 
            ` --mainColor: ${mainColor};` + 
            ` --altColor: ${altColor};`
    }>
    <span><slot></slot></span>
    <span aria-hidden="true"><slot></slot></span>
    <span aria-hidden="true"><slot></slot></span>
</h1>

<style lang='scss'>

    @mixin glitchStage01 {
        // text-shadow: -.03em .03em 0 var(--altColor);
        text-shadow: 0 0 0 var(--mainColor);
    }
    @mixin glitchStage02($intensity: 1.2) {
        $glowEmphasis: .04em;
        text-shadow: 
            calc(.015em * $intensity) calc(-.025em* $intensity)  0 var(--altColor),
            calc(.015em * $intensity) calc(-.025em* $intensity)  $glowEmphasis var(--altColor);
    }
    @mixin glitchStage03($intensity: 1.2) {
        $glowEmphasis: .04em;
        text-shadow: 
            calc(.024em * $intensity) calc(.013em * $intensity) 0 var(--mainColor),
            calc(.024em * $intensity) calc(.013em * $intensity) $glowEmphasis var(--mainColor);
        // text-shadow: 0 0 0 var(--mainColor);
    }
    @mixin glitchStage04($intensity: 1.2) {
        $glowEmphasis: .04em;
        text-shadow: 
            calc(-.014em* $intensity)  calc(-.025em* $intensity)  0 var(--altColor),
            calc(-.014em* $intensity)  calc(-.025em* $intensity)  $glowEmphasis var(--altColor);
    }

    $glitchIntensity: 1.1;
    @keyframes glitch {
        0% { @include glitchStage01(); }
        17% { @include glitchStage01(); }
        18% { @include glitchStage02($glitchIntensity); }
        54% { @include glitchStage02($glitchIntensity); }
        55% { @include glitchStage03($glitchIntensity); }
        78% { @include glitchStage03($glitchIntensity); }
        79% { @include glitchStage04($glitchIntensity); }
        100% { @include glitchStage04($glitchIntensity); }
    }

.glitch {
        position: relative;
        font-weight: 400;
        font-family: 'Fresca', sans-serif;
        margin: 0;

        &>* {
            position: absolute;
            top: 0;
            left: 0;
            -webkit-user-select: none; /* Safari */
            -ms-user-select: none; /* IE 10 and IE 11 */
            user-select: none; /* Standard syntax */
            opacity: 70%;

            $text-shadow-1: 0 0 .04em;
            $text-shadow-2: 0 0 .15em;
            
            &:nth-child(1) {
                position: relative;
                color: var(--mainColor);
                z-index: 3;
                text-shadow: $text-shadow-1, $text-shadow-2;
                -webkit-user-select: auto;
                -ms-user-select: auto;
                user-select: auto;
                opacity: 100%;
            }
            
            &:nth-child(2) {
                z-index: 2;
                clip-path: polygon(0 0, 0 53%, 100% 62%, 100% 0%);
                animation: glitch 636ms infinite;
                
            }
            
            &:nth-child(3) {
                z-index: 1;
                clip-path: polygon(0 100%, 0 53%, 100% 62%, 100% 100%);
                animation: glitch 828ms infinite;
            }
            
            &:nth-child(4) {
                z-index: 0;
                text-shadow: $text-shadow-2;
            }
        }

    }

</style>