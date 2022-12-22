/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function getAuthorsFollowers(url) {
  try {
    const { data } = await axios.get(`${url}`);
    return data.slice(0, 5);
  } catch (error) {
    console.log(error);
    if (error.response.data.statusCode == 404) {
      throw new Error('Data not found');
    }
    throw new Error();
  }
}

module.exports = getAuthorsFollowers;
