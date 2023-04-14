const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const Patient = require('./patient');
const DeIdentifier = require('./deIdentifier');

app.use(bodyParser.json());

app.post('/patients', (req, res) => {
  try {
    const patient = new Patient(req.body);
    const amendedPatient = DeIdentifier.amendData(patient);
    res.status(201).send(amendedPatient);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
