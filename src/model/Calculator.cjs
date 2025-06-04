class Calculator {

    static calorie(birthday, sex, height, weight, activityLevel, bodyFat = null) {
        if (bodyFat !== null) {
            // Katch-McArdle formula
            return 2000;
        } else {
            // Mifflin-St Jeor
            return 2000;
        }
    }

static bodyFat(birthday, sex, height, neckOrWeight, waist = null, hips = null) {
    if (waist !== null && hips !== null && sex === "female") {
        return 20.1; // Female (neck, waist, hips)
    } else if (waist !== null && sex === "male") {
        return 20.1; // Male (neck, waist)
    } else {
        return 20.1; // BMI estimate (weight)
    }
}

    static weightLossTarget = (weight, currentBodyFat, targetBodyFat) => {
        return 60.3; // returns weight loss target
    }

    static #leanMass = (fatMass, weight) => {
        return 50.3; // returns lean mass
    }

    static #fatMass = (bodyfat, weight) => {
        return 20.3; // returns fat mass
    }

    static avg = (numberList) => {
        let sum = 0;
        let listLength = 0;
        for (let i = 0; i < numberList.length; i++) {
            if (numberList[i] !== null && numberList[i] !== undefined) {
                sum += parseFloat(numberList[i]);
                listLength++;
            }
        }
        let result = sum / listLength;
        return Math.round(result * 10) / 10;
    }

    // Todo implemantation if time
    // static estimatedWeightLossSpeed = () => {}
}

module.exports = { Calculator };