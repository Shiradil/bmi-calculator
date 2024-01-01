function calculateBMI(height, weight, age, gender, unit) {
    // Convert height and weight to numbers
    height = parseFloat(height);
    weight = parseFloat(weight);
  
    // Check if height and weight are valid numbers
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      return "Invalid input. Please enter valid height and weight.";
    }
  
    // BMI calculation based on unit (metric or imperial)
    let bmi;
    if (unit === "metric") {
      // BMI calculation for metric units (height in meters, weight in kilograms)
      bmi = weight / Math.pow(height / 100, 2);
    } else if (unit === "imperial") {
      // BMI calculation for imperial units (height in inches, weight in pounds)
      bmi = (weight / Math.pow(height, 2)) * 703;
    } else {
      return "Invalid unit. Please select either metric or imperial.";
    }
  
    // Interpretation of BMI result
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
  
    // Additional considerations based on age and gender (you can customize this part)
    if (age < 18) {
      interpretation += " (Youth)";
    }
    if (gender === "female") {
      interpretation += " (Female)";
    }
    // bmiCalculator.js
  
    return {
      bmi: bmi.toFixed(2), // Round BMI to two decimal places
      interpretation: interpretation,
    };
    
  }
  // bmiCalculator.js


  
  
module.exports = calculateBMI;
  
