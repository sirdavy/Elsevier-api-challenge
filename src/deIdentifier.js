const Papa = require('papaparse');
const fs = require('fs');
const ZipCodeTransformer = require("./zipCodeTransformer");


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

  static transformZip(zipCode) {
    const transform = new ZipCodeTransformer;
    return transform.transform(zipCode);
  }

  static transformDateToYear(date) {
    return date.substring(0,4)
  }

  static amendData(patient) {
    const amendedPatient = {};
    amendedPatient.age = this.calculateAge(patient.birthDate).toString();
    amendedPatient.zipCode = this.transformZip(patient.zipCode).toString();
    amendedPatient.admissionYear = this.transformDateToYear(patient.admissionDate).toString();
    amendedPatient.dischargeYear = this.transformDateToYear(patient.dischargeDate).toString();
    return amendedPatient;
  }

}

module.exports = DeIdentifier;