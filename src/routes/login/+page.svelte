<script lang="ts">
	import type { PageData, ActionData } from './$types';
  import Button from '$lib/components/ui/button/button.svelte';
	
	// export let data: PageData;
	
	export let form: ActionData;
</script>

<h1>Login</h1>


<form action="?/login" method="post" class="flex flex-col items-start py-2">
    
    <label for="username">Username</label>
    <input type="text" id="username" name="username" placeholder="username"  value={form?.username?.value ?? ''}  class="border"/>
    <div class="error text-red-500">{form?.username?.error ?? ''}</div>
    
    <label for="password">Password</label>
    <input type="password" id="password" name="password" placeholder="password" value={form?.password?.value ?? ''} class="border" />
    <div class="error text-red-500">{form?.password?.error ?? ''}</div>


  <Button type="submit">Login</Button>

</form>


