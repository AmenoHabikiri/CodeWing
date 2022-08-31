<script>
	import {onMount} from 'svelte';
	export let message;
	import store from '../services/store.js';
	let username = "Username";
  	let messages = [];

	onMount(() => {
		store.subscribe(currentMessage => {
			messages = [...messages, currentMessage];
			console.log(messages);
		})
	})
	function onSendMessage() {
		if (message.length > 0) {
		    console.log(messages);
			store.sendMessage({"username":username,"msg":message});
			message = "";
		}
	}
</script>

<div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
	<div class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
		<input class="fs-5 fw-semibold" placeholder="Enter Username" bind:value={username} />
	</div>
	<div>
		<form on:submit|preventDefault={onSendMessage}>
			<input
				class="form-control"
				placeholder="Write a message"
				bind:value={message}
			/>
		</form>
	</div>
	<div class="list-group list-group-flush border-bottom scrollarea" style="overflow:scroll">
		{#each messages as msg, i}
			<div class="list-group-item list-group-item-action py-3 lh-sm">
				{#if i != 0}
					<div class=" align-items-center justify-content-between"  style="text-align: {i % 2 == 0 ? "left" :  "right" }">
						<strong  style="text-align:{i % 2 == 0 ? "left" :  "right" }">{msg.username}</strong>
					</div>
					<div class="col-10 mb-1 small" style="text-align: {i % 2 == 0 ? "left" :  "right" }">{msg.msg}</div>
				{/if}
			</div>
		{/each}
	</div>
	
	
</div>


<style>
	.scrollarea{
    	min-height: 500px;
  	}
</style>