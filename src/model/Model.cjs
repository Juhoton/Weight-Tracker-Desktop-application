
class Model {
    constructor() {
        const { DataBaseRepository } = require('./database/DataBaseRepository.cjs');
        this.repo = new DataBaseRepository();

        const { Calculator } = require('./Calculator.cjs');
        this.Calculator = Calculator;
    }
    
    getAllProfileNames = () => {
        let list = [];
        const profileNames = this.repo.getAllProfileNames();
        profileNames.forEach(element => {
            list.push(element.name);
        });
        return list;
    }
    getProfileSettings = (name) => this.repo.getProfileSettings(name);
    getProfileEntries = (name) => this.repo.getProfileEntries(name);
    getProfileGoalType = (name) => {
        const goalType = this.repo.getProfileGoalType(name).goal_type;
        if (goalType !== null) {
            return goalType;
        } else {
            return "weight";
        }
    }
    getProfileGoalWeight = (name) => this.repo.getProfileGoalWeight(name).goal_weight;
    getProfileGoalBodyfat = (name) => this.repo.getProfileGoalBodyfat(name).goal_bodyfat;
    getProfileActivityLevel = (name) => this.repo.getProfileActivityLevel(name).activity_level;
    getProfileTargetCalories = (name) => this.repo.getProfileTargetCalories(name).target_calories;
    getEntry = (name, date) => this.repo.getEntry(name, date);

    // Add methods
    addProfile = (profile) => this.repo.addProfile(profile.name, profile.birthday, profile.height, profile.sex, 1);
    addEntry = (entry) => {
        const weight_avg = this.Calculator.avg([entry.weight_monday,entry.weight_tuesday,entry.weight_wednesday,entry.weight_thursday,entry.weight_friday,entry.weight_saturday,entry.weight_sunday]);
        const bodyfat = this.getBodyfat(entry.name, weight_avg, entry.neck, entry.waist,entry.hips);
        this.repo.addEntry(entry.name,entry.year_week,entry.weight_monday,entry.weight_tuesday,entry.weight_wednesday,entry.weight_thursday,entry.weight_friday,entry.weight_saturday,entry.weight_sunday,weight_avg,entry.neck,entry.waist,entry.hips,bodyfat);
        if (this.getProfileGoalType(entry.name) === "bodyfat") this.setProfileGoalWeight(entry.name, this.getGoalWeight(entry.name));
    }
    // Update methods
    setProfileSettings = (settings) => this.repo.setProfileSettings(settings.oldName, settings.newName, settings.birthday, settings.height, settings.sex)
    setProfileActivityLevel = (name, activity_level) => this.repo.setProfileActivityLevel(name, activity_level);
    setProfileGoalType = (name, goal_type) => this.repo.setProfileGoalType(name, goal_type);
    setProfileGoalWeight = (name, goal_weight) => this.repo.setProfileGoalWeight(name, parseFloat(goal_weight));
    setProfileGoalBodyfat = (name, goal_bodyfat) => { 
        this.repo.setProfileGoalBodyfat(name, parseFloat(goal_bodyfat));
        if (this.getProfileGoalType(name) === "bodyfat") this.setProfileGoalWeight(name, this.getGoalWeight(name))
    }
    setProfileTargetCalories = (name, target_calories) => this.repo.setProfileTargetCalories(name,parseInt(target_calories));
    setEntry = (entry) => {
        const weight_avg = this.Calculator.avg([entry.weight_monday,entry.weight_tuesday,entry.weight_wednesday,entry.weight_thursday,entry.weight_friday,entry.weight_saturday,entry.weight_sunday]);
        const bodyfat = this.getBodyfat(entry.name, weight_avg, entry.neck, entry.waist,entry.hips);
        this.repo.setEntry(entry.name,entry.year_week,entry.weight_monday,entry.weight_tuesday,entry.weight_wednesday,entry.weight_thursday,entry.weight_friday,entry.weight_saturday,entry.weight_sunday,weight_avg,entry.neck,entry.waist,entry.hips,bodyfat);
        if (this.getProfileGoalType(entry.name) === "bodyfat") this.setProfileGoalWeight(entry.name, this.getGoalWeight(entry.name));
    }

    getBodyfat = (name, weight, neck, waist, hips) => {
        const profileData = this.repo.getProfileDataForBodyfat(name);
        if (profileData.sex === 'female' && neck !== null && waist !== null && hips !== null) {
            return this.Calculator.bodyFat(profileData.birthday, profileData.sex, profileData.height, neck, waist, hips);
        } 
        else if (profileData.sex === 'male' && neck !== null && waist !== null) {
            return this.Calculator.bodyFat(profileData.birthday, profileData.sex, profileData.height, neck, waist);
        }
        else {
            return this.Calculator.bodyFat(profileData.birthday, profileData.sex, profileData.height, weight);
        }
    }

    getGoalWeight = (name) => {
        const profileData = this.repo.getProfileDataForWeightLossTarget(name);
        if (profileData.weight !== null && profileData.currentBodyFat) {
            return this.Calculator.weightLossTarget(profileData.weight, profileData.currentBodyFat, profileData.targetBodyFat);
        } else {
            return 0.0;
        }
    }

    getCalorieConsumption = (name) => {
        const profileData = this.repo.getProfileDataForCalories(name);
        if (profileData.bodyFat !== null) {
            return this.Calculator.calorie(profileData.birthday, profileData.sex, profileData.height, profileData.weight, profileData.activityLevel, profileData.bodyFat);
        }
        else if (profileData.weight !== null) {
            return this.Calculator.calorie(profileData.birthday, profileData.sex, profileData.height, profileData.weight, profileData.activityLevel);
        }
        else {
            return 2000;
        }
    }

    deleteProfile = (name) => this.repo.deleteProfile(name);
}

module.exports = { Model };