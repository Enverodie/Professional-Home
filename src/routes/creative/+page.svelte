<script>
    
	import HeadMetadata from '$lib/components/utilities/headMetadata.svelte';
    import PageWrapper from "$lib/components/layout/grid.svelte";
    import SectionHeader from "$lib/components/texts/sectionHeader.svelte";
	import Searchbar from '$lib/components/forms/search/searchbar.svelte';
	import PositionInWrapper from '$lib/components/utilities/positionInWrapper.svelte';
	import ArticleBox from '$lib/components/contentboxes/articleBox.svelte';
	import Showcase from '$lib/components/specialFX/showcase/showcase.svelte';
    import HumbleAnchor from "../../lib/components/buttons/humbleAnchor.svelte";
    import GlitchBox from "../../lib/components/contentboxes/glitchBox.svelte";

    export let data;

</script>

<HeadMetadata 
    title="Creative - Enverodie"
    description="Come check out all the cool, creative things I've done or want to show off!"
    image="/Art page image.jpg"
/>

<PageWrapper>
    <SectionHeader rowsUsed={2}>Creative Showcase</SectionHeader>

    <PositionInWrapper>
        <ArticleBox style="margin-top: var(--boxOutsideSize);" overflow={'true'}>
            <Searchbar results={data.streamedPage.searchResults} />
            <div class="creativePageShowcase grid">

                <div class="header artworkAndWritingHeader">
                    <SectionHeader withinGrid={false} style="margin: 0; background-image: none;" rowsUsed={1}>
                        Artwork & Writings
                    </SectionHeader>
                </div>
                <div class="artworkAndWriting">
                    {#await data.streamed.topPostsPrimary}
                        <Showcase fillBoxText='Loading...' />
                    {:then result} 
                        <Showcase images={result} rows={4} />
                    {:catch error}
                        <Showcase fillBoxText={error.message} />
                    {/await}
                </div>

                <div class="header myPickHeader">
                    <SectionHeader withinGrid={false} style="margin: 0; background-image: none;" rowsUsed={1}>
                        My Picks
                    </SectionHeader>
                </div>
                <div class="myPick">
                    {#await data.streamed.recommendedPosts}
                        <Showcase fillBoxText='Loading...' />
                    {:then result} 
                        <Showcase images={result} rows={1} cols={3} labelBoxSize={'small'} />
                    {:catch error}
                        <Showcase fillBoxText={error.message} />
                    {/await}
                </div>

                <div class="header personalAndGamingHeader">
                    <SectionHeader withinGrid={false} style="margin: 0 0; background-image: none;" rowsUsed={1}>
                        Personal & Gaming
                    </SectionHeader>
                </div>
                <div class="personalAndGaming">
                    {#await data.streamed.topPostsPersonal}
                        <Showcase fillBoxText='Loading...' />
                    {:then result} 
                        <Showcase images={result} rows={3} labelBoxSize={'medium'} />
                    {:catch error}
                        <Showcase fillBoxText={error.message} />
                    {/await}
                </div>

                <div class="more">
                    <GlitchBox>
                        <HumbleAnchor href="/creative/all" class="moreButton">More <img slot="icon" src="/svgs/arrows/arrow-white.svg" alt="<-" aria-hidden style="transform: rotate(180deg); height: 1em;" /></HumbleAnchor>
                    </GlitchBox>
                </div>

            </div>
        </ArticleBox>
    </PositionInWrapper>
    
</PageWrapper>

<style lang="scss">

    .grid {
        display: grid;
        grid-template-rows: auto repeat(8, 1fr) auto repeat(2, 1fr) auto repeat(8, 1fr);
        grid-template-areas:
                "artworkAndWritingHeader"
                "artworkAndWriting"
                "artworkAndWriting"
                "artworkAndWriting"
                "artworkAndWriting"
                "artworkAndWriting"
                "artworkAndWriting"
                "artworkAndWriting"
                "artworkAndWriting"
                "myPickHeader"
                "myPick"
                "myPick"
                "personalAndGamingHeader"
                "personalAndGaming"
                "personalAndGaming"
                "personalAndGaming"
                "personalAndGaming"
                "personalAndGaming"
                "personalAndGaming"
                "more"
                "more";
        grid-column-gap: 2em;
        grid-row-gap: 1.2em;
    }

    .header {
        align-self: end;
        &.artworkAndWritingHeader { grid-area: artworkAndWritingHeader; }
        &.myPickHeader { grid-area: myPickHeader; }
        &.personalAndGamingHeader { grid-area: personalAndGamingHeader; }
    }

    .artworkAndWriting {
        grid-area: artworkAndWriting;
    }

    .myPick {
        grid-area: myPick;
    }

    .personalAndGaming {
        grid-area: personalAndGaming;
    }

    .more {
        grid-area: more;
        :global(.moreButton) {
            width: 100%;
            height: 100%;
            margin: 0;
            // color: var(--color7);
            color: var(--color4) !important;
            background-color: transparent;
            box-sizing: border-box;
            // border: var(--boxStrokeSize) solid var(--color6);
            border: var(--boxStrokeSize) solid transparent;
            transition: background-color .1s ease-in-out, color .1s ease-in-out;
        }
        
        :global(.moreButton:hover) {
            color: var(--color1) !important;
            background-color: var(--color2);
            border: var(--boxStrokeSize) solid var(--color2);
        }

        :global(.moreButton:hover img) {
            color: var(--color1);
        }
    }


    :global(.creativePageShowcase) {
        height: 116vh !important;
        box-shadow: none !important;
        margin-top: 1.2em;
    }

    @media only screen and (min-width: 600px) {
        :global(.creativePageShowcase) {
            height: 170vh !important;
        }
    }

    @media only screen and (min-width: 800px) {
        .grid {
            grid-template-rows: repeat(10, 1fr);
            grid-template-columns: 2fr 1fr;
            grid-template-areas:
                "artworkAndWritingHeader    myPickHeader"
                "artworkAndWriting          myPick"
                "artworkAndWriting          myPick"
                "artworkAndWriting          personalAndGamingHeader"
                "artworkAndWriting          personalAndGaming"
                "artworkAndWriting          personalAndGaming"
                "artworkAndWriting          personalAndGaming"
                "artworkAndWriting          personalAndGaming"
                "artworkAndWriting          personalAndGaming"
                "artworkAndWriting          more";
        }

        :global(.creativePageShowcase) {
            height: 55vh !important;
        }
    }

    @media only screen and (min-width: 1000px) {
        :global(.creativePageShowcase) {
            height: 62vh !important;
        }
    }

    @media only screen and (min-width: 1300px) {
        :global(.creativePageShowcase) {
            height: 80vh !important;
        }
    }

</style>