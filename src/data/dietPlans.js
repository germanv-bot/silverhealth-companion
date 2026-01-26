// Placeholder for diet plans database
// This will be populated with actual diet plans data

export const dietPlans = [
  // Placeholder - will be replaced with actual diet plans
  {
    id: 'placeholder-001',
    name: 'Plan de Ejemplo',
    description: 'Este es un plan de ejemplo. Los planes reales se agregarán aquí.',
    targetConditions: [],
    dailyMeals: {
      breakfast: {
        name: 'Desayuno',
        items: []
      },
      lunch: {
        name: 'Almuerzo',
        items: []
      },
      dinner: {
        name: 'Cena',
        items: []
      },
      snacks: []
    },
    totalDailyCalories: 0,
    notes: 'Plan de ejemplo'
  }
];

/**
 * Get all available diet plans
 * @returns {Array} Array of diet plans
 */
export function getAllDietPlans() {
  return dietPlans;
}

/**
 * Filter diet plans by condition
 * @param {string} condition - Medical condition to filter by
 * @returns {Array} Filtered diet plans
 */
export function filterPlansByCondition(condition) {
  return dietPlans.filter(plan => 
    plan.targetConditions.includes(condition)
  );
}

/**
 * Get diet plans for multiple conditions
 * @param {Array} conditions - Array of medical conditions
 * @returns {Array} Filtered diet plans
 */
export function getDietPlans(conditions) {
  if (!conditions || conditions.length === 0) {
    return getAllDietPlans();
  }
  
  return dietPlans.filter(plan =>
    plan.targetConditions.some(condition => conditions.includes(condition))
  );
}

/**
 * Get a specific diet plan by ID
 * @param {string} planId - Plan ID
 * @returns {Object|null} Diet plan or null if not found
 */
export function getDietPlanById(planId) {
  return dietPlans.find(plan => plan.id === planId) || null;
}
