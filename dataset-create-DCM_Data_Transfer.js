// Imports the Google Cloud client library
const BigQuery = require('@google-cloud/bigquery');

// Your Google Cloud Platform project ID
const projectId = 'bill-hahn-sandbox';

// Instantiates a client
const bigquery = BigQuery({
  projectId: projectId
});

// The name for the new dataset
const datasetName = 'DCM_Data_Transfer';

var S = require('string');
// Creates the new dataset
bigquery.createDataset(datasetName)
  .then((results) => {
    const dataset = results[0];

    console.log(`Dataset ${dataset.id} created.`);
  })
  .catch((err) => {
    let theErr = S(err);
    if (theErr.contains("Already Exists")) {
      console.error("\nDataset already exists!\n")
    } else {
      console.error('ERROR:', err);
    }
  });
