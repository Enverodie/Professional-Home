<script>

    export let displayed;
    function clickHamburger() {
        displayed = !displayed;
        console.log(displayed);
    }

</script>

<button 
    class="button"
    on:click={clickHamburger}>
    <div class="innerIcon">
        <i class="fa-solid fa-bars"></i>
    </div>
</button>

<style lang="scss">

    .button {
        
        box-sizing: border-box;
        color: var(--color4);
        background: none;
        border: none;
        font-size: 2em;
        margin: 0;
        cursor: pointer;
        transition: transform 150ms ease;

        &:focus .innerIcon i {
            // border: red 2px solid;
            filter: drop-shadow(.1em .05em .05em var(--color2))
        }
        
        &>.innerIcon {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &:active {
            background: none;
            animation: rotate180 150ms ease forwards;
            
            &>.innerIcon {
                transform: scale(.8);
            }
        }
    }

    @keyframes rotate180 {
        from {}
        to {
            transform: rotate(180deg);
        }
    }

</style>