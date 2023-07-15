<script>
    
    /* This is the base component for the /Projects route. */
    
    import PageWrapper from '$lib/components/layout/grid.svelte'
	import HumbleAnchor from '$lib/components/buttons/humbleAnchor.svelte';
	import SimulationCanvas from './+pageComponents/simulationCanvas.svelte';
	import ShowcaseItem from './+pageComponents/showcaseItem.svelte';
	import ArticleBox from '$lib/components/contentboxes/articleBox.svelte';
	import PositionInWrapper from '$lib/components/utilities/positionInWrapper.svelte';
    import SectionHeader from '../../lib/components/texts/sectionHeader.svelte';

    const articleBoxEdits = "margin-top: 0; padding: 0;";

    // TODO: consider moving this to a javascript file and use it elsewhere in the app.
    function showcaseImage(src, alt, description) {
        this.src = src;
        this.alt = alt;
        this.description = description;
    }

    let simulationSandboxImages = [
        new showcaseImage("/images/showcase/simulationSandbox01.png", "Colorful field of cellular automata on black background", "Conway's Game of Life lifeforms clashing with a 1D cellular automata"),
        new showcaseImage("/images/showcase/simulationSandbox02.png", "Colorful field of cellular automata on black background", "Merge chaos in multiple dimensions"),
        new showcaseImage("/images/showcase/simulationSandbox03.png", "Pink Conway cells flowing from purple 1D automata on black background", "Watch strange emergent properties and interesting phenomena result from your experiments"),
        new showcaseImage("/images/showcase/simulationSandbox04.png", "Multiple 1D cellular automata in faint triangles flowing and merging downwards", "And see how lifeforms can clash")
    ]

</script>

<PageWrapper>
    
    <SectionHeader>Code projects</SectionHeader>

    <PositionInWrapper>
        <ArticleBox extraStyles={articleBoxEdits} boxesAbove={false}>
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