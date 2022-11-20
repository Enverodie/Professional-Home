<script>
    import ShowcaseItem from "./showcaseItem.svelte";
</script>

<section class="showcase">
    <div class="showcaseColumn showcase1">
        <div class="innerShowcaseBorder">
            <div class="innerShowcase">
                <ShowcaseItem class="innerShowcase1" href="#" item={1} backgroundImage='/static/images/showcase1_thumbnail.png' />
            </div>
        </div>
    </div>
    <div class="showcaseColumn showcase2">
        <div class="innerShowcaseBorder">
            <div class="innerShowcase">
                <ShowcaseItem class="innerShowcase2" href="#" item={2} backgroundImage='/static/images/showcase3_thumbnail.png' />
            </div>
        </div>
    </div>
    <div class="showcaseColumn showcase3">
        <div class="showcase3OuterBox">

            <div class="innerShowcaseBorder">
                <div class="innerShowcase">
                    <ShowcaseItem class="innerShowcase3" href="#" item={3} backgroundImage='/static/images/showcase2_thumbnail.png' />
                </div>
            </div>
            <div class="innerShowcaseBorder">
                <div class="innerShowcase">
                    <ShowcaseItem class="innerShowcase4" href="#" item={4} />
                </div>
            </div>

        </div>
    </div>
</section>

<style lang="scss">
    @import '_centerEverything.scss';

    @mixin setBorderBackground($color, $startAngle, $color2) {
        $frontFalloff: 1deg;
        $color2Position: 70deg;
        $startAngle: (($startAngle % (180deg - $frontFalloff)) + (180deg - $frontFalloff));
        background-image: conic-gradient(
            transparent 0deg,
            $color2 $color2Position,
            transparent ($color2Position + $frontFalloff),
            transparent calc($startAngle - 50deg), 
            $color $startAngle, 
            transparent calc($startAngle + 1deg)
            
        );
    }

    @keyframes borderCycle {
        100% {
            transform: rotate(360deg);
        }
    }

    $cropAmount: 30px;

    $topLeft: (2 * $cropAmount) 0;
    $topRight: 100% 0;
    $bottomRight: calc(100% - (2 * $cropAmount)) 100%;
    $bottomLeft: 0% 100%;

    section.showcase { // root element
        width: 100%;
        height: 60vh;
        position: relative;
        overflow: hidden;

        --divisions: 3;

        $moreButtonHeight: 20%;

        $endcapWidth: calc(100% / var(--divisions));
        $defaultWidth: calc((100% / var(--divisions)) + ($cropAmount * 4));

        @mixin calcWidth($endcap) {
            @if $endcap { width: $endcapWidth; }
            @else { width: $defaultWidth; }
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

        // all the columns / direct children of the root element minus overlays
        &>.showcaseColumn {
            @include calcWidth(false);
            clip-path: polygon($topLeft, $topRight, $bottomRight, $bottomLeft);
            position: absolute;
            top: 0;
            height: 100%;
            z-index: 3;
            
            @include centerEverything();
            $margin: 10px; // controls how much space is present between each (actually displayed!) element
            $border: .5em; // the thickness of the borders
            
            & .innerShowcaseBorder {
                position: relative;
                width: calc(100% - $margin);
                height: calc(100% - $margin);
                clip-path: inherit;
                background-color: var(--color1);
                overflow: hidden;

                // background-image: conic-gradient(transparent 0deg, transparent 270deg, var(--color5) 280deg);
                &:before {
                    content: '';
                    position: absolute;
                    $backgroundSize: max(100vw, 100vh);
                    width: $backgroundSize;
                    height: $backgroundSize;
                    clip-path: none;
                    @include setBorderBackground(var(--color5), 180deg, var(--color2));
                    
                    animation: borderCycle 3s ease infinite;
                }
                
                @include centerEverything();
                
                &>.innerShowcase {
                    @include centerEverything();
                    clip-path: inherit;
                    width: calc(100% - $border);
                    height: calc(100% - $border);
                    background-color: var(--color1);
                    color: white;
                    overflow: hidden;


                    /* Change all these when the clip path for the corresponding elements change */

                    & :global(.innerShowcase1) {
                        clip-path: polygon(0 0, $topRight, $bottomRight, 0% 100%);
                    }
                    
                    & :global(.innerShowcase2) {
                        clip-path: polygon($topLeft, $topRight, $bottomRight, $bottomLeft);
                    }
                    
                    & :global(.innerShowcase3) {
                        clip-path: polygon($topLeft, $topRight, 100% 100%, calc(($moreButtonHeight / (100% / $cropAmount)) + $border - $margin) 100%);
                    }
                    
                    & :global(.innerShowcase4) {
                        clip-path: polygon(calc(($moreButtonHeight / (100% / $cropAmount)) + $border - $margin) 0, $topRight, 100% 100%, calc($border - $margin) 100%);
                    }
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

            &>.showcase3OuterBox {

                @include centerEverything();
                width: calc(100% - $margin);
                height: calc(100% - $margin);
                justify-content: space-between;
                
                &>.innerShowcaseBorder:first-child {

                    height: calc(100% - $moreButtonHeight - $margin);
                    width: calc(100% - $margin); 

                    clip-path: polygon(
                        $topLeft,
                        $topRight,
                        100% 100%,
                        calc(($moreButtonHeight / (100% / $cropAmount)) + $border - $margin) 100%
                    );
                }
                
                &>.innerShowcaseBorder:last-child {
                    height: calc($moreButtonHeight - $margin);
                    width: calc(100% - $margin);

                    clip-path: polygon(
                        calc(($moreButtonHeight / (100% / $cropAmount)) + $border - $margin) 0,
                        $topRight,
                        100% 100%,
                        calc($border - $margin) 100%
                    );
                }
            }

            &.showcase1 {
                @include positionLeft(0);
                // background-color: #f006;
                // background-image: url('https://www.travelmanagers.com.au/wp-content/uploads/2012/08/AdobeStock_254529936_Railroad-to-Denali-National-Park-Alaska_750x500.jpg')
                &>.innerShowcaseBorder:before {
                    @include setBorderBackground(var(--color5), 80deg, var(--color2));
                    animation: borderCycle 3s ease infinite .1s;
                }
                
            }
            
            &.showcase2 {
                @include positionLeft(1);
                // background-color: #0f0;
                // background-image: url('https://cdn.britannica.com/50/6650-050-E268AC16/coniferous-forest-spruce-trees-forests-boreal-Northern.jpg');
                &>.innerShowcaseBorder:before {
                    @include setBorderBackground(var(--color5), 600deg, var(--color2));
                    animation: borderCycle 3s ease infinite .3s;
                }
                
            }
            
            &.showcase3 {
                @include positionLeft(2);
                // background-color: #f006;
                // background-image: url('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/the-beautiful-cala-goloritze-in-sardinia-royalty-free-image-1149841315-1559070275.jpg');
                .innerShowcaseBorder:nth-child(1):before {
                    @include setBorderBackground(var(--color5), 120deg, var(--color2));
                    animation: borderCycle 3s ease infinite .5s;
                }
                
                .innerShowcaseBorder:nth-child(2):before {
                    @include setBorderBackground(var(--color3), 180deg, var(--color5));
                    animation: borderCycle 2s ease infinite .7s;
                }
                
            }

        }
    }
</style>