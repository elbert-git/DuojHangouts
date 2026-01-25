# Debug Mode Rules (Non-Obvious Only)

- **Auth/DB Failures**: Check `backend/google-key.json` and `backend/.env` (especially `SPREADSHEET_ID`).
- **Nodemon Sync**: Backend uses `tsc --watch`. If changes don't reflect, check if `backend/dist/` is updating.
- **Boolean Bugs**: Ensure booleans are being converted from `"TRUE"`/`"FALSE"` strings when reading from Sheets.
- **Port Conflicts**: Backend port is defined in `backend/.env`.
