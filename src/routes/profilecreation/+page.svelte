<script>
	import { useProfile } from '$lib/states/profile.svelte.js';
	let profile = useProfile();
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const submitForm = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		console.log(data);
		if (data.name === "" || data.birthday === "" || data.height === ""|| data.sex === "") return;
		window.electron.send('set-temp-profile-name', data.name);
		await window.electron.send('send-profile', data);
		goto('/mainscreen');
  };
</script>

<div id="title">
	<p>Profile creation</p>
</div>

<div id="list">
	<form on:submit|preventDefault={submitForm}>
		<label for="username">Username:</label>
		<input id="username" type="text" name="name" placeholder="(3-10 char)" minlength="3" maxlength="10" />

		<label for="birthday">Birthday:</label>
		<input
			id="birthday"
			name="birthday"
			type="date"
			placeholder="2000-01-01"
			min="1950-01-01"
			max="2020-01-01"
		/>

		<label for="height">Height:</label>
		<input id="height" type="number" name="height" placeholder="(cm)" min="10" max="300" />

		<label for="sex">Biological sex:</label>
		<select id="sex" name="sex">
			<option value="male">Male</option>
			<option value="female">Female</option>
		</select>
		<button id="button2" type="submit">Create profile</button>
	</form>
</div>

<button on:click={() => {goto('/');}} id="button1">Go back</button>

<style>
	:root {
		--top-color: #4cbb17;
		--element-color: #48872b;
		--background-color: #39542c;
		--text-color: #293325;
	}
	#title {
		position: fixed;
		left: 310px;
		top: 60px;
		width: 180px;
		height: 39px;
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
		left: 232px;
		top: 119px;
		background-color: var(--element-color);
		border-radius: 5px;
		width: 336px;
		height: 290px;
	}
	form {
		position: relative;
		left: 57px;
		top: 25.3px;
	}
	input[type='text'],
	input[type='date'],
	input[type='number'],
	select {
		width: 222px;
		height: 31px;
		display: block;
		box-sizing: border-box;
		background-color: var(--top-color);
		border: 1px solid black;
		border-radius: 2px;
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
		left: 167px;
		top: 452px;
	}
	#button2 {
		width: 213px;
		height: 44px;
		position: fixed;
		left: 419px;
		top: 452px;
		background-color: var(--top-color);
		border-radius: 2px;
		border: none;
		text-align: center;
		font-size: 12px;
		color: var(--text-color);
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
	#button2:hover {
		border: 1px solid black;
	}
</style>
