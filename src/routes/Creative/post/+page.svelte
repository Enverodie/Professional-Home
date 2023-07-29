<script>
    
    import { page } from '$app/stores';
    import { get } from 'svelte/store'
    import PageWrapper from "$lib/components/layout/grid.svelte";
	import PositionInWrapper from '$lib/components/utilities/positionInWrapper.svelte';
	import NameGlitch from './../../../lib/components/texts/nameGlitch.svelte';
    import ItemShowcase from './itemShowcase.svelte';
	import Comment from './comment.svelte';

    export let data;
    let postData = data.postData;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    if (postData.comments == null) postData.comments = [];

</script>

<PageWrapper>
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
                            {typeKey}, 
                        {/each}
                    </div>
                    <div class="votes">
                        <div class="likes">{postData.likes}</div>
                        <div class="dislikes">{postData.dislikes}</div>
                    </div>
                </header>
                <div class="description">{postData.description}</div>
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
        // width: 68ch;
        background-color: var(--color1);
        border-right: var(--color2) var(--boxOpacity) var(--boxStrokeSize);
        border-left: var(--color2) var(--boxOpacity) var(--boxStrokeSize);
    }

</style>