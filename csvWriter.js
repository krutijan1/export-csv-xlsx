const csvWriter = require('csv-writer');

exports.exportToCsv = async function(results, fileName) {
  const header = Object.keys(results[0]);

  const writer = csvWriter.createObjectCsvWriter({
    path: fileName,
    header: header.map(e => {
      return { id: e, title: e };
    })
  });

  await writer.writeRecords(results);
  console.log('Writing to csv done...');
};
