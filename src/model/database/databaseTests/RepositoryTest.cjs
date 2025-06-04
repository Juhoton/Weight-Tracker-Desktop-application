const { DataBaseRepository } = require("../DataBaseRepository.cjs");

const dbRepo = new DataBaseRepository();

const name = "test1";

console.log("Profile list:", dbRepo.getAllProfileNames());
console.log("Profile settings:", dbRepo.getProfileSettings("test1"));

console.log("Profile entries:", dbRepo.getProfileEntries(name));
console.log("Goal weight:", dbRepo.getProfileGoalWeight(name));
console.log("Goal bodyfat:", dbRepo.getProfileGoalBodyfat (name));
console.log("Activity level:", dbRepo.getProfileActivityLevel (name));

// gets indentified from Calculator
console.log("calories data:", dbRepo.getProfileDataForCalories(name));
console.log("bodyfat data:", dbRepo.getProfileDataForBodyfat(name, "2025-W24"));
console.log("weight loss target data:", dbRepo.getProfileDataForWeightLossTarget(name))