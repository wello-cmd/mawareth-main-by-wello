import { Card } from "@/components/ui/card"; // Custom Card Component
import { Label } from "@/components/ui/label"; // Label Component
import { Checkbox } from "@/components/ui/checkbox"; // Checkbox Component
import { Building2, CheckCircle } from "lucide-react"; // Icons
import { useLanguage } from "@/contexts/LanguageContext"; // Language Context
import { translations } from "@/lib/i18n"; // Translations

// Props Interface
interface BankSelectionProps {
  data: {
    selectedBank: string; // ID of selected bank
    acceptedTerms: boolean; // Terms acceptance state
  };
  updateData: (data: any) => void; // State update function
  formData: any; // Full form data for summary display
}

// Available Banks List (Mock Data)
const banks = [
  { id: 'bank-misr', name: 'Bank Misr', nameAr: 'بنك مصر', rate: '12%', feature: 'Competitive rates' },
  { id: 'nbe', name: 'National Bank of Egypt', nameAr: 'البنك الأهلي المصري', rate: '11.5%', feature: 'Flexible terms up to 15 years' },
  { id: 'cib', name: 'CIB', nameAr: 'البنك التجاري الدولي', rate: '13%', feature: 'Fast approval within 7 days' },
  { id: 'qnb', name: 'QNB Alahli', nameAr: 'بنك قطر الوطني الأهلي', rate: '12.5%', feature: 'No early repayment penalty' },
];

export const BankSelection = ({ data, updateData, formData }: BankSelectionProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground mb-4">{t.bankSelectionTitle}</h2>
      <p className="text-muted-foreground mb-6">{t.selectBankDescription}</p>

      {/* Bank Options Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {banks.map((bank) => (
          <Card
            key={bank.id}
            className={`p-4 cursor-pointer transition-all ${data.selectedBank === bank.id
                ? 'border-primary bg-primary/5' // Active State Style
                : 'hover:border-primary/50' // Hover State Style
              }`}
            onClick={() => updateData({ selectedBank: bank.id })}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {language === 'ar' ? bank.nameAr : bank.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t.interestRate}: {bank.rate}</p>
                </div>
              </div>
              {/* Selected Indicator */}
              {data.selectedBank === bank.id && (
                <CheckCircle className="w-5 h-5 text-primary" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{bank.feature}</p>
          </Card>
        ))}
      </div>

      {/* Application Summary Box */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg">
        <h3 className="font-semibold mb-4 text-foreground">{t.applicationSummary}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t.loanAmount}:</span>
            <span className="font-semibold">{formData.financingRequest.loanAmount} {t.egp}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t.propertyValue}:</span>
            <span className="font-semibold">{formData.estateDetails.estimatedValue} {t.egp}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t.repaymentPeriod}:</span>
            <span className="font-semibold">{formData.financingRequest.repaymentPeriod} {t.years}</span>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Checkbox */}
      <div className="flex items-start space-x-2 mt-6">
        <Checkbox
          id="terms"
          checked={data.acceptedTerms}
          onCheckedChange={(checked) => updateData({ acceptedTerms: checked })}
        />
        <Label htmlFor="terms" className="cursor-pointer text-sm">
          {t.acceptTerms}
        </Label>
      </div>
    </div>
  );
};
