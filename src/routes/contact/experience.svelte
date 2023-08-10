<script>

    import { onDestroy, onMount } from "svelte";
    import ExperienceCard from "./experienceCard.svelte";

    const timeToCycle = 2000;

    let categories = [
        { name: 'JS libraries', examples: [
            { id: 0, name: 'React', icon: '/svgs/technologies-icons/React Logo.svg', description: '' },
            { id: 1, name: 'Svelte', icon: '/svgs/technologies-icons/Svelte_Logo.svg', description: '' }
        ] },
        { name: 'Vanilla technologies', examples: [
            { id: 2, name: 'HTML', icon: '/svgs/technologies-icons/HTML5 Logo.svg', description: '' },
            { id: 3, name: 'CSS', icon: '/svgs/technologies-icons/CSS3_logo_and_wordmark.svg', description: '' },
            { id: 4, name: 'JavaScript', icon: '/svgs/technologies-icons/JavaScript-logo.png', description: '' }
        ] },
        { name: 'CSS extensions', examples: [
            { id: 5, name: 'SASS/SCSS', icon: '/svgs/technologies-icons/sass-seal-color-reversed.png', description: '' },
        ] },
        { name: 'Programming languages', examples: [
            { id: 6, name: 'Java', icon: '', description: '' },
            { id: 7, name: 'C', icon: '', description: '' },
            { id: 8, name: 'Python', icon: '', description: '' },
            { id: 9, name: 'PHP', icon: '', description: '' }
        ] },
        { name: 'Databases', examples: [
            { id: 10, name: 'MySQL', icon: '', description: '' },
            { id: 11, name: 'MariaDB', icon: '', description: '' },
            { id: 12, name: 'PostgreSQL', icon: '', description: '' },
            { id: 13, name: 'MongoDB', icon: '', description: '' }
        ] },
    ];
    let activeCategory = 1;
    let firstItemIndex = 0;

    let cycle = true;
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
        Experienced in
        <span class="active">{categories[activeCategory].name}</span>
        <div 
            class="cardsContainer" 
            on:mouseenter={() => {cycle = false}} 
            on:mouseleave={() => {cycle = true}} >
            <button class="button1" on:click={() => {updatePosition(true)}}>&lsaquo;</button>
            <div style="overflow: hidden; height: 100%; flex: 1; margin: 0 2%;">
                <div class="cards" class:animateForward={animateForward} class:animateBackward={animateBackward} style="--animationTimeMS: {animationTimeMS}ms;">
                    {#each cycleableArray as item, index (item.id)}
                        <ExperienceCard item={item} removeTabbable={animateForward || animateBackward || (index < 1 || index > 2)} />
                    {/each}
                </div>
            </div>
            <button class="button1" on:click={() => {updatePosition()}}>&rsaquo;</button>
        </div>
    </div>
</div>

<style lang="scss">

    .button1 {
        font-size: var(--titleLarge);
        margin-top: 0;
        margin-bottom: 0;
    }

    .active {
        display: inline-block;
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