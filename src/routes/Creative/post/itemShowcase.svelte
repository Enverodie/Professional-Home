<script>
	import { page } from '$app/stores';
	import { txtFileTypes } from '$lib/constants/fileExtension';
    // retrieves and uses the files itself
	import { imgFileTypes, getFileExtension } from '$lib/constants/fileExtension.js';
    import GlitchBox from '$lib/components/contentboxes/glitchBox.svelte';
    import { navbar } from '$lib/stores/gui.js';

    let navbarHeight = 0;
    navbar.subscribe(newNavbar => {
        if (newNavbar) {
            navbarHeight = newNavbar.getBoundingClientRect().height;
        }
    })

    export let files;

    let { fileNames } = files;

    let imageIndex = 0;
    if (typeof fileNames === 'string') fileNames = [fileNames];

    async function getFileText(fileName) {
        let result = await fetch($page.url.origin + '/creativePosts/' + fileName);
        result = await result.text();
        return result;
    }

    function updateImageIndex(offset) {
        let newvalue = (imageIndex + offset) % fileNames.length;
        if (newvalue < 0) newvalue = fileNames.length + newvalue;
        imageIndex = newvalue;
    }

    let active = false;

    function onKeydown(e) {
        switch(e.key) {
            case "Escape":
                active = false;
                return;
            case "ArrowRight":
                updateImageIndex(1);
                return;
            case "ArrowLeft":
                updateImageIndex(-1);
                return;
            default:
                return;
        }
    }

</script>

<svelte:window on:keydown={onKeydown} />

<div class="itemShowcase" class:active style="--navbarHeight: {navbarHeight}px">
    <div class="buttons">
        {#if fileNames.length > 1}
            <button class="carousel" on:click={() => {updateImageIndex(-1)}}>&lsaquo;</button>
            <button class="carousel" on:click={() => {updateImageIndex(1)}}>&rsaquo;</button>
        {/if}
        {#if active}
            <button class="carousel xbutton" on:click={() => {active = false}}>X</button>
        {:else}
            <button class="carousel xbutton" on:click={() => {active = true}}>&#x2197;</button>
        {/if}
    </div>
    <div class="content">
        <GlitchBox scrollable={active}>
            {#if imgFileTypes.includes(getFileExtension(fileNames[imageIndex]))}
                <!-- Can be displayed in image -->
                <img class="activeItem" style="position: absolute;" src={'/creativePosts/' + fileNames[imageIndex]} alt="" />
            {:else if txtFileTypes.includes(getFileExtension(fileNames[imageIndex]))}
                <!-- Can be displayed via text -->
                {#await getFileText(fileNames[imageIndex])}
                    <!-- fetch is pending -->
                {:then value}
                    <!-- fetch was fulfilled -->
                    <div class="textPositioner">
                        <div class="activeItem textItem">
                            {@html value}
                        </div>
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
                    <a href={'/creativePosts/' + fileNames[imageIndex]} download>Download</a>
                </div>
            {/if}
        </GlitchBox>
    </div>
</div>

<style lang="scss">

    .itemShowcase {
        --glitchOuterDistance: calc(var(--boxOutsideSize) + 2px);
        display: flex;
        flex-direction: column;
        position: relative;
        top: 0;
        left: 0;
        overflow: hidden;
        height: 30vh;
        padding: 0 var(--glitchOuterDistance) var(--glitchOuterDistance) var(--glitchOuterDistance);
        box-sizing: border-box;

        &.active {
            position: fixed;
            width: 100%;
            height: 100%;
            --padding: 2rem;
            padding: var(--padding);
            padding-top: calc(var(--navbarHeight) + var(--padding));
            box-sizing: border-box;
            background-color: hsla(var(--color1H), var(--color1S), var(--color1L), .6);
            z-index: 5;

            .content {
                background-color: var(--color1);
            }

            .activeItem {
                object-fit: contain;
            }
        }

        .content {
            height: 100%;
        }
    }

    .textPositioner { display: flex; justify-content: center; width: 100%; height: 100%;}

    .activeItem {
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        white-space: pre-line;
        object-fit: cover;
        
        &.textItem {
            left: inherit;
            max-width: 74ch;
            box-sizing: border-box;
            padding: 2em;
            margin: 0 auto;
            height: initial;
            width: auto;
        }
    }

    .buttons {
        display: inline-block;
        // padding: .6em 0;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
        width: 100%;
        button {
            flex: 1;
        }

        .xbutton {
            width: 2em;
            flex: inherit;
        }
    }

</style>