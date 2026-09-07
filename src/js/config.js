/**
 * Application Configuration
 * Gautham Hospital - Post-Discharge Readiness Check
 */

export const CONFIG = {
  // Replace with deployed Google Apps Script Web App URL
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzbwjRVGIovIQQqoyRkEP4dxdkBEqxJT04rHZnQV_ju0HpPXBmIG4pxHlinBYR28UwY/exec',
  // Timeout for API POST requests in milliseconds
  REQUEST_TIMEOUT_MS: 12000,
  
  // App branding text
  HOSPITAL_NAME: 'Gautham Hospital',
  TOOL_TITLE: 'Post-Discharge Readiness Check',
  
  // Verbatim consent text required at top of form
  CONSENT_TEXT: 'The information below is collected by Gautham Hospital and shared with its service providers to facilitate the patient’s treatment, recovery support and follow-up care after discharge.',
  
  // Coordinator success message
  SUCCESS_MESSAGE: 'Recorded. The care team will review before discharge.',
  
  // Local storage queue key for background sync fallback
  STORAGE_QUEUE_KEY: 'gautham_pending_readiness_checks',
};
