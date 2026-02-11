// Session state management utilities
// Health data stored only in memory - never persisted

/**
 * Create initial session state
 * @returns {Object} Initial session state
 */
export function createInitialSessionState() {
  return {
    metrics: {
      weight: null,
      height: null,
      waist: null
    },
    conditions: [],
    currentStep: 0
  };
}

/**
 * Clear session data from memory
 * @param {Function} setState - State setter function
 */
export function clearSessionData(setState) {
  setState(createInitialSessionState());
}

/**
 * Validate step data
 * @param {number} stepIndex - Current step index
 * @param {Object} data - Session data
 * @returns {Object} Validation result with isValid and errors
 */
export function validateStep(stepIndex, data) {
  const errors = {};
  
  switch (stepIndex) {
    case 1: // Weight
      if (!data.metrics.weight || data.metrics.weight.value <= 0) {
        errors.weight = 'Por favor ingrese un peso válido';
      }
      break;
    case 2: // Height
      if (!data.metrics.height || data.metrics.height.value <= 0) {
        errors.height = 'Por favor ingrese una altura válida';
      }
      break;
    case 3: // Waist
      if (!data.metrics.waist || data.metrics.waist.value <= 0) {
        errors.waist = 'Por favor ingrese una medida de cintura válida';
      }
      break;
    case 4: // Conditions (optional, but validate format)
      if (!Array.isArray(data.conditions)) {
        errors.conditions = 'Formato de condiciones inválido';
      }
      break;
    default:
      break;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
