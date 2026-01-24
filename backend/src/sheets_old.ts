import { google } from "googleapis";
import path from "path";

/**
 * Appends a row to a Google Sheet using a service account.
 *
 * @param spreadsheetId - The ID of the spreadsheet (found in the URL).
 * @param range - The sheet name or range to append to (e.g., 'Sheet1').
 * @param values - An array of values representing the row to append.
 */
export async function appendRow(
    spreadsheetId: string,
    range: string,
    values: any[],
) {
    try {
        // Path to your service account key file.
        // Ensure this file is added to your .gitignore!
        const KEY_PATH = path.join(process.cwd(), "google-key.json");

        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_PATH,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const client = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: client as any });

        const request = {
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            requestBody: {
                values: [values],
            },
        };

        const response = await sheets.spreadsheets.values.append(request);
        return response.data;
    } catch (error) {
        console.error("Error appending row to Google Sheets:", error);
        throw error;
    }
}
