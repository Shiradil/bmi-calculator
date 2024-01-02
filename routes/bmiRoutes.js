const express = require('express');
const router = express.Router();
const calculateBMI = require('../bmiCalculator');

const validator = require('validator');
const bmiHistory = [];

router.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname + '/..' });
});

router.post('/bmicalculator', (req, res) => {
  const { height, weight, age, gender, unit } = req.body;
  if (!validator.isNumeric(height) || !validator.isNumeric(weight) || !validator.isNumeric(age)) {
    const errorMessage = 'Invalid input. Please enter numeric values.';

    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="/styles/style.css">
        <title>BMI Calculator</title>
      </head>
      <nav class="navbar navbar-dark bg-dark">
        <span class="navbar-brand mb-0 h1"><a class="btn btn-light" href="/">BMI Calculator</a></span>
        <a class="btn btn-light" href="/history">History</a>
      </nav>  
      <div class="alert alert-danger" role="alert">
        ${errorMessage}
      </div>
      </html>
    `);
  }

  const bmiResult = calculateBMI(height, weight, age, gender, unit);

  if (typeof bmiResult === 'string') {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="/styles/style.css">
        <title>BMI Calculator</title>
      </head>
      <nav class="navbar navbar-dark bg-dark">
        <span class="navbar-brand mb-0 h1"><a class="btn btn-light" href="/">BMI Calculator</a></span>
        <a class="btn btn-light" href="/history">History</a>
      </nav>
      <div class="alert alert-danger" role="alert">
        ${bmiResult}
      </div>
      </html>
    `);
  } else {
    const resultMessage = `BMI Result: ${bmiResult.bmi} - ${bmiResult.interpretation}`;
    const timestamp = new Date().toLocaleString();
    bmiHistory.push({ timestamp, result: resultMessage });

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="/styles/style.css">
        <title>BMI Calculator</title>
      </head>
      <nav class="navbar navbar-dark bg-dark">
        <span class="navbar-brand mb-0 h1"><a class="btn btn-light" href="/">BMI Calculator</a></span>
        <a class="btn btn-light" href="/history">History</a>
      </nav>
      <div class="alert alert-success" role="alert">
        ${resultMessage}
      </div>
      </html>
    `);
  }
});

router.get('/history', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      <link rel="stylesheet" href="/styles/style.css">
      <title>BMI Calculator History</title>
    </head>
    <nav class="navbar navbar-dark bg-dark">
      <span class="navbar-brand mb-0 h1">BMI Calculator History</span>
    </nav>
    <ul class="list-group mt-4">
      ${bmiHistory.map(entry => `<li class="list-group-item">${entry.timestamp}: ${entry.result}</li>`).join('')}
    </ul>
    </html>
  `);
});

module.exports = router;
