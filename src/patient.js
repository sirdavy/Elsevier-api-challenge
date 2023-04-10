class Patient {

  constructor(data) {
    const errors = [];
    
    if (!this.validBirthDate(data.birthDate)) {
      errors.push('Invalid birthdate format. Please use the format yyyy-mm-dd');
    }
    
    if (errors.length > 0) {
      throw new Error(errors.join('; '));
    }

    this.birthDate = data.birthDate;
    this.zipCode = data.zipCode;
    this.admissionDate = data.admissionDate;
    this.dischargeDate = data.dischargeDate;
    this.notes = data.notes;
    }
  

  validBirthDate(birthDate) {
    // Date format: YYYY-MM-DD
    const datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    // Check if the date string format is a match
    const matchArray = birthDate.match(datePattern);
    if (matchArray == null) {
        return false;
    }
    return true;
  }

};

module.exports = Patient;

