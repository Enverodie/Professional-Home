<script>

    import { page } from '$app/stores';

    import PageWrapper from '$lib/components/layout/grid.svelte';
    import SectionHeader from '../lib/components/texts/sectionHeader.svelte';

</script>

<PageWrapper>
    <SectionHeader useErrorStyle={true} rowsUsed={3}>
        {$page.status}: {$page.error.message}
    </SectionHeader>
</PageWrapper>