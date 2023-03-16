const fs = require("fs");

let arraySchema = [];
const data = fs
  .readFileSync("/Users/Lfirouz/source/dbt-tools/table.sql")
  .toString();

let dataLines = data.toString().split("\n");
let tableName = dataLines[0].split("TABLE")[1].split("(")[0]
let fields = [];
let keys = [];
let notNulls = [];

// Creates an array of the fields description. Remove tabs. Starting from index=1 because the first item is the table name
for (let index = 1; index < dataLines.length; index++) {
  const field = dataLines[index].toString();
  field.replace("\t", "");
  fields.push(field.trim());
}

let columnsType = tableSchema(fields);
let keysLine = fields[fields.length - 2];

// Table level tests
console.log("For table: " + tableName + "\n")
console.log("Generating the test for expected columns of a table...\n");
console.log("Generating tests for primary keys...\n");

testExpectedColumns();

tableKeys(keysLine);
testUniqueColumns();

// Column level tests
testExpectedColumnTypes();

function tableSchema(fields) {
  // Returns a distionary of column names and their type
  for (let i = 0; i < fields.length - 2; i++) {
    var fieldData = fields[i];

    if (fieldData.includes("(")) {
      // ie VARCHAR(256)
      arraySchema.push({
        name: '"' + fieldData.split(" ")[0] + '"',
        type: fieldData.split(" ")[1].split("(")[0],
      });
    }
    else
    // ie FLOAT,
      arraySchema.push({
        name: '"' + fieldData.split(" ")[0] + '"',
        type: fieldData.split(" ")[1].split(",")[0],
      });
    // Create a list of not null columns
    if (fieldData.includes("NOT NULL")) {
      notNulls.push(fieldData.split(" ")[0]);
    }
  }
  return arraySchema;
}

function tableKeys(keysLine) {
  keys.push(keysLine.split("(")[1].split(")")[0]);
}

function listTableColumns(array) {
  let tableColumns = [];

  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    tableColumns.push(element.name);
  }

  return tableColumns;
}

function testExpectedColumns() {
  // Generate test for expected columns of a table
  let expect_table_columns_to_match_ordered_list =
    "- dbt_expectations.expect_table_columns_to_match_ordered_list:" +
    "\n " +
    "     column_list: [" +
    listTableColumns(columnsType) +
    "]";
  console.log("tests:\n   " + expect_table_columns_to_match_ordered_list);
}

function testExpectedColumnTypes() {
  // Generate tests for expected type of a column
  // console.log("\n\n# Generating tests for expected types of the columns:\n\n");
  console.log("columns:")
  for (let index = 0; index < arraySchema.length; index++) {
    let expect_column_values_to_be_of_type =
      "- name: " +
      arraySchema[index].name +
      "\n" +
      "  tests:\n" +
      "  - dbt_expectations.expect_column_values_to_be_of_type:\n" +
      "      column_type: " +
      arraySchema[index].type;
    console.log(expect_column_values_to_be_of_type);

    // Generating tests for not null columns
    if (notNulls.includes(arraySchema[index].name.split('"')[1])) {
      let expect_column_values_to_not_be_null =
        "  - dbt_expectations.expect_column_values_to_not_be_null";
      console.log(expect_column_values_to_not_be_null);
    }
  }
}

function testUniqueColumns() {
  let expect_compound_columns_to_be_unique =
    "   - dbt_expectations.expect_compound_columns_to_be_unique:\n" +
    "       column_list: [" +
    keys +
    "]";
  console.log(expect_compound_columns_to_be_unique);
  console.log('       row_condition: "_LINE > 0" ')
}
