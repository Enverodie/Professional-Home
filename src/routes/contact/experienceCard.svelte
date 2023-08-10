<script>
    
    export let item;
    export let removeTabbable;
    let { name, icon, description } = item;
    let showDescription = false;

</script>

<div class="card" class:showDescription>
    <div class="textIcon">
        <div class="name">{name}</div>
        <img src={icon} alt={name + " icon"} />
        <button class="button1 descriptionButton" on:click={() => {showDescription = !showDescription}} tabindex={removeTabbable? -1 : 0}>
            ?
        </button>
    </div>
    <div class="description">{description}</div>
</div>

<style lang="scss">
    
    .card {
        &:first-child { margin-left: 0; }
        &:last-child { margin-right: 0; }
        box-sizing: border-box;
        padding: var(--defaultPadding);
        margin: 0 1%;
        width: 49%;
        height: 100%;
        text-align: center;
        display: inline-block;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        background-color: hsla(var(--color2H), var(--color2S), var(--color2L), var(--boxOpacity));
        position: relative;

        .description { display: none; top: 100%; }
        .descriptionButton {
            z-index: 4;
            align-self: flex-end;
            width: 40px;
            height: 40px;
            padding: 1em; // idk why but this fixes the width and height
        }

        &.showDescription {

            .description {
                background-color: hsla(var(--color1H), var(--color1S), var(--color1L), .8);
                white-space: normal;
                box-sizing: border-box;
                overflow: auto;
                padding: var(--defaultPadding);
                z-index: 3;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transform: top .5s ease-in-out;
            }
        }

        .textIcon {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            gap: var(--defaultPadding);

            &>.name {
                font-size: var(--textLarge);
            }
            
            &>img {
                width: 100%; 
                height: 100%; 
                object-fit: contain;
            }
        }

    }

</style>