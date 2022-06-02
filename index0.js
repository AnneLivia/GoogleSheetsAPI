import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from './configs/spreadsheet.js';

const id = process.env.SPREADSHEET_ID;

const doc = new GoogleSpreadsheet(id);

await doc.useServiceAccountAuth(credentials, err => {
    console.log(err);
});

await doc.loadInfo();

const worksheet = await doc.sheetsByIndex[0];
const rows = await worksheet.getRows();

rows.forEach( (row, index) => {
   console.log(row.Questions, row.Responses);
})

// adding new data. Can create a google function that updates
await worksheet.addRow({"Questions" : "How to get there?", "Responses" : "Just turn right!"})

// can exclude rows
rows.forEach( (row) => {
    if (row.Questions === 'How to get there?')
       row.delete();
})

