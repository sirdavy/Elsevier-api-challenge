const DeIdentifier = require("../src/deIdentifier");
const ZipCodeTransformer = require("../src/zipCodeTransformer");


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

  it("should redeact US telephone numbers in notes format 1", () => {
    const deIdentify = new DeIdentifier();
    const patientDouble = {
      birthDate: "1933-01-01",
      zipCode: "55607",
      admissionDate: "2009-04-12",
      dischargeDate: "2009-06-14",
      notes: "Patient's cellphone is: (555) 555-1234"
    }
    result = DeIdentifier.amendData(patientDouble);
    expect(result.notes).toBe("Patient's cellphone is: xxxxxxxxxx");
  });

  it("should redeact US telephone numbers in notes format 2", () => {
    const deIdentify = new DeIdentifier();
    const patientDouble = {
      birthDate: "1933-01-01",
      zipCode: "55607",
      admissionDate: "2009-04-12",
      dischargeDate: "2009-06-14",
      notes: "Patient's cellphone is: 1234567890"
    }
    result = DeIdentifier.amendData(patientDouble);
    expect(result.notes).toBe("Patient's cellphone is: xxxxxxxxxx");
  });

  it("should redeact US telephone numbers in notes format 3", () => {
    const deIdentify = new DeIdentifier();
    const patientDouble = {
      birthDate: "1933-01-01",
      zipCode: "55607",
      admissionDate: "2009-04-12",
      dischargeDate: "2009-06-14",
      notes: "Patient's cellphone is: 123.456.7890"
    }
    result = DeIdentifier.amendData(patientDouble);
    expect(result.notes).toBe("Patient's cellphone is: xxxxxxxxxx");
  });

  it("should redeact US telephone numbers in notes format 4", () => {
    const deIdentify = new DeIdentifier();
    const patientDouble = {
      birthDate: "1933-01-01",
      zipCode: "55607",
      admissionDate: "2009-04-12",
      dischargeDate: "2009-06-14",
      notes: "Patient's cellphone is: 123-456-7890"
    }
    result = DeIdentifier.amendData(patientDouble);
    expect(result.notes).toBe("Patient's cellphone is: xxxxxxxxxx");
  });

  it("should transform any dates in notes to just year", () => {
    const deIdentify = new DeIdentifier();
    const patientDouble = {
      birthDate: "1933-01-01",
      zipCode: "55607",
      admissionDate: "2009-04-12",
      dischargeDate: "2009-06-14",
      notes: "5th November 2020. November 5th 2020. 2015-06-17. 06-10-2015. 17-06-2015. 17/06/2015."
    }
    result = DeIdentifier.amendData(patientDouble);
    expect(result.notes).toBe("2020. 2020. 2015. 2015. 2015. 2015.");
  });


});
