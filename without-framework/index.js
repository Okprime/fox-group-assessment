/* eslint-disable @typescript-eslint/no-var-requires */
const http = require('http');
const apiEndpoint = 'https://api.github.com/repositories/19438/commits';

const hostname = 'localhost';
const port = 3444;

// Import the fetchData function
const getCommitsFromAGitHubRepo = require('./api-service/getCommitsFromAGitHubRepo');
const generateFirstCSVFile = require('./file-functions/generateFirstCSVFile');
const generateSecondCSVFile = require('./file-functions/generateSecondCSVFile');
const generateThirdCSVFile = require('./file-functions/generateThirdCSVFile');
const deleteAllCSVFiles = require('./file-helpers/deleteAllCSVFiles');

// Create the HTTP server
const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/csv');

  if (req.url === '/generate-csv') {
    // delete any existing csv file before creating a new one
    await deleteAllCSVFiles();

    // Fetch the data from the API endpoint
    const apiResult = await getCommitsFromAGitHubRepo(apiEndpoint);

    await Promise.all([
      await generateFirstCSVFile(apiResult),
      await generateSecondCSVFile(apiResult),
      await generateThirdCSVFile(apiResult),
    ]);

    res.end(
      JSON.stringify({
        error: false,
        message: 'CSV files has been created successfully',
      }),
    );
  } else {
    res.end(
      JSON.stringify({
        error: true,
        message: 'An error occurred',
      }),
    );
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
