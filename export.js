const DynamoDbDataImporter = require('./DynamoDbDataImporter');
const csvWriter = require('./csvWriter');
const XlsxDataWriter = require('./XlsxDataWriter');
const DynamoDbDataScanner = require('./DynamoDbDataScanner');

const tableName = 'export-testing-table';
const csvFile = 'test.csv';
const outputXlsxFile = 'output.xlsx';

async function execute() {
  await DynamoDbDataImporter.importData(tableName);
  const results = await DynamoDbDataScanner.scanTable(tableName);
  await csvWriter.exportToCsv(results, csvFile);
  XlsxDataWriter.exportToXlsx(results, outputXlsxFile);
}

execute().then().catch(e => {
  console.log(e);
});
