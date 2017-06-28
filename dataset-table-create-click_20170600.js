// Imports the Google Cloud client library
const BigQuery = require('@google-cloud/bigquery');

// The project ID to use, e.g. "your-project-id"
const projectId = "bill-hahn-sandbox";

// The ID of the dataset in which to create the table, e.g. "my_dataset"
const datasetId = "DCM_Data_Transfer";

// The ID for the new table, e.g. "my_new_table"
//const tableId = "babynames_yr";
const tableId = "acct_1234_click_20170603";

// The schema of the new table, e.g. "Name:string, Age:integer, Weight:float, IsMagic:boolean"
const schema =
  "Impression_ID,Event_Time:integer,Event_Type,Event_Sub_Type,User_ID,Advertiser_ID:integer,Campaign_ID:integer,Ad_ID:integer,Rendering_ID:integer,Creative_Version:integer,Site_ID:integer,Placement_ID:integer,Country_Code,State_Region,Browser_Platform_ID:integer,Browser_Platform_Version,Operating_System_ID:integer,DMA_ID:integer,City_ID:integer,Postal_Code,U_Value,Segment_Value_1:integer,Partner1_ID,Partner2_ID,DBM_Creative_ID:integer,DBM_Bid_Price:integer,DBM_Keywords,DBM_Ad_Position:integer,DBM_Media_Cost:integer,DBM_Revenue:integer,DBM_CPM_Fee_1:integer,DBM_Billable_Cost:integer";

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
