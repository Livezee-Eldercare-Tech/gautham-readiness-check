/**
 * Form State & Selection Management
 * Handles multi-tick and single-tick interactive cards, validation, and payload serialization
 */

/**
 * Initialize interactive card selection handlers
 */
export function initOptionCardHandlers() {
  // Radio option cards
  document.querySelectorAll('.opt-card.radio').forEach(card => {
    card.addEventListener('click', (e) => {
      const input = card.querySelector('input[type="radio"]');
      const name = input.name;
      
      // Deselect siblings in the same radio group
      document.querySelectorAll(`input[type="radio"][name="${name}"]`).forEach(siblingInput => {
        const siblingCard = siblingInput.closest('.opt-card');
        if (siblingCard) {
          siblingCard.classList.remove('active');
          siblingInput.checked = false;
        }
      });

      // Select clicked card
      card.classList.add('active');
      input.checked = true;
    });
  });

  // Checkbox option cards (with mutual exclusivity support for 'None' and 'None yet')
  document.querySelectorAll('.opt-card.checkbox').forEach(card => {
    card.addEventListener('click', (e) => {
      const input = card.querySelector('input[type="checkbox"]');
      const name = input.name;
      const val = input.value;
      const willBeChecked = !input.checked;

      if (val === 'None' || val === 'None yet') {
        if (willBeChecked) {
          // Uncheck all other checkboxes in this group
          document.querySelectorAll(`input[type="checkbox"][name="${name}"]`).forEach(otherInput => {
            if (otherInput !== input) {
              otherInput.checked = false;
              const otherCard = otherInput.closest('.opt-card');
              if (otherCard) otherCard.classList.remove('active');
            }
          });
        }
      } else {
        if (willBeChecked) {
          // Uncheck 'None' or 'None yet' if user selects a valid option
          document.querySelectorAll(`input[type="checkbox"][name="${name}"]`).forEach(otherInput => {
            if (otherInput.value === 'None' || otherInput.value === 'None yet') {
              otherInput.checked = false;
              const otherCard = otherInput.closest('.opt-card');
              if (otherCard) otherCard.classList.remove('active');
            }
          });
        }
      }

      input.checked = willBeChecked;
      if (input.checked) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  });
}

/**
 * Extract form values into clean structured answers object
 * @returns {Object}
 */
export function extractFormAnswers() {
  const patientName = document.getElementById('patientName').value.trim();
  const age = document.getElementById('age').value.trim();
  const q3 = document.querySelector('input[name="q3"]:checked')?.value || '';
  const doctorDept = document.getElementById('doctorDept').value.trim();
  const admissionReason = document.getElementById('admissionReason').value.trim();
  const q6 = document.querySelector('input[name="q6"]:checked')?.value || '';
  
  const q7Checked = Array.from(document.querySelectorAll('input[name="q7"]:checked')).map(i => i.value);
  const q8 = document.querySelector('input[name="q8"]:checked')?.value || '';
  const q9 = document.querySelector('input[name="q9"]:checked')?.value || '';
  const q10Checked = Array.from(document.querySelectorAll('input[name="q10"]:checked')).map(i => i.value);
  const q11 = document.querySelector('input[name="q11"]:checked')?.value || '';
  const q12 = document.querySelector('input[name="q12"]:checked')?.value || '';
  const q13 = document.querySelector('input[name="q13"]:checked')?.value || '';
  const q14 = document.querySelector('input[name="q14"]:checked')?.value || '';
  const q15 = document.querySelector('input[name="q15"]:checked')?.value || '';

  return {
    patientName,
    age,
    q3,
    doctorDept,
    admissionReason,
    q6,
    q7: q7Checked,
    q8,
    q9,
    q10: q10Checked,
    q11,
    q12,
    q13,
    q14,
    q15,
  };
}

/**
 * Validate form answers
 * @param {Object} answers
 * @returns {{valid: boolean, message?: string, fieldId?: string}}
 */
export function validateAnswers(answers) {
  if (!answers.patientName) return { valid: false, message: 'Please enter patient name.' };
  if (!answers.age) return { valid: false, message: 'Please enter patient age.' };
  if (!answers.q3) return { valid: false, message: 'Please select room category (Q3).' };
  if (!answers.doctorDept) return { valid: false, message: 'Please enter consulting doctor & department (Q4).' };
  if (!answers.admissionReason) return { valid: false, message: 'Please enter reason for this admission (Q5).' };
  if (!answers.q6) return { valid: false, message: 'Please select prior admission history (Q6).' };
  if (!answers.q7 || answers.q7.length === 0) return { valid: false, message: 'Please select ongoing conditions (Q7).' };
  if (!answers.q8) return { valid: false, message: 'Please select mobility status (Q8).' };
  if (!answers.q9) return { valid: false, message: 'Please select falls or noticeable decline (Q9).' };
  if (!answers.q10 || answers.q10.length === 0) return { valid: false, message: 'Please select post-discharge instructions (Q10).' };
  if (!answers.q11) return { valid: false, message: 'Please select who will be at home during the day (Q11).' };
  if (!answers.q12) return { valid: false, message: 'Please select family outside India status (Q12).' };
  if (!answers.q13) return { valid: false, message: 'Please select main decision-maker (Q13).' };
  if (!answers.q14) return { valid: false, message: 'Please select expected management difficulty (Q14).' };
  if (!answers.q15) return { valid: false, message: 'Please select if family would like structured support info (Q15).' };

  return { valid: true };
}

/**
 * Reset form fields to fresh state
 */
export function resetFormState() {
  document.getElementById('readinessForm').reset();
  document.querySelectorAll('.opt-card').forEach(card => card.classList.remove('active'));
}
