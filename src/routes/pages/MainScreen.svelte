<script>
	let entriesList = [];
	for (let index = 0; index < 30; index++) {
		entriesList.push({
			date: index,
			weight: 68.5 - index,
			bodyFat: 22.4 + index,
		});
	}
	const entryChange = (entry, prevEntry) => {
		let change = entry - prevEntry;
		if (change > 0) {
			return '+' + change.toFixed(1);
		} else if (change < 0) {
			return change.toFixed(1);
		}
		return '+0.0';
	};
	console.log(entriesList);
</script>

<button id="settings">Settings</button>

<div id="title" class="element">
	<p>Profile1's Profile</p>
</div>

<button id="undo">Undo</button>
<button id="redo">Redo</button>

<div id="infoBox" class="element">
	<div class="infoBoxLeft">
		<p>Current weight:</p>
	</div>
	<div class="infoBoxRight">
		<p>69.2 Kg</p>
	</div>
	<div class="infoBoxLeft">
		<p>Current body fat:</p>
	</div>
	<div class="infoBoxRight">
		<p>22,3%</p>
	</div>
	<div class="infoBoxLeft">
		<p>Weight to lose:</p>
	</div>
	<div class="infoBoxRight">
		<p>-4 Kg</p>
	</div>
	<div class="infoBoxLeft">
		<p>Target weight:</p>
	</div>
	<div class="infoBoxRight">
		<p>65.2 Kg</p>
	</div>
</div>

<div id="calorieBox" class="element">
	<div id="currentConsumption">
		<p>Current consumption:</p>
	</div>
	<div id="currentCalories">
		<p>1920</p>
	</div>
	<div class="flexBreak" />
	<div id="activity">
		<p>Activity:</p>
	</div>
	<select id="activitySelector">
		<option>Basal Metabolic Rate (BMR)</option>
		<option>Sedentery: little or no exercise</option>
		<option>Light: exercise 1-3 times/week</option>
		<option>Moderate: exercise 4-5 times/week</option>
		<option>Active: daily exercise or intense exercise 3-4 times/week</option>
		<option>Very Active: intense exercise 6-7 times/week</option>
		<option>Extra Active: very intense exercise daily, or physical job</option>
	</select>
	<ul id="infoList">
		<li>Exercise: 15-30 minutes of elevated heart rate activity.</li>
		<li>Intense exercise: 45-120 minutes of elevated heart rate activity.</li>
		<li>Very intense exercise: 2+ hours of elevated heart rate activity.</li>
	</ul>
	<div id="targetCalories">
		<p>Target calories: 1400 Deficit: -520 Rate: -0.5kg/week</p>
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
							vko {entry.date} (28.04-04.05): {entry.weight} Kg, +0.0 Kg, {entry.bodyFat}%,
							+0.0%
						</button>
					{:else}
						<button>
							vko {entry.date} (28.04-04.05): {entry.weight} Kg, {entryChange(
								entry.weight,
								entriesList[i - 1].weight,
							)} Kg, {entry.bodyFat}%, {entryChange(
								entry.bodyFat,
								entriesList[i - 1].bodyFat,
							)}%
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>

<button id="addWeeklyEntry" class="bigButton">Add weekly entry</button>
<button id="editGoals" class="bigButton">Edit goals</button>
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
		overflow: scroll;
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
