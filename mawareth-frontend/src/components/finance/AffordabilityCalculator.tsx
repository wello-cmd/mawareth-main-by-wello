import React, { useEffect, useState } from 'react'; // Import React hooks
import { useLanguage } from '@/contexts/LanguageContext'; // Import Language Context
import { Input } from '@/components/ui/input'; // Import Input component
import { Label } from '@/components/ui/label'; // Import Label component
import { Slider } from '@/components/ui/slider'; // Import Slider component
import { formatEGP } from '@/services/api'; // Import currency formatter
import { FinancingType, BuyoutStatus } from '@/types/models'; // Import types
import { Calculator, CheckCircle, XCircle } from 'lucide-react'; // Import icons

// Props definition
interface AffordabilityCalculatorProps {
  financingType: FinancingType; // Type of financing selected
  onResultChange: (result: AffordabilityResult) => void; // Callback for result updates
}

// Result interface
export interface AffordabilityResult {
  shareValue: number;
  monthlyIncome: number;
  repaymentMonths: number;
  monthlyInstallment: number;
  dtiRatio: number;
  status: BuyoutStatus;
}

// Component for calculating loan affordability
const AffordabilityCalculator: React.FC<AffordabilityCalculatorProps> = ({ financingType, onResultChange }) => {
  const { language } = useLanguage(); // Get current language
  const isArabic = language === 'ar'; // Check if Arabic

  // State state variables with defaults based on Egyptian market context
  const [shareValue, setShareValue] = useState(1000000); // Default 1M EGP
  const [monthlyIncome, setMonthlyIncome] = useState(15000); // Default 15k EGP
  const [repaymentYears, setRepaymentYears] = useState(financingType === 'standard' ? 10 : 5); // Default years

  // Adjust max years based on financing type (Standard loans vs Murabaha)
  const maxYears = financingType === 'standard' ? 20 : 7;

  useEffect(() => {
    // Reset repayment years when financing type changes to a valid default
    setRepaymentYears(financingType === 'standard' ? 10 : 5);
  }, [financingType]);

  useEffect(() => {
    // Calculate monthly installment with financing factor
    const months = repaymentYears * 12;
    // Factor represents total cost over principal (Interest or Profit margin)
    const factor = financingType === 'standard' ? 1.15 : 1.20; // Interest vs Profit margin
    const totalRepayment = shareValue * factor;
    const monthlyInstallment = Math.round(totalRepayment / months);

    // Calculate Debt-to-Income (DTI) ratio
    const dtiRatio = monthlyIncome > 0 ? (monthlyInstallment / monthlyIncome) * 100 : 0;

    // Determine status (CBE regulation: 40% DTI threshold max)
    const status: BuyoutStatus = dtiRatio > 40 ? 'rejected' : 'approved';

    // Propagate results to parent
    onResultChange({
      shareValue,
      monthlyIncome,
      repaymentMonths: months,
      monthlyInstallment,
      dtiRatio,
      status
    });
  }, [shareValue, monthlyIncome, repaymentYears, financingType, onResultChange]);

  const content = {
    en: {
      title: 'Check Your Eligibility',
      shareValue: 'Share Value to Buy',
      monthlyIncome: 'My Monthly Income',
      repaymentPeriod: 'Repayment Period',
      years: 'years',
      monthlyInstallment: 'Estimated Monthly Installment',
      dtiRatio: 'Debt-to-Income Ratio',
      approved: 'APPROVED',
      rejected: 'REJECTED',
      dtiNote: 'Maximum allowed: 40%'
    },
    ar: {
      title: 'تحقق من أهليتك',
      shareValue: 'قيمة الحصة للشراء',
      monthlyIncome: 'دخلي الشهري',
      repaymentPeriod: 'فترة السداد',
      years: 'سنة',
      monthlyInstallment: 'القسط الشهري المقدر',
      dtiRatio: 'نسبة الدين للدخل',
      approved: 'مقبول',
      rejected: 'مرفوض',
      dtiNote: 'الحد الأقصى المسموح: 40%'
    }
  };

  const t = content[language]; // Translate

  // Calculate current values for display (duplicate logic for render stability)
  const months = repaymentYears * 12;
  const factor = financingType === 'standard' ? 1.15 : 1.20;
  const totalRepayment = shareValue * factor;
  const monthlyInstallment = Math.round(totalRepayment / months);
  const dtiRatio = monthlyIncome > 0 ? (monthlyInstallment / monthlyIncome) * 100 : 0;
  const isApproved = dtiRatio <= 40;

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Calculator className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-bold text-foreground">{t.title}</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Share Value Input */}
        <div className="space-y-2">
          <Label htmlFor="share-value">{t.shareValue}</Label>
          <Input
            id="share-value"
            type="number"
            value={shareValue}
            onChange={(e) => setShareValue(Number(e.target.value))}
            className="text-lg font-semibold"
            dir="ltr"
          />
          <p className="text-sm text-muted-foreground">{formatEGP(shareValue)}</p>
        </div>

        {/* Monthly Income Input */}
        <div className="space-y-2">
          <Label htmlFor="monthly-income">{t.monthlyIncome}</Label>
          <Input
            id="monthly-income"
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="text-lg font-semibold"
            dir="ltr"
          />
          <p className="text-sm text-muted-foreground">{formatEGP(monthlyIncome)}</p>
        </div>
      </div>

      {/* Repayment Period Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>{t.repaymentPeriod}</Label>
          <span className="text-lg font-bold text-primary">
            {repaymentYears} {t.years}
          </span>
        </div>
        <Slider
          value={[repaymentYears]}
          onValueChange={([value]) => setRepaymentYears(value)}
          min={1}
          max={maxYears}
          step={1}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 {t.years}</span>
          <span>{maxYears} {t.years}</span>
        </div>
      </div>

      {/* Results Section */}
      <div className="border-t border-border pt-6 space-y-4">
        {/* Monthly Installment Display */}
        <div className="flex justify-between items-center p-4 rounded-lg bg-muted">
          <span className="text-muted-foreground">{t.monthlyInstallment}</span>
          <span className="text-2xl font-bold text-foreground animate-pulse">
            {formatEGP(monthlyInstallment)}
          </span>
        </div>

        {/* DTI Ratio Display */}
        <div className="flex justify-between items-center p-4 rounded-lg bg-muted">
          <div>
            <span className="text-muted-foreground">{t.dtiRatio}</span>
            <p className="text-xs text-muted-foreground">{t.dtiNote}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-2xl font-bold ${isApproved ? 'text-success-green' : 'text-destructive'}`}>
              {dtiRatio.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Approval Status Badge */}
        <div className={`flex items-center justify-center gap-3 p-4 rounded-lg ${isApproved
            ? 'bg-success-green/10 border border-success-green/30'
            : 'bg-destructive/10 border border-destructive/30'
          }`}>
          {isApproved ? (
            <>
              <CheckCircle className="h-8 w-8 text-success-green" />
              <span className="text-xl font-bold text-success-green">{t.approved}</span>
            </>
          ) : (
            <>
              <XCircle className="h-8 w-8 text-destructive" />
              <span className="text-xl font-bold text-destructive">{t.rejected}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AffordabilityCalculator;
