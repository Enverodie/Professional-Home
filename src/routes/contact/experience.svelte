<script>

    import { onDestroy, onMount } from "svelte";
    import ExperienceCard from "./experienceCard.svelte";

    const timeToCycle = 2000;
    const cardsBreakpoint = 800; // in px, see SCSS @media breakpoint below as well

    let categories = [
        { name: 'JS libraries', examples: [
            { id: 10, name: 'React', icon: '/svgs/technologies-icons/React Logo.svg', description: '' },
            { id: 30, name: 'Svelte', icon: '/svgs/technologies-icons/Svelte_Logo.svg', description: '' }
        ] },
        { name: 'Vanilla technologies', examples: [
            { id: 50, name: 'HTML', icon: '/svgs/technologies-icons/HTML5 Logo.svg', description: '' },
            { id: 70, name: 'CSS', icon: '/svgs/technologies-icons/CSS3_logo_and_wordmark.svg', description: '' },
            { id: 90, name: 'JavaScript', icon: '/svgs/technologies-icons/JavaScript-logo.png', description: '' }
        ] },
        { name: 'CSS extensions', examples: [
            { id: 110, name: 'SASS/SCSS', icon: '/svgs/technologies-icons/sass-seal-color-reversed.png', description: '' },
        ] },
        { name: 'Programming languages', examples: [
            { id: 130, name: 'Java', icon: '/svgs/technologies-icons/Duke_(Java_mascot)_waving.svg', description: '' },
            { id: 150, name: 'C', icon: '/svgs/technologies-icons/C_Programming_Language.svg', description: '' },
            { id: 170, name: 'Python', icon: '/svgs/technologies-icons/Python-logo-notext.svg', description: '' },
            { id: 190, name: 'PHP', icon: '/svgs/technologies-icons/Official PHP Logo.svg', description: '' }
        ] },
        { name: 'Databases', examples: [
            { id: 210, name: 'MySQL', icon: '', description: '' },
            { id: 230, name: 'MariaDB', icon: '/svgs/technologies-icons/MariaDB_colour_logo.svg', description: '' },
            { id: 250, name: 'PostgreSQL', icon: '', description: '' },
            { id: 270, name: 'MongoDB', icon: '/svgs/technologies-icons/MongoDB_Logomark_SpringGreen.svg', description: '' }
        ] },
    ];
    let activeCategory = 0;
    let firstItemIndex = 0;

    let innerWidth; // comes from svelte:window

    let cardsHovered = false;
    $: numCardsDisplayable = (typeof innerWidth !== 'undefined' && innerWidth >= cardsBreakpoint)? 2 : 1;
    $: cycle = (!cardsHovered) && (categories[activeCategory].examples.length > numCardsDisplayable);
    function generateCycleableArray(firstItemIndex, activeCategory) {
        let startArrayHalf = categories[activeCategory].examples.slice(firstItemIndex);
        let lastArrayHalf = categories[activeCategory].examples.slice(0, firstItemIndex);
        let uniqueArray = [...startArrayHalf, ...lastArrayHalf];
        let hideawayElement = {...uniqueArray[uniqueArray.length - 1], id: uniqueArray[uniqueArray.length-1].id + uniqueArray.length};
        return [
            hideawayElement,
            ...uniqueArray
        ]
    }
    $: cycleableArray = generateCycleableArray(firstItemIndex, activeCategory);

    const animationTimeMS = 1000;
    
    $: animateForward = false;
    $: animateBackward = false;
    function updatePosition(moveBackwards) {
        if (moveBackwards) {
            setTimeout(() => { animateBackward = false }, animationTimeMS);
            firstItemIndex = (firstItemIndex-1 < 0) ? categories[activeCategory].examples.length - 1 : firstItemIndex-1;
            animateBackward = true;
        }
        else {
            setTimeout(() => { animateForward = false }, animationTimeMS);
            firstItemIndex = (firstItemIndex+1) % categories[activeCategory].examples.length
            animateForward = true;
        }
    }

    function updateActiveCategory(moveBackwards) {
        if (moveBackwards) {
            activeCategory = (activeCategory-1 < 0) ? categories.length - 1 : activeCategory-1;
        }
        else {
            activeCategory = (activeCategory+1) % categories.length;
        }
        firstItemIndex = 0;
    }

    let cycleInterval;
    onMount(() => {
        cycleInterval = setInterval(() => {
            if (cycle) {
                updatePosition();
            } 
        }, timeToCycle)
    });

    onDestroy(() => {
        clearInterval(cycleInterval);
    });

</script>

<svelte:window bind:innerWidth={innerWidth} />

<div class='container'>
    <div class="activeCategory">
        <div class="activeLabel">
            Experienced in
            <div class="active">
                <button class="button1" on:click={() => {updateActiveCategory(true)}}>&lsaquo;</button>
                {categories[activeCategory].name}
                <button class="button1" on:click={() => {updateActiveCategory()}}>&rsaquo;</button>
            </div>
        </div>
        <div 
            class="cardsContainer" 
            on:mouseenter={() => {cardsHovered = true}} 
            on:mouseleave={() => {cardsHovered = false}}
            style={(cycleableArray.length <= 2? '--cardFullSize: 101%;' : '')} >
            <button class="button1" class:invisible={categories[activeCategory].examples.length <= numCardsDisplayable} on:click={() => {updatePosition(true)}}>&lsaquo;</button>
            <div style={"overflow: hidden; height: 100%; flex: 1;" + (categories[activeCategory].examples.length >= 3?" margin: 0 2%;" : '')}>
                <div class="cards" class:animateForward={animateForward} class:animateBackward={animateBackward} style="--animationTimeMS: {animationTimeMS}ms;">
                    {#each cycleableArray as item, index (item.id)}
                        <ExperienceCard item={item} removeTabbable={animateForward || animateBackward || (index < 1 || index > 2)} />
                    {/each}
                </div>
            </div>
            <button class="button1" class:invisible={categories[activeCategory].examples.length <= numCardsDisplayable} on:click={() => {updatePosition()}}>&rsaquo;</button>
        </div>
    </div>
</div>

<style lang="scss">

    .invisible {
        display: none;
    }

    .button1 {
        font-size: var(--titleLarge);
        margin-top: 0;
        margin-bottom: 0;
    }

    .activeLabel {
        font-size: var(--titleSmall);
        margin: var(--defaultPadding) 0;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        box-sizing: border-box;
        gap: 1ch;
        align-items: center;
        text-align: center;
        margin-bottom: .6rem;

        .active {
            background-color: var(--color5);
            border-radius: var(--defaultBorderRadius);
            flex: 1;
            padding: .5em;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    :global(.cardsContainer) {
        --cardFullSize: 101%;
        --cardHorizontalMargin: 1%;
        --cardWidth: calc(var(--cardFullSize) - var(--cardHorizontalMargin));
    }
    .cardsContainer {
        height: 300px;
        display: flex;
        &>button:first-child { margin-left: 0; }
        &>button:last-child { margin-right: 0; }
    }

    .cards {
        --totalCardSize: calc(var(--cardWidth) + (var(--cardHorizontalMargin) * 2));
        white-space: nowrap;
        position: relative;
        height: 100%;
        left: calc(-1 * var(--totalCardSize));
        &.animateForward {
            animation: scroll var(--animationTimeMS) ease-in-out;
        }
        &.animateBackward {
            animation: scrollBackward var(--animationTimeMS) ease-in-out;
        }
    }

    @keyframes scroll {
        from {
            left: 0%;
        }
        to {
            left: calc(-1 * var(--totalCardSize));
        }
    }

    @keyframes scrollBackward {
        from {
            left: calc(-2 * var(--totalCardSize));
        }
        to {
            left: calc(-1 * var(--totalCardSize));
        }
    }

    @media (min-width: 800px) {
        :global(.cardsContainer) {
            --cardFullSize: 50%;
        }
    }
</style>