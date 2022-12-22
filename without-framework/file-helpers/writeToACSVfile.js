/* eslint-disable @typescript-eslint/no-var-requires */
const fastcsv = require('fast-csv');
const fs = require('fs');

async function writeToACSVfile(fileName, data) {
  const ws = fs.createWriteStream(`${process.cwd()}/./${fileName}.csv`);
  fastcsv.write(data, { headers: true }).pipe(ws);
}

module.exports = writeToACSVfile;
