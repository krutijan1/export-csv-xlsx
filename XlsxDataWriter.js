const XLSX = require('xlsx');

function createRow(row, headers) {
  const parsedRow = [];

  for (const header of headers) {
    if (Object.keys(row).indexOf(header) !== -1) {
      parsedRow.push(row[header]);
    } else {
      parsedRow.push('');
    }
  }

  return parsedRow;
}

exports.exportToXlsx = function(results, fileName) {
  const wb = XLSX.utils.book_new();
  const headers = Object.keys(results[0]);
  const res = [headers, ...results.map(row => createRow(row, headers))];
  const ws = XLSX.utils.aoa_to_sheet(res);

  XLSX.utils.book_append_sheet(wb, ws, 'title');

  XLSX.writeFile(wb, fileName);

  console.log('Exporting to xlsx...');
};
