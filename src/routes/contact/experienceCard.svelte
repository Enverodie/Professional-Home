<script>
    
    export let item;
    let { name, icon, description } = item;
    let showDescription = false;

</script>

<div class="card" class:showDescription>
    <div>{name}</div>
    <img src={icon} alt={name + " icon"} />
    <button on:click={() => {showDescription = !showDescription}}>
        ?
    </button>
    <div class="description">{description}</div>
</div>

<style lang="scss">
    
    .card {
        width: 50%;
        height: 100%;
        text-align: center;
        display: inline-block;
        flex-direction: column;
        justify-content: center;
        overflow: auto;

        .description { display: none; }

        &.showDescription {

            .description {
                display: block;
                top: 0;
                transform: top .5s ease-in-out;
            }
        }

        &>img { flex: 1; }
    }

</style>