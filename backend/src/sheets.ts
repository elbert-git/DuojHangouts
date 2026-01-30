import { google, sheets_v4 } from "googleapis";
import path from "path";
import { secrets } from "./secrets";
import { v4 as uuidv4 } from "uuid";

export interface HangoutRow {
    id: string;
    name: string;
    description: string;
    location: string;
    googleLink: string;
    emoji: string;
    tag: string;
    tried: boolean;
    offline: boolean;
    upvotes: number;
    dateCreated: string;
}

const SHEET_NAME = "hangouts";
const COLUMNS = [
    "id",
    "name",
    "description",
    "location",
    "googleLink",
    "emoji",
    "tag",
    "tried",
    "offline",
    "upvotes",
    "dateCreated",
];

export class HangoutsSheet {
    private static sheets: sheets_v4.Sheets;
    private static spreadsheetId: string = secrets.spreadsheetId;

    static async init() {
        const KEY_PATH = path.join(process.cwd(), "google-key.json");
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_PATH,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const client = await auth.getClient();
        HangoutsSheet.sheets = google.sheets({
            version: "v4",
            auth: client as any,
        });
    }

    private static mapRowToObj(row: any[]): HangoutRow {
        const obj: any = {};
        COLUMNS.forEach((col, index) => {
            let value = row[index];
            if (col === "tried" || col === "offline") {
                value = value === "TRUE";
            } else if (col === "upvotes") {
                value = parseInt(value) || 0;
            }
            obj[col] = value === undefined || value === null ? "" : value;
        });
        return obj as HangoutRow;
    }

    private static mapObjToRow(obj: Partial<HangoutRow>): any[] {
        return COLUMNS.map((col) => {
            const value = (obj as any)[col];
            if (typeof value === "boolean") {
                return value ? "TRUE" : "FALSE";
            }
            return value === undefined || value === null ? "" : value;
        });
    }

    static async getAll(): Promise<HangoutRow[]> {
        if (!HangoutsSheet.sheets) {
            throw new Error(
                "HangoutsSheet not initialized. Call HangoutsSheet.init() first.",
            );
        }
        const response = await HangoutsSheet.sheets.spreadsheets.values.get({
            spreadsheetId: HangoutsSheet.spreadsheetId,
            range: `${SHEET_NAME}!A2:K`, // Updated range for 11 columns
        });

        const rows = response.data.values;
        if (!rows) return [];

        return rows.map(HangoutsSheet.mapRowToObj);
    }

    static async getOne(id: string): Promise<HangoutRow | null> {
        const rows = await HangoutsSheet.getAll();
        return rows.find((r) => r.id === id) || null;
    }

    static async createRow(
        data: Omit<HangoutRow, "id" | "dateCreated" | "upvotes">,
    ): Promise<HangoutRow> {
        const id = uuidv4();
        const dateCreated = new Date().toISOString();
        const upvotes = 0;
        const newRow: HangoutRow = { ...data, id, dateCreated, upvotes };
        const values = HangoutsSheet.mapObjToRow(newRow);

        await HangoutsSheet.sheets.spreadsheets.values.append({
            spreadsheetId: HangoutsSheet.spreadsheetId,
            range: `${SHEET_NAME}!A:K`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [values],
            },
        });

        return newRow;
    }

    static async updateRow(
        id: string,
        data: Partial<HangoutRow>,
    ): Promise<HangoutRow | null> {
        const rows = await HangoutsSheet.getAll();
        const rowIndex = rows.findIndex((r) => r.id === id);

        if (rowIndex === -1) return null;

        const updatedRow = { ...rows[rowIndex], ...data, id };
        const values = HangoutsSheet.mapObjToRow(updatedRow);

        const range = `${SHEET_NAME}!A${rowIndex + 2}:K${rowIndex + 2}`;

        await HangoutsSheet.sheets.spreadsheets.values.update({
            spreadsheetId: HangoutsSheet.spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [values],
            },
        });

        return updatedRow;
    }

    static async deleteRow(id: string): Promise<boolean> {
        const rows = await HangoutsSheet.getAll();
        const rowIndex = rows.findIndex((r) => r.id === id);

        if (rowIndex === -1) return false;

        const spreadsheet = await HangoutsSheet.sheets.spreadsheets.get({
            spreadsheetId: HangoutsSheet.spreadsheetId,
        });
        const sheet = spreadsheet.data.sheets?.find(
            (s) => s.properties?.title === SHEET_NAME,
        );
        const sheetId = sheet?.properties?.sheetId;

        if (sheetId === undefined)
            throw new Error(`Sheet '${SHEET_NAME}' not found`);

        await HangoutsSheet.sheets.spreadsheets.batchUpdate({
            spreadsheetId: HangoutsSheet.spreadsheetId,
            requestBody: {
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId: sheetId,
                                dimension: "ROWS",
                                startIndex: rowIndex + 1,
                                endIndex: rowIndex + 2,
                            },
                        },
                    },
                ],
            },
        });

        return true;
    }
}
