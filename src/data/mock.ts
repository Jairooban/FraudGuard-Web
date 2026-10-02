import { getRiskLevel, RiskLevel } from '../utils/risk';

export interface Transaction {
  id: string;
  timestamp: string; // ISO or human readable time
  rawTimestamp: number; // unix ms for sorting/filtering
  merchant: string;
  category: string;
  amount: number;
  cardNumber: string;
  cardType: 'Visa' | 'Mastercard' | 'Amex' | 'Discover';
  location: string;
  probability: number; // 0.00 - 1.00
  riskLevel: RiskLevel;
  status: 'Approved' | 'Flagged' | 'Verified' | 'Blocked' | 'Pending Review';
  v14: number;
  v17: number;
  v12: number;
  timeline: Array<{
    title: string;
    time: string;
    description: string;
    completed: boolean;
  }>;
}

export interface KpiSummary {
  totalTransactions: number;
  totalTransactionsChange: number;
  fraudDetected: number;
  fraudDetectedChange: number;
  fraudRate: number; // percentage e.g. 1.84%
  fraudRateChange: number;
  amountSaved: number;
  amountSavedChange: number;
}

export interface TrendPoint {
  day: string;
  date: string;
  total: number;
  flagged: number;
  fraudAmount: number;
}

export interface RiskDistribution {
  name: RiskLevel;
  value: number;
  color: string;
  percentage: number;
}

export interface HourlyFraudData {
  hour: string;
  totalCount: number;
  fraudCount: number;
  fraudRate: number;
}

export interface AmountDistributionData {
  range: string;
  count: number;
  fraudCount: number;
  fraudPercentage: number;
}

export interface ModelComparisonInfo {
  name: string;
  algorithm: string;
  status: 'Planned - results pending';
  statusDetail: string;
  featuresCount: number;
  targetMetric: string;
  notes: string;
}

export interface UserProfileData {
  name: string;
  email: string;
  role: string;
  department: string;
  employeeId: string;
  phone: string;
  avatar: string;
  notifications: {
    highRiskAlerts: boolean;
    dailySummary: boolean;
    emailDigest: boolean;
    smsUrgent: boolean;
    soundEffects: boolean;
  };
}

// Global initial Mock Datasets
export const initialKpiSummary: KpiSummary = {
  totalTransactions: 142850,
  totalTransactionsChange: +8.4,
  fraudDetected: 342,
  fraudDetectedChange: -2.1,
  fraudRate: 1.84,
  fraudRateChange: -0.15,
  amountSaved: 284500,
  amountSavedChange: +14.2,
};

export const trend7DaysData: TrendPoint[] = [
  { day: 'Mon', date: 'Sep 26', total: 18400, flagged: 42, fraudAmount: 32100 },
  { day: 'Tue', date: 'Sep 27', total: 19800, flagged: 51, fraudAmount: 41200 },
  { day: 'Wed', date: 'Sep 28', total: 21200, flagged: 38, fraudAmount: 28900 },
  { day: 'Thu', date: 'Sep 29', total: 20400, flagged: 47, fraudAmount: 37400 },
  { day: 'Fri', date: 'Sep 30', total: 24100, flagged: 68, fraudAmount: 56300 },
  { day: 'Sat', date: 'Oct 01', total: 22600, flagged: 54, fraudAmount: 48100 },
  { day: 'Sun', date: 'Oct 02', total: 16350, flagged: 42, fraudAmount: 40500 },
];

export const riskDistributionData: RiskDistribution[] = [
  { name: 'Low', value: 132400, color: '#10B981', percentage: 92.7 },
  { name: 'Medium', value: 8900, color: '#F59E0B', percentage: 6.2 },
  { name: 'High', value: 1550, color: '#EF4444', percentage: 1.1 },
];

