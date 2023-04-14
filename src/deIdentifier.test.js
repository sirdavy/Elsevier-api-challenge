const DeIdentifier = require("./deIdentifier");
const ZipCodeTransformer = require("./zipCodeTransformer");


describe("DeIdentifier", () => {
  it("should be defined", () => {
    expect(DeIdentifier).toBeDefined();
  });
});

describe("constructor", () => {
  it("should convert a birthdate into age of a mocked patient", () => {
    const deIdentify = new DeIdentifier();
    const patientDouble = { 
    birthDate: "2000-01-01",
    zipCode: "10013",
    admissionDate: "2009-04-12",
    dischargeDate: "2009-06-14",
    notes: "Patient can be contacted on MrsBarbaraSmith@aol.com"
  };
    result = DeIdentifier.amendData(patientDouble);
    expect(result.age).toBe("23");
  });

  it("should convert a birthdate into 90+ of a mocked patient", () => {
    const deIdentify = new DeIdentifier();
    const patientDouble = { 
    birthDate: "1933-01-01", 
    zipCode: "10013",
    admissionDate: "2009-04-12",
    dischargeDate: "2009-06-14",
    notes: "Patient can be contacted on MrsBarbaraSmith@aol.com"
  };
    result = DeIdentifier.amendData(patientDouble);
    expect(result.age).toBe("90+");
  });

  it("should replace admission date with admission year", () => {
    const deIdentify = new DeIdentifier();
    const patientDouble = {
      birthDate: "1933-01-01",
      zipCode: "55607",
      admissionDate: "2009-04-12",
      dischargeDate: "2009-06-14",
      notes: "Patient can be contacted on MrsBarbaraSmith@aol.com"
    }
    result = DeIdentifier.amendData(patientDouble);
    expect(result.admissionYear).toBe("2009");
  });

  it("should replace admission date with admission year", () => {
    const deIdentify = new DeIdentifier();
    const patientDouble = {
      birthDate: "1933-01-01",
      zipCode: "55607",
      admissionDate: "2009-04-12",
      dischargeDate: "2009-06-14",
      notes: "Patient can be contacted on MrsBarbaraSmith@aol.com"
    }
    result = DeIdentifier.amendData(patientDouble);
    expect(result.dischargeYear).toBe("2009");
  });


  it("should redeact email addresses in notes", () => {
    const deIdentify = new DeIdentifier();
    const patientDouble = {
      birthDate: "1933-01-01",
      zipCode: "55607",
      admissionDate: "2009-04-12",
      dischargeDate: "2009-06-14",
      notes: "Patient can be contacted on MrsBarbaraSmith@aol.com"
    }
    result = DeIdentifier.amendData(patientDouble);
    expect(result.notes).toBe("Patient can be contacted on xxxxxx");
  });



});
