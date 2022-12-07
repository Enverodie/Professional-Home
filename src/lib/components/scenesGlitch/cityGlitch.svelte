<div class="wireframeContainer {$$props.class}">
    <img class="layer3" src="/static/svgs/citywireframe/citywireframe layer 3.svg" alt="" aria-hidden="true" />
    <img class="layer2" src="/static/svgs/citywireframe/citywireframe layer 2.svg" alt="" aria-hidden="true" />
    <img class="layer1" src="/static/svgs/citywireframe/citywireframe layer 1.svg" alt="" aria-hidden="true" />
</div>

<style lang="scss">

    @import '../dropShadowFilter';
    @import 'glitchAnimation';
    
    .wireframeContainer {
        --glitchColor: white; // set a default, just in case

        position: relative;
        height: 100%;

        &>*{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            
            &:first-child {
                position: relative;
            }

            &.layer3 {
                --glitchColor: #F261FA;
                filter: imageDropShadow(var(--glitchColor));
                animation: glitchImg 3242ms infinite 13ms;
                z-index: 3;
            }

            &.layer2 {
                --glitchColor: #D807E3;
                filter: imageDropShadow(var(--glitchColor));
                animation: glitchImg 2278ms infinite 26ms;
                z-index: 2;
            }
            
            &.layer1 {
                --glitchColor: #68036D;
                filter: imageDropShadow(var(--glitchColor));
                animation: glitchImg 4346ms infinite 62ms;
                z-index: 1;
            }
        }
    }

</style>