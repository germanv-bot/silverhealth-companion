// Usage counter utility functions for localStorage
// Stores only anonymous usage counter - no personal data

const USAGE_COUNTER_KEY = 'silverhealth_usage';

/**
 * Get the current usage count
 * @returns {number} Current usage count
 */
export function getUsageCount() {
  try {
    const stored = localStorage.getItem(USAGE_COUNTER_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return data.totalUses || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error reading usage count:', error);
    return 0;
  }
}

/**
 * Increment the anonymous usage counter
 * @returns {number} Updated usage count
 */
export function incrementUsageCounter() {
  try {
    const current = getUsageCount();
    const updated = {
      totalUses: current + 1,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(USAGE_COUNTER_KEY, JSON.stringify(updated));
    return updated.totalUses;
  } catch (error) {
    console.error('Error incrementing usage counter:', error);
    return 0;
  }
}

/**
 * Reset the usage counter (admin function)
 */
export function resetUsageCounter() {
  try {
    localStorage.removeItem(USAGE_COUNTER_KEY);
  } catch (error) {
    console.error('Error resetting usage counter:', error);
  }
}

/**
 * Get usage statistics (for analytics)
 * @returns {Object} Usage statistics
 */
export function getUsageStats() {
  try {
    const stored = localStorage.getItem(USAGE_COUNTER_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      totalUses: 0,
      lastUpdated: null
    };
  } catch (error) {
    console.error('Error reading usage stats:', error);
    return {
      totalUses: 0,
      lastUpdated: null
    };
  }
}
