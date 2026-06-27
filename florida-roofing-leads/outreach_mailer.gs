/**
 * Cold-email mail merge for the Florida roofing leads — Google Apps Script (FREE).
 * Sends personalized emails from your Gmail/Workspace account, one per company,
 * picking template A (new landing page) or B (redesign) per row, replacing
 * {{Company}}, {{City}} and {{ProblemLine}}. Marks each row as sent so it never
 * double-sends, and stops at DAILY_LIMIT to protect deliverability.
 *
 *  SETUP (5 minutes):
 *  1) Open https://sheets.google.com -> File > Import > upload mailmerge_florida.csv
 *     (or paste the .xlsx "Mail merge" sheet). Keep the header row exactly as is.
 *  2) Extensions > Apps Script. Delete the sample code, paste THIS file.
 *  3) Edit the CONFIG block below (your name, your reply email, daily limit).
 *  4) Run > sendBatch once. Approve the Gmail permission prompt.
 *  5) (Optional, fully automatic) Run createDailyTrigger once -> it will then
 *     send a new batch automatically every day until the list is finished.
 *
 *  DELIVERABILITY: keep DAILY_LIMIT at 30-50. Use a separate domain you have
 *  warmed up for 2-3 weeks, NOT your main personal Gmail. Cold blasting 1000/day
 *  WILL get the address blacklisted.
 */

// ----------------------------- CONFIG -----------------------------
var CONFIG = {
  SHEET_NAME: "Mail merge (con email)", // tab name; use "Sheet1" if you imported the CSV
  YOUR_NAME:  "Your Name",              // <-- change
  YOUR_EMAIL: "you@yourdomain.com",     // <-- change (your reply-to)
  DAILY_LIMIT: 40,                       // safe cold-email volume per day per inbox
  SECONDS_BETWEEN_SENDS: 8               // small human-like gap
};

// --------------------------- TEMPLATES ----------------------------
// Template A = company has NO real website (build a landing page from scratch)
var TEMPLATE_A =
"Hi {{Company}} team,\n\n" +
"{{ProblemLine}}\n\n" +
"These days the first thing a homeowner does before calling a roofer is look them " +
"up online — and right now {{Company}} is hard to find. I build clean, mobile-" +
"friendly landing pages for roofing companies that show your work, your reviews, " +
"and a clear \"get a free quote\" button.\n\n" +
"I'd be happy to design a free mockup of a homepage for {{Company}} so you can see " +
"exactly how it would look before deciding anything. Want me to send it over? " +
"Just reply \"yes\".\n\n" +
"Best,\n{{YourName}}\n{{YourEmail}}\n\n" +
"P.S. Not interested? Reply \"stop\" and I won't reach out again.";

// Template B = company HAS a website but it's old/obsolete/insecure (redesign)
var TEMPLATE_B =
"Hi {{Company}} team,\n\n" +
"{{ProblemLine}}\n\n" +
"I design and rebuild websites specifically for roofing companies. I'd be glad to " +
"put together a free, no-obligation mockup of what a modern, secure, mobile-friendly " +
"site for {{Company}} could look like — fast, and built to turn visitors in " +
"{{City}} into booked jobs.\n\n" +
"If you'd like to see it, just reply \"yes\" and I'll send it over in a couple of " +
"days. No cost and no pressure.\n\n" +
"Best,\n{{YourName}}\n{{YourEmail}}\n\n" +
"P.S. If you'd rather not hear from me, just reply \"stop\" and I won't email again.";

// --------------------------- ENGINE -------------------------------
function sendBatch() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var head = data[0];
  var col = {};
  head.forEach(function(h, i){ col[String(h).trim()] = i; });
  ['Email','Company','City','Template','Subject','ProblemLine','Sent'].forEach(function(c){
    if (col[c] === undefined) throw new Error("Missing column: " + c);
  });

  var sentToday = 0;
  for (var r = 1; r < data.length; r++) {
    if (sentToday >= CONFIG.DAILY_LIMIT) break;
    var row = data[r];
    var email = String(row[col.Email]).trim();
    if (!email || row[col.Sent]) continue;            // skip blank / already sent
    if (email.indexOf("@") < 0) continue;

    var tpl = String(row[col.Template]).trim().toUpperCase() === "A" ? TEMPLATE_A : TEMPLATE_B;
    var body = tpl
      .replace(/{{Company}}/g,     row[col.Company])
      .replace(/{{City}}/g,        row[col.City] || "your area")
      .replace(/{{ProblemLine}}/g, row[col.ProblemLine])
      .replace(/{{YourName}}/g,    CONFIG.YOUR_NAME)
      .replace(/{{YourEmail}}/g,   CONFIG.YOUR_EMAIL);
    var subject = String(row[col.Subject]) ||
                  ("Quick question about " + row[col.Company] + "'s website");

    try {
      GmailApp.sendEmail(email, subject, body, {
        name: CONFIG.YOUR_NAME,
        replyTo: CONFIG.YOUR_EMAIL
      });
      sheet.getRange(r + 1, col.Sent + 1).setValue(new Date());
      sentToday++;
      Utilities.sleep(CONFIG.SECONDS_BETWEEN_SENDS * 1000);
    } catch (e) {
      sheet.getRange(r + 1, col.Sent + 1).setValue("ERROR: " + e.message);
    }
  }
  Logger.log("Sent " + sentToday + " emails this run.");
}

// Run ONCE to send a fresh batch automatically every day.
function createDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach(function(t){
    if (t.getHandlerFunction() === "sendBatch") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("sendBatch").timeBased().everyDays(1).atHour(10).create();
  Logger.log("Daily trigger created (sends each day ~10am).");
}
