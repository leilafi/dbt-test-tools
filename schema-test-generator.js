const fs = require('fs');

let schema = {};
let arraySchema = [];
// let schema = new Map()
const data= fs.readFileSync('/Users/Lfirouz/source/dbt-tools/table.sql').toString();
console.log(data);

var dataLines = data.toString().split("\n")
// var noTab = dataLines.replace('\t','')
console.log(dataLines)

var fields = []

// This loop creates an array of the fields description. Remove tabs. We start from index=1 because the first item is the actual table name
for (let index = 1; index < dataLines.length; index++) {
    console.log("field is:" + dataLines[index])
    const field = dataLines[index];
    field.toString().replace('\t','')
    console.log( "after clean up: " + field)
    fields.push(field.trim())
}

// console.log(fields)

let columnsType = tableSchema(fields)
// console.log(columnsType)

testExpectedColumns()

testExpectedColumnTypes()


function tableSchema(fields) {
    // Returns a distionary of column names and their type
    for (let i = 0; i < (fields.length)-2; i++) {
        var fieldData = fields[i];
        if (fieldData.split(' ')[1]==="BOOLEAN," || fieldData.split(' ')[1]==="VARIANT,") {
            arraySchema.push({
                "name": '"' + fieldData.split(' ')[0] + '"',
                "type": fieldData.split(' ')[1].split(',')[0]
            })
        }
        else(
            arraySchema.push({
                "name": '"' + fieldData.split(' ')[0] + '"',
                "type": fieldData.split(' ')[1].split('(')[0]
            })
        )
    }
    return arraySchema
}

function listTableColumns(array){
    let tableColumns = []

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        // console.log(element.name)
        tableColumns.push(element.name)
    }

    return tableColumns
}

function testExpectedColumns() {
    // Generate test for expected columns of a table
    console.log("\n\nGenerating the test for expected columns of a table:\n\n")
    let expect_table_columns_to_match_ordered_list = 
    "- dbt_expectations.expect_table_columns_to_match_ordered_list:" + "\n\t" 
    +"column_list: [" + listTableColumns(columnsType) + "]"
    console.log(expect_table_columns_to_match_ordered_list)
}

function testExpectedColumnTypes(){
    // Generate tests for expected type of a column
    console.log("\n\nGenerating tests for expected types of the columns:\n\n")
    for (let index = 0; index < arraySchema.length; index++) {
        // console.log("Generating test for :"+ arraySchema[index].name +"\n\n")
        let expect_column_values_to_be_of_type = "- name: " + arraySchema[index].name + "\n" + "  tests:\n" + 
        "  - dbt_expectations.expect_column_values_to_be_of_type:\n\t" + "column_type: " + arraySchema[index].type
        console.log(expect_column_values_to_be_of_type)
}
}