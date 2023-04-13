const Papa = require('papaparse');
const fs = require('fs');

class DeIdentifier {

  static calculateAge(birthDate) {
    const diffInMs = Date.now() - new Date(birthDate).getTime();
    const ageDate = new Date(diffInMs);
    const result = Math.abs(ageDate.getUTCFullYear() - 1970);
    if(result >= 90) {
      return "90+"
    } else {
      return result
    }
  }
  static amendData(patient) {
    const amendedPatient = {};

    amendedPatient.age = this.calculateAge(patient.birthDate).toString();
    // amendedPatient.zipCode = this.transformZipcode(patient.zipCode).toString();

    return amendedPatient;
  }

  static readCsvFile() {
    const csvData = fs.readFileSync('./population_by_zcta_2010.csv', 'utf8');
    const parsedData = Papa.parse(csvData, { header: false });
    return parsedData.data;
  }

  
}

module.exports = DeIdentifier;