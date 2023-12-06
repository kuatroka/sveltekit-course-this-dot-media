<script lang="ts">
    import {DataTable} from '@evidence-dev/core-components';  
    import type { PageData } from './$types';
    
    export let data: PageData;
    $: ciks = data?.ciks_entries;
</script>

<DataTable data={ciks} headerColor="red" search={true}
link=link
showLinkCol={true}/>
