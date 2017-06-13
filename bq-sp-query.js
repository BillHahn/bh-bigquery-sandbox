const sqlQuery =
  `SELECT
  corpus, COUNT(*) as unique_words
FROM publicdata.samples.shakespeare
GROUP BY
  corpus
ORDER BY
  unique_words DESC LIMIT 10;`;

const projectId = "bill-hahn-sandbox";

function queryShakespeare(projectId) {
  // Imports the Google Cloud client library
  const BigQuery = require('@google-cloud/bigquery');
  // Instantiates a client
  const bigquery = BigQuery({
    projectId: projectId
  });

  // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
  const options = {
    query: sqlQuery,
    useLegacySql: false // Use standard SQL syntax for queries.
  };

  // Runs the query
  bigquery
    .query(options)
    .then((results) => {
      const rows = results[0];
      printResult(rows);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}

function printResult(rows) {
  console.log('Query Results:');
  rows.forEach(function(row) {
    let str = '';
    for (let key in row) {
      if (str) {
        //str = `${str}\n`;
        str = `${str}\n\t\t\t\t`;
      }
      str = `${str}${key}: ${row[key]}`;
    }
    console.log(str);
  });
}

queryShakespeare(projectId);
