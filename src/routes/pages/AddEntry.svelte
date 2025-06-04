<script>
	let profileList = ['Profile 1', 'Profile 2', 'Profile 3', 'Profile 4'];
</script>

<form>
	<div id="title">
		<p>Date:</p>
	</div>

	<input type="week" />

	<div id="entryBox" class="element">
		<div>
			<label for="monday">
				Monday
				<br />
				weight:
			</label>
			<input id="monday" type="number" />
		</div>

		<div>
			<label for="tuesday">
				Tuesday
				<br />
				weight:
			</label>
			<input id="tuesday" type="number" />
		</div>

		<div>
			<label for="wednesday">
				Wednesday
				<br />
				weight:
			</label>
			<input id="wednesday" type="number" />
		</div>

		<div>
			<label for="thursday">
				Thursday
				<br />
				weight:
			</label>
			<input id="thursday" type="number" />
		</div>

		<div>
			<label for="friday">
				Friday
				<br />
				weight:
			</label>
			<input id="friday" type="number" />
		</div>

		<div>
			<label for="saturday">
				Saturday
				<br />
				weight:
			</label>
			<input id="saturday" type="number" />
		</div>

		<div>
			<label for="sunday">
				Sunday
				<br />
				weight:
			</label>
			<input id="sunday" type="number" />
		</div>

		<div>
			<label for="neck">Neck:</label>
			<input id="neck" type="number" />
		</div>

		<div>
			<label for="waist">Waist:</label>
			<input id="waist" type="number" />
		</div>

		<div>
			<label for="hips">Hips:</label>
			<input id="hips" type="number" />
		</div>
	</div>

	<button id="button1">Cancel</button>

	<input type="submit" id="button2" value="Add weekly entry" />
</form>

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
