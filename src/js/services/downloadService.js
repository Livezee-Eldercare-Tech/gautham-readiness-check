/**
 * Local Download Backup Service
 * Automatically downloads record to client's device upon submission
 * Ensures coordinators never lose an entry even if offline or browser closes.
 */

/**
 * Trigger local automatic file download for a submission record
 * @param {Object} recordPayload
 */
export function downloadRecordLocally(recordPayload) {
  try {
    const rawName = (recordPayload.patientName || 'Patient').trim();
    // Sanitize patient name for filesystem (preserve casing/hyphens/underscores)
    const sanitizedName = rawName.replace(/[^a-zA-Z0-9_-]/g, '_');
    
    // Format timestamp nicely e.g. 2026-09-07_16-18
    const d = new Date(recordPayload.timestamp || Date.now());
    const dateStr = d.toISOString().slice(0, 10);
    const timeStr = `${String(d.getHours()).padStart(2, '0')}-${String(d.getMinutes()).padStart(2, '0')}-${String(d.getSeconds()).padStart(2, '0')}`;
    
    // Patient Name is the leading element of the filename
    const fileName = `${sanitizedName}_Readiness_Check_${dateStr}_${timeStr}.json`;
    const dataStr = JSON.stringify(recordPayload, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 300);

    return { success: true, fileName };
  } catch (error) {
    console.error('Failed to trigger automatic local download:', error);
    return { success: false, error };
  }
}
