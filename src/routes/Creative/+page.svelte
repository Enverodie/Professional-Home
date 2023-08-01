<script>
    
    import PageWrapper from "$lib/components/layout/grid.svelte";
    import SectionHeader from "$lib/components/texts/sectionHeader.svelte";
	import Searchbar from '$lib/components/forms/search/searchbar.svelte';
	import PositionInWrapper from '$lib/components/utilities/positionInWrapper.svelte';
	import ArticleBox from '$lib/components/contentboxes/articleBox.svelte';
	import Showcase from '$lib/components/specialFX/showcase/showcase.svelte';

    export let data;

</script>

<PageWrapper>
    <SectionHeader rowsUsed={2}>Creative Showcase</SectionHeader>

    <PositionInWrapper>
        <ArticleBox style="margin-top: var(--boxOutsideSize);">
            <Searchbar results={data.streamedPage.searchResults} />
            <div class="creativePageShowcase grid">

                <div class="artworkAndWritingHeader">
                    <SectionHeader withinGrid={false} style="margin: 0; background-image: none;" rowsUsed={1}>
                        Artwork & Writings
                    </SectionHeader>
                </div>
                <div class="artworkAndWriting">
                    {#await data.streamed.topPostsPrimary}
                        <Showcase fillBoxText='Loading...' />
                    {:then result} 
                        <Showcase images={result} />
                    {:catch error}
                        <Showcase fillBoxText={error.message} />
                    {/await}
                </div>

                <div class="myPickHeader">
                    <SectionHeader withinGrid={false} style="margin: 0; background-image: none;" rowsUsed={1}>
                        My Picks
                    </SectionHeader>
                </div>
                <div class="myPick">
                    {#await data.streamed.topPostsPersonal}
                        <Showcase fillBoxText='Loading...' />
                    {:then result} 
                        <Showcase images={result} />
                    {:catch error}
                        <Showcase fillBoxText={error.message} />
                    {/await}
                </div>

                <div class="personalAndGamingHeader">
                    <SectionHeader withinGrid={false} style="margin: 0 0; background-image: none;" rowsUsed={1}>
                        Personal & Gaming
                    </SectionHeader>
                </div>
                <div class="personalAndGaming">
                    {#await data.streamed.topPostsPersonal}
                        <Showcase fillBoxText='Loading...' />
                    {:then result} 
                        <Showcase images={result} />
                    {:catch error}
                        <Showcase fillBoxText={error.message} />
                    {/await}
                </div>

                <div class="more">

                </div>

            </div>
        </ArticleBox>
    </PositionInWrapper>
    
</PageWrapper>

<style lang="scss">

    .grid {
        display: grid;
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
                "artworkAndWriting"
                "myPickHeader"
                "myPick"
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

    .artworkAndWritingHeader { grid-area: artworkAndWritingHeader; }
    .myPickHeader { grid-area: myPickHeader; }
    .personalAndGamingHeader { grid-area: personalAndGamingHeader; }

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
            height: 90vh !important;
        }
    }

</style>