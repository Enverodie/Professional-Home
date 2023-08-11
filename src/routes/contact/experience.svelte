<script>

    import { onDestroy, onMount } from "svelte";
    import ExperienceCard from "./experienceCard.svelte";

    const timeToCycle = 2000;

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
            { id: 130, name: 'Java', icon: '', description: '' },
            { id: 150, name: 'C', icon: '', description: '' },
            { id: 170, name: 'Python', icon: '', description: '' },
            { id: 190, name: 'PHP', icon: '', description: '' }
        ] },
        { name: 'Databases', examples: [
            { id: 210, name: 'MySQL', icon: '', description: '' },
            { id: 230, name: 'MariaDB', icon: '', description: '' },
            { id: 250, name: 'PostgreSQL', icon: '', description: '' },
            { id: 270, name: 'MongoDB', icon: '', description: '' }
        ] },
    ];
    let activeCategory = 0;
    let firstItemIndex = 0;

    let cardsHovered = false;
    $: cycle = (!cardsHovered) && categories[activeCategory].examples.length >= 3;
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
            on:mouseleave={() => {cardsHovered = false}} >
            <button class="button1" class:invisible={categories[activeCategory].examples.length < 3} on:click={() => {updatePosition(true)}}>&lsaquo;</button>
            <div style="overflow: hidden; height: 100%; flex: 1; margin: 0 2%;">
                <div class="cards" class:animateForward={animateForward} class:animateBackward={animateBackward} style="--animationTimeMS: {animationTimeMS}ms;">
                    {#each cycleableArray as item, index (item.id)}
                        <ExperienceCard item={item} removeTabbable={animateForward || animateBackward || (index < 1 || index > 2)} />
                    {/each}
                </div>
            </div>
            <button class="button1" class:invisible={categories[activeCategory].examples.length < 3} on:click={() => {updatePosition()}}>&rsaquo;</button>
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
        font-size: var(--titleDefault);
        margin: var(--defaultPadding) 0;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        box-sizing: border-box;
        gap: 1ch;
        align-items: center;
        text-align: center;

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


    .cardsContainer {
        height: 300px;
        display: flex;
    }

    .cards {
        white-space: nowrap;
        position: relative;
        height: 100%;
        left: -51%;
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
            left: -51%;
        }
    }

    @keyframes scrollBackward {
        from {
            left: -102%;
        }
        to {
            left: -51%;
        }
    }
</style>