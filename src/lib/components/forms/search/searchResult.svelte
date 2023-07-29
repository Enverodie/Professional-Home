<script>

    import { page } from '$app/stores';
    import { titleGradientGenerator } from '$lib/constants/titleGradientGen.js';
    import { getFileExtension, imgFileTypes } from '$lib/constants/fileExtension.js';

    export let searchedString = '';
    export let postData;

    const regexFilterSearchChars = /[,.;:]/g;
    function searchMatches(inputWords, searchedWord) {
        return inputWords
            .split(" ")
            .map(item => item
                .toLowerCase()
                .replace(regexFilterSearchChars, ''))
            .includes(searchedWord
                .toLowerCase()
                .replace(regexFilterSearchChars, ''));
    }

    let usedFileName = (typeof postData.fileName === 'string')? postData.fileName : postData.fileName[0];

</script>

<a class="result" href={$page.url.pathname + '/post?id=' + postData._id}>

    {#if !imgFileTypes.includes(getFileExtension(usedFileName))}
        <div 
            class="thumbnail" 
            style={`background-image: linear-gradient(
                var(--defaultThumbnailGradientAngle), 
                ${titleGradientGenerator(postData.postName).rgbFrom}, 
                ${titleGradientGenerator(postData.postName).rgbTo});
            `}>
            {getFileExtension(usedFileName)}
        </div>
    {:else}
        <img class="thumbnail" src={"/creativePosts/" + usedFileName} alt="thumbnail" />
    {/if}

    <div class="description">

        <b class="title">
            {#each (postData.postName.split(" ")) as word}
                {#if searchMatches(searchedString, word)}
                    <span class="searchedKeyword">{word + ' '}</span>
                <!-- {:else if (searchedString.some(keyword => word.indexOf(keyword) !== -1))}
                    {}<span class="searchedKeyword">{}</span>{} -->
                {:else}
                    {word + ' '}
                {/if}
            {/each}
        </b>

        {#each (postData.description.split(" ")) as word}
            {#if searchMatches(searchedString, word)}
                <span class="searchedKeyword">{word + ' '}</span>
            {:else}
                {word + ' '}
            {/if}
        {/each}
    </div>
</a>

<style lang="scss">
        
    .result {

        color: var(--color6);
        padding: var(--smallerSpacing);
        text-decoration: none;
        overflow: hidden;
        display: flex;
        gap: var(--normalSpacing);
        align-items: center;

        &:hover {
            background-color: hsla(var(--color2H), var(--color2S), var(--color2L), .1);
            .description { text-decoration: underline; }
        }

        .thumbnail {
            --height: 100px;
            border: var(--boxStrokeSize) solid var(--color6);
            height: var(--height);
            width: var(--height);
            object-fit: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
        }

        .description {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: var(--color6);
        }

        .title {
            display: block;
        }
    }

    .searchedKeyword {
        color: var(--color7);
    }

</style>