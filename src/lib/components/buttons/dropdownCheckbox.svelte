<script>

    // options is Object[] with {value:String, active:Boolean} values
    export let options = [];
    export let onClickOption = (index) => {};
    export let removeFromContentFlow = true;

    let hideDropdown = true;
    function toggleDropdown() {
        hideDropdown = !hideDropdown;
    }

    function clickOption(index) {
        options[index].active = !options[index].active;
        onClickOption(index);
        // hideDropdown = true;
    }


</script>

<div class={"dropdown " + $$props.class}>
    <button class="button1 selector" on:click={toggleDropdown}>
        <slot>Select</slot>
        <div class="arrow" class:hideDropdown>▼</div>
    </button>
    <ul class:hideDropdown class:removeFromContentFlow>
        {#each options as option, index}
            <li><label class="button1" class:unselected={!options[index].active}>
                {option.value}
                <input type="checkbox" class="button1" checked={options[index].active} on:click={() => clickOption(index)} />
            </label></li>
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
            background-color: inherit;
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
        z-index: 9;

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
            label {
                margin: 0;
                display: flex;
                justify-content: space-between;

                &.unselected {
                    background-color: hsla(var(--color5H), var(--color5S), var(--color5L), .6)
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