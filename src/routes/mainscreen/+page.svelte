<script>
	import { useProfile } from '$lib/states/profile.svelte.js';
	let profile = useProfile();
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// defaults
	let profileName = ""
	let entriesList = [];
	let currentWeight = 69.2;
	let currentBodyfat = 22.3;
	let weightToLose = -4;
	let targetWeight = 65.2;
	let calorieConsumption = 1920;
	let targetCalories = 1400;
	let activityLevel = 3;
	let deficit = -500;
	let rate = -0.5;

	for (let index = 0; index < 30; index++) {
		entriesList.push({
			date: index,
			weight: 68.5 - index,
			bodyFat: 22.4 + index,
		});
	}

	// Calculates the change between entries
	const entryChange = (entry, prevEntry) => {
		let change = entry - prevEntry;
		if (change > 0) {
			return '+' + change.toFixed(1);
		} else if (change < 0) {
			return change.toFixed(1);
		}
		return '+0.0';
	};

	
	

	onMount(async () => {
		if (browser && window.electron) {
			profileName = await window.electron.invoke('get-temp-profile-name');
			console.log("Profile name:", profileName);
			entriesList = await window.electron.invoke('get-profile-entries', profileName);
			console.log(entriesList);

			currentWeight = entriesList[entriesList.length-1].weight_avg;
			currentBodyfat = entriesList[entriesList.length-1].bodyfat;
			targetWeight = await window.electron.invoke('get-profile-goal-weight', profileName) ?? currentWeight;
			console.log(targetWeight);
			weightToLose = Math.round((targetWeight - currentWeight) *10)/10;
			calorieConsumption = await window.electron.invoke('get-calorie-consumption', profileName);
			console.log("CalorieConsumption:", calorieConsumption);
			targetCalories = await window.electron.invoke('get-profile-target-calories', profileName);
			console.log("TargetCalories:", targetCalories);
			activityLevel = await window.electron.invoke('get-profile-activity-level', profileName);
			console.log("ActivityLevel:",activityLevel);
			deficit = targetCalories - calorieConsumption;
			rate = Math.round((deficit*7)/7700 * 10) / 10;
		}
	});
	const openAddEntry = () => {
		window.electron.send('open-add-entry', { name: profileName});
	}
	const openEditGoals = () => {
		window.electron.send('open-edit-goals');
	}
</script>

<button on:click={() => goto('/')} id="settings">Settings</button>

<div id="title" class="element">
	<p>{profileName}'s Profile</p>
</div>

<button id="undo">Undo</button>
<button id="redo">Redo</button>

<div id="infoBox" class="element">
	<div class="infoBoxLeft">
		<p>Current weight:</p>
	</div>
	<div class="infoBoxRight">
		<p>{currentWeight} Kg</p>
	</div>
	<div class="infoBoxLeft">
		<p>Current body fat:</p>
	</div>
	<div class="infoBoxRight">
		<p>{currentBodyfat}%</p>
	</div>
	<div class="infoBoxLeft">
		<p>Weight to lose:</p>
	</div>
	<div class="infoBoxRight">
		<p>{weightToLose} Kg</p>
	</div>
	<div class="infoBoxLeft">
		<p>Target weight:</p>
	</div>
	<div class="infoBoxRight">
		<p>{targetWeight} Kg</p>
	</div>
</div>

<div id="calorieBox" class="element">
	<div id="currentConsumption">
		<p>Current consumption:</p>
	</div>
	<div id="currentCalories">
		<p>{calorieConsumption}</p>
	</div>
	<div class="flexBreak" />
	<div id="activity">
		<p>Activity:</p>
	</div>
	<select id="activitySelector" bind:value={activityLevel}>
		<option value={0}>Basal Metabolic Rate (BMR)</option>
		<option value={1}>Sedentery: little or no exercise</option>
		<option value={2}>Light: exercise 1-3 times/week</option>
		<option value={3}>Moderate: exercise 4-5 times/week</option>
		<option value={4}>Active: daily exercise or intense exercise 3-4 times/week</option>
		<option value={5}>Very Active: intense exercise 6-7 times/week</option>
		<option value={6}>Extra Active: very intense exercise daily, or physical job</option>
	</select>
	<ul id="infoList">
		<li>Exercise: 15-30 minutes of elevated heart rate activity.</li>
		<li>Intense exercise: 45-120 minutes of elevated heart rate activity.</li>
		<li>Very intense exercise: 2+ hours of elevated heart rate activity.</li>
	</ul>
	<div id="targetCalories">
		<p>Target calories: {targetCalories} Deficit: {deficit} Rate: {rate}kg/week</p>
	</div>
</div>

