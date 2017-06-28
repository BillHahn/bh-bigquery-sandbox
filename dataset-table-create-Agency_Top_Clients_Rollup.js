// Imports the Google Cloud client library
const BigQuery = require('@google-cloud/bigquery');

// The project ID to use, e.g. "your-project-id"
const projectId = "bill-hahn-sandbox";

// The ID of the dataset in which to create the table, e.g. "my_dataset"
const datasetId = "Agency_Rollups";

// The ID for the new table, e.g. "my_new_table"
//const tableId = "babynames_yr";
const tableId = "Agency_Top_Clients_Rollup";

// The schema of the new table, e.g. "Name:string, Age:integer, Weight:float, IsMagic:boolean"
const schema =
  "ad_client_id, platform, campaign_id, campaign, impressions:integer, clicks:integer, ctr:float, ave_cpc:float, conversions:integer, activity_type:integer, cost:float, revenue:float, profit:float, profit_perc:float";

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