export const hourlyFraudData: HourlyFraudData[] = [
  { hour: '00:00', totalCount: 4100, fraudCount: 28, fraudRate: 0.68 },
  { hour: '02:00', totalCount: 2800, fraudCount: 34, fraudRate: 1.21 },
  { hour: '04:00', totalCount: 1900, fraudCount: 41, fraudRate: 2.15 },
  { hour: '06:00', totalCount: 3200, fraudCount: 18, fraudRate: 0.56 },
  { hour: '08:00', totalCount: 7800, fraudCount: 12, fraudRate: 0.15 },
  { hour: '10:00', totalCount: 12400, fraudCount: 15, fraudRate: 0.12 },
  { hour: '12:00', totalCount: 15100, fraudCount: 22, fraudRate: 0.14 },
  { hour: '14:00', totalCount: 14800, fraudCount: 19, fraudRate: 0.12 },
  { hour: '16:00', totalCount: 16200, fraudCount: 26, fraudRate: 0.16 },
  { hour: '18:00', totalCount: 17500, fraudCount: 31, fraudRate: 0.17 },
  { hour: '20:00', totalCount: 13900, fraudCount: 42, fraudRate: 0.30 },
  { hour: '22:00', totalCount: 8900, fraudCount: 36, fraudRate: 0.40 },
];

export const amountDistributionData: AmountDistributionData[] = [
  { range: '$0 - $50', count: 68400, fraudCount: 45, fraudPercentage: 0.06 },
  { range: '$50 - $200', count: 42100, fraudCount: 88, fraudPercentage: 0.21 },
  { range: '$200 - $500', count: 18900, fraudCount: 92, fraudPercentage: 0.48 },
  { range: '$500 - $1000', count: 9400, fraudCount: 61, fraudPercentage: 0.64 },
  { range: '$1000+', count: 4050, fraudCount: 56, fraudPercentage: 1.38 },
];

export const modelComparisonData: ModelComparisonInfo[] = [
  {
    name: 'Logistic Regression',
    algorithm: 'Linear Classifier (Baseline)',
    status: 'Planned - results pending',
    statusDetail: 'Awaiting training dataset validation run',
    featuresCount: 30,
    targetMetric: 'ROC-AUC & PR-AUC',
    notes: 'Fast baseline model for linear correlation benchmark.'
  },
  {
    name: 'Decision Tree Classifier',
    algorithm: 'Single Tree (Rule-based)',
    status: 'Planned - results pending',
    statusDetail: 'Feature split thresholding under calibration',
    featuresCount: 30,
    targetMetric: 'ROC-AUC & Precision',
    notes: 'Rule interpretability model for compliance audits.'
  },
  {
    name: 'Random Forest',
    algorithm: 'Ensemble Bagging (100 Trees)',
    status: 'Planned - results pending',
    statusDetail: 'Hyperparameter tuning scheduled on cluster',
    featuresCount: 30,
    targetMetric: 'F1-Score & Recall',
    notes: 'High stability ensemble model resisting overfit.'
  },
  {
    name: 'XGBoost',
    algorithm: 'Gradient Boosted Decision Trees',
    status: 'Planned - results pending',
    statusDetail: 'GPU batch evaluation queue pending',
    featuresCount: 30,
    targetMetric: 'ROC-AUC @ 99% Precision',
    notes: 'Primary candidate model for real-time inference pipeline.'
  }
];

export const mockUserProfile: UserProfileData = {
  name: 'Sarah Jenkins',
  email: 's.jenkins@fraudguardbank.com',
  role: 'Senior Risk Analyst',
  department: 'Fraud Operations & Security',
  employeeId: 'FG-89421',
  phone: '+1 (555) 234-5678',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  notifications: {
    highRiskAlerts: true,
    dailySummary: true,
    emailDigest: false,
    smsUrgent: true,
    soundEffects: true,
  }
};

const MERCHANTS = [
  { name: 'Amazon Web Services', category: 'Cloud Infrastructure' },
  { name: 'CryptoExchange Global', category: 'Digital Assets' },
  { name: 'Apple Store NYC', category: 'Electronics' },
  { name: 'Uber Technologies', category: 'Transport' },
  { name: 'Target Retail #412', category: 'Retail' },
  { name: 'LuxWatches Paris', category: 'Luxury Goods' },
  { name: 'Starbucks Coffee', category: 'Food & Beverage' },
  { name: 'BettingWorld Online', category: 'Gambling' },
  { name: 'Delta Airlines', category: 'Travel' },
  { name: 'Walmart Supercenter', category: 'Groceries' },
  { name: 'GlobalTech Direct', category: 'Electronics' },
  { name: 'Shell Oil Station', category: 'Fuel' }
];

