/**
 * Main Application Orchestrator
 * Integrates scoring engine, local backup download, UI state, and API sync
 */
import { evaluateSubmission } from './engine/scoringEngine.js';
import { downloadRecordLocally } from './services/downloadService.js';
import {
  submitToBackend,
  syncPendingSubmissions,
  getPendingQueue
} from './services/apiService.js';
import {
  initOptionCardHandlers,
  extractFormAnswers,
  validateAnswers,
  resetFormState
} from './components/formState.js';
import { CONFIG } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  initOptionCardHandlers();
  updateSyncBanner();

  const form = document.getElementById('readinessForm');
  const errorBox = document.getElementById('errorBox');
  const submitBtn = document.getElementById('submitBtn');
  const formCard = document.getElementById('formCard');
  const confirmationView = document.getElementById('confirmationView');
  const btnNewEntry = document.getElementById('btnNewEntry');
  const retrySyncBtn = document.getElementById('retrySyncBtn');

  // Sync banner retry handler
  if (retrySyncBtn) {
    retrySyncBtn.addEventListener('click', async () => {
      retrySyncBtn.disabled = true;
      retrySyncBtn.textContent = 'Syncing...';
      await syncPendingSubmissions();
      updateSyncBanner();
      retrySyncBtn.disabled = false;
      retrySyncBtn.textContent = 'Retry Sync';
    });
  }

  // Window network listener
  window.addEventListener('online', async () => {
    await syncPendingSubmissions();
    updateSyncBanner();
  });

  // "Submit another response" button
  if (btnNewEntry) {
    btnNewEntry.addEventListener('click', () => {
      resetFormState();
      errorBox.classList.remove('visible');
      errorBox.textContent = '';
      confirmationView.classList.remove('visible');
      formCard.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const previewModal = document.getElementById('previewModal');
  const previewBody = document.getElementById('previewBody');
  const btnEditForm = document.getElementById('btnEditForm');
  const btnConfirmSubmit = document.getElementById('btnConfirmSubmit');

  let activeAnswers = null;

  // Helper to escape HTML characters safely
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Populate preview HTML
  function renderPreview(answers) {
    const q7Str = (answers.q7 && answers.q7.length > 0) ? answers.q7.join(', ') : 'None';
    const q10Str = (answers.q10 && answers.q10.length > 0) ? answers.q10.join(', ') : 'None yet';

    previewBody.innerHTML = `
      <!-- Section 1: Patient Information -->
      <div class="preview-section">
        <div class="preview-section-title">
          <span>Patient Demographics</span>
          <span class="badge badge-gold">Admissions</span>
        </div>
        <div class="preview-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
          <div class="preview-row">
            <span class="preview-label">1. Patient Name</span>
            <span class="preview-val highlight">${escapeHtml(answers.patientName)}</span>
          </div>
          <div class="preview-row">
            <span class="preview-label">2. Age &amp; Gender</span>
            <span class="preview-val">${escapeHtml(answers.age)} yrs · ${escapeHtml(answers.gender)}</span>
          </div>
          <div class="preview-row">
            <span class="preview-label">3. Room Category</span>
            <span class="preview-val">${escapeHtml(answers.q3)}</span>
          </div>
          <div class="preview-row">
            <span class="preview-label">4. Consulting Doctor &amp; Dept</span>
            <span class="preview-val">${escapeHtml(answers.doctorDept)}</span>
          </div>
        </div>
      </div>

      <!-- Section 2: Clinical History & Status -->
      <div class="preview-section">
        <div class="preview-section-title">
          <span>Clinical Status &amp; Instructions</span>
          <span class="badge badge-gold">Inpatient Care</span>
        </div>
        <div class="preview-grid">
          <div class="preview-row">
            <span class="preview-label">5. Admission Reason</span>
            <span class="preview-val">${escapeHtml(answers.admissionReason)}</span>
          </div>
          <div class="preview-row">
            <span class="preview-label">6. Admitted Before for Same/Related Problem</span>
            <span class="preview-val">${escapeHtml(answers.q6)}</span>
          </div>
          <div class="preview-row">
            <span class="preview-label">7. Ongoing Conditions</span>
            <span class="preview-val">${escapeHtml(q7Str)}</span>
            ${answers.q7Notes ? `<div class="preview-notes">Notes: ${escapeHtml(answers.q7Notes)}</div>` : ''}
          </div>
          <div class="preview-row">
            <span class="preview-label">8. Mobility</span>
            <span class="preview-val">${escapeHtml(answers.q8)}</span>
          </div>
          <div class="preview-row">
            <span class="preview-label">9. Falls or Noticeable Decline (Last 6 Months)</span>
            <span class="preview-val">${escapeHtml(answers.q9)}</span>
            ${answers.q9Notes ? `<div class="preview-notes">Notes: ${escapeHtml(answers.q9Notes)}</div>` : ''}
          </div>
          <div class="preview-row">
            <span class="preview-label">10. Post-Discharge Instructions</span>
            <span class="preview-val">${escapeHtml(q10Str)}</span>
            ${answers.q10Notes ? `<div class="preview-notes">Notes: ${escapeHtml(answers.q10Notes)}</div>` : ''}
          </div>
        </div>
      </div>

      <!-- Section 3: Social, Caregiver & Follow-up Readiness -->
      <div class="preview-section">
        <div class="preview-section-title">
          <span>Home Environment &amp; Family Support</span>
          <span class="badge badge-gold">Discharge Readiness</span>
        </div>
        <div class="preview-grid">
          <div class="preview-row">
            <span class="preview-label">11. Caregiver at Home During Day</span>
            <span class="preview-val">${escapeHtml(answers.q11)}</span>
          </div>
          <div class="preview-row">
            <span class="preview-label">12. Family Outside India</span>
            <span class="preview-val">${escapeHtml(answers.q12)}</span>
          </div>
          <div class="preview-row">
            <span class="preview-label">13. Main Decision-Maker</span>
            <span class="preview-val">${escapeHtml(answers.q13)}</span>
          </div>
          <div class="preview-row">
            <span class="preview-label">14. Expects Difficulty Managing Care at Home</span>
            <span class="preview-val">${escapeHtml(answers.q14)}</span>
          </div>
          <div class="preview-row">
            <span class="preview-label">15. Interested in Structured Recovery Support Info</span>
            <span class="preview-val highlight">${escapeHtml(answers.q15)}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Edit form handler from modal
  if (btnEditForm) {
    btnEditForm.addEventListener('click', () => {
      previewModal.classList.remove('visible');
    });
  }

  // Form submission handler: Validates and presents mandatory preview
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Extract answers
    const answers = extractFormAnswers();

    // Validate inputs
    const validation = validateAnswers(answers);
    if (!validation.valid) {
      errorBox.textContent = validation.message;
      errorBox.classList.add('visible');
      errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    errorBox.classList.remove('visible');
    activeAnswers = answers;

    // Show preview modal for mandatory cross-check
    renderPreview(answers);
    previewModal.classList.add('visible');
  });

  // Final confirmed submission handler
  if (btnConfirmSubmit) {
    btnConfirmSubmit.addEventListener('click', async () => {
      if (!activeAnswers) return;

      btnConfirmSubmit.disabled = true;
      btnConfirmSubmit.textContent = 'Submitting...';
      if (btnEditForm) btnEditForm.disabled = true;

      try {
        // 1. Evaluate scores & triggers client-side
        const evaluation = evaluateSubmission(activeAnswers);

        // 2. Build full payload with client UUID & timestamp
        const submissionId = 'rc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
        const payload = {
          id: submissionId,
          timestamp: new Date().toISOString(),
          ...activeAnswers,
          needScore: evaluation.needScore,
          readinessScore: evaluation.readinessScore,
          triggerId: evaluation.triggerId,
          tier: evaluation.tier,
          rankScore: evaluation.rankScore,
        };

        // 3. User Requirement: Automatically download locally so it is never lost!
        const dlResult = downloadRecordLocally(payload);
        if (dlResult.fileName) {
          const downloadStatusEl = document.getElementById('downloadStatusNote');
          if (downloadStatusEl) {
            downloadStatusEl.textContent = `Backed up locally to ${dlResult.fileName}`;
          }
        }

        // 4. Send to Google Apps Script backend (with fallback queue in localStorage)
        await submitToBackend(payload);
        updateSyncBanner();

        // 5. Close preview modal & show coordinator confirmation view
        previewModal.classList.remove('visible');
        formCard.style.display = 'none';
        confirmationView.classList.add('visible');
        window.scrollTo({ top: 0, behavior: 'smooth' });

      } catch (err) {
        console.error('Submission handling error:', err);
        previewModal.classList.remove('visible');
        errorBox.textContent = 'An unexpected error occurred while saving. Please try again.';
        errorBox.classList.add('visible');
      } finally {
        btnConfirmSubmit.disabled = false;
        btnConfirmSubmit.textContent = 'Confirm & Submit';
        if (btnEditForm) btnEditForm.disabled = false;
      }
    });
  }
});

function updateSyncBanner() {
  const syncBanner = document.getElementById('syncBanner');
  const pendingCountEl = document.getElementById('pendingCount');
  if (!syncBanner) return;

  const queue = getPendingQueue();
  if (queue.length > 0) {
    if (pendingCountEl) pendingCountEl.textContent = queue.length;
    syncBanner.classList.add('active');
  } else {
    syncBanner.classList.remove('active');
  }
}
