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

	const toNumber = (val) => {
		const num = parseFloat(val);
		return isNaN(num) ? null : num;
	};

	const addEntry = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const rawData = Object.fromEntries(formData);
		const data = {
			...rawData,
			name: profileName,
			weight_monday: toNumber(rawData.weight_monday),
			weight_tuesday: toNumber(rawData.weight_tuesday),
			weight_wednesday: toNumber(rawData.weight_wednesday),
			weight_thursday: toNumber(rawData.weight_thursday),
			weight_friday: toNumber(rawData.weight_friday),
			weight_saturday: toNumber(rawData.weight_saturday),
			weight_sunday: toNumber(rawData.weight_sunday),
			neck: toNumber(rawData.neck),
			waist: toNumber(rawData.waist),
			hips: toNumber(rawData.hips),
		};

		console.log("Data sent to backend:", data);
		if (!data.year_week) return;

		await window.electron.send('send-add-entry', data);
		closeWindow();
	};
</script>

<form on:submit={addEntry}>
	<div id="title">
		<p>Date:</p>
	</div>

	<input type="week" name="year_week"/>

	<div id="entryBox" class="element">
		<div>
			<label for="monday">
				Monday
				<br />
				weight:
			</label>
			<input id="monday" type="number" name="weight_monday"/>
		</div>

		<div>
			<label for="tuesday">
				Tuesday
				<br />
				weight:
			</label>
			<input id="tuesday" type="number" name="weight_tuesday"/>
		</div>

		<div>
			<label for="wednesday">
				Wednesday
				<br />
				weight:
			</label>
			<input id="wednesday" type="number" name="weight_wednesday"/>
		</div>

		<div>
			<label for="thursday">
				Thursday
				<br />
				weight:
			</label>
			<input id="thursday" type="number" name="weight_thursday"/>
		</div>

		<div>
			<label for="friday">
				Friday
				<br />
				weight:
			</label>
			<input id="friday" type="number" name="weight_friday"/>
		</div>

		<div>
			<label for="saturday">
				Saturday
				<br />
				weight:
			</label>
			<input id="saturday" type="number" name="weight_saturday"/>
		</div>

		<div>
			<label for="sunday">
				Sunday
				<br />
				weight:
			</label>
			<input id="sunday" type="number" name="weight_sunday"/>
		</div>

		<div>
			<label for="neck">Neck:</label>
			<input id="neck" type="number" name ="neck"/>
		</div>

		<div>
			<label for="waist">Waist:</label>
			<input id="waist" type="number" name="waist"/>
		</div>

		<div>
			<label for="hips">Hips:</label>
			<input id="hips" type="number" name="hips"/>
		</div>
	</div>

	<input type="submit" id="button2" value="Add weekly entry" />
</form>

<button on:click={closeWindow} id="button1">Cancel</button>

<style>
	:root {
		--top-color: #4cbb17;
		--element-color: #48872b;
		--background-color: #39542c;
		--text-color: #293325;
	}
	#title {
		position: fixed;
		left: 181px;
		top: 15px;
		width: 40px;
		height: 25px;
		background-color: var(--top-color);
		border-radius: 5px;
	}
	p {
		color: var(--text-color);
		text-align: center;
		margin-top: 0;
		margin-bottom: 0;
	}
	.element {
		position: fixed;
		background-color: var(--element-color);
		border-radius: 5px;
	}
	input[type='week'] {
		position: fixed;
		left: 231px;
		top: 15px;
		width: 133px;
		height: 25px;
		background-color: var(--top-color);
	}
	#entryBox {
		position: fixed;
		left: 10px;
		top: 53px;
		width: 530px;
		height: 142px;
		display: flex;
		flex-wrap: wrap;
		padding-left: 5px;
	}
	#entryBox > div {
		width: 70px;
		height: 60.94px;
	}
	input[type='number'] {
		display: block;
		box-sizing: border-box;
		width: 50px;
		height: 25px;
		background-color: var(--top-color);
		border-radius: 2px;
		margin-right: 30px;
		border: 1px solid black;
		border-radius: 2px;
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
		left: 134px;
		top: 206px;
		width: 128px;
		height: 37px;
	}
	#button2 {
		position: fixed;
		left: 284px;
		top: 206px;
		width: 128px;
		height: 37px;
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
