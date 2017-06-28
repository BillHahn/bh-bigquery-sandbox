// Imports the Google Cloud client libraries
const BigQuery = require('@google-cloud/bigquery');
const Storage = require('@google-cloud/storage');

// The project ID to use, e.g. "your-project-id"
const projectId = "bill-hahn-sandbox";

// The ID of the dataset of the table into which data should be imported, e.g. "my_dataset"
const datasetId = "Agency_Rollups";

// The ID of the table into which data should be imported, e.g. "my_table"
var tableId = "Agency_Top_Clients_Rollup";

// The name of the Google Cloud Storage bucket where the file is located, e.g. "my-bucket"
const bucketName = "bh_agency_rollups";

// The name of the file from which data should be imported, e.g. "file.csv"
var filename = "Agency_Rollup_Data.csv";

// Instantiates clients
const bigquery = BigQuery({
  projectId: projectId
});

const storage = Storage({
  projectId: projectId
});

let job;

// Metadata to skip the leading row in the CSV that has column header info
var jobmetadata = {
  skipLeadingRows: 1
}

// Imports data from a Google Cloud Storage file into the table
bigquery
  .dataset(datasetId)
  .table(tableId)
  .import(storage.bucket(bucketName).file(filename), jobmetadata)
  .then((results) => {
    job = results[0];
    console.log(`Job ${job.id} started.`);
    return job.promise();
  })
  .then((results) => {
    console.log(`Job ${job.id} completed.`);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
