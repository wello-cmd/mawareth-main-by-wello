// MongoDB-style data models for easy backend migration
// All IDs use MongoDB ObjectId pattern (_id: string)

export type UserRole = 'heir' | 'investor' | 'admin' | 'super_admin' | 'moderator';
export type EstateStatus = 'disputed' | 'voting' | 'listed' | 'sold';
export type VoteType = 'sell' | 'keep' | 'pending';
export type DealBadge = 'cash-deal' | 'buyout-opportunity';
export type FinancingType = 'standard' | 'murabaha';
export type BuyoutStatus = 'pending' | 'approved' | 'approved-with-leasing' | 'rejected';

// Authentication Models (MongoDB-ready)
export interface AuthUser {
  _id: string;
  email: string;
  passwordHash?: string; // Will be hashed on backend
  name: string;
  phone: string;
  role: UserRole;
  nationalId?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  _id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  role: UserRole;
  phone: string;
  email?: string;
  nationalId?: string;
}

export interface HeirShare {
  _id: string;
  userId: string;
  userName: string;
  relation: string;
  sharePercentage: number;
  shareValue: number;
  vote: VoteType;
  voteStatus?: 'pending' | 'agree' | 'disagree'; // Added for KYC alignment
  nationalId?: string; // Added for KYC alignment
}

export interface Estate {
  _id: string;
  title: string;
  address: string;
  city: string;
  area: number;
  propertyType: 'apartment' | 'villa' | 'land' | 'commercial';
  marketValuation: number;
  solhAskPrice: number;
  status: EstateStatus;
  heirs: HeirShare[];
  images: string[];
  badge?: DealBadge;
  timeLeftDays?: number;
  instantProfit?: number;
  createdAt: string;
  updatedAt: string;
  // Consensus tracking
  consensus?: {
    accepted: number;
    total: number;
  };
}

export interface MarketplaceListing {
  _id: string;
  estateId: string | Estate; // Can be populated
  title: string;
  address: string;
  city: string;
  area: number;
  propertyType: string;
  marketValuation: number;
  askPrice: number;
  instantProfit: number;
  profitPercentage: number;
  badge: DealBadge;
  timeLeftDays: number;
  images: string[];
  isLocked: boolean;
  depositRequired: number;
  // Auction data
  hasAuction?: boolean;
  auction?: Auction;
  // Added fields
  startingBid: number;
  status: 'active' | 'sold' | 'pending_review' | 'rejected';
  auctionEndTime?: string;
}

export interface RenovationOffer {
  _id: string;
  estateId: string;
  currentValue: number;
  potentialValue: number;
  renovationCost: number;
  valueIncrease: number;
  beforeImage: string;
  afterImage: string;
}

// Auction Types
export interface AuctionBid {
  _id: string;
  investorId: string;
  amount: number;
  timestamp: string;
}

export interface Auction {
  _id: string;
  listingId: string;
  currentHighestBid: number;
  minimumBidIncrement: number;
  bids: AuctionBid[];
  endsAt: string;
  status: 'active' | 'ended';
}

// Financing Types
export interface LeasingCalculation {
  loanAmount: number;
  monthlyInstallment: number;
  estimatedRent: number;
  netPayment: number;
  termMonths: number;
}

export interface FinancingOption {
  type: FinancingType;
  assetPrice: number;
  rate: number;
  termMonths: number;
  totalRepayment: number;
  monthlyInstallment: number;
}

// Family Buyout Application (MongoDB-ready)
export interface BuyoutApplication {
  _id: string;
  userId: string;
  estateId?: string;

  // Financing Details
  financingType: FinancingType;
  shareValue: number;
  monthlyIncome: number;
  repaymentPeriodMonths: number;

  // Calculated Values
  monthlyInstallment: number;
  dtiRatio: number;

  // Leasing Details (if applicable)
  requiresLeasing: boolean;
  estimatedRent?: number;
  netPayment?: number;

  // Status
  status: BuyoutStatus;

  // Timestamps (MongoDB pattern)
  createdAt: string;
  updatedAt: string;
}

// Murabaha-specific details
export interface MurabahaDetails {
  _id: string;
  applicationId: string;
  costPrice: number;
  profitMargin: number;
  totalPrice: number;
  possessionDate: string;
  titleTransferDate?: string;
  isCompleted: boolean;
}
