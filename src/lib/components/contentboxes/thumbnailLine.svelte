<script>

    export let link = "#";
    export let likes, dislikes, dateCreated = new Date();
    export let thumbnail;
    thumbnail = {
        image: false,
        postName: '',
        likes: likes || 0,
        dislikes: dislikes || 0,
        description: '',
        ...(thumbnail || {})
    };
    thumbnail.dateCreated = (thumbnail?.dateCreated || dateCreated)?.toLocaleDateString() || '';
    
</script>

<a href={link} class={"fullLine " + ($$props.class || '')}>
    {#if thumbnail.image}
    <img src={thumbnail.image} class="thumbnail" alt="" aria-hidden="true" />
    {/if}
    <div class="titleLine">
        <div class="postName">
            <slot name="postName">{thumbnail.postName}</slot>
        </div>
        <div class="dateCreated" name="dateCreated">{thumbnail.dateCreated}</div>
    </div>
    <div class="description">
        <slot name="description">{thumbnail.description}</slot>
    </div>
</a>

<style lang="scss">

    .fullLine {

        --titleSize: var(--titleSmall);
        --textSize: var(--textSmall);
        --numberOfTextLines: 3;

        --transition: .15s ease;

        --horizontalPadding: var(--defaultPadding);
        --verticalPadding: calc(var(--defaultPadding) / 2);
        margin: var(--defaultPadding);
        font-size: var(--textSize);
        text-decoration: none;
        padding: var(--verticalPadding) var(--horizontalPadding);
        display: grid;
        grid-template-rows: 1fr 1fr;
        box-sizing: border-box;
        height: calc(var(--titleSize) + (3 * var(--textSize)) + (2 * var(--verticalPadding)));
        gap: calc(var(--defaultPadding) / 8);
        flex-direction: column;
        background-color: var(--color5);
        position: relative;

        &>* {
            z-index: 2;
        }
        
        img.thumbnail {
            
            position: absolute;
            height: calc(100% - 2*var(--verticalPadding));
            z-index: 1;
            right: 0;
            top: 0;
            width: calc(50% - var(--horizontalPadding));
            padding: inherit;
            object-fit: cover;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 100%);
            transition: width var(--transition), height var(--transition), top var(--transition), right var(--transition), clip-path var(--transition);
    
            &:hover {
                z-index: 5;
                width: 100%;
                height: 100%;
                top: calc(0px - var(--verticalPadding));
                right: calc(0px - var(--horizontalPadding));
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }

        }
    }

    .titleLine {
        display: flex;
        justify-content: space-between;
        align-items: last baseline;
        flex-wrap: nowrap;
        width: 50%;
        gap: 1ch;
        overflow: hidden;
        transition: width var(--transition), padding var(--transition);

        box-sizing: border-box;
        
        &:hover {
            width: 100%;
            padding-right: var(--horizontalPadding);

            .dateCreated {
                opacity: 1;
            }
        }

        .postName {
            font-size: var(--titleSize);
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            position: relative;

            mask-image: linear-gradient(to right, white 80%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, white 80%, transparent 100%);
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
        }
    
        .dateCreated {
            flex-shrink: 0;
            opacity: .4;
            font-style: italic;
            color: var(--color3);
            transition: width var(--transition), opacity var(--transition), text-shadow var(--transition);

            --border-size: 4px;
            margin: calc(-1 * var(--border-size));
            border: var(--border-size) solid var(--color5);
            border-radius: 4px;
            background-color: var(--color5);
        }
    }

    .description {
        width: 75%;
        overflow: hidden;
    }


</style>