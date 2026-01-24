import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../.env") });

export const secrets = {
    spreadsheetId: process.env.SPREADSHEET_ID as string,
    port: process.env.PORT as string,
};
