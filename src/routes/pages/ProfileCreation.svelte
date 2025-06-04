<script>
	let profileList = ['Profile 1', 'Profile 2', 'Profile 3', 'Profile 4'];
</script>

<div id="title">
	<p>Profile creation</p>
</div>

<div id="list">
	<form>
		<label for="username">Username:</label>
		<input id="username" type="text" placeholder="(3-10 char)" minlength="3" maxlength="10" />

		<label for="birthday">Birthday:</label>
		<input
			id="birthday"
			type="date"
			placeholder="2000-01-01"
			min="1950-01-01"
			max="2020-01-01"
		/>

		<label for="height">Height:</label>
		<input id="height" type="number" placeholder="(cm)" min="10" max="300" />

		<label for="sex">Biological sex:</label>
		<select id="sex">
			<option>Male</option>
			<option>Female</option>
		</select>
		<input id="button2" type="submit" value="Create profile" />
	</form>
</div>

<button id="button1">Go back</button>

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