const LOCATIONS = ['New York, USA', 'London, UK', 'Tokyo, Japan', 'Paris, France', 'Toronto, Canada', 'Sydney, Australia', 'Frankfurt, Germany', 'Lagos, Nigeria'];

export const initialTransactions: Transaction[] = [
  {
    id: 'TXN-984210',
    timestamp: '2026-10-02 10:34:12',
    rawTimestamp: Date.now() - 60000,
    merchant: 'CryptoExchange Global',
    category: 'Digital Assets',
    amount: 4850.00,
    cardNumber: '•••• 4829',
    cardType: 'Visa',
    location: 'Lagos, Nigeria',
    probability: 0.94,
    riskLevel: 'High',
    status: 'Flagged',
    v14: -4.82,
    v17: 6.15,
    v12: -3.41,
    timeline: [
      { title: 'Transaction Initiated', time: '10:34:12 AM', description: 'Card authorization request received from merchant terminal', completed: true },
      { title: 'AI Scoring Engine', time: '10:34:12 AM', description: 'Scored 94.0% fraud probability (V14 anomaly detected)', completed: true },
      { title: 'Automated Alert Triggered', time: '10:34:13 AM', description: 'Routed to Fraud Analyst queue for immediate review', completed: true },
      { title: 'Analyst Action Taken', time: 'Pending', description: 'Awaiting operator decision (Approve, Verify, or Block)', completed: false }
    ]
  },
  {
    id: 'TXN-984209',
    timestamp: '2026-10-02 10:33:45',
    rawTimestamp: Date.now() - 87000,
    merchant: 'LuxWatches Paris',
    category: 'Luxury Goods',
    amount: 3200.50,
    cardNumber: '•••• 9102',
    cardType: 'Mastercard',
    location: 'Paris, France',
    probability: 0.88,
    riskLevel: 'High',
    status: 'Flagged',
    v14: -3.91,
    v17: 5.20,
    v12: -2.85,
    timeline: [
      { title: 'Transaction Initiated', time: '10:33:45 AM', description: 'Online checkout authorization request', completed: true },
      { title: 'AI Scoring Engine', time: '10:33:46 AM', description: 'Scored 88.0% fraud probability', completed: true },
      { title: 'Automated Alert Triggered', time: '10:33:46 AM', description: 'High amount & international location flag', completed: true },
      { title: 'Analyst Action Taken', time: 'Pending', description: 'Awaiting operator decision', completed: false }
    ]
  },
  {
    id: 'TXN-984208',
    timestamp: '2026-10-02 10:31:10',
    rawTimestamp: Date.now() - 240000,
    merchant: 'BettingWorld Online',
    category: 'Gambling',
    amount: 1450.00,
    cardNumber: '•••• 1184',
    cardType: 'Visa',
    location: 'Sydney, Australia',
    probability: 0.65,
    riskLevel: 'Medium',
    status: 'Flagged',
    v14: -1.82,
    v17: 2.11,
    v12: -1.20,
    timeline: [
      { title: 'Transaction Initiated', time: '10:31:10 AM', description: 'E-commerce payment process started', completed: true },
      { title: 'AI Scoring Engine', time: '10:31:11 AM', description: 'Scored 65.0% fraud probability', completed: true },
      { title: 'Automated Alert Triggered', time: '10:31:11 AM', description: 'Medium risk velocity rule matched', completed: true },
      { title: 'Analyst Action Taken', time: 'Pending', description: 'Awaiting operator decision', completed: false }
    ]
  },
  {
    id: 'TXN-984207',
    timestamp: '2026-10-02 10:28:54',
    rawTimestamp: Date.now() - 370000,
    merchant: 'Amazon Web Services',
    category: 'Cloud Infrastructure',
    amount: 412.30,
    cardNumber: '•••• 7731',
    cardType: 'Amex',
    location: 'New York, USA',
    probability: 0.12,
    riskLevel: 'Low',
    status: 'Approved',
    v14: 0.42,
    v17: -0.15,
    v12: 0.30,
    timeline: [
      { title: 'Transaction Initiated', time: '10:28:54 AM', description: 'Recurring subscription billing', completed: true },
      { title: 'AI Scoring Engine', time: '10:28:54 AM', description: 'Scored 12.0% probability (Normal behavior)', completed: true },
      { title: 'Automated Alert Triggered', time: 'N/A', description: 'Bypassed alert threshold', completed: true },
      { title: 'Analyst Action Taken', time: '10:28:55 AM', description: 'Auto-approved by policy engine', completed: true }
    ]
  },
  {
    id: 'TXN-984206',
    timestamp: '2026-10-02 10:25:20',
    rawTimestamp: Date.now() - 580000,
    merchant: 'Apple Store NYC',
    category: 'Electronics',
    amount: 2199.00,
    cardNumber: '•••• 3390',
    cardType: 'Visa',
    location: 'New York, USA',
    probability: 0.48,
    riskLevel: 'Medium',
    status: 'Verified',
    v14: -1.25,
    v17: 1.40,
    v12: -0.90,
    timeline: [
      { title: 'Transaction Initiated', time: '10:25:20 AM', description: 'In-store POS swipe', completed: true },
      { title: 'AI Scoring Engine', time: '10:25:20 AM', description: 'Scored 48.0% probability', completed: true },
      { title: 'Automated Alert Triggered', time: '10:25:21 AM', description: 'SMS Verification code sent to cardholder', completed: true },
      { title: 'Analyst Action Taken', time: '10:27:00 AM', description: 'Cardholder confirmed 2FA via SMS', completed: true }
    ]
  },
  {
    id: 'TXN-984205',
    timestamp: '2026-10-02 10:22:15',
    rawTimestamp: Date.now() - 770000,
    merchant: 'GlobalTech Direct',
    category: 'Electronics',
    amount: 6790.00,
    cardNumber: '•••• 0014',
    cardType: 'Mastercard',
    location: 'Toronto, Canada',
    probability: 0.96,
    riskLevel: 'High',
    status: 'Blocked',
    v14: -5.40,
    v17: 7.20,
    v12: -4.10,
    timeline: [
      { title: 'Transaction Initiated', time: '10:22:15 AM', description: 'High-value hardware order authorization', completed: true },
      { title: 'AI Scoring Engine', time: '10:22:16 AM', description: 'Scored 96.0% fraud probability', completed: true },
      { title: 'Automated Alert Triggered', time: '10:22:16 AM', description: 'Critical anomaly detected', completed: true },
      { title: 'Analyst Action Taken', time: '10:23:05 AM', description: 'Blocked card and declined authorization', completed: true }
    ]
  },
  {
    id: 'TXN-984204',
    timestamp: '2026-10-02 10:18:02',
    rawTimestamp: Date.now() - 1000000,
    merchant: 'Target Retail #412',
    category: 'Retail',
    amount: 84.50,
    cardNumber: '•••• 6251',
    cardType: 'Discover',
    location: 'Chicago, USA',
    probability: 0.04,
    riskLevel: 'Low',
    status: 'Approved',
    v14: 0.10,
    v17: 0.05,
    v12: 0.08,
    timeline: [
      { title: 'Transaction Initiated', time: '10:18:02 AM', description: 'In-store contact-less payment', completed: true },
      { title: 'AI Scoring Engine', time: '10:18:02 AM', description: 'Scored 4.0% probability', completed: true },
      { title: 'Automated Alert Triggered', time: 'N/A', description: 'Standard clearance', completed: true },
      { title: 'Analyst Action Taken', time: '10:18:03 AM', description: 'Auto-cleared', completed: true }
    ]
  },
  {
    id: 'TXN-984203',
    timestamp: '2026-10-02 10:14:40',
    rawTimestamp: Date.now() - 1200000,
    merchant: 'Starbucks Coffee',
    category: 'Food & Beverage',
    amount: 14.75,
    cardNumber: '•••• 5521',
    cardType: 'Visa',
    location: 'Seattle, USA',
    probability: 0.01,
    riskLevel: 'Low',
    status: 'Approved',
    v14: 0.02,
    v17: 0.01,
    v12: 0.03,
    timeline: [
      { title: 'Transaction Initiated', time: '10:14:40 AM', description: 'Mobile app order', completed: true },
      { title: 'AI Scoring Engine', time: '10:14:40 AM', description: 'Scored 1.0% probability', completed: true },
      { title: 'Automated Alert Triggered', time: 'N/A', description: 'Low risk', completed: true },
      { title: 'Analyst Action Taken', time: '10:14:41 AM', description: 'Auto-approved', completed: true }
    ]
  }
];

