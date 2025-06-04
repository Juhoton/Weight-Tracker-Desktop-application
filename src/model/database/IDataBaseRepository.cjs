class IDataBaseRepository {
    // gets identified from UI
    // Gets identified from UI
    getAllProfileNames = () => {}
    getProfileSettings = (name) => {}
    getProfileEntries = (name) => {}
    getProfileGoalType = (name) => {}
    getProfileGoalWeight = (name) => {}
    getProfileGoalBodyfat = (name) => {}
    getProfileActivityLevel = (name) => {}
    getProfileTargetCalories = (name) => {}
    getEntry = (name, date) => {}
    // Gets identified from Calculator
    getProfileDataForCalories = (name) => {}
    getProfileDataForBodyfat = (name, date) => {}
    getProfileDataForWeightLossTarget = (name) => {}
    // Private helper
    #getProfileId = (name) => {}
    // Add methods
    addProfile = (name, birthday, height, sex, activity_level) => {}
    addEntry = (name,year_week,weight_monday,weight_tuesday,weight_wednesday,weight_thursday,weight_friday,weight_saturday,weight_sunday,weight_avg,neck,waist,hips,bodyfat) => {}
    // Update methods
    setProfileSettings = (name, birthday, height, sex) => {}
    setProfileActivityLevel = (name, activity_level) => {}
    setProfileGoalType = (name, goal_type) => {}
    setProfileGoalWeight = (name, goal_weight) => {}
    setProfileGoalBodyfat = (name, goal_bodyfat) => {}
    setProfileTargetCalories = (name, target_calories) => {}
    setEntry = (name,year_week,weight_monday,weight_tuesday,weight_wednesday,weight_thursday,weight_friday,weight_saturday,weight_sunday,weight_avg,neck,waist,hips,bodyfat) => {}
}
