<script>
	import { useProfile } from "$lib/states/profile.svelte.js";
	let profile = useProfile();
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let profileList = ['Profile 1', 'Profile 2', 'Profile 3', 'Profile 4'];

	const navigateToProfile = (name) => {
		profile.set(name);
		window.electron.send('set-temp-profile-name', name);
		goto('/mainscreen'); // replace with your target route
	};
	onMount(async () => {
		if (browser && window.electron) {
			profileList = await window.electron.invoke('get-profile-names');
		}
	});
</script>

<div id="title">
	<p>Profile list</p>
</div>

<div id="list">
	<ul>
		{#each profileList as profile}
			<li>
				<button on:click={() => navigateToProfile(profile)} id="item">{profile}</button>
			</li>
		{/each}
	</ul>
</div>

<button on:click={() => {goto('/profilecreation');}} id="button1">Make new profile</button>

<button on:click={() => {goto('/deleteprofile');}} id="button2">Delete profile</button>

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
		top: 383px;
	}
	#button2 {
		width: 213px;
		height: 44px;
		position: fixed;
		left: 294px;
		top: 446px;
	}
</style>
