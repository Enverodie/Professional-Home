<div class={$$props.class}>
    <div class="introductionBox gridlikeBox smallest"></div>
    <div class="introductionBox gridlikeBox medium"></div>
    <div class="introductionBox gridlikeBox large">
        <slot />
    </div>
</div>

<style lang="scss">

    .introductionBox {
		padding: 0;
		margin: calc(var(--defaultPadding) / 2) 0;

		&:first-child { margin-top: 0; }
		&:last-child { margin-bottom: 0; }

		&.smallest {
			height: 10px;
		}
	
		&.medium {
			height: 30px;
		}
	
		&.large {
			min-height: 100px;
			background-color: hsla(var(--color1H), var(--color1S), var(--color1L), .7);
		}
	}
    
</style>