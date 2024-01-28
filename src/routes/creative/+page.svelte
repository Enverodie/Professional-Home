<script>
    
	import HeadMetadata from '$lib/components/utilities/headMetadata.svelte';
    import PageWrapper from "$lib/components/layout/grid.svelte";
    import SectionHeader from "$lib/components/texts/sectionHeader.svelte";
	import Searchbar from '$lib/components/forms/search/searchbar.svelte';
	import PositionInWrapper from '$lib/components/utilities/positionInWrapper.svelte';
	import ArticleBox from '$lib/components/contentboxes/articleBox.svelte';
	import Showcase from '$lib/components/specialFX/showcase/showcase.svelte';
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
        <ArticleBox style="margin-top: var(--boxOutsideSize);">
            <Searchbar results={data.streamedPage.searchResults} />
            <div class="creativePageShowcase">

                <div class="main">
                    <div class="mainFeature">
                        <SectionHeader withinGrid={false} style="margin: 0; background-image: none;" rowsUsed={1}>
                            All
                        </SectionHeader>
                        <div>
                            {#await data.streamed.topPostsPrimary}
                                <Showcase fillBoxText='Loading...' />
                            {:then result} 
                                <Showcase images={result} rows={4} />
                            {:catch error}
                                <Showcase fillBoxText={error.message} />
                            {/await}
                        </div>
                    </div>
                </div>

                <div class="side">

                    <div class="myPick">
                        <SectionHeader withinGrid={false} style="margin: 0; background-image: none;" rowsUsed={1}>
                            My Picks
                        </SectionHeader>
                        <div>
                            {#await data.streamed.recommendedPosts}
                                <Showcase fillBoxText='Loading...' />
                            {:then result} 
                                <Showcase images={result} rows={1} cols={3} labelBoxSize={'small'} />
                            {:catch error}
                                <Showcase fillBoxText={error.message} />
                            {/await}
                        </div>
                    </div>

                    <div class="personalAndGaming">
                        <SectionHeader withinGrid={false} style="margin: 0 0; background-image: none;" rowsUsed={1}>
                            Hottest
                        </SectionHeader>
                        <div>
                            {#await data.streamed.topPostsPersonal}
                                <Showcase fillBoxText='Loading...' />
                            {:then result} 
                                <Showcase images={result} rows={3} labelBoxSize={'medium'} />
                            {:catch error}
                                <Showcase fillBoxText={error.message} />
                            {/await}
                        </div>
                    </div>

                </div>

            </div>
        </ArticleBox>
    </PositionInWrapper>
    
</PageWrapper>

<style lang="scss">

    .creativePageShowcase {
        display: flex;
        flex-wrap: nowrap;
        min-height: 400px;
        box-shadow: none !important;
        margin-top: 1.2em;

        // row-gap: 1.2em;
        gap: 2em;

        .main>*, .side>* {
            margin-bottom: 1.2em;
        }
        .main:last-child, .side:last-child {
            margin-bottom: 0;
        }
        .main { flex: 2; }
        .side { flex: 1; display: none; }

    }

    @media only screen and (min-width: 800px) {
        .creativePageShowcase .side {
            display: block;
        }
    }

</style>