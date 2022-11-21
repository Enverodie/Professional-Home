<main>
    <article>
        <slot></slot>
    </article>
    <aside>
        <div class="stickyItem">
            <p></p>
        </div>
    </aside>
</main>
    
<style>

    main {
        margin: 0 3.5em;
        display: grid;
        grid-template-columns: 7fr 1fr;
        position: relative;
    }

    article {

    }
    
    aside {
        margin: 0 auto;
        
    }
    
    aside .stickyItem {
        position: sticky;
        width: 100%;
        top: 50vh;
    }
</style>