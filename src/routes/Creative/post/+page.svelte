<script>
    
    import PageWrapper from "$lib/components/layout/grid.svelte";
	import PositionInWrapper from '$lib/components/utilities/positionInWrapper.svelte';
	import NameGlitch from './../../../lib/components/texts/nameGlitch.svelte';
    import Thumb from '$lib/components/buttons/thumb.svelte';
    import ItemShowcase from './itemShowcase.svelte';
	import Comment from './comment.svelte';
    import { navbar } from '$lib/stores/gui.js';

    export let data;
    let postData = data.postData;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    if (postData.comments == null) postData.comments = [];

    let likePressed, dislikePressed;

    function updateVote(newValue, positiveVote) {
        if (positiveVote && newValue) dislikePressed = false;
        if (!positiveVote && newValue) likePressed = false;
    }

    let navbarHeight = 0;
    navbar.subscribe(newNavbar => {
        if (newNavbar) {
            navbarHeight = newNavbar.getBoundingClientRect().height;
        }
    })

</script>

<svelte:head>
    <meta property="og:title" content={postData.postName} />
    <meta property="og:description" content={postData.shortDescription} />
    <meta property="og:author" content="Stephen M. Smith" />
    <meta property="og:image" content={''} />
</svelte:head>

<PageWrapper padBottom={false}>
<PositionInWrapper>
    <div class="postContent">
        
        <section class="theActualPost">

            <div class="details">
                <header>
                    <div class="title">
                        <NameGlitch>{postData.postName}</NameGlitch>
                    </div>
                    <div class="date">
                        {
                            days[postData.dateCreated.getDay()] + ", " + 
                            months[postData.dateCreated.getMonth()] + " " + 
                            postData.dateCreated.getDate() + ", " +
                            postData.dateCreated.getFullYear()
                        }
                    </div>
                    <div class="types">
                        {#each postData.type as typeKey}
                            <span><div class="box">{typeKey}</div></span>
                        {/each}
                    </div>
                    <div class="votes">
                        <Thumb bind:active={likePressed} down={false} onPressed={(newValue) => {updateVote(newValue, true)}} />
                        {postData.likes + likePressed}
                        <Thumb bind:active={dislikePressed} down={true} onPressed={(newValue) => {updateVote(newValue, false)}} />
                        {postData.dislikes + dislikePressed}
                    </div>
                </header>
                <a class="thePostLink" href="#thePost">Go to post</a>
                <div class="description">
                    {postData.description}
                </div>
            </div>

            <div id="thePost" style="--navbarHeight: {navbarHeight}px;">
                <ItemShowcase files={{fileNames: postData.fileName /*, fileData: postData.fileData */}} />
            </div>

        </section>
        <section class="comments">
            {#each postData.comments as comment}
                <Comment data={comment} />
            {/each}
        </section>

    </div>
</PositionInWrapper>
</PageWrapper>

<style lang="scss">
    
    :global(html) {
        scroll-behavior: smooth;
    }

    .postContent {
        padding: 1rem;
        background-color: var(--color1);
        border-right: hsla(var(--color2H), var(--color2S), var(--color2L), var(--boxOpacity)) solid var(--boxStrokeSize);
        border-left: hsla(var(--color2H), var(--color2S), var(--color2L), var(--boxOpacity)) solid var(--boxStrokeSize);
        flex: 1;

        &>* {
            // padding: .5em;
            margin: 1em;
        }
    }

    .theActualPost {
        --subtleBorderRadius: 5px;
        --vMargins: .4em;
        display: grid;
        grid-template-columns: 1fr;

        #thePost {
            scroll-margin-top: calc(var(--navbarHeight));
        }

    }

    .date {
        color: var(--color6);
    }

    .types {
        --boxPadding: .2em;
        --color: var(--color7);
        color: var(--color);
        gap: 1ch;
        text-transform: capitalize;
        margin-left: calc(-1 * var(--boxPadding));
        
        &>*:first-child .box {
            margin-left: 0;
        }

        &>*:last-child .box {
            margin-right: 0;
        }

        .box {
            color: var(--color);
            display: inline-block;
            margin: .2em;
            padding: var(--boxPadding);
            background-color: var(--color5);
            border-radius: var(--subtleBorderRadius);
        }

        ::after {
            content: ' > ';
        }

        :last-child::after {
            content: '';
        }
    }

    .votes {
        display: flex;
        align-items: center;
        gap: 1ch;
        margin: var(--vMargins) 0;
    }

    .thePostLink {
        display: inline-block;
        text-decoration: none;
        color: var(--color1);
        font-weight: bold;
        background-color: var(--color2);
        border-radius: var(--subtleBorderRadius);
        padding: .4em;
    }

    .description {
        margin: 1em 0;
    }

    @media (min-width: 1000px) {
        .theActualPost {
            // grid-template-columns: 2fr 1fr;
            display: flex;

            .details { flex: 2; }

            #thePost { 
                flex: 1;
                width: calc(100% / 3);

                :global(.itemShowcase) {
                    height: 100%;
                }
            }
        }
    }

</style>