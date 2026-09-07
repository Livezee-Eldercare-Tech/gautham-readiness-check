# Gautham Hospital — Post-Discharge Readiness Check Pilot

Mobile-first single-page web tool built for Gautham Hospital's IP Coordinator to evaluate patient discharge readiness, compute hidden clinical need and readiness scores, classify action tiers, and store records.

## Project Structure
```
gowtham-readiness-check/
├── index.html                       # Single-page mobile web app
├── src/
│   ├── css/
│   │   ├── variables.css            # Design tokens & color system (from style.md)
│   │   ├── base.css                 # Typography & responsive reset
│   │   ├── header.css               # Clinical header styling
│   │   ├── components.css           # Cards, option grids, buttons, alerts, confirmation
│   │   └── styles.css               # CSS aggregator bundle
│   └── js/
│       ├── app.js                   # Application coordinator & event flow
│       ├── config.js                # App configuration (endpoints, timeouts, copy)
│       ├── components/
│       │   └── formState.js         # Interactive card selections, validation & payload extraction
│       ├── engine/
│       │   └── scoringEngine.js     # Decision logic & scoring pipeline (Steps 1–5)
│       └── services/
│           ├── apiService.js        # Google Apps Script HTTP client & offline queue
│           └── downloadService.js   # Automatic local backup JSON download on submit
├── backend/
│   └── google-apps-script.js        # Web App backend code for Google Sheet & email alert
├── tests/
│   └── engine.test.js               # Node.js unit tests for rules & scoring
└── style.md                         # Design system & styling specifications
```

## Features
1. **Clinical Decision Engine**:
   - **Step 1 Hard Triggers**: T1 (Raised Hand), T2 (Revolving Door), T3 (Home Alone), T4 (Needs Hands), T5 (Two Patients) $\rightarrow$ `URGENT SUPPORT`.
   - **Step 2 Hard Exclusions**: X1 (Independent with no history/conditions), X2 (Need score $\le 2$) $\rightarrow$ `NO ACTION`.
   - **Step 3 Scores**: Need Score (max 14), Readiness Score (max 12).
   - **Step 4 Matrix**: `URGENT SUPPORT`, `FOLLOW UP`, `INFORM`, `NO ACTION`.
   - **Step 5 Queue Order**: Ranked by Need + Readiness score descending.
2. **Automatic Local Download**:
   - On every submission, a JSON backup file (`readiness_check_<patient>_<timestamp>.json`) is **automatically downloaded locally to the device** so entries are never lost.
3. **Resilient Sync**:
   - In offline or connection drop conditions, submissions are queued with an in-app "Saved on device" banner and a "Retry Sync" trigger.
4. **Google Apps Script & Sheet Integration**:
   - Stores all 15 responses, Need Score, Readiness Score, Trigger ID, and Tier.
   - Conditional color coding (Red, Amber, Blue, Grey).
   - Urgent email alerts sent directly to Deepthi when `URGENT SUPPORT` triggers.

## Running Tests
```bash
node tests/engine.test.js
```
