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
});


