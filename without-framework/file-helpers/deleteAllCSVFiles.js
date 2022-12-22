/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

async function deleteAllCSVFiles() {
  fs.readdir(`${process.cwd()}`, async (err, files) => {
    if (err) throw err;
    for (const file of files) {
      if (file.split('.')[1] === 'csv') {
        await fs.unlinkSync(file);
      }
    }
  });
}

module.exports = deleteAllCSVFiles;
