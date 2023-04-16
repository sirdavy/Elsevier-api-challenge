const Papa = require('papaparse');
const fs = require('fs');
const { ZipCodeTransformer } = require("./zipCodeTransformer");


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
    const transformer = new ZipCodeTransformer;
    return transformer.transform(zipCode);
  }

  static transformNotes(notes){
    let transformedNotes = notes;
    transformedNotes = transformedNotes.replace(/\b[\w\.-]+@[\w\.-]+\.\w{2,}\b/g, "xxxxxx");
    transformedNotes = transformedNotes.replace(/\(?(\d{3})\)?[.\-\s]?(\d{3})[.\-\s]?(\d{4})/g, "xxxxxxxxxx");
    transformedNotes = this.transformDates(transformedNotes);
    return transformedNotes;
  }

  static transformDates(str) {
    // Match YYYY-MM-DD format
    const yyyyMmDdRegex = /(\d{4})-(\d{2})-(\d{2})/g;
    str = str.replace(yyyyMmDdRegex, "$1");
  
    // Match DD-MM-YYYY and MM-DD-YYYY formats
    const ddMmYyyyRegex = /(\d{2})-(\d{2})-(\d{4})/g;
    str = str.replace(ddMmYyyyRegex, "$3");

    // Match DD/MM/YYYY and MM/DD/YYYY formats
    const ddMmYyyyRegexSlash = /(\d{2})\/(\d{2})\/(\d{4})/g;
    str = str.replace(ddMmYyyyRegexSlash, "$3");
  
    // Match MMMM DDth YYYY format
    const mmmmDdThYyyyRegex = /([A-Za-z]+) (\d{1,2})[a-z]{2} (\d{4})/g;
    str = str.replace(mmmmDdThYyyyRegex, "$3");

    // Match DDth MMMM YYYY format
    const dThmmmmYyyyRegex = /(\d{1,2})[a-z]{2} ([A-Za-z]+) (\d{4})/g;
    str = str.replace(dThmmmmYyyyRegex, "$3");
  
    // Match MMMM DD YYYY format
    const mmmmDdYyyyRegex = /([A-Za-z]+) (\d{1,2}) (\d{4})/g;
    str = str.replace(mmmmDdYyyyRegex, "$3");
  
    return str;
  }

  
  static amendData(patient) {
    const amendedPatient = {};
    amendedPatient.age = this.calculateAge(patient.birthDate).toString();
    amendedPatient.zipCode = this.transformZip(patient.zipCode).toString();
    amendedPatient.admissionYear = this.transformDates(patient.admissionDate).toString();
    amendedPatient.dischargeYear = this.transformDates(patient.dischargeDate).toString();
    amendedPatient.notes = this.transformNotes(patient.notes).toString();

    return amendedPatient;
  }

}

module.exports = DeIdentifier;