const DeIdentifier = require("./deIdentifier");
const { ZipCodeTransformer } = require("./zipCodeTransformer");

jest.mock('./zipCodeTransformer', () => ({
  ZipCodeTransformer: jest.fn().mockImplementation(() => ({
    transform: jest.fn(),
  })),
}));

describe("constructor", () => {
  it("should transform the zip code using ZipCodeTransformer 10013 >> 10000", () => {
    // Mock the transform method of the ZipCodeTransformer instance
    const mockTransformerInstance = new ZipCodeTransformer();
    mockTransformerInstance.transform.mockReturnValue('10000');
    ZipCodeTransformer.mockImplementation(() => mockTransformerInstance);

    // Create a sample patient object
    const patient = {
      birthDate: "2000-01-01",
      zipCode: "10013",
      admissionDate: "2009-04-12",
      dischargeDate: "2009-06-14"
    };

    // Call the transformZip method with the patient's zip code
    const amendedPatient = DeIdentifier.transformZip(patient.zipCode);

    // Verify that the transform method was called with the correct argument
    expect(mockTransformerInstance.transform).toHaveBeenCalledWith(patient.zipCode);

    // Verify that the zipCode property was updated correctly
    expect(amendedPatient).toEqual('10000');
  });


  it("should transform the zip code using ZipCodeTransformer 55607 >> 00000", () => {
    // Mock the transform method of the ZipCodeTransformer instance
    const mockTransformerInstance = new ZipCodeTransformer();
    mockTransformerInstance.transform.mockReturnValue('00000');
    ZipCodeTransformer.mockImplementation(() => mockTransformerInstance);

    // Create a sample patient object
    const patient = {
      birthDate: "2000-01-01",
      zipCode: "55607",
      admissionDate: "2009-04-12",
      dischargeDate: "2009-06-14"
    };

    // Call the transformZip method with the patient's zip code
    const amendedPatient = DeIdentifier.transformZip(patient.zipCode);

    // Verify that the transform method was called with the correct argument
    expect(mockTransformerInstance.transform).toHaveBeenCalledWith(patient.zipCode);

    // Verify that the zipCode property was updated correctly
    expect(amendedPatient).toEqual('00000');
  });



});

