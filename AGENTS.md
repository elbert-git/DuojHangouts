# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Non-Obvious Patterns

- **Database**: Google Sheets is the source of truth. All persistence must go through [`backend/src/sheets.ts:HangoutsSheet`](backend/src/sheets.ts).
- **Boolean Handling**: Sheets stores booleans as `"TRUE"`/`"FALSE"` strings. Manual conversion is required (see `mapRowToObj`/`mapObjToRow` in `sheets.ts`).
- **Sheet Schema**: Assumes a sheet named `hangouts` with 11 columns (range `A:K`).
- **Backend Secrets**: Environment variables are managed via [`backend/src/secrets.ts`](backend/src/secrets.ts).
- **Project Structure**: Separate `package.json` files for `frontend/` and `backend/`. Run `npm run dev` in each directory.
- **Frontend Aliases**: Uses `@/` for `src/` imports (configured in `vite.config.ts`).
- **Status Tracking**: Refer to [`notes.txt`](notes.txt) for current progress and roadmap.
