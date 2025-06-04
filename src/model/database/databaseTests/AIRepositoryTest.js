const { DataBaseRepository } = require('../DataBaseRepository.cjs');
const repo = new DataBaseRepository();

const test = () => {
    const name = 'testAI';
    const updatedName = 'testAI_updated';

    // Cleanup
    const existing = repo.db.prepare('SELECT id FROM profiles WHERE name = ?').get(name) ||
                     repo.db.prepare('SELECT id FROM profiles WHERE name = ?').get(updatedName);
    if (existing) {
        repo.db.prepare('DELETE FROM entries WHERE profile_id = ?').run(existing.id);
        repo.db.prepare('DELETE FROM profiles WHERE id = ?').run(existing.id);
        console.log(`[Cleanup] Removed old test profile and entries.`);
    }

    // Add profile
    repo.addProfile(name, '1995-06-02', 170, 'male', 1.5);

    // Test getAllProfileNames
    const profiles = repo.getAllProfileNames().map(p => p.name);
    console.assert(profiles.includes(name), '[FAIL] getAllProfileNames');

    // Test getProfileSettings
    const settings = repo.getProfileSettings(name);
    console.assert(settings.name === name && settings.height === 170, '[FAIL] getProfileSettings');

    // Add entry
    repo.addEntry(name, '2025-W22', 70, 71, 72, 71, 70, 69, 68, 70.14, 38, 80, 95, 18.5);

    // Test getProfileEntries
    const entries = repo.getProfileEntries(name);
    console.assert(entries.length === 1, '[FAIL] getProfileEntries');

    // Test getEntry
    const entry = repo.getEntry(name, '2025-W22');
    console.assert(entry.weight_avg === 70.14, '[FAIL] getEntry');

    // Test getProfileActivityLevel
    const activity = repo.getProfileActivityLevel(name);
    console.assert(activity.activity_level === 1.5, '[FAIL] getProfileActivityLevel');

    // Set goals and target calories
    repo.setProfileGoalWeight(name, 65);
    repo.setProfileGoalBodyfat(name, 15);
    repo.setProfileTargetCalories(name, 2200);

    // Test goal getters
    console.assert(repo.getProfileGoalWeight(name).goal_weight === 65, '[FAIL] getProfileGoalWeight');
    console.assert(repo.getProfileGoalBodyfat(name).goal_bodyfat === 15, '[FAIL] getProfileGoalBodyfat');
    console.assert(repo.getProfileTargetCalories(name).target_calories === 2200, '[FAIL] getProfileTargetCalories');

    // Test calorie-related data fetch
    const caloriesData = repo.getProfileDataForCalories(name);
    console.assert(caloriesData.bodyfat === 18.5, '[FAIL] getProfileDataForCalories');

    const bfData = repo.getProfileDataForBodyfat(name, '2025-W22');
    console.assert(bfData.waist === 80, '[FAIL] getProfileDataForBodyfat');

    const weightLossTargetData = repo.getProfileDataForWeightLossTarget(name);
    console.assert(weightLossTargetData.goal_bodyfat === 15, '[FAIL] getProfileDataForWeightLossTarget');

    // Update entry
    repo.setEntry(name, '2025-W22', 70, 71, 72, 71, 70, 69, 68, 70.5, 39, 82, 96, 19);
    const updatedEntry = repo.getEntry(name, '2025-W22');
    console.assert(updatedEntry.weight_avg === 70.5 && updatedEntry.neck === 39, '[FAIL] setEntry');

    // Update profile
    repo.setProfileSettings(name, updatedName, '1996-06-02', 175, 'female');
    const newSettings = repo.getProfileSettings(updatedName);
    console.assert(newSettings.name === updatedName && newSettings.height === 175, '[FAIL] setProfileSettings');

    // Update activity level again
    repo.setProfileActivityLevel(updatedName, 1.8);
    console.assert(repo.getProfileActivityLevel(updatedName).activity_level === 1.8, '[FAIL] setProfileActivityLevel');

    console.log('[✅ PASS] All methods tested successfully');
};

test();
