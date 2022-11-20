<script>

</script>

<section class="showcase">
    <div class="showcaseItem showcase1"><div class="innerShowcase">
        Showcase 1
    </div></div>
    <div class="showcaseItem showcase2"><div class="innerShowcase">
        Showcase 2
    </div></div>
    <div class="showcaseItem showcase3"><div class="innerShowcase">
        Showcase 3
    </div></div>
</section>

<style lang="scss">
    section.showcase {
        width: 100%;
        height: 40vh;
        position: relative;
        overflow: hidden;

        --divisions: 3;
        $cropAmount: 20px;

        $endcapWidth: calc(100% / var(--divisions));
        $defaultWidth: calc((100% / var(--divisions)) + ($cropAmount * 4));
        
        @mixin calcWidth($endcap) {
            @if $endcap {
                width: $endcapWidth;
            }
            @else {
                width: $defaultWidth;
            }
        }

        @mixin positionLeft($index) {
            @if $index > 0 {
                left: calc(
                    0% 
                    + $endcapWidth 
                    + (($index - 1) * $defaultWidth)
                    - ($index * ($cropAmount * 2))
                    );
                }
            @else {
                left: 0%;     
            }
        }

        $topLeft: (2 * $cropAmount) 0;
        $topRight: 100% 0;
        $bottomRight: calc(100% - (2 * $cropAmount)) 100%;
        $bottomLeft: 0% 100%;

        // intermediate
        &>.showcaseItem {
            @include calcWidth(false);
            clip-path: polygon($topLeft, $topRight, $bottomRight, $bottomLeft);
            position: absolute;
            top: 0;
            height: 100%;
            z-index: 3;

            background-position: center;
            background-size: cover;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &>.innerShowcase {
                position: relative;
                $borderRadius: 1em;
                width: calc(100% - $borderRadius);
                height: calc(100% - $borderRadius);
                clip-path: inherit;
                background-color: #00f6;
                color: white;
                background-position: center;
                background-size: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            
            &:hover {
                background-size: 400%;
            }

            // First, last
            &:first-child, 
            &:last-child { 
                @include calcWidth(true);
                z-index: 2;
                
                &:first-child {
                    clip-path: polygon(
                        0 0,
                        $topRight,
                        $bottomRight,
                        0% 100%
                        );
                }
    
                &:last-child {
                    clip-path: polygon(
                        $topLeft,
                        $topRight,
                        100% 100%,
                        $bottomLeft
                        );
                }
            }

            &.showcase1 {
                @include positionLeft(0);
                // background-color: #f006;
                background-image: url('https://www.travelmanagers.com.au/wp-content/uploads/2012/08/AdobeStock_254529936_Railroad-to-Denali-National-Park-Alaska_750x500.jpg')
            }

            &.showcase2 {
                @include positionLeft(1);
                // background-color: #0f0;
                background-image: url('https://cdn.britannica.com/50/6650-050-E268AC16/coniferous-forest-spruce-trees-forests-boreal-Northern.jpg');
            }

            &.showcase3 {
                @include positionLeft(2);
                // background-color: #f006;
                background-image: url('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/the-beautiful-cala-goloritze-in-sardinia-royalty-free-image-1149841315-1559070275.jpg');
            }

        }
    }
</style>