<script>

    // options is Object[] with {value:String, active:Boolean} values
    export let options = [];
    export let onClickOption = (index) => {};
    export let removeFromContentFlow = true;
    export let type = 'default';

    let previousItem = options.find(option => option.active);

    let hideDropdown = true;
    function toggleDropdown() {
        hideDropdown = !hideDropdown;
    }

</script>

<div class={"dropdown " + $$props.class}>
    <button class="button1 selector" on:click={toggleDropdown}>
        {#if type === 'default'}
            <slot>Select</slot>: { previousItem.value || '' }
        {:else}
            <slot>Select</slot>
        {/if}
        <div class="arrow" class:hideDropdown>▼</div>
    </button>
    <ul class:hideDropdown class:removeFromContentFlow>
        {#each options as option, index}
            <li>
                {#if type === 'checkbox'}
                    <label class="result button1" class:selected={options[index].active}>
                        {option.value}
                        <input type="checkbox" class="button1" checked={options[index].active} on:click={() => {
                            previousItem = options[index];
                            options[index].active = !options[index].active;
                            onClickOption(index);
                        }} />
                    </label>
                {:else}
                    <button class="result button1" class:selected={options[index].active} on:click={() => {
                        previousItem.active = false;
                        previousItem = options[index];
                        options[index].active = true;
                        onClickOption(index);
                    }}>{option.value}</button>
                {/if}
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">

    .button1 { 
        border-radius: 0; 
        -webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
        &:active {
            background-color: var(--color1);
        }
    }

    .dropdown {
        width: 100%;
        position: relative;

        &>* {
            width: 100%;
            margin: 0;
        }
    }

    .selector {
        justify-content: space-between;
        position: relative;
        z-index: 8;
        background-color: transparent;
        border: var(--defaultBackgroundBoxBorder);

        .arrow {

            &.hideDropdown {
                transform: rotate(-90deg);
            }
        }
    }

    ul { 
        margin: 0;
        padding: 0;
        border-top: var(--boxStrokeSize) solid var(--color5);
        z-index: 7;

        li {
            list-style-type: none;
            margin: 0;
            .result {
                margin: 0;
                display: flex;
                justify-content: space-between;
                background-color: var(--defaultButtonBackgroundColor);
                border: none !important;
                width: 100%;
                box-sizing: border-box;
                background-color: hsla(var(--color5H), var(--color5S), var(--color5L), .6);

                &.selected {
                    background-color: var(--defaultButtonBackgroundColor);
                }
                input { display: inline-block; }
            }
        }

        &.removeFromContentFlow {
            position: absolute;
            width: 100%;
        }
        &.hideDropdown { display: none; }
    }

</style>