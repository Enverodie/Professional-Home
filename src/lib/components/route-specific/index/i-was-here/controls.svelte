<script>

    const totalRotation = 360;
    const maxRotation = totalRotation/2;
    const minRotation = -maxRotation;
    const maxDefaultTilt = 75;

    export let color = "#ffffff";
    export let rotationNumber = Math.floor(Math.random() * maxDefaultTilt * (Math.random()*2 > 1 ? 1 : -1));

    $: unsignedRotation = (rotationNumber + totalRotation) % totalRotation;

</script>

<div class="field"> 
    <label for="iWasHere-color">Color</label>
    <input id="iWasHere-color" type="color" bind:value={color}/>
</div>
<div class="field">
    <label for="rotationInputs">Rotation</label> 
    <div id="rotationInputs">
        <input id="iWasHere-number" type="number" min={minRotation} max={maxRotation} bind:value={rotationNumber} />
        <input id="iWasHere-numberSlider" type="range" min={minRotation} max={maxRotation} bind:value={rotationNumber} />
    </div>
</div>
<div class="field">
    <button class="submit">Submit</button>
</div>

<style lang="scss">
    
    .field {
        display: flex;
        align-items: center;
        justify-content: space-between;

        #iWasHere-number {
            background: none;
            border: none;
            color: inherit;
            padding: 0;
            margin: 0;
            text-align: left;
            width: 6ch;
        }

        #rotationInputs {
            display: flex;
            align-items: center;
            gap: 1ch;

            &>* {
                margin: 0;
            }

            &>#iWasHere-number {

            }

            &>#iWasHere-numberSlider {

            }
        }
    }

    .submit {
        width: 100%;
        margin: 1em 0 0;
    }
</style>