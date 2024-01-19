const { FILE } = require('dns');
const XLSX = require('xlsx');

const FILENAME = 'dados.xlsx';

const originalWorkBook = XLSX.readFile(FILENAME);
const originalSheet = originalWorkBook.Sheets['Planilha'];
const originalData = XLSX.utils.sheet_to_json(originalSheet, {header: 1});
originalData.shift();

const updateData = originalData.map(user => {
    if(user[3] === 'Insert'){
        const firstName = user[0];
        const lastName = user[1];

        user[0] = `Update ${firstName}`;
        user[1] = `Update ${lastName}`;

        user[3] = `Update`;
    }
    return user;
});

updateData.unshift(['NomeCompleto', 'EXTERNAL KEY ACCOUNT', 'TelefoneCelular', 'Action']);

const updateSheet = XLSX.utils.aoa_to_sheet(updateData);



const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, updateSheet, 'Planilha')
XLSX.writeFile(workbook, 'dados-atualizados.xlsx');