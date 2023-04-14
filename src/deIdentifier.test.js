const DeIdentifier = require("./deIdentifier");
const Patient = require("./patient");

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
    dischargeDate: "2009-06-14"
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
    dischargeDate: "2009-06-14"
  };
    result = DeIdentifier.amendData(patientDouble);
    expect(result.age).toBe("90+");
  });

  it("should strip ZIP codes to the first three digits or convert to 00000 if fewer than 20,000 people reside in the combination of all ZIP codes with those three digits", () => {
    const deIdentify = new DeIdentifier();
    const patientDouble = { 
      birthDate: "2000-01-01",
      zipCode: "10013",
      admissionDate: "2009-04-12",
      dischargeDate: "2009-06-14" 
    };
    result = DeIdentifier.amendData(patientDouble);
    expect(result.zipCode).toBe("10000");
  });

  it("should replace admission date with admission year", () => {
    const deIdentify = new DeIdentifier();
    const patientDouble = {
      birthDate: "1933-01-01",
      zipCode: "55607",
      admissionDate: "2009-04-12",
      dischargeDate: "2009-06-14"
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
      dischargeDate: "2009-06-14"
    }
    result = DeIdentifier.amendData(patientDouble);
    expect(result.dischargeYear).toBe("2009");
  });


});


