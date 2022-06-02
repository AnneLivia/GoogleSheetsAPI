import getAuthSheets from '../services/spreadsheetAuth.js';
import { BadRequest } from '../utils/ErrorClass.js';

class Controller {
  /**
   * @description This method provides metadata from the specific google spreadsheet
   */
  async metadata(req, res, next) {
    try {
      const { googleSheets, auth, sheet_id } = await getAuthSheets();
      // it's necessary to provide authentication and the sheets id
      const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId: sheet_id,
      });

      res.json(metadata.data);
    } catch (err) {
      next(new BadRequest('Unexpected error'));
    }
  }

  /**
   * @description This method returns all rows from a sheets
   */
   async getRows(req, res, next) {
    const { pageTitle } = req.params;

    try {
      const { googleSheets, auth, sheet_id } = await getAuthSheets();
      // it's necessary to provide authentication and the sheets id
      // valueRenderOption is a option to allow formatted values or not
      // dateTime is another option to do this
      // range is the page
      const rows = await googleSheets.spreadsheets.values.get({
          auth,
          spreadsheetId: sheet_id,
          range: pageTitle,
          valueRenderOption: 'UNFORMATTED_VALUE',
          dateTimeRenderOption: "FORMATTED_STRING",
      })

      res.json(rows.data);
    } catch (err) {
      next(new BadRequest('Unexpected error'));
    }
  }

  async addOneRow (req, res, next) {
    const { pageTitle } = req.params;
    const { date, name, price, gender, author } = req.body; 

    const values = [ [date, name, price, gender, author], ];
    try {
        const { googleSheets, auth, sheet_id } = await getAuthSheets();
        // it's necessary to provide authentication and the sheets id
        // for valueInputOption RAW is the default = is going to add values without formation
        // to make it formatted just put user_entered
        const newRow = await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId: sheet_id,
            range: pageTitle,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: values
            }
        })
  
        res.json(newRow.data);
      } catch (err) {
        console.error(err.message);
        next(new BadRequest('Unexpected error'));
      }
  }

  async updateRow (req, res, next) {
    const { pageTitle, from, to } = req.params;
    const { date, name, price, gender, author } = req.body; 

    const values = [ [date, name, price, gender, author], ];
    
    try {
      const {auth, sheet_id, googleSheets} = await getAuthSheets();
      // if done in this way, it's going to updated all values
      /*
      const updateRow = await googleSheets.spreadsheets.values.update({
        auth,
        spreadsheetId: sheet_id,
        range: pageTitle,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: values
        }
      })*/

      const updateRow = await googleSheets.spreadsheets.values.update({
        auth,
        spreadsheetId: sheet_id,
        range: `${pageTitle}!${from}:${to}`,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: values
        }
      });

      res.json(updateRow.data);
    } catch (err) {
      console.error(err.message);
      next(new BadRequest('Unexpected error'));
    }
  }

  // need to implement
  async deleteRow (req, res, next) {
    
  }

}

export default Controller;
