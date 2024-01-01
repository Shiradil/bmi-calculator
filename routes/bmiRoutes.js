// bmiRoutes.js

const express = require('express');
const router = express.Router();
const calculateBMI = require('../bmiCalculator');

router.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname + '/..' });
});

router.post('/bmicalculator', (req, res) => {
  const { height, weight, age, gender, unit } = req.body;
  const bmiResult = calculateBMI(height, weight, age, gender, unit);

  if (typeof bmiResult === 'string') {
    // If there was an error, send it as is
    res.send(bmiResult);
  } else {
    // If the result is an object, format it for display
    res.send(`BMI Result: ${bmiResult.bmi} - ${bmiResult.interpretation}`);
  }
});

module.exports = router;
