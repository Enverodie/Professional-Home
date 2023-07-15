<script>
	import PositionInWrapper from './../../lib/components/utilities/positionInWrapper.svelte';
    
    import PageWrapper from '$lib/components/layout/grid.svelte';
	import ArticleBox from '$lib/components/contentboxes/articleBox.svelte';
    import SectionHeader from '../../lib/components/texts/sectionHeader.svelte';

</script>

<PageWrapper backgroundPosition="fixed">

	<SectionHeader>Contact</SectionHeader>

	<PositionInWrapper>
		<ArticleBox boxesAbove={false}>
			<div class="tempContact">
				<div>
					<img src="/images/stephen-new.jpg" alt="Me smiling" />
				</div>
				<div>
					<p><b>Email:</b> <span>enverodie@gmail.com</span></p>
				</div>
			</div>
		</ArticleBox>
	</PositionInWrapper>

</PageWrapper>

<style>

	.tempContact {
		display: flex;
		gap: 1ch;
	}

</style>