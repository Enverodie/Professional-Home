<div class="wireframeContainer {$$props.class}">
    <img class="layer3" src="/static/svgs/citywireframe/citywireframe layer 3.svg" alt="" aria-hidden />
    <img class="layer2" src="/static/svgs/citywireframe/citywireframe layer 2.svg" alt="" aria-hidden />
    <img class="layer1" src="/static/svgs/citywireframe/citywireframe layer 1.svg" alt="" aria-hidden />
</div>

<style lang="scss">

    @import '../dropShadowFilter';

    .wireframeContainer {
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
                @include imageDropShadow(#F261FA);
                z-index: 3;
            }

            &.layer2 {
                @include imageDropShadow(#D807E3);
                z-index: 2;
            }
            
            &.layer1 {
                @include imageDropShadow(#68036D);
                z-index: 1;
            }
        }
    }

</style>