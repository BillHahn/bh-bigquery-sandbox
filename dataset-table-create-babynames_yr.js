// Imports the Google Cloud client library
const BigQuery = require('@google-cloud/bigquery');

// The project ID to use, e.g. "your-project-id"
const projectId = "bill-hahn-sandbox";

// The ID of the dataset in which to create the table, e.g. "my_dataset"
const datasetId = "nodejs_created_dataset";

// The ID for the new table, e.g. "my_new_table"
const tableId = "babynames_yr";

// The schema of the new table, e.g. "Name:string, Age:integer, Weight:float, IsMagic:boolean"
const schema =
  "name,gender,count:integer,year";

// Instantiates a client
const bigquery = BigQuery({
  projectId: projectId
});

// For all options, see https://cloud.google.com/bigquery/docs/reference/v2/tables#resource
const options = {
  schema: schema
};

// Create a new table in the dataset
bigquery
  .dataset(datasetId)
  .createTable(tableId, options)
  .then((results) => {
    const table = results[0];
    console.log(`Table ${table.id} created.`);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
