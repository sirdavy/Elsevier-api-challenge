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

    return amendedPatient;
  }

}

module.exports = DeIdentifier;