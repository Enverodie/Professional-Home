<script>

export let fontSize = "64px";
export let addUrlExtension = false;

$: text = "Enverodie" + (addUrlExtension ? ".com" : "");

</script>

<h2 class="enverodie glitch" style="--font-size: {fontSize}">
    <span>{text}</span>
    <span aria-hidden="true">{text}</span>
    <span aria-hidden="true">{text}</span>
    <!-- <span aria-hidden="true">{text}</span> -->
</h2>

<style lang='scss'>

    @mixin glitchStage01 {
        // text-shadow: -.03em .03em 0 var(--color7);
        text-shadow: 0 0 0 var(--color2);
    }
    @mixin glitchStage02($intensity: 1.2) {
        $glowEmphasis: .04em;
        text-shadow: 
            calc(.015em * $intensity) calc(-.025em* $intensity)  0 var(--color7),
            calc(.015em * $intensity) calc(-.025em* $intensity)  $glowEmphasis var(--color7);
    }
    @mixin glitchStage03($intensity: 1.2) {
        $glowEmphasis: .04em;
        text-shadow: 
            calc(.024em * $intensity) calc(.013em * $intensity) 0 var(--color2),
            calc(.024em * $intensity) calc(.013em * $intensity) $glowEmphasis var(--color2);
        // text-shadow: 0 0 0 var(--color2);
    }
    @mixin glitchStage04($intensity: 1.2) {
        $glowEmphasis: .04em;
        text-shadow: 
            calc(-.014em* $intensity)  calc(-.025em* $intensity)  0 var(--color7),
            calc(-.014em* $intensity)  calc(-.025em* $intensity)  $glowEmphasis var(--color7);
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

.enverodie.glitch {
        position: relative;
        font-size: var(--font-size);
        font-weight: 400;
        padding: 1em 0 0;

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
                color: var(--color2);
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