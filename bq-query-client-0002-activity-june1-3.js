const sqlQuery =
  'select Advertiser_ID, Campaign_ID, Ad_ID, State_Region, TRAN_Value as OrderNum, Other_Data, Total_Revenue from `bill-hahn-sandbox.DCM_Data_Transfer.acct_1234_activity_20170601` where Advertiser_ID = (SELECT Advertiser_ID FROM `bill-hahn-sandbox.DCM_Data_Transfer.acct_1234_match_table_advertisers_ALL` where Advertiser = "Client-0002")';

const projectId = "bill-hahn-sandbox";

// Imports the Google Cloud client library
const BigQuery = require('@google-cloud/bigquery');
// Instantiates a client
const bigquery = BigQuery({
  projectId: projectId
});

function runQuery(projectId) {
  // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
  const options = {
    destination: bigquery.dataset('Agency_Rollups').table(
      'Client_002_Activity_June_1st_thru_3rd'),
    query: sqlQuery,
    useLegacySql: false // Use standard SQL syntax for queries.
  };

  // Runs the query
  bigquery
    .query(options)
    .then((results) => {
      const rows = results[0];
      //printResult(rows);
      console.log('Rows:');
      rows.forEach((row) => {
        console.log(row);
        console.log("\n")
      });
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

runQuery(projectId);
