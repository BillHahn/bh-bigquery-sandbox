// Imports the Google Cloud client library
const BigQuery = require('@google-cloud/bigquery');

// The project ID to use, e.g. "your-project-id"
const projectId = "bill-hahn-sandbox";

// The ID of the dataset in which to create the table, e.g. "my_dataset"
const datasetId = "DCM_Data_Transfer";

// The ID for the new table, e.g. "my_new_table"
//const tableId = "babynames_yr";
const tableId = "acct_1234_match_table_advertisers_20170603";

// The schema of the new table, e.g. "Name:string, Age:integer, Weight:float, IsMagic:boolean"
const schema =
  "Floodlight_Config:integer,Advertiser_ID:integer,Advertiser,Advertiser_Group_ID:integer,Advertiser_Group";

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
