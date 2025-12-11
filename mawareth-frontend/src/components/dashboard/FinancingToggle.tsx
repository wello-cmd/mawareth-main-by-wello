import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Shield, Info, Building2 } from "lucide-react";
import { formatEGP } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";

interface FinancingToggleProps {
  assetPrice: number;
  termMonths?: number;
  interestRate?: number;
  profitMarkup?: number;
}

export const FinancingToggle = ({ 
  assetPrice, 
  termMonths = 60,
  interestRate = 0.15,
  profitMarkup = 0.25 
}: FinancingToggleProps) => {
  const { language } = useLanguage();
  const [financingType, setFinancingType] = useState<'standard' | 'murabaha'>('murabaha');

  // Standard Finance Calculation
  const standardInterest = assetPrice * interestRate * (termMonths / 12);
  const standardTotal = assetPrice + standardInterest;
  const standardMonthly = Math.round(standardTotal / termMonths);

  // Islamic Murabaha Calculation
  const murabahaMarkup = assetPrice * profitMarkup;
  const murabahaTotal = assetPrice + murabahaMarkup;
  const murabahaMonthly = Math.round(murabahaTotal / termMonths);

  const isMurabaha = financingType === 'murabaha';

  const content = {
    en: {
      title: "Financing Options",
      standard: "Standard Finance",
      murabaha: "Islamic Murabaha",
      shariaCertified: "Sharia Board Certified",
      interestRate: "Interest Rate",
      profitRate: "Profit Rate (Murabaha)",
      loanAmount: "Loan Amount",
      assetValue: "Asset Financing Value",
      totalInterest: "Total Interest",
      profitMarkup: "Merath Profit Markup",
      totalRepayment: "Total Repayment",
      monthlyInstallment: "Monthly Installment",
      months: "months",
      learnMore: "We buy the share for cash and resell it to you in installments. No interest - only a fixed, transparent markup.",
      apply: "Apply for Financing",
    },
    ar: {
      title: "خيارات التمويل",
      standard: "تمويل تقليدي",
      murabaha: "مرابحة إسلامية",
      shariaCertified: "معتمد من هيئة الشريعة",
      interestRate: "معدل الفائدة",
      profitRate: "نسبة الربح (مرابحة)",
      loanAmount: "مبلغ القرض",
      assetValue: "قيمة تمويل الأصل",
      totalInterest: "إجمالي الفائدة",
      profitMarkup: "هامش ربح موارث",
      totalRepayment: "إجمالي السداد",
      monthlyInstallment: "القسط الشهري",
      months: "شهر",
      learnMore: "نشتري الحصة نقداً ونعيد بيعها لك بالتقسيط. لا فوائد - فقط هامش ربح ثابت وشفاف.",
      apply: "تقدم للتمويل",
    },
  };

  const t = content[language];

  return (
    <Card className={`overflow-hidden shadow-medium ${isMurabaha ? 'border-2 border-primary' : ''}`}>
      {/* Toggle Header */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setFinancingType('standard')}
          className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
            !isMurabaha 
              ? 'bg-card text-foreground' 
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          {t.standard}
        </button>
        <button
          onClick={() => setFinancingType('murabaha')}
          className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
            isMurabaha 
              ? 'bg-card text-foreground' 
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          {t.murabaha}
        </button>
      </div>

      <div className="p-6">
        {/* Sharia Badge (only for Murabaha) */}
        {isMurabaha && (
          <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-success-green/10 rounded-lg">
            <Shield className="w-5 h-5 text-success-green" />
            <span className="text-sm font-semibold text-success-green">{t.shariaCertified}</span>
          </div>
        )}

        {/* Breakdown Table */}
        <div className="space-y-4 mb-6">
          {/* Asset Value / Loan Amount */}
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-sm text-muted-foreground">
              {isMurabaha ? t.assetValue : t.loanAmount}
            </span>
            <span className="font-semibold text-foreground">{formatEGP(assetPrice)}</span>
          </div>

          {/* Rate */}
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-sm text-muted-foreground">
              {isMurabaha ? t.profitRate : t.interestRate}
            </span>
            <span className="font-semibold text-foreground">
              {isMurabaha ? `${profitMarkup * 100}%` : `${interestRate * 100}%`}
            </span>
          </div>

          {/* Interest/Markup */}
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-sm text-muted-foreground">
              {isMurabaha ? t.profitMarkup : t.totalInterest}
            </span>
            <span className="font-semibold text-foreground">
              {formatEGP(isMurabaha ? murabahaMarkup : standardInterest)}
            </span>
          </div>

          {/* Total Repayment */}
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-sm text-muted-foreground">{t.totalRepayment}</span>
            <span className="font-bold text-lg text-foreground">
              {formatEGP(isMurabaha ? murabahaTotal : standardTotal)}
            </span>
          </div>

          {/* Monthly Installment */}
          <div className="flex justify-between items-center py-4 bg-primary/5 rounded-lg px-4">
            <span className="text-sm font-medium text-foreground">
              {t.monthlyInstallment} ({termMonths} {t.months})
            </span>
            <span className="font-bold text-xl text-primary">
              {formatEGP(isMurabaha ? murabahaMonthly : standardMonthly)}
            </span>
          </div>
        </div>

        {/* Learn More Tooltip (Murabaha only) */}
        {isMurabaha && (
          <TooltipProvider>
            <div className="flex items-center justify-center gap-2 mb-6 text-sm text-muted-foreground">
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1 underline decoration-dotted cursor-help">
                  <Info className="w-4 h-4" />
                  {language === 'ar' ? 'كيف تعمل المرابحة؟' : 'How does Murabaha work?'}
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>{t.learnMore}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        )}

        {/* Apply Button */}
        <Button 
          className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Building2 className="w-5 h-5 mr-2" />
          {t.apply}
        </Button>
      </div>
    </Card>
  );
};
