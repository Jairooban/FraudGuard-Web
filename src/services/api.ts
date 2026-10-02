import { getRiskLevel, RiskLevel } from '../utils/risk';

export interface TransactionInput {
  amount: number;
  merchant: string;
  category?: string;
  cardType?: string;
  country?: string;
  v14?: number;
  v17?: number;
  v12?: number;
}

export interface PredictionResult {
  probability: number; // 0 to 1
  riskLevel: RiskLevel;
  features: Array<{ name: string; impact: number; description: string }>;
  timestamp: string;
}

/**
 * Mock API call to simulate machine learning model inference.
 * Can be swapped with a fetch call to a real ML endpoint (FastAPI/Flask/Node).
 */
export async function predictTransaction(input: TransactionInput): Promise<PredictionResult> {
  // Simulate network latency (150-400ms)
  await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 250) + 150));

  // Heuristic mock probability generator for simulation demo
  let probability = Math.random() * 0.45; // Default lower probability

  if (input.amount > 1000) {
    probability += 0.35;
  } else if (input.amount > 500) {
    probability += 0.2;
  }

  if (['CryptoExchange', 'GlobalTech Direct', 'LuxWatches Paris', 'BettingWorld Online'].includes(input.merchant)) {
    probability += 0.35;
  }

  // Normalize probability strictly between 0.01 and 0.99
  probability = Math.min(Math.max(parseFloat(probability.toFixed(3)), 0.02), 0.98);

  const riskLevel = getRiskLevel(probability);

  return {
    probability,
    riskLevel,
    features: [
      { name: 'V14', impact: 0.38, description: 'PCA Feature 14 anomaly (anomalous transaction pattern)' },
      { name: 'V17', impact: 0.27, description: 'PCA Feature 17 variance (unusual velocity deviation)' },
      { name: 'V12', impact: 0.19, description: 'PCA Feature 12 ratio (merchant category anomaly)' },
      { name: 'Amount', impact: 0.16, description: `Transaction size ($${input.amount}) relative to account history` },
    ],
    timestamp: new Date().toISOString(),
  };
}
