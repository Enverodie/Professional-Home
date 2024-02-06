<script>
    
	import HeadMetadata from '$lib/components/utilities/headMetadata.svelte';
    import PageWrapper from "$lib/components/layout/grid.svelte";
    import SectionHeader from "$lib/components/texts/sectionHeader.svelte";
	import Searchbar from '$lib/components/forms/search/searchbar.svelte';
	import PositionInWrapper from '$lib/components/utilities/positionInWrapper.svelte';
	import ArticleBox from '$lib/components/contentboxes/articleBox.svelte';
	import Showcase from '$lib/components/specialFX/showcase/showcase.svelte';
    import GlitchBox from "$lib/components/contentboxes/glitchBox.svelte";
    import StickyWithCollide from '$lib/components/utilities/stickyWithCollide.svelte';

    export let data;
    let windowWidth = 0;
    $: numColumns = (
        windowWidth >= 1700? 6:
        windowWidth >= 1400? 5:
        windowWidth >= 1100? 4:  
        3
    );

</script>

<HeadMetadata 
    title="Creative - Enverodie"
    description="Come check out all the cool, creative things I've done or want to show off!"
    image="/Art page image.jpg"
/>

<svelte:window bind:innerWidth={windowWidth} />

<PageWrapper>
    <SectionHeader rowsUsed={2}>Creative Showcase</SectionHeader>

    <PositionInWrapper>
        <ArticleBox style="margin-top: var(--boxOutsideSize);">
            <GlitchBox zIndex=7 style="overflow: visible;">
                <Searchbar results={data.streamedPage.searchResults} />
            </GlitchBox>
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
                                {#key numColumns}
                                    <Showcase images={result} cols={numColumns} />
                                {/key}
                            {:catch error}
                                <Showcase fillBoxText={error.message} />
                            {/await}
                        </div>
                    </div>
                </div>

                <StickyWithCollide class="side">
                    
                    <div class="sideslide">

                        <div class="myPick">
                            <SectionHeader withinGrid={false} style="margin: 0; background-image: none;" rowsUsed={1}>
                                My Picks
                            </SectionHeader>
                            <div class="myPickBody">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque tempore fuga, reiciendis hic cum porro expedita accusantium quibusdam quae tempora, laborum nostrum vitae similique. Soluta minus facilis autem doloribus earum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae veritatis rem neque obcaecati similique reiciendis quas, excepturi ipsum. Aperiam alias, nam quod saepe ipsam a eum deleniti doloribus quibusdam distinctio.</p>
                            </div>
                            <!-- <div>
                                {#await data.streamed.recommendedPosts}
                                    <Showcase fillBoxText='Loading...' />
                                {:then result} 
                                    <Showcase images={result} rows={1} cols={3} labelBoxSize={'small'} />
                                {:catch error}
                                    <Showcase fillBoxText={error.message} />
                                {/await}
                            </div> -->
                        </div>
    
                        <div class="hottest">
                            <SectionHeader withinGrid={false} style="margin: 0 0; background-image: none;">
                                Hottest
                            </SectionHeader>
                            <div class="hottestBody">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci cupiditate autem aliquam possimus consectetur recusandae at temporibus ad, consequuntur, ipsa aperiam? Natus et error eveniet soluta eos rem numquam fugit unde, dolor, debitis architecto provident fuga velit ab consectetur sed at. Ea necessitatibus perferendis soluta obcaecati, quia itaque reprehenderit aspernatur laboriosam impedit accusantium corrupti velit ipsa dolorum eum hic architecto? Dicta modi itaque nostrum commodi fugit illo alias aperiam, iusto quae quibusdam veniam, facere hic asperiores! Aliquam cupiditate harum aut fuga consequatur odit veniam optio error dignissimos, doloremque placeat dolor esse eveniet. Reprehenderit eius ipsa amet fugit ducimus dolorum sit.</p>
                            </div>
                            <!-- <div class="hottestBody">
                                {#await data.streamed.topPostsPersonal}
                                    <Showcase fillBoxText='Loading...' />
                                {:then result} 
                                    <Showcase images={result} rows={3} labelBoxSize={'medium'} />
                                {:catch error}
                                    <Showcase fillBoxText={error.message} />
                                {/await}
                            </div> -->
                        </div>
                    </div>

                </StickyWithCollide>

            </div>
        </ArticleBox>
    </PositionInWrapper>
    
</PageWrapper>

<style lang="scss">

    .creativePageShowcase {
        display: grid;
        grid-template-columns: 1fr;
        flex-wrap: nowrap;
        min-height: 100vh;
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
        :global(.side) { 
            display: none; 
            flex: 1; 
            flex-direction: column;
            height: 100%;
        }
        .sideslide {
            height: calc(100vh - var(--navbarHeight) - 3px);
            box-sizing: border-box;
            display: grid;
            grid-template-rows: 1fr 3fr;
            flex-direction: column;

            &>* {
                display: flex;
                flex-direction: column;
                &>:last-child {
                    display: flex;
                    justify-content: space-between;
                    overflow: hidden;
                    flex: 1;
                }
            }
        }

        &>.hottest {
            display: flex;
            flex-direction: column;
            &>.hottestBody {
                flex: 1;
            }
        }

    }

    @media (min-width: 800px) {
        .creativePageShowcase {

            grid-template-columns: 2fr 1fr;

            :global(.side) {
                display: flex;
            }
        } 
    }

</style>