// Googleapis = Node.js client library for using Google APIs. 
// Support for authorization and authentication with OAuth 2.0, API Keys and JWT tokens is included.
// https://github.com/googleapis/google-api-nodejs-client
import { google } from 'googleapis';

const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// need to authenticatica with google API
// Service account credentials - In this model, your application talks directly to Google APIs using a Service Account. 
// It's useful when you have a backend application that will talk directly to Google APIs from the backend.
/*
    Service accounts allow you to perform server to server, app-level authentication using a robot account. 
    You will create a service account, download a keyfile, and use that to authenticate to Google APIs. 
*/
const getAuthSheets = async () => {
    // getting authorization
    const auth = new google.auth.GoogleAuth({
        keyFile: GOOGLE_APPLICATION_CREDENTIALS,
        // can also be a single string
        scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    // getting the client 
    // Automatically obtain a client based on the provided configuration. If no options were passed, use Application Default Credentials.
    const client = await auth.getClient();

    // obtaining connection with google sheets
    const googleSheets = google.sheets({
        version: 'v4',
        auth: client,
    });

    const sheet_id = process.env.SPREADSHEET_ID;

    return {
        auth,
        client,
        googleSheets,
        sheet_id,
    };
}

export default getAuthSheets;