const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');

const Patient = require('../src/patient');
const DeIdentifier = require('../src/deIdentifier');

const app = express();
app.use(bodyParser.json());

describe('POST /patients', () => {
  test('it should create a new patient with de-identified data', () => {
    // create a mock request object
    const req = {
      body: {
        "birthDate": "1990-01-01",
        "zipCode": "12345",
        "admissionDate": "2021-01-01",
        "dischargeDate": "2021-01-02",
        "notes": "mike@mike.com Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ultricies mi."
      }
    };

    // mock the DeIdentifier.amendData function
    DeIdentifier.amendData = jest.fn().mockReturnValue({
      "age": "23",
      "zipCode": "12300",
      "admissionYear": "2021",
      "dischargeYear": "2021",
      "notes": "xxxxxx Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ultricies mi."
    });

    // call the app.post function with the mock request object
    app.post('/patients', (req, res) => {
      try {
        const patient = new Patient(req.body);
        const amendedPatient = DeIdentifier.amendData(patient);
        res.status(201).send(amendedPatient);
      } catch (err) {
        res.status(400).send({ error: err.message });
      }
    });

    // send the mock request object to the app.post function
    return request(app)
      .post('/patients')
      .send(req.body)
      .then((res) => {
        // check that DeIdentifier.amendData was called with the correct arguments
        expect(DeIdentifier.amendData).toHaveBeenCalledWith(new Patient(req.body));
        // check that the response status and body are correct
        expect(res.status).toBe(201);
        expect(res.body).toEqual({
          "age": "23",
          "zipCode": "12300",
          "admissionYear": "2021",
          "dischargeYear": "2021",
          "notes": "xxxxxx Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ultricies mi."
        });
      });
  });

  test('it should return 400 if invalid patient data is sent', () => {
    // create a mock request object with invalid data
    const req = {
      body: {
        "birthDate": "5th November 2015",
        "zipCode": "1234",
        "admissionDate": "September 9th 2022",
        "dischargeDate": "09-11-2022",
        "notes": "mike@mike.com Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ultricies mi."
      }
    };
  
    // call the app.post function with the mock request object
    return request(app)
      .post('/patients')
      .send(req.body)
      .then((res) => {
        // check that the response status and body are correct
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          error: 'Invalid birthdate format. Please use the format yyyy-mm-dd; Invalid zip code format. Please use a 5-digit code; Invalid admission date format. Please use the format yyyy-mm-dd; Invalid discharge date format. Please use the format yyyy-mm-dd'
        });
      });
  });


});
