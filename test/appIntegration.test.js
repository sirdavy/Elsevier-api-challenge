const request = require('supertest');
const app = require('../src/app');

describe('POST /patients', () => {

  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });


  test('it should create a new patient', async () => {
    const newPatient = {
      "birthDate": "1990-01-01",
      "zipCode": "12345",
      "admissionDate": "2021-01-01",
      "dischargeDate": "2021-01-02",
      "notes": "mike@mike.com Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ultricies mi."
};

    const response = await request(server)
      .post('/patients')
      .send(newPatient);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('zipCode', '12300')
    expect(response.body).toHaveProperty('admissionYear', '2021');
    expect(response.body).toHaveProperty('dischargeYear', '2021');
    expect(response.body).toHaveProperty('notes', 'xxxxxx Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ultricies mi.');
  });

  test('it should return 400 if invalid patient data is sent', async () => {
    const invalidPatient = {
      "birthDate": "5th November 2015",
      "zipCode": "1234",
      "admissionDate": "September 9th 2022",
      "dischargeDate": "09-11-2022",
      "notes": "mike@mike.com Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ultricies mi."
};

    const response = await request(server)
      .post('/patients')
      .send(invalidPatient);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid birthdate format. Please use the format yyyy-mm-dd; Invalid zip code format. Please use a 5-digit code; Invalid admission date format. Please use the format yyyy-mm-dd; Invalid discharge date format. Please use the format yyyy-mm-dd')
  });
});
