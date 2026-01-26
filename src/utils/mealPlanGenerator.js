// Meal plan generator utilities
// Generates 1, 2, or 3-day meal plans from base diet plans

/**
 * Generate a meal plan for specified duration
 * @param {string} basePlanId - ID of the base diet plan
 * @param {number} duration - Number of days (1, 2, or 3)
 * @param {Object} basePlan - Base diet plan object
 * @returns {Object} Generated meal plan
 */
export function generateMealPlan(basePlanId, duration, basePlan) {
  if (!basePlan) {
    throw new Error('Base plan is required');
  }
  
  if (![1, 2, 3].includes(duration)) {
    throw new Error('Duration must be 1, 2, or 3 days');
  }
  
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < duration; i++) {
    const dayDate = new Date(today);
    dayDate.setDate(today.getDate() + i);
    
    days.push({
      dayNumber: i + 1,
      date: dayDate.toISOString().split('T')[0],
      meals: {
        breakfast: {
          name: basePlan.dailyMeals.breakfast.name,
          items: [...basePlan.dailyMeals.breakfast.items]
        },
        lunch: {
          name: basePlan.dailyMeals.lunch.name,
          items: [...basePlan.dailyMeals.lunch.items]
        },
        dinner: {
          name: basePlan.dailyMeals.dinner.name,
          items: [...basePlan.dailyMeals.dinner.items]
        },
        snacks: [...basePlan.dailyMeals.snacks]
      },
      totalCalories: basePlan.totalDailyCalories
    });
  }
  
  return {
    basePlanId,
    duration,
    days,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Calculate total calories for a day
 * @param {Object} dayMeals - Day's meals object
 * @returns {number} Total calories
 */
export function calculateDayCalories(dayMeals) {
  let total = 0;
  
  if (dayMeals.breakfast?.items) {
    total += dayMeals.breakfast.items.reduce((sum, item) => sum + (item.calories || 0), 0);
  }
  
  if (dayMeals.lunch?.items) {
    total += dayMeals.lunch.items.reduce((sum, item) => sum + (item.calories || 0), 0);
  }
  
  if (dayMeals.dinner?.items) {
    total += dayMeals.dinner.items.reduce((sum, item) => sum + (item.calories || 0), 0);
  }
  
  if (dayMeals.snacks) {
    total += dayMeals.snacks.reduce((sum, item) => sum + (item.calories || 0), 0);
  }
  
  return total;
}
