/* eslint-disable @typescript-eslint/no-var-requires */
const writeToACSVfile = require('../file-helpers/writeToACSVfile');

async function generateFirstCSVFile(payload) {
  const firstCSVFileObject = [];

  for (const data of payload) {
    const formattedResponse = {
      avatarURL: data.author.avatar_url,
      userName: data.author.login,
      accountHomepageURL: data.author.html_url,
    };

    firstCSVFileObject.push(formattedResponse);
  }

  return writeToACSVfile('firstCSVFileObject', firstCSVFileObject);
}

module.exports = generateFirstCSVFile;
