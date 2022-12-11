<footer>
    <div class="grid">
        <div class="column">
            Enverodie.com, &copy; 2022 Stephen M. Smith
        </div>
        <div class="column">
            <img id="mascotWithSign" src="/static/images/footer.png" alt="Enverodie mascot" />
        </div>
    </div>
</footer>

<style lang="scss">
    footer {
        background-color: var(--color5);
        color: var(--color4);
        position: relative;
    }
    
    .grid {
        --padding: 1em;
        box-sizing: border-box;
        padding: var(--padding) var(--padding) 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-collapse: collapse;
        width: 100%;
        
        &>.column {

            &:first-child {
                padding-bottom: var(--padding);
                display: flex;
                align-items: end;
            }
    
            &:last-child {
    
            }
        }    
    }

    #mascotWithSign {
        max-height: 20vh;
        float: right;
    }
</style>