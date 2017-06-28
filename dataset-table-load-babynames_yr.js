// Imports the Google Cloud client libraries
const BigQuery = require('@google-cloud/bigquery');
const Storage = require('@google-cloud/storage');

// The project ID to use, e.g. "your-project-id"
const projectId = "bill-hahn-sandbox";

// The ID of the dataset of the table into which data should be imported, e.g. "my_dataset"
const datasetId = "nodejs_created_dataset";

// The ID of the table into which data should be imported, e.g. "my_table"
var tableId = "babynames_2013";

// The name of the Google Cloud Storage bucket where the file is located, e.g. "my-bucket"
const bucketName = "bh-babynames_yr";

// The name of the file from which data should be imported, e.g. "file.csv"
var filename = "yob2013yr.csv";

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
  //  skipLeadingRows: 1
}

// Imports data from a Google Cloud Storage file into the table
for (i = 14; i <= 16; i++) {
  filename = "yob20" + i + "yr.csv";
  tableId = "babynames_20" + i;
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
}
