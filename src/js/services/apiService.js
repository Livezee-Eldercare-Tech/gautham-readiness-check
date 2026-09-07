/**
 * API Submission Service
 * Handles POST requests to Google Apps Script Web App endpoint with fallback sync queue
 */
import { CONFIG } from '../config.js';

/**
 * Get pending sync queue from localStorage
 * @returns {Array}
 */
export function getPendingQueue() {
  try {
    const raw = localStorage.getItem(CONFIG.STORAGE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading pending queue:', e);
    return [];
  }
}

/**
 * Save pending queue to localStorage
 * @param {Array} queue
 */
export function savePendingQueue(queue) {
  try {
    localStorage.setItem(CONFIG.STORAGE_QUEUE_KEY, JSON.stringify(queue));
  } catch (e) {
    console.error('Error writing pending queue:', e);
  }
}

/**
 * Add a record to the pending sync queue
 * @param {Object} payload
 */
export function enqueueSubmission(payload) {
  const queue = getPendingQueue();
  queue.push(payload);
  savePendingQueue(queue);
}

/**
 * Remove a record by its client UUID
 * @param {string} id
 */
export function dequeueSubmission(id) {
  const queue = getPendingQueue().filter(item => item.id !== id);
  savePendingQueue(queue);
}

/**
 * Send payload to Google Apps Script endpoint
 * @param {Object} payload
 * @returns {Promise<{success: boolean, error?: string, queued?: boolean}>}
 */
export async function submitToBackend(payload) {
  if (!CONFIG.APPS_SCRIPT_URL) {
    enqueueSubmission(payload);
    return {
      success: true,
      queued: true,
      message: 'Saved locally on device (pending backend configuration).'
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeoutId);

    // Google Apps Script redirect response handling
    if (response.ok || response.type === 'opaque') {
      // If was previously queued, dequeue
      dequeueSubmission(payload.id);
      return { success: true };
    }

    throw new Error(`Server returned HTTP ${response.status}`);
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn('Network submission failed, queueing locally:', error);
    // Ensure it is in queue
    const queue = getPendingQueue();
    if (!queue.some(item => item.id === payload.id)) {
      enqueueSubmission(payload);
    }
    return {
      success: false,
      queued: true,
      error: error.message || 'Network request failed'
    };
  }
}

/**
 * Flush all pending submissions
 * @returns {Promise<{syncedCount: number, remainingCount: number}>}
 */
export async function syncPendingSubmissions() {
  if (!CONFIG.APPS_SCRIPT_URL) {
    return { syncedCount: 0, remainingCount: getPendingQueue().length };
  }

  const queue = getPendingQueue();
  if (queue.length === 0) {
    return { syncedCount: 0, remainingCount: 0 };
  }

  let syncedCount = 0;
  for (const item of [...queue]) {
    try {
      const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(item),
        redirect: 'follow',
      });
      if (response.ok || response.type === 'opaque') {
        dequeueSubmission(item.id);
        syncedCount++;
      }
    } catch (e) {
      console.warn(`Sync retry failed for item ${item.id}:`, e);
      break;
    }
  }

  return { syncedCount, remainingCount: getPendingQueue().length };
}
