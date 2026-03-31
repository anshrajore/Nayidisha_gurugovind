type UnknownRecord = Record<string, unknown>;

const GOOGLE_SHEETS_WEBAPP_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL as string | undefined;

/**
 * Append a job row into Google Sheets.
 *
 * Security note: do not call Google Sheets API directly from the browser with service-account credentials.
 * Instead, use a Google Apps Script Web App URL (configured via `VITE_GOOGLE_SHEETS_WEBAPP_URL`)
 * that receives JSON and appends a row to your spreadsheet.
 */
export async function appendJobToGoogleSheets(job: UnknownRecord): Promise<void> {
  if (!GOOGLE_SHEETS_WEBAPP_URL) {
    // Keep job posting working even if Sheets isn't configured.
    return;
  }

  // Google Apps Script Web Apps typically do not send CORS headers.
  // Using `no-cors` makes this a fire-and-forget call from the browser.
  await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "no-cors",
    body: JSON.stringify({
      job,
    }),
  });
}

