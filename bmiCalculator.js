function calculateBMI(height, weight, age, gender, unit) {
    height = parseFloat(height);
    weight = parseFloat(weight);
  
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      return "Invalid input. Please enter valid height and weight.";
    }
  
    let bmi;
    if (unit === "metric") {
      bmi = weight / Math.pow(height / 100, 2);
    } else if (unit === "imperial") {
      bmi = (weight / Math.pow(height, 2)) * 703;
    } else {
      return "Invalid unit. Please select either metric or imperial.";
    }
  
    let interpretation = "";
    if (bmi < 18.5) {
      interpretation = "Underweight";
    } else if (bmi < 25) {
      interpretation = "Normal weight";
    } else if (bmi < 30) {
      interpretation = "Overweight";
    } else {
      interpretation = "Obese";
    }
  
    if (age < 18) {
      interpretation += " (Youth)";
    }
    if (gender === "female") {
      interpretation += " (Female)";
    }
  
    return {
      bmi: bmi.toFixed(2),
      interpretation: interpretation,
    };
    
  }
  
module.exports = calculateBMI;
  
