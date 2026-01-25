# Architect Mode Rules (Non-Obvious Only)

- **Persistence**: Google Sheets is the primary database. Data integrity depends on the mapping logic in [`backend/src/sheets.ts`](backend/src/sheets.ts).
- **Concurrency**: The backend handles requests statelessly but depends on Sheets API for row-level operations (append/update).
- **Boolean Storage**: Database-level booleans must be handled as strings `"TRUE"`/`"FALSE"`.
- **Auth Direction**: See [`notes.txt`](notes.txt) for the planned JWT-based authentication strategy.
