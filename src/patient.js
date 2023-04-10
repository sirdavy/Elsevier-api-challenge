class Patient {

  constructor(data) {
    this.birthDate = data.birthDate;
    this.zipCode = data.zipCode;
    this.admissionDate = data.admissionDate;
    this.dischargeDate = data.dischargeDate;
    this.notes = data.notes;
  }
};

module.exports = Patient;

