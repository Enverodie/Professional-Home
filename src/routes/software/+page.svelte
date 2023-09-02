<script>
    
    /* This is the base component for the /Projects route. */
    
	import HeadMetadata from '$lib/components/utilities/headMetadata.svelte';
    import PageWrapper from '$lib/components/layout/grid.svelte'
	import HumbleAnchor from '$lib/components/buttons/humbleAnchor.svelte';
	import SimulationCanvas from './+pageComponents/simulationCanvas.svelte';
	import ShowcaseItem from './+pageComponents/showcaseItem.svelte';
	import ArticleBox from '$lib/components/contentboxes/articleBox.svelte';
	import PositionInWrapper from '$lib/components/utilities/positionInWrapper.svelte';
    import SectionHeader from '../../lib/components/texts/sectionHeader.svelte';
    import SallyRideCanvas from './+pageComponents/sallyRideCanvas.svelte';

    const articleBoxEdits = "margin-top: 0; padding: 0;";
    const codepenHeights = 600;

    // TODO: consider moving this to a javascript file and use it elsewhere in the app.
    function showcaseImage(src, alt, description) {
        this.src = src;
        this.alt = alt;
        this.description = description;
    }

    let sallyRideImages=[
        new showcaseImage("/images/showcase/sallyRide01.png", "Sally ride website homepage 1", "A screenshot of the sally ride homepage on tablet view"),
        new showcaseImage("/images/showcase/sallyRide02.jpg", "Sally ride website homepage 2", "A screenshot of the sally ride homepage on desktop view"),
    ]

    let simulationSandboxImages = [
        new showcaseImage("/images/showcase/simulationSandbox01.png", "Colorful field of cellular automata on black background", "Conway's Game of Life lifeforms clashing with a 1D cellular automata"),
        new showcaseImage("/images/showcase/simulationSandbox02.png", "Colorful field of cellular automata on black background", "Merge chaos in multiple dimensions"),
        new showcaseImage("/images/showcase/simulationSandbox03.png", "Pink Conway cells flowing from purple 1D automata on black background", "Watch strange emergent properties and interesting phenomena result from your experiments"),
        new showcaseImage("/images/showcase/simulationSandbox04.png", "Multiple 1D cellular automata in faint triangles flowing and merging downwards", "And see how lifeforms can clash")
    ]

</script>

<HeadMetadata 
    title="Software - Enverodie"
    description="See all of the software and web projects I have developed!"
    image={[simulationSandboxImages[0].src]}
/>

<PageWrapper>
    
    <SectionHeader rowsUsed={2}>Code projects</SectionHeader>

    <PositionInWrapper>
        <ArticleBox extraStyles={articleBoxEdits} boxesAbove={false}>
            <ShowcaseItem images={sallyRideImages}>
                <SallyRideCanvas slot="containedEffects" />
                <h2>Sally Ride Outreach Campaign Website</h2>
                <p>
                    I decided to remaster an originally static website I made sophomore year for fun. <br>
                    <br>
                    The goal: redesign and develop the original site, keeping the contents as true to the original as possible. Things I've learned in relation to usability and aesthetics over the years I kept in mind throughout.<br>
                    <br>
                    I wanted a quick project to demonstrate how far I've come in web/UI/UX design and development, and my old team's i101 semester project was perfect for that.
                </p>
                <div class="buttonsFlex">
                    <HumbleAnchor href="https://github.com/Enverodie/sally-ride-redesign" target="_blank" rel="noreferrer">
                        Source code
                        <img slot="icon" src="/svgs/github-mark/github-mark-white.svg" alt="Github" style="height: 1.5em;"/>
                    </HumbleAnchor>
                    <HumbleAnchor href="http://sallyride.enverodie.com/" target="_blank" rel="noreferrer">
                        Visit! 
                        <img slot="icon" src="/svgs/arrows/arrow-white.svg" alt="<-" aria-hidden style="transform: rotate(180deg); height: 1em;" />
                    </HumbleAnchor>
                </div>
            </ShowcaseItem>
        </ArticleBox>
    </PositionInWrapper>

    <PositionInWrapper>
        <ArticleBox extraStyles={articleBoxEdits}>
            <ShowcaseItem images={simulationSandboxImages}>
                <SimulationCanvas slot="containedEffects" />
                <h2>Simulation Sandbox</h2>
                <p>
                    Simulation Sandbox is a personal project I started over the summer of 2022. While version 1.0 is out now, it is still a work in progress.<br>
                    <br>
                    This purely <span title="HTML, CSS, & JS" style="text-decoration: underline dotted;">vanilla</span> implementation was my way of learning HTML canvas 
                    and getting more confident with my abilities in JavaScript. <a href="https://en.wikipedia.org/wiki/Cellular_automaton" target="_blank" rel="noreferrer">Cellular automata</a> has fascinated me for years, and it's been a goal of mine to build my own 
                    simulations. I also love sandbox games, so I realized that a "zero player game" can quickly become a sandbox game with the provided tools. I hope to 
                    provide that with Simulation Sandbox.<br>
                    <br>
                    Future versions plan to include bug fixes, compatibility with more browsers & platforms, the ability to create custom lifeforms, and more.
                </p>
                <div class="buttonsFlex">
                    <HumbleAnchor href="https://github.com/Enverodie/SimulationSandbox" target="_blank" rel="noreferrer">
                        Source code
                        <img slot="icon" src="/svgs/github-mark/github-mark-white.svg" alt="Github" style="height: 1.5em;"/>
                    </HumbleAnchor>
                    <HumbleAnchor href="http://simulationsandbox.enverodie.com/" target="_blank" rel="noreferrer">
                        Play! 
                        <img slot="icon" src="/svgs/arrows/arrow-white.svg" alt="<-" aria-hidden style="transform: rotate(180deg); height: 1em;" />
                    </HumbleAnchor>
                </div>
            </ShowcaseItem>
        </ArticleBox>
    </PositionInWrapper>
    
    <SectionHeader rowsUsed={1}>Codepens</SectionHeader>

    <PositionInWrapper>
        <ArticleBox boxesAbove={false}>
            <h2>BlossomOS</h2>
            <p class="codepen" data-height={codepenHeights} data-default-tab="result" data-slug-hash="mdzKMoE" data-user="enverodie" style={`height: ${codepenHeights}px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;`}>
                <span>See the Pen <a href="https://codepen.io/enverodie/pen/mdzKMoE">
                BlossomOS</a> by Enverodie (<a href="https://codepen.io/enverodie">@enverodie</a>)
                on <a href="https://codepen.io">CodePen</a>.</span>
              </p>
              <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
        </ArticleBox>

        <ArticleBox>
            <h2>Multi-Size Image Gallery</h2>
            <p style="text-align: center;">(I also implemented this in <a href="/creative">Creative</a>. Go check that out too!)</p>
            <p class="codepen" data-height={codepenHeights} data-default-tab="result" data-slug-hash="BaGWKjX" data-user="enverodie" style={`height: ${codepenHeights}px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;`}>
                <span>See the Pen <a href="https://codepen.io/enverodie/pen/BaGWKjX">
                Multi-Size Image Gallery</a> by Enverodie (<a href="https://codepen.io/enverodie">@enverodie</a>)
                on <a href="https://codepen.io">CodePen</a>.</span>
              </p>
              <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
        </ArticleBox>

        <ArticleBox>
            <h2>Bouncing Shapes</h2>
            <p style="text-align: center;">&macr;\_(ツ)_/&macr;</p>
            <p class="codepen" data-height={codepenHeights} data-default-tab="result" data-slug-hash="QWZPRVP" data-user="enverodie" style={`height: ${codepenHeights}px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;`}>
                <span>See the Pen <a href="https://codepen.io/enverodie/pen/QWZPRVP">
                Bouncing shapes</a> by Enverodie (<a href="https://codepen.io/enverodie">@enverodie</a>)
                on <a href="https://codepen.io">CodePen</a>.</span>
              </p>
              <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
        </ArticleBox>

        <ArticleBox>
            <h2>Eerie website</h2>
            <p class="codepen" data-height={codepenHeights} data-default-tab="result" data-slug-hash="dyqzzoX" data-user="enverodie" style="height: {codepenHeights}px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
                <span>See the Pen <a href="https://codepen.io/enverodie/pen/dyqzzoX">
                Eerie website</a> by Enverodie (<a href="https://codepen.io/enverodie">@enverodie</a>)
                on <a href="https://codepen.io">CodePen</a>.</span>
              </p>
              <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
        </ArticleBox>

        <ArticleBox>
            <h2>Hodophilia Mock Brand logo</h2>
            <p style="text-align: center;">In university I had a semester-long group project to develop a travel management platform. In my free time, I wanted to challenge myself to make a logo for our "brand".</p>
            <p class="codepen" data-height={codepenHeights} data-default-tab="result" data-slug-hash="wvXwPKw" data-user="enverodie" style="height: {codepenHeights}px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
                <span>See the Pen <a href="https://codepen.io/enverodie/pen/wvXwPKw">
                Hodophilia Mock Brand Splash</a> by Enverodie (<a href="https://codepen.io/enverodie">@enverodie</a>)
                on <a href="https://codepen.io">CodePen</a>.</span>
              </p>
              <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
        </ArticleBox>
    </PositionInWrapper>

</PageWrapper>

<style lang="scss">

    h2 {
        text-align: center;
    }

    /* used to set perfect spacing on buttons at the bottom of each article */
    .buttonsFlex {
        margin: 2.5em 0 1em;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        gap: 1em;
    }

    
</style>