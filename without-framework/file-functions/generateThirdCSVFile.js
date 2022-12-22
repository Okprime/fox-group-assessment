/* eslint-disable @typescript-eslint/no-var-requires */
const writeToACSVfile = require('../file-helpers/writeToACSVfile');

const getCommitsUrl = require('../api-service/getCommitsUrl');

async function generateThirdCSVFile(payload) {
  const thirdCSVFileObject = [];

  for (const data of payload) {
    const lastAndSecondToLastURL = await getCommitsUrl(data.comments_url);

    // check if the response gives an empty array
    if (lastAndSecondToLastURL.length === 0) {
      const formattedObj = {
        repoURL: data.url,
        lastURL: null,
        secondToLastURL: null,
      };
      thirdCSVFileObject.push(formattedObj);
    }
  }
  return writeToACSVfile('thirdCSVFileObject', thirdCSVFileObject);
}

module.exports = generateThirdCSVFile;
