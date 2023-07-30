<script>
    
    import PageWrapper from "$lib/components/layout/grid.svelte";
	import PositionInWrapper from '$lib/components/utilities/positionInWrapper.svelte';
	import NameGlitch from './../../../lib/components/texts/nameGlitch.svelte';
    import Thumb from '$lib/components/buttons/thumb.svelte';
    import ItemShowcase from './itemShowcase.svelte';
	import Comment from './comment.svelte';

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

</script>

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
                            <span>{typeKey}</span>
                        {/each}
                    </div>
                    <div class="votes">
                        <Thumb bind:active={likePressed} down={false} onPressed={(newValue) => {updateVote(newValue, true)}} />
                        {postData.likes + likePressed}
                        <Thumb bind:active={dislikePressed} down={true} onPressed={(newValue) => {updateVote(newValue, false)}} />
                        {postData.dislikes + dislikePressed}
                    </div>
                </header>
                <div class="description">
                    {postData.description}
                </div>
            </div>

            <ItemShowcase files={{fileNames: postData.fileName /*, fileData: postData.fileData */}} />

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
    
    .postContent {
        padding: 1rem;
        background-color: var(--color1);
        border-right: hsla(var(--color2H), var(--color2S), var(--color2L), var(--boxOpacity)) solid var(--boxStrokeSize);
        border-left: hsla(var(--color2H), var(--color2S), var(--color2L), var(--boxOpacity)) solid var(--boxStrokeSize);
        flex: 1;
    }

    .theActualPost {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .date {
        color: var(--color6);
    }

    .types {
        color: var(--color7);
        gap: 1ch;

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
        margin: .5em 0 .5em;
    }

</style>