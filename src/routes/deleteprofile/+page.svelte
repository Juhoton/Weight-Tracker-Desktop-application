<script>
	import { useProfile } from '$lib/states/profile.svelte.js';
	let profile = useProfile();
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let profileList = [];

	const navigateToProfileSelection = () => {
		goto('/');
	};
	onMount(async () => {
		if (browser && window.electron) {
			profileList = await window.electron.invoke('get-profile-names');
		}
	});

	const openModal = (name) => {
		profile.set(name);
		console.log(profile.get);
		window.electron.send('open-delete-confirmation', { name});
	}
</script>

<div id="title">
	<p>Delete profile</p>
</div>

<div id="list">
	<ul>
		{#each profileList as profile}
			<li>
				<button id="item" on:click={() => openModal(profile)}>{profile}</button>
			</li>
		{/each}
	</ul>
</div>

<button on:click={navigateToProfileSelection} id="button1">Go back</button>

<style>
	:root {
		--top-color: #4cbb17;
		--element-color: #48872b;
		--background-color: #39542c;
		--text-color: #293325;
	}
	#title {
		position: fixed;
		left: 332.87px;
		top: 54px;
		width: 135.26px;
		height: 38.55px;
		background-color: var(--element-color);
		border-radius: 5px;
	}
	p {
		color: var(--text-color);
		text-align: center;
		margin-top: 0;
		margin-bottom: 0;
	}

	#list {
		position: fixed;
		top: 113px;
		left: 294px;
		background-color: var(--element-color);
		border-radius: 5px;
		width: 213px;
		height: 221px;
		overflow-y: scroll;
	}
	ul {
		position: absolute;
		top: 22.8px;
		list-style-type: none;
		margin: auto;
	}
	#item {
		background-color: var(--top-color);
		width: 123px;
		height: 31px;
		margin-bottom: 10px;
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
		width: 213px;
		height: 44px;
		position: fixed;
		left: 294px;
		top: 446px;
	}
</style>
