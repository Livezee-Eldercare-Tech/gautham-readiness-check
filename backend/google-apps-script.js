/**
 * Gautham Hospital - Post-Discharge Readiness Check
 * Google Apps Script Web App Backend
 *
 * Setup Instructions:
 * 1. Create a Google Sheet on the LivEzee account.
 * 2. Restrict sharing access to: Jyothish, Deepthi, Naveen only.
 * 3. In Extensions > Apps Script, replace code with this file.
 * 4. Configure DEEPTHI_EMAIL below.
 * 5. Deploy as Web App:
 *    - Execute as: Me
 *    - Who has access: Anyone (to receive POST payloads from Cloudflare Pages)
 * 6. Copy Web App URL into `src/js/config.js` (`APPS_SCRIPT_URL`).
 */

const DEEPTHI_EMAIL = "deepthi@livezee.com"; // Adjust email as required
const ALERT_SUBJECT_PREFIX = "[URGENT SUPPORT REQUIRED] Gautham Hospital Readiness Check";

// Optional: If you opened Apps Script standalone, paste the Sheet ID (from the URL: /spreadsheets/d/<ID>/edit)
const SPREADSHEET_ID = "";

/**
 * Handles incoming POST requests
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // 30s lock for concurrent submissions

    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.patientName || '',
      data.age || '',
      data.q3 || '', // Room category
      data.doctorDept || '', // Doctor & dept
      data.admissionReason || '', // Reason for admission
      data.q6 || '', // Admitted before
      Array.isArray(data.q7) ? data.q7.join(', ') : (data.q7 || ''), // Conditions
      data.q8 || '', // Mobility
      data.q9 || '', // Falls/decline
      Array.isArray(data.q10) ? data.q10.join(', ') : (data.q10 || ''), // Discharge instructions
      data.q11 || '', // Caretaker daytime
      data.q12 || '', // Family abroad
      data.q13 || '', // Decision-maker
      data.q14 || '', // Difficulty managing care
      data.q15 || '', // Info requested
      data.triggerId || '', // Trigger ID: T1-T5, X1-X2, matrix
      data.needScore !== undefined ? data.needScore : '', // Need score (client-side)
      data.readinessScore !== undefined ? data.readinessScore : '', // Readiness score (client-side)
      data.tier || '', // Tier: URGENT SUPPORT, FOLLOW UP, INFORM, NO ACTION
      data.rankScore !== undefined ? data.rankScore : (Number(data.needScore || 0) + Number(data.readinessScore || 0)),
      data.id || '' // Client UUID
    ];

    sheet.appendRow(rowData);

    // Apply conditional formatting
    applyConditionalFormatting(sheet);

    // Check if Urgent Support alert is needed
    if (data.tier === 'URGENT SUPPORT') {
      sendUrgentNotification(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', id: data.id }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('doPost Error: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Returns or sets up the pilot sheet
 */
function getOrCreateSheet() {
  let ss;
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID.trim());
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) {
    throw new Error("Cannot locate spreadsheet. If script is standalone, please set SPREADSHEET_ID.");
  }

  // Use active sheet if it's already named or create 'Readiness_Submissions'
  let sheet = ss.getSheetByName('Readiness_Submissions');
  if (!sheet) {
    sheet = ss.getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.setName('Readiness_Submissions');
    } else {
      sheet = ss.insertSheet('Readiness_Submissions');
    }
  }

  const headers = [
    'Timestamp',
    'Patient Name',
    'Age',
    'Room Category (Q3)',
    'Doctor & Dept (Q4)',
    'Admission Reason (Q5)',
    'Admitted Before (Q6)',
    'Ongoing Conditions (Q7)',
    'Mobility (Q8)',
    'Decline / Falls (Q9)',
    'Discharge Instructions (Q10)',
    'Daytime Caregiver (Q11)',
    'Family Abroad (Q12)',
    'Decision-Maker (Q13)',
    'Care Difficulty (Q14)',
    'Wants Info (Q15)',
    'Trigger ID',
    'Need Score',
    'Readiness Score',
    'Tier',
    'Queue Rank (Need+Readiness)',
    'Submission ID'
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#1e436c')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * Sends urgent alert email to Deepthi
 */
function sendUrgentNotification(data) {
  try {
    const subject = `${ALERT_SUBJECT_PREFIX}: ${data.patientName} (Age ${data.age})`;
    const body = `
URGENT SUPPORT REQUIRED
SLA: Family must be contacted within 24 hours of discharge.

Patient Details:
- Name: ${data.patientName}
- Age: ${data.age}
- Room Category: ${data.q3}
- Doctor / Dept: ${data.doctorDept}
- Admission Reason: ${data.admissionReason}

Clinical & Readiness Profile:
- Trigger Fired: ${data.triggerId}
- Tier: ${data.tier}
- Need Score: ${data.needScore} / 14
- Readiness Score: ${data.readinessScore} / 12
- Prior Admission: ${data.q6}
- Conditions: ${Array.isArray(data.q7) ? data.q7.join(', ') : data.q7}
- Mobility: ${data.q8}
- Falls / Decline: ${data.q9}
- Discharge Instructions: ${Array.isArray(data.q10) ? data.q10.join(', ') : data.q10}
- Daytime Caregiver: ${data.q11}
- Family Abroad: ${data.q12}
- Decision-Maker: ${data.q13}
- Expects Difficulty: ${data.q14}
- Info Request: ${data.q15}

Timestamp: ${data.timestamp}
Submission ID: ${data.id}
    `;

    MailApp.sendEmail({
      to: DEEPTHI_EMAIL,
      subject: subject,
      body: body
    });
  } catch (err) {
    Logger.log('Failed to send urgent email notification: ' + err.toString());
  }
}

/**
 * Applies conditional formatting rules:
 * - URGENT SUPPORT: Red (#fca5a5 / #7a1a1a)
 * - FOLLOW UP: Amber (#fef08a / #854d0e)
 * - INFORM: Blue (#bfdbfe / #1e40af)
 * - NO ACTION: Grey (#e5e7eb / #4b5563)
 */
function applyConditionalFormatting(sheet) {
  const tierColumn = 20; // Column T
  const lastRow = Math.max(sheet.getLastRow(), 2);
  const range = sheet.getRange(2, tierColumn, lastRow - 1, 1);

  const rules = sheet.getConditionalFormatRules();
  if (rules.length >= 4) return; // Already formatted

  const urgentRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('URGENT SUPPORT')
    .setBackground('#fecaca')
    .setFontColor('#991b1b')
    .setRanges([range])
    .build();

  const followUpRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('FOLLOW UP')
    .setBackground('#fef08a')
    .setFontColor('#854d0e')
    .setRanges([range])
    .build();

  const informRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('INFORM')
    .setBackground('#bfdbfe')
    .setFontColor('#1e40af')
    .setRanges([range])
    .build();

  const noActionRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('NO ACTION')
    .setBackground('#e5e7eb')
    .setFontColor('#4b5563')
    .setRanges([range])
    .build();

  sheet.setConditionalFormatRules([urgentRule, followUpRule, informRule, noActionRule]);
}
