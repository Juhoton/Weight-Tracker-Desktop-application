const path = require('path');

class DataBaseRepository {
	constructor() {
		const Database = require('better-sqlite3');
		const dbPath = path.resolve(__dirname, 'weightTrackerDataBase.db');
		this.db = new Database(dbPath);
		console.log('Database initialized at:', dbPath);
	}

	// gets identified from UI
	getAllProfileNames = () => {
		console.log('getAllProfileNames');
		const select = this.db.prepare('SELECT name FROM profiles');
		const names = select.all();
		console.log('Profile names:', names);
		return names;
	}

	getProfileSettings = (name) => {
		console.log('getProfileSettings:', name);
		const select = this.db.prepare('SELECT name, birthday, height, sex FROM profiles WHERE name = ?');
		const settings = select.get(name);
		console.log('Settings:', settings);
		return settings;
	}

	getProfileEntries = (name) => {
		console.log('getProfileEntries:', name);
		const select = this.db.prepare('SELECT id, year_week, weight_avg, bodyfat FROM entries WHERE profile_id = ? ORDER BY year_week ASC');
		const entries = select.all(this.#getProfileId(name));
		console.log('Entries:', entries);
		return entries;
	}

	getProfileGoalType = (name) => {
		console.log('getProfileGoalType:', name);
		const row = this.db.prepare('SELECT goal_type FROM profiles WHERE name = ?').get(name);
		console.log('Goal type:', row);
		return row;
	}

	getProfileGoalWeight = (name) => {
		console.log('getProfileGoalWeight:', name);
		const row = this.db.prepare('SELECT goal_weight FROM profiles WHERE name = ?').get(name);
		console.log('Goal weight:', row);
		return row;
	}

	getProfileGoalBodyfat = (name) => {
		console.log('getProfileGoalBodyfat:', name);
		const row = this.db.prepare('SELECT goal_bodyfat FROM profiles WHERE name = ?').get(name);
		console.log('Goal bodyfat:', row);
		return row;
	}

	getProfileActivityLevel = (name) => {
		console.log('getProfileActivityLevel:', name);
		const row = this.db.prepare('SELECT activity_level FROM profiles WHERE name = ?').get(name);
		console.log('Activity level:', row);
		return row;
	}

	getProfileTargetCalories = (name) => {
		console.log('getProfileTargetCalories:', name);
		const row = this.db.prepare('SELECT target_calories FROM profiles WHERE name = ?').get(name);
		console.log('Target calories:', row);
		return row;
	}

	getEntry = (name, date) => {
		console.log('getEntry:', { name, date });
		const row = this.db.prepare(`
			SELECT year_week, weight_monday, weight_tuesday, weight_wednesday, weight_thursday, weight_friday, weight_saturday, weight_sunday, weight_avg, neck, waist, hips, bodyfat
			FROM entries
			WHERE profile_id = ? AND year_week = ?`).get(this.#getProfileId(name), date);
		console.log('Entry:', row);
		return row;
	}

	getProfileDataForCalories = (name) => {
		console.log('getProfileDataForCalories:', name);
		const row = this.db.prepare(`
			SELECT birthday, sex, height, weight_avg, activity_level, bodyfat
			FROM profiles JOIN entries ON profiles.id = entries.profile_id
			WHERE name = ?
			ORDER BY year_week DESC
		`).get(name);
		console.log('Calories data:', row);
		return row;
	}

	getProfileDataForBodyfat = (name) => {
		console.log('getProfileDataForBodyfat:', name);
		const row = this.db.prepare('SELECT birthday, sex, height FROM profiles WHERE name = ?').get(name);
		console.log('Bodyfat data:', row);
		return row;
	}

	getProfileDataForWeightLossTarget = (name) => {
		console.log('getProfileDataForWeightLossTarget:', name);
		const row = this.db.prepare(`
			SELECT weight_avg, bodyfat, goal_bodyfat
			FROM profiles JOIN entries ON profiles.id = entries.profile_id
			WHERE name = ?
			ORDER BY year_week DESC
		`).get(name);
		console.log('Weight loss target data:', row);
		return row;
	}

	#getProfileId = (name) => {
		const row = this.db.prepare('SELECT id FROM profiles WHERE name = ?').get(name);
		console.log('getProfileId:', { name, row });
		if (!row) {
			throw new Error(`Profile with name '${name}' not found.`);
		}
		return row.id;
	}

	addProfile = (name, birthday, height, sex, activity_level) => {
		console.log('addProfile:', { name, birthday, height, sex, activity_level });
		const stmt = this.db.prepare('INSERT INTO profiles (name, birthday, height, sex, activity_level) VALUES (?, ?, ?, ?, ?)');
		stmt.run(name, birthday, height, sex, activity_level);
	}

	addEntry = (name, year_week, weight_monday, weight_tuesday, weight_wednesday, weight_thursday, weight_friday, weight_saturday, weight_sunday, weight_avg, neck, waist, hips, bodyfat) => {
		console.log('addEntry:', { name, year_week, weight_avg, bodyfat });
		const stmt = this.db.prepare(`
			INSERT INTO entries (
				profile_id, year_week, weight_monday, weight_tuesday, weight_wednesday, weight_thursday, weight_friday, weight_saturday, weight_sunday,
				weight_avg, neck, waist, hips, bodyfat
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`);
		stmt.run(this.#getProfileId(name), year_week, weight_monday, weight_tuesday, weight_wednesday, weight_thursday, weight_friday, weight_saturday, weight_sunday, weight_avg, neck, waist, hips, bodyfat);
	}

	setProfileSettings = (oldName, newName, birthday, height, sex) => {
		console.log('setProfileSettings:', { oldName, newName, birthday, height, sex });
		const stmt = this.db.prepare('UPDATE profiles SET name = ?, birthday = ?, height = ?, sex = ? WHERE name = ?');
		stmt.run(newName, birthday, height, sex, oldName);
	}

	setProfileActivityLevel = (name, activity_level) => {
		console.log('setProfileActivityLevel:', { name, activity_level });
		const stmt = this.db.prepare('UPDATE profiles SET activity_level = ? WHERE name = ?');
		stmt.run(activity_level, name);
	}

	setProfileGoalType = (name, goal_type) => {
		console.log('setProfileGoalType:', { name, goal_type });
		const result = this.db.prepare('UPDATE profiles SET goal_type = ? WHERE name = ?').run(goal_type, name);
		console.log('Result:', result);
	}

	setProfileGoalWeight = (name, goal_weight) => {
		console.log('setProfileGoalWeight:', { name, goal_weight });
		const result = this.db.prepare('UPDATE profiles SET goal_weight = ? WHERE name = ?').run(goal_weight, name);
		console.log('Result:', result);
	}

	setProfileGoalBodyfat = (name, goal_bodyfat) => {
		console.log('setProfileGoalBodyfat:', { name, goal_bodyfat });
		this.db.prepare('UPDATE profiles SET goal_bodyfat = ? WHERE name = ?').run(goal_bodyfat, name);
	}

	setProfileTargetCalories = (name, target_calories) => {
		console.log('setProfileTargetCalories:', { name, target_calories });
		this.db.prepare('UPDATE profiles SET target_calories = ? WHERE name = ?').run(target_calories, name);
	}

	setEntry = (name, year_week, weight_monday, weight_tuesday, weight_wednesday, weight_thursday, weight_friday, weight_saturday, weight_sunday, weight_avg, neck, waist, hips, bodyfat) => {
		console.log('setEntry:', { name, year_week, weight_avg, bodyfat });
		const stmt = this.db.prepare(`
			UPDATE entries
			SET weight_monday = ?, weight_tuesday = ?, weight_wednesday = ?, weight_thursday = ?, weight_friday = ?, weight_saturday = ?, weight_sunday = ?,
				weight_avg = ?, neck = ?, waist = ?, hips = ?, bodyfat = ?
			WHERE profile_id = ? AND year_week = ?
		`);
		stmt.run(weight_monday, weight_tuesday, weight_wednesday, weight_thursday, weight_friday, weight_saturday, weight_sunday, weight_avg, neck, waist, hips, bodyfat, this.#getProfileId(name), year_week);
	}

	deleteProfile = (name) => {
		console.log('deleteProfile:', name);
		this.#deleteEntries(name);
		const stmt = this.db.prepare('DELETE FROM profiles WHERE name = ?');
		const result = stmt.run(name);
		console.log('Profile delete result:', result);
	}

	#deleteEntries = (name) => {
		console.log('#deleteEntries:', name);
		const stmt = this.db.prepare('DELETE FROM entries WHERE profile_id = ?');
		const result = stmt.run(this.#getProfileId(name));
		console.log('Entry delete result:', result);
	}
}

module.exports = { DataBaseRepository };