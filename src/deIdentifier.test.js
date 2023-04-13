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
    const patientDouble = { birthDate: "2000-01-01" };
    result = DeIdentifier.amendData(patientDouble);
    expect(result.age).toBe("23");
  });

  it("should convert a birthdate into 90+ of a mocked patient", () => {
    const deIdentify = new DeIdentifier();
    const patientDouble = { birthDate: "1933-01-01" };
    result = DeIdentifier.amendData(patientDouble);
    expect(result.age).toBe("90+");
  });

  // xit("should strip ZIP codes to the first three digits or convert to 00000 if fewer than 20,000 people reside in the combination of all ZIP codes with those three digits", () => {
  //   const deIdentify = new DeIdentifier();
  //   const patientDouble = { zipCode: "10013" };
  //   result = DeIdentifier.amendData(patientDouble);
  //   expect(result.zipCode).toBe("10000");
  // });

});


