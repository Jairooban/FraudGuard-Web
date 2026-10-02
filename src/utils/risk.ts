export type RiskLevel = 'Low' | 'Medium' | 'High';

/**
 * Calculates risk level based on fraud probability score.
 * Low: < 0.3 (30%)
 * Medium: 0.3 - 0.7 (30% - 70%)
 * High: > 0.7 (70%)
 */
export function getRiskLevel(probability: number): RiskLevel {
  if (probability < 0.3) {
    return 'Low';
  } else if (probability <= 0.7) {
    return 'Medium';
  } else {
    return 'High';
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatProbability(probability: number): string {
  return `${(probability * 100).toFixed(1)}%`;
}