<div id="entriesBox" class="element">
	<div id="entriesBoxTitle">
		<p>Date | Weekly avg | Body Fat</p>
	</div>
	<div id="entriesBoxList">
		<ul>
			{#each entriesList as entry, i}
				<li>
					{#if i === 0}
						<button>
							vko {entry.year_week} (28.04-04.05): {entry.weight_avg} Kg, +0.0 Kg, {entry.bodyfat}%,
							+0.0%
						</button>
					{:else}
						<button>
							vko {entry.year_week} (28.04-04.05): {entry.weight_avg} Kg, {entryChange(
								entry.weight_avg,
								entriesList[i - 1].weight_avg,
							)} Kg, {entry.bodyfat}%, {entryChange(
								entry.bodyfat,
								entriesList[i - 1].bodyfat,
							)}%
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>

<button on:click={openAddEntry} id="addWeeklyEntry" class="bigButton">Add weekly entry</button>
<button on:click={openEditGoals} id="editGoals" class="bigButton">Edit goals</button>
<button id="showMoreEntries" class="bigButton">Show more entries</button>
<button id="showFutureWeightEstimation" class="bigButton">Show future weight estimation</button>

<style>
	:root {
		--top-color: #4cbb17;
		--element-color: #48872b;
		--background-color: #39542c;
		--text-color: #293325;
	}
	#title {
		position: fixed;
		left: 303px;
		top: 20px;
		width: 194px;
		height: 36px;
		background-color: var(--element-color);
		border-radius: 5px;
	}
	p {
		color: var(--text-color);
		text-align: center;
		margin-top: 0;
		margin-bottom: 0;
	}
	ul {
		list-style-type: none;
		margin-top: 0;
		margin-bottom: 0;
		margin-left: 0;
		margin-right: 0;
		padding-left: 0;
	}

	.element {
		position: fixed;
		background-color: var(--element-color);
		border-radius: 5px;
	}

	#infoBox {
		left: 20px;
		top: 136px;
		width: 221px;
		height: 151px;
		padding-left: 10px;
		padding-top: 7px;
		display: flex;
		flex-wrap: wrap;
	}
	.infoBoxLeft {
		position: relative;
		width: 119.79px;
		height: 28.7px;
		background-color: var(--top-color);
		border-radius: 2px;
	}
	.infoBoxRight {
		position: relative;
		left: 20.3px;
		width: 60.91px;
		height: 28.7px;
		background-color: var(--top-color);
		border-radius: 2px;
	}
	.flexBreak {
		flex-basis: 100%;
	}
	#calorieBox {
		left: 339px;
		top: 136px;
		width: 441px;
		height: 151px;
		display: flex;
		flex-wrap: wrap;
		padding: 5px;
	}
	#currentConsumption {
		position: relative;
		width: 145px;
		height: 24px;
		background-color: var(--top-color);
		border-radius: 2px;
	}
	#currentCalories {
		position: relative;
		left: 12px;
		width: 47px;
		height: 24px;
		background-color: var(--top-color);
		border-radius: 2px;
	}
	#activity {
		position: relative;
		top: px;
		width: 80px;
		height: 24px;
		background-color: var(--top-color);
		border-radius: 2px;
	}
	#activitySelector {
		position: relative;
		left: 5px;
		top: px;
		width: 334px;
		height: 24px;
		background-color: var(--top-color);
		border-radius: 2px;
	}
	#infoList {
		list-style-type: disc;
		position: relative;
		left: 15px;
		top: 6px;
	}
	#infoList > li {
		font-family: Inter;
		font: medium;
		font-size: 10px;
	}
	#targetCalories {
		position: relative;
		left: px;
		top: px;
		width: 347px;
		height: 26px;
		background-color: var(--top-color);
		border-radius: 2px;
	}

	#entriesBox {
		left: 20px;
		top: 325px;
		width: 382px;
		height: 254px;
	}
	#entriesBoxTitle {
		position: relative;
		left: 5px;
		top: 5px;
		width: 372px;
		height: 21px;
		background-color: var(--top-color);
		border-radius: 2px;
	}
	#entriesBoxList {
		position: relative;
		left: 10px;
		top: 10px;
		width: 361px;
		height: 216px;
		overflow-y: scroll;
	}
	#entriesBoxList > ul > li > button {
		width: 353px;
		height: 25px;
		margin-bottom: 1px;
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
	#settings {
		position: fixed;
		left: 20px;
		top: 20px;
		width: 86px;
		height: 60px;
	}
	#undo {
		position: fixed;
		left: 603px;
		top: 20px;
		width: 56px;
		height: 34px;
	}
	#redo {
		position: fixed;
		left: 682px;
		top: 20px;
		width: 56px;
		height: 34px;
	}
	.bigButton {
		position: fixed;
		width: 153px;
		height: 52px;
	}
	#addWeeklyEntry {
		left: 429px;
		top: 370px;
	}
	#editGoals {
		left: 615.5px;
		top: 370px;
	}
	#showMoreEntries {
		left: 429px;
		top: 464px;
	}
	#showFutureWeightEstimation {
		left: 615.5px;
		top: 464px;
	}
</style>
