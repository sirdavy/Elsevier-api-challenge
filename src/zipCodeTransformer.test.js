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




});