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

    let { fileNames, fileType } = files;

    let showcaseIndex = 0;
    if (typeof fileNames === 'string') fileNames = [fileNames];
    let isImage = imgFileTypes.includes(getFileExtension(fileNames[showcaseIndex]));
    let isText = txtFileTypes.includes(getFileExtension(fileNames[showcaseIndex]));
    let isShortStory = (fileType[0] === 1 && fileType[1] === 0); // comes from postType_enum in mongo.js

    async function getFileText(fileName) {
        let result = await fetch($page.url.origin + '/creativePosts/' + fileName);
        result = await result.text();
        return result;
    }

    function updateShowcaseIndex(offset) {
        let newvalue = (showcaseIndex + offset) % fileNames.length;
        if (newvalue < 0) newvalue = fileNames.length + newvalue;
        showcaseIndex = newvalue;
    }

    let active = false;
    $: if (typeof document !== 'undefined') document.body.style.overflow = (active)? 'hidden' : 'auto'; 

    function onKeydown(e) {
        switch(e.key) {
            case "Escape":
                active = false;
                return;
            case "ArrowRight":
                updateShowcaseIndex(1);
                return;
            case "ArrowLeft":
                updateShowcaseIndex(-1);
                return;
            default:
                return;
        }
    }

    function uncoverCensored(e) {
        if (!e.target) return;
        if (!e.target.classList?.contains('censored')) return;

        const toggleClassName = "uncovered";

        if (e.target.classList.contains(toggleClassName)) e.target.classList.remove(toggleClassName);
        else e.target.classList.add(toggleClassName);
    }

    let censorChecked = true;
    if (typeof localStorage !== "undefined") {
        let stored = localStorage.getItem("useCensorFilter");
        if (stored != null) censorChecked = stored === 'true';
    }
    function clickedCensorCheck(e) {
        censorChecked = !censorChecked;
        localStorage.setItem("useCensorFilter", censorChecked);
    }

</script>

<svelte:window on:keydown={onKeydown} />

<div class="itemShowcase" class:active style="--navbarHeight: {navbarHeight}px">
    <div class="buttons">
        {#if fileNames.length > 1}
            <button class="carousel" on:click|preventDefault={() => {updateShowcaseIndex(-1)}}>&lsaquo;</button>
            <button class="carousel" on:click|preventDefault={() => {updateShowcaseIndex(1)}}>&rsaquo;</button>
        {/if}
        {#if isText}
            <label class="carousel" on:click|preventDefault={clickedCensorCheck}>Hide Censored <input type="checkbox" checked={censorChecked} /></label>
        {/if}
        {#if active}
            <button class="carousel xbutton" on:click={() => {active = false}}>Close <div class="icon" aria-hidden="true">X</div></button>
        {:else}
            <button class="carousel xbutton" on:click={() => {active = true}}>Expand <div class="icon" aria-hidden="true">&#x2197;</div></button>
        {/if}
    </div>
    <div class="content">
        <GlitchBox scrollable={active}>
            {#if isImage}
                <img class="activeItem" style="position: absolute;" src={'/creativePosts/' + fileNames[showcaseIndex]} alt="" />
            {:else if isText}
                {#await getFileText(fileNames[showcaseIndex])}
                    <!-- fetch is pending -->
                {:then value}
                    <!-- fetch was fulfilled -->
                    <div class="textPositioner">
                        <div class="activeItem textItem " class:isShortStory class:censorChecked on:click={uncoverCensored}>
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
                <div class="activeItem">
                    File type cannot be displayed.
                    <a href={'/creativePosts/' + fileNames[showcaseIndex]} download>Download</a>
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
            flex: inherit;
            .icon {
                display: block;
                width: 1.5em;
                background-color: var(--color1);
                margin: 4px;
                border-radius: var(--defaultButtonBorderRadius);
            }
        }

        .xbutton:active .icon {
            background-color: var(--color2);
            color: var(--color1);
        } 
    }

    .textItem.isShortStory {
        text-indent: 3ch;
    }

    .textItem.censorChecked {
        
        :global(.censored) {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
            color: transparent;
            cursor: pointer;
        }

        :global(.censored.uncovered) {
            -webkit-touch-callout: inherit; /* iOS Safari */
            -webkit-user-select: inherit; /* Safari */
            -khtml-user-select: inherit; /* Konqueror HTML */
            -moz-user-select: inherit; /* Old versions of Firefox */
            -ms-user-select: inherit; /* Internet Explorer/Edge */
            user-select: inherit; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
            color: inherit;
        }
    }

    label.carousel {

        padding-left: .5em;
        padding-right: .5em;

        input {
            margin: .5em 0 .5em .5em;
            box-sizing: border-box;
            cursor: pointer;
        }
    }

</style>