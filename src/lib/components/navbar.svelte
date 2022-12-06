<script>

</script>

<nav>
    <div class="icon">Enverodie</div>
    <div class="navElements">
        <a href="/Projects">Projects</a>
    </div>
</nav>

<style lang="scss">
    
    nav {
        position: sticky;
        top: 0;
        z-index: 10;
        margin: 0;
        background-color: var(--color5);
        padding: 1em;
        // margin-bottom: 2em;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        &>.navElements>a {
            display: inline-block;
            background-color: var(--color2);
            padding: .5em 2em;
            margin: 0em .75em;
            font-weight: 700;
        }
    }

</style>