<script>
    import ShowcaseItem from "./showcaseItem.svelte";
</script>

<section class="showcase">
    <div class="showcaseItem showcase1"><div class="innerShowcaseBorder"><div class="innerShowcase">
        Showcase 1
    </div>
    </div></div>
    <div class="showcaseItem showcase2"><div class="innerShowcaseBorder"><div class="innerShowcase">
        Showcase 2
    </div>
    </div></div>
    <div class="showcaseItem showcase3">
        <div class="innerShowcaseBorder"><div class="innerShowcase">
            Showcase 3
        </div></div>
        <div class="innerShowcaseBorder"><div class="innerShowcase">
            Showcase 3
        </div></div>
    </div>
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

        @mixin centerEverything {
            background-position: center;
            background-size: cover;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
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
            
            @include centerEverything();
            
            &>.innerShowcaseBorder {
                position: relative;
                $margin: .5em;
                width: calc(100% - $margin);
                height: calc(100% - $margin);
                clip-path: inherit;
                background-color: var(--color1);

                background-image: conic-gradient(transparent 0deg, transparent 270deg, var(--color5) 280deg);
                background-color: green;
                
                @include centerEverything();
                
                &>.innerShowcase {
                    clip-path: inherit;
                    $border: 1em;
                    width: calc(100% - $border);
                    height: calc(100% - $border);
                    background-color: var(--color1);
                    color: white;
                }

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

            $moreButtonHeight: 20%;

            &:last-child>.innerShowcaseBorder {
                
                &:first-child {
                    height: calc(100% - $moreButtonHeight);
                    clip-path: polygon(
                        $topLeft,
                        $topRight,
                        100% 100%,
                        calc(($moreButtonHeight / (100% / $cropAmount)) + .5em) 100%
                    );
                }
                
                &:last-child {
                    clip-path: polygon(
                        calc(($moreButtonHeight / (100% / $cropAmount)) + .5em) 0,
                        $topRight,
                        100% 100%,
                        calc(.5em) 100%
                    );
                    height: $moreButtonHeight;
                }
            }

            &.showcase1 {
                @include positionLeft(0);
                // background-color: #f006;
                // background-image: url('https://www.travelmanagers.com.au/wp-content/uploads/2012/08/AdobeStock_254529936_Railroad-to-Denali-National-Park-Alaska_750x500.jpg')
            }

            &.showcase2 {
                @include positionLeft(1);
                // background-color: #0f0;
                // background-image: url('https://cdn.britannica.com/50/6650-050-E268AC16/coniferous-forest-spruce-trees-forests-boreal-Northern.jpg');
            }

            &.showcase3 {
                @include positionLeft(2);
                // background-color: #f006;
                // background-image: url('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/the-beautiful-cala-goloritze-in-sardinia-royalty-free-image-1149841315-1559070275.jpg');
            }

        }
    }
</style>