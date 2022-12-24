<script>

    import { onMount } from 'svelte';

    export let trackedIDs = [];
    export let position = 0;
    
    let visibleElements = new Set();
    
    function addToVisible(intersectsArray) {
        for (let intersect of intersectsArray) {
            if (intersect.isIntersecting) {
                visibleElements.add(intersect.target.id);
            }
            else {
                visibleElements.delete(intersect.target.id);
            }
        }
    }

    function calculateUIValue() {
        let positionBuilding = 0;
        for (let i = 0; i < trackedIDs.length; i++) {
            let id = trackedIDs[i]
            positionBuilding = i;
            if (visibleElements.has(id)) break;
        }
        positionBuilding += Math.max(visibleElements.size-1, 0) / 2.0;
        position = positionBuilding;
        // positionPercent = positionBuilding / (trackedIDs.length - 1.0);
    }

    function onIntersect(intersects) {
        addToVisible(intersects);
        calculateUIValue();
    }

    /**
     * Adds an intersection observer to each article with a supplied id.
     * Use this after the document or component has loaded.
     * @param {[string]} idArray The list of IDs corresponding to HTML article tags
     */
    function addIntersectionObservers(idArray) {
        let options = {
            // threshold: .1
        }
        let observer = new IntersectionObserver(onIntersect, options);
        for (let id of idArray) {
            let element = document.querySelector(`article[id='${id}']`);
            observer.observe(element);
        }
    }

    onMount(() => {
        addIntersectionObservers(trackedIDs);
    })

</script>

<!-- <div bind:this={root} class="intersect"></div>

<style lang="scss">

    .intersect {
        --intersectionSize: 20vh;
        position: fixed;
        top: calc(50vh - (var(--intersectionSize) / 2));
        height: var(--intersectionSize);
        width: 100%;
        background-color: turquoise;
        z-index: 999;
        user-select: none;
        pointer-events: none;
        
    }

</style> -->