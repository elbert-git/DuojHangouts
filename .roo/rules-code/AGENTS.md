# Code Mode Rules (Non-Obvious Only)

- **Database**: Use [`backend/src/sheets.ts:HangoutsSheet`](backend/src/sheets.ts) for all data persistence. Do not use local files or other databases.
- **Boolean Conversion**: Manually convert booleans to/from `"TRUE"`/`"FALSE"` when interacting with Sheets (see `mapRowToObj` and `mapObjToRow` in `sheets.ts`).
- **Backend Secrets**: Access backend secrets via [`backend/src/secrets.ts`](backend/src/secrets.ts).
- **Frontend Utilities**: Use `cn()` from [`frontend/src/lib/utils.ts`](frontend/src/lib/utils.ts) for Tailwind class merging.
- **Vite Config**: Tailwind 4 is integrated via `@tailwindcss/vite` in [`frontend/vite.config.ts`](frontend/vite.config.ts).
- **Imports**: Frontend uses `@/` for `src/` imports.
