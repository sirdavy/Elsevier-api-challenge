const Papa = require('papaparse');
const fs = require('fs');

class ZipCodeTransformer {
  
  readCsvFile() {
    const csvData = fs.readFileSync('./population_by_zcta_2010.csv', 'utf8');
    const parsedData = Papa.parse(csvData, { header: false });
    return parsedData.data;
  }

}

module.exports = ZipCodeTransformer;
