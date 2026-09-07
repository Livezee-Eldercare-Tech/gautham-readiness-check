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

  // Form submission handler
  form.addEventListener('submit', async (e) => {
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
    submitBtn.disabled = true;
    submitBtn.textContent = 'Recording Submission...';

    try {
      // 1. Evaluate scores & triggers client-side
      const evaluation = evaluateSubmission(answers);

      // 2. Build full payload with client UUID & timestamp
      const submissionId = 'rc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
      const payload = {
        id: submissionId,
        timestamp: new Date().toISOString(),
        ...answers,
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

      // 5. Show coordinator confirmation view (Section 8: no scores or tiers shown)
      formCard.style.display = 'none';
      confirmationView.classList.add('visible');
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      console.error('Submission handling error:', err);
      errorBox.textContent = 'An unexpected error occurred. Please try again.';
      errorBox.classList.add('visible');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Readiness Check';
    }
  });
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
