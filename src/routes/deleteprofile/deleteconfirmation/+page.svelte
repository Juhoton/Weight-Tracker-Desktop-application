<script>
	import { useProfile } from '$lib/states/profile.svelte.js';
	let profile = useProfile();
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	let profileName = '';

	onMount(() => {
		if (browser) {
			const urlParams = new URLSearchParams(get(page).url.search);
			profileName = urlParams.get('name');
		}
	});
	const closeWindow = async () => {
		await window.electron.send('close-modal');
	}
	const deleteProfile = async (name) => {
		console.log(name);
		await window.electron.send('delete-profile', name);
		closeWindow();
	}
</script>

<div id="title">
	<p>Are you sure?</p>
</div>

<button on:click={() => closeWindow()} id="button1">No</button>

<button on:click={() => deleteProfile(profileName)} id="button2">Yes</button>

<style>
	:root {
		--top-color: #4cbb17;
		--element-color: #48872b;
		--background-color: #39542c;
		--text-color: #293325;
	}
	#title {
		position: fixed;
		left: 47px;
		top: 16px;
		width: 136px;
		height: 28px;
		background-color: var(--element-color);
		border-radius: 5px;
	}
	p {
		color: var(--text-color);
		text-align: center;
		margin-top: 0;
		margin-bottom: 0;
	}

	button {
		background-color: var(--top-color);
		border-radius: 2px;
		border: none;
		text-align: center;
		font-size: 12px;
		color: var(--text-color);
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
	button:hover {
		border: 1px solid black;
	}

	#button1 {
		position: fixed;
		left: 52px;
		top: 70px;
		width: 50.55px;
		height: 26px;
	}
	#button2 {
		position: fixed;
		left: 128.55px;
		top: 70px;
		width: 50.55px;
		height: 26px;
	}
</style>
