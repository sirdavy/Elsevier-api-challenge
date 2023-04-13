const Papa = require('papaparse');
const fs = require('fs');

class ZipCodeTransformer {
  
  readCsvFile() {
    const csvData = fs.readFileSync('./population_by_zcta_2010.csv', 'utf8');
    const parsedData = Papa.parse(csvData, { header: false });
    return parsedData.data;
  }

  transform(zipCode) {
    const populationByPrefix = {}; // population data for each 3-digit prefix
    const zipCodeArray = zipCode.split(''); // split the zip code into individual digits
    const allZips = this.readCsvFile()
    // Sum the population of all zip codes with the same 3-digit prefix
    allZips.forEach((row) => {
      const [zip, population] = row;
      const prefix = zip.substring(0, 3);
  
      if (!populationByPrefix[prefix]) {
        populationByPrefix[prefix] = 0;
      }
  
      populationByPrefix[prefix] += parseInt(population);
    });
  
    const prefix = zipCodeArray.slice(0, 3).join('');
    const population = populationByPrefix[prefix] || 0;
  
    // If the population is less than 20,000 for this prefix, set the zip code to 00000
    if (population < 20000) {
      return '00000';
    } else {
      return prefix + '00';
    }
  }
}

module.exports = ZipCodeTransformer;


