class DeIdentifier {

  static calculateAge(birthDate) {
    const diffInMs = Date.now() - new Date(birthDate).getTime();
    const ageDate = new Date(diffInMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  static amendData(patient) {
    const amendedPatient = {};

    amendedPatient.age = this.calculateAge(patient.birthDate).toString();

    return amendedPatient;
  }

}

module.exports = DeIdentifier;