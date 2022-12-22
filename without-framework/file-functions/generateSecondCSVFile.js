/* eslint-disable @typescript-eslint/no-var-requires */
const writeToACSVfile = require('../file-helpers/writeToACSVfile');

const getAuthorsFollowers = require('../api-service/getAuthorsFollowers');

async function generateSecondCSVFile(payload) {
  const secondCSVFileObject = [];

  const individualRecordArr = [];

  for (const data of payload) {
    const apiResult = await getAuthorsFollowers(data.author.followers_url);

    individualRecordArr.push(apiResult);
  }

  // merge/flatten an array of arrays
  const newArray = Array.prototype.concat.apply([], individualRecordArr);

  for (const data of newArray) {
    const followersInfo = {
      avatarURL: data.avatar_url,
      userName: data.login,
      accountHomepageURL: data.html_url,
    };
    secondCSVFileObject.push(followersInfo);
  }

  return writeToACSVfile('secondCSVFileObject', secondCSVFileObject);
}

module.exports = generateSecondCSVFile;