let nextTxnIdCounter = 984211;

export function generateRandomTransaction(): Transaction {
  const merchantObj = MERCHANTS[Math.floor(Math.random() * MERCHANTS.length)];
  const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  const cardTypes: Array<'Visa' | 'Mastercard' | 'Amex' | 'Discover'> = ['Visa', 'Mastercard', 'Amex', 'Discover'];
  const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
  const cardNum = `•••• ${Math.floor(1000 + Math.random() * 9000)}`;
  
  // Probability distribution biased towards normal low-risk
  let probability = Math.random();
  if (Math.random() > 0.25) {
    probability = Math.random() * 0.28; // 75% chance low risk
  } else if (Math.random() > 0.5) {
    probability = 0.3 + Math.random() * 0.38; // Medium risk
  } else {
    probability = 0.72 + Math.random() * 0.26; // High risk
  }
  probability = parseFloat(probability.toFixed(3));

  const riskLevel = getRiskLevel(probability);
  
  let amount = 0;
  if (riskLevel === 'High') {
    amount = parseFloat((500 + Math.random() * 4500).toFixed(2));
  } else if (riskLevel === 'Medium') {
    amount = parseFloat((120 + Math.random() * 800).toFixed(2));
  } else {
    amount = parseFloat((5 + Math.random() * 250).toFixed(2));
  }

  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  const dateStr = now.toISOString().split('T')[0];
  const timestamp = `${dateStr} ${timeStr}`;
  const id = `TXN-${nextTxnIdCounter++}`;

  const status = riskLevel === 'High' || riskLevel === 'Medium' ? 'Flagged' : 'Approved';

  const v14 = riskLevel === 'High' ? -3.5 - Math.random() * 3 : (riskLevel === 'Medium' ? -1.5 - Math.random() : Math.random() * 0.5);
  const v17 = riskLevel === 'High' ? 4.0 + Math.random() * 3 : (riskLevel === 'Medium' ? 1.5 + Math.random() : -Math.random() * 0.5);
  const v12 = riskLevel === 'High' ? -2.5 - Math.random() * 2 : (riskLevel === 'Medium' ? -1.0 - Math.random() : Math.random() * 0.3);

  return {
    id,
    timestamp,
    rawTimestamp: now.getTime(),
    merchant: merchantObj.name,
    category: merchantObj.category,
    amount,
    cardNumber: cardNum,
    cardType,
    location,
    probability,
    riskLevel,
    status,
    v14: parseFloat(v14.toFixed(2)),
    v17: parseFloat(v17.toFixed(2)),
    v12: parseFloat(v12.toFixed(2)),
    timeline: [
      { title: 'Transaction Initiated', time: timeStr, description: `Authorization request from ${location}`, completed: true },
      { title: 'AI Scoring Engine', time: timeStr, description: `Scored ${(probability * 100).toFixed(1)}% fraud probability`, completed: true },
      { title: 'Automated Alert Triggered', time: timeStr, description: status === 'Flagged' ? 'Routed to review queue' : 'Cleared automatically', completed: true },
      { title: 'Analyst Action Taken', time: status === 'Flagged' ? 'Pending' : timeStr, description: status === 'Flagged' ? 'Awaiting operator decision' : 'Approved by policy engine', completed: status !== 'Flagged' }
    ]
  };
}
