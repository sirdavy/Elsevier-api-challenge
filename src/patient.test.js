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
  })
});



