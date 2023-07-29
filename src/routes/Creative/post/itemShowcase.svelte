<script>
	import { page } from '$app/stores';
	import { txtFileTypes } from '$lib/constants/fileExtension';
    // retrieves and uses the files itself
	import { imgFileTypes, getFileExtension } from '$lib/constants/fileExtension.js';

    export let files;

    let { fileNames } = files;

    let imageIndex = 0;
    if (typeof fileNames === 'string') {
        fileNames = [fileNames];
        // fileData = [fileData];
    };

    async function getFileText(fileName) {
        let result = await fetch($page.url.origin + '/creativePosts/' + fileName);
        result = await result.text();
        return result;
    }

</script>

<div class="itemShowcase">
    <div class="content">
        {#if imgFileTypes.includes(getFileExtension(fileNames[imageIndex]))}
            <!-- Can be displayed in image -->
            <img class="activeItem" src={'/creativePosts/' + fileNames[imageIndex]} alt="" />
        {:else if txtFileTypes.includes(getFileExtension(fileNames[imageIndex]))}
            <!-- Can be displayed via text -->
            {#await getFileText(fileNames[imageIndex])}
                <!-- fetch is pending -->
            {:then value}
                <!-- fetch was fulfilled -->
                <div class="activeItem">
                    {@html value}
                </div>
            {:catch error}
                <!-- fetch was rejected -->
                <div class="activeItem">
                    {error.message}
                </div>
            {/await}
        {:else}
            <!-- Can't be displayed -->
            <div class="activeItem">
                File type cannot be displayed.
                <a href={'/creativePosts/' + fileName}>Download</a>
            </div>
        {/if}
    </div>
    {#if fileNames.length > 1}
        <button class="carousel" on:click={() => {imageIndex--}}>&lsaquo;</button>
        <button class="carousel" on:click={() => {imageIndex++}}>&rsaquo;</button>
    {/if}
</div>

<style lang="scss">

    .itemShowcase {

    }

</style>