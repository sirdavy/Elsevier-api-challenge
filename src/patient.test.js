const Patient = require('./patient');

describe('Patient', () => {
  it('should be defined', () => {
    expect(Patient).toBeDefined();
  });

  describe('constructor', () => {
    it('should create a patient object when given valid input data', () =>{
      const validPatientData = {
        birthDate: "2000-01-01",
        zipCode: "10013",
        admissionDate: "2019-03-12",
        dischargeDate: "2019-03-14",
        notes: "Patient with ssn 123-45-6789 previously presented under different ssn"
      };
      const newPatient = new Patient(validPatientData);
      expect(newPatient.birthDate).toBe("2000-01-01")
      expect(newPatient.zipCode).toBe("10013")
      expect(newPatient.admissionDate).toBe("2019-03-12")
      expect(newPatient.dischargeDate).toBe("2019-03-14")
      expect(newPatient.notes).toBe("Patient with ssn 123-45-6789 previously presented under different ssn")
    })

    it('should throw an error if birthdate format invalid', () =>{
      const invalidPatientData = {
        birthDate: "24th March 1981",
        zipCode: "10013",
        admissionDate: "2019-03-12",
        dischargeDate: "2019-03-14",
        notes: "Patient with ssn 123-45-6789 previously presented under different ssn"
      }
      try {
        const newPatient = new Patient(invalidPatientData);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toEqual(new Error('Invalid birthdate format. Please use the format yyyy-mm-dd'));
      }
    });

    it('should throw an error if zipcode format invalid', () =>{
      const invalidPatientData = {
        birthDate: "2000-01-01",
        zipCode: "E12ND",
        admissionDate: "2019-03-12",
        dischargeDate: "2019-03-14",
        notes: "Patient with ssn 123-45-6789 previously presented under different ssn"
      }
      try {
        const newPatient = new Patient(invalidPatientData);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toEqual(new Error('Invalid zip code format. Please use a 5-digit code'));
      }
    });

    it('should throw an error if admission date format invalid', () =>{
      const invalidPatientData = {
        birthDate: "2000-01-01",
        zipCode: "10013",
        admissionDate: "5-11-2020",
        dischargeDate: "2019-03-14",
        notes: "Patient with ssn 123-45-6789 previously presented under different ssn"
      }
      try {
        const newPatient = new Patient(invalidPatientData);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toEqual(new Error('Invalid admission date format. Please use the format yyyy-mm-dd'));
      }
    });

    it('should throw an error if discharge date format invalid', () =>{
      const invalidPatientData = {
        birthDate: "2000-01-01",
        zipCode: "10013",
        admissionDate: "2019-03-12",
        dischargeDate: "bananas",
        notes: "Patient with ssn 123-45-6789 previously presented under different ssn"
      }
      try {
        const newPatient = new Patient(invalidPatientData);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toEqual(new Error('Invalid discharge date format. Please use the format yyyy-mm-dd'));
      }
    });




  })
});



// it('should create an error object if birthdate format invalid', () =>{
//   const invalidPatientData = {
//     birthDate: "24th March 1981",
//     zipCode: "E12ND",
//     admissionDate: "5-11-2020",
//     dischargeDate: "bananas",
//     notes: "Patient was admitted 5th November 2020"
//   }
//   const expectedError = { error: 'Invalid birthdate format. Please use the format yyyy-mm-dd;\
//    Invalid zip code format. Please use a 5-digit code;\
//     Invalid admission date format. Please use the format yyyy-mm-dd;\
//      Invalid discharge date format. Please use the format yyyy-mm-dd' };
//   const newPatient = new Patient(invalidPatientData)
//   expect(newPatient).toEqual(expectedError);
// })
// })



// const validPatientData = {
//   birthDate: "2000-01-01",
//   zipCode: "10013",
//   admissionDate: "2019-03-12",
//   dischargeDate: "2019-03-14",
//   notes: "Patient with ssn 123-45-6789 previously presented under different ssn"
// };