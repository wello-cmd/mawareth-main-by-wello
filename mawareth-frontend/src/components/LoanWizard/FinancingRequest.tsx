import { Input } from "@/components/ui/input"; // Input Component
import { Label } from "@/components/ui/label"; // Label Component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Select Components
import { useLanguage } from "@/contexts/LanguageContext"; // Language Context
import { translations } from "@/lib/i18n"; // Translations

// Props Interface
interface FinancingRequestProps {
  data: {
    loanAmount: string;
    purpose: string; // Purpose of the loan
    repaymentPeriod: string; // Duration in years
    existingDebts: string; // Other debts
  };
  updateData: (data: any) => void;
}

export const FinancingRequest = ({ data, updateData }: FinancingRequestProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground mb-4">{t.financingRequestTitle}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Loan Amount Input */}
        <div>
          <Label htmlFor="loanAmount">{t.loanAmount}</Label>
          <Input
            id="loanAmount"
            type="number"
            value={data.loanAmount}
            onChange={(e) => updateData({ loanAmount: e.target.value })}
            placeholder={t.loanAmountPlaceholder}
            className="mt-2"
          />
        </div>

        {/* Loan Purpose Selection */}
        <div>
          <Label htmlFor="purpose">{t.loanPurpose}</Label>
          <Select value={data.purpose} onValueChange={(value) => updateData({ purpose: value })}>
            <SelectTrigger id="purpose" className="mt-2">
              <SelectValue placeholder={t.selectPurpose} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buyout">{t.buyoutHeirs}</SelectItem>
              <SelectItem value="liquidity">{t.liquidity}</SelectItem>
              <SelectItem value="investment">{t.investment}</SelectItem>
              <SelectItem value="other">{t.other}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Repayment Period Selection */}
        <div>
          <Label htmlFor="repaymentPeriod">{t.repaymentPeriod}</Label>
          <Select value={data.repaymentPeriod} onValueChange={(value) => updateData({ repaymentPeriod: value })}>
            <SelectTrigger id="repaymentPeriod" className="mt-2">
              <SelectValue placeholder={t.selectRepaymentPeriod} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 {t.years}</SelectItem>
              <SelectItem value="10">10 {t.years}</SelectItem>
              <SelectItem value="15">15 {t.years}</SelectItem>
              <SelectItem value="20">20 {t.years}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Existing Debts Input */}
        <div>
          <Label htmlFor="existingDebts">{t.existingDebts}</Label>
          <Input
            id="existingDebts"
            type="number"
            value={data.existingDebts}
            onChange={(e) => updateData({ existingDebts: e.target.value })}
            placeholder={t.existingDebtsPlaceholder}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};
