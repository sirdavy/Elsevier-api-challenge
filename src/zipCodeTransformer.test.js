const ZipCodeTransformer = require("./zipCodeTransformer");

describe("ZipCodeTransformer", () => {
  it("should be defined", () => {
    expect(ZipCodeTransformer).toBeDefined();
  });
});

describe("ZipCodeTransformer", () => {
  it("should return an array of arrays containing zipcodes and populations ", () => {
    const transformZip = new ZipCodeTransformer;
    data = transformZip.readCsvFile();
    expect(data[0]).toStrictEqual([ 'Zip Code ZCTA', '2010 Census Population' ]);
    expect(data[1]).toStrictEqual([ '01001', '16769' ]);  
  });

  it("should transform a zipcode's last two digits to '00' when all zipcode populations with the first three digits sum to > 20,000", () => {
    const transformZip = new ZipCodeTransformer;
    expect(transformZip.transform("10013")).toBe("10000");
  });




});