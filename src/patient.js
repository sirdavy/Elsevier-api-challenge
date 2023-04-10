class Patient {
  constructor(data) {
    const errors = [];

    if (!this.validDate(data.birthDate)) {
      errors.push("Invalid birthdate format. Please use the format yyyy-mm-dd");
    }

    if (!this.validZipCode(data.zipCode)) {
      errors.push("Invalid zip code format. Please use a 5-digit code");
    }

    if (!this.validDate(data.admissionDate)) {
      errors.push(
        "Invalid admission date format. Please use the format yyyy-mm-dd"
      );
    }

    if (!this.validDate(data.dischargeDate)) {
      errors.push(
        "Invalid discharge date format. Please use the format yyyy-mm-dd"
      );
    }

    if (errors.length > 0) {
      throw new Error(errors.join("; "));
    }

    this.birthDate = data.birthDate;
    this.zipCode = data.zipCode;
    this.admissionDate = data.admissionDate;
    this.dischargeDate = data.dischargeDate;
    this.notes = data.notes;
  }

  validDate(date) {
    // Date format: YYYY-MM-DD
    const datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    // Check if the date string format is a match
    const matchArray = date.match(datePattern);
    if (matchArray == null) {
      return false;
    }
    return true;
  }

  validZipCode(zipCode) {
    const zipCodePattern = /^\d{5}(-\d{4})?$/;
    const matchArray = zipCode.match(zipCodePattern);
    if (matchArray == null) {
      return false;
    }
    return true;
  }
}

module.exports = Patient;
