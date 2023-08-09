<script>

    import { onDestroy, onMount } from "svelte";
    import ExperienceCard from "./experienceCard.svelte";

    const timeToCycle = 2000;

    let categories = [
        { name: 'JS libraries', examples: [
            { name: 'React', icon: '', description: '' },
            { name: 'Svelte', icon: '', description: '' }
        ] },
        { name: 'Vanilla technologies', examples: [
            { name: 'HTML', icon: '', description: '' },
            { name: 'CSS', icon: '', description: '' },
            { name: 'JavaScript', icon: '', description: '' }
        ] },
        { name: 'CSS extensions', examples: [
            { name: 'SASS/SCSS', icon: '', description: '' },
            {}
        ] },
        { name: 'Programming languages', examples: [
            { name: 'Java', icon: '', description: '' },
            { name: 'C', icon: '', description: '' },
            { name: 'Python', icon: '', description: '' },
            { name: 'PHP', icon: '', description: '' }
        ] },
        { name: 'Databases', examples: [
            { name: 'MySQL', icon: '', description: '' },
            { name: 'MariaDB', icon: '', description: '' },
            { name: 'PostgreSQL', icon: '', description: '' },
            { name: 'MongoDB', icon: '', description: '' }
        ] },
    ];
    let activeCategory = 0;

    let cycleInterval;
    onMount(() => {
        cycleInterval = setInterval(() => {
            activeCategory = (activeCategory+1) % categories.length
        }, timeToCycle)
    });

    onDestroy(() => {
        clearInterval(cycleInterval);
    })

</script>

<div class='container'>
    <div class="activeCategory">
        Experienced in
        <span class="active">{categories[activeCategory].name}</span>
        <div class="cards">
            {#each categories[activeCategory].examples as item}
                <ExperienceCard item={item} />
            {/each}
        </div>
    </div>
</div>

<style lang="scss">

    .active {
        display: inline-block;
    }
</style>