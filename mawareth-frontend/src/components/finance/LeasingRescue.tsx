import React from 'react'; // Import React
import { useLanguage } from '@/contexts/LanguageContext'; // Import Language context
import { Home, ArrowDown, CheckCircle, Sparkles } from 'lucide-react'; // Import icons
import { formatEGP } from '@/services/api'; // Import currency formatter
import { AffordabilityResult } from './AffordabilityCalculator'; // Import result type

// Props Interface
interface LeasingRescueProps {
  result: AffordabilityResult; // Current calculation result
  estimatedRent?: number; // Estimated rental income (default provided)
}

// Component to suggest Leasing (Ijarah) as alternative when DTI is too high
const LeasingRescue: React.FC<LeasingRescueProps> = ({ result, estimatedRent = 15000 }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Only show this component if loan application is rejected
  if (result.status !== 'rejected') return null;

  // New calculation: Net Payment = Installment - Rent
  // Logic: Bank considers rental income to offset debt obligation
  const netPayment = Math.max(0, result.monthlyInstallment - estimatedRent);
  const canBeApproved = netPayment <= result.monthlyIncome * 0.4; // Check new DTI

  // Content text
  const content = {
    en: {
      headline: 'Income Insufficient? Activate Merath Leasing.',
      subheadline: 'Let the Asset Pay for Itself',
      description: `We can rent the asset for ${formatEGP(estimatedRent)}/month (Estimated) to cover your payments.`,
      calculation: {
        title: 'The New Math',
        installment: 'Loan Installment',
        rental: 'Less Rental Income',
        youPay: 'You Pay'
      },
      result: canBeApproved ? 'APPROVED with Leasing' : 'Still Needs Review',
      promise: '"Insufficient Income? Let the Asset Pay."'
    },
    ar: {
      headline: 'الدخل غير كافي؟ فعّل تأجير ميراث.',
      subheadline: 'دع الأصل يدفع لنفسه',
      description: `يمكننا تأجير الأصل بـ ${formatEGP(estimatedRent)}/شهرياً (تقديري) لتغطية دفعاتك.`,
      calculation: {
        title: 'الحساب الجديد',
        installment: 'قسط القرض',
        rental: 'ناقص دخل الإيجار',
        youPay: 'أنت تدفع'
      },
      result: canBeApproved ? 'مقبول مع التأجير' : 'يحتاج مراجعة',
      promise: '"الدخل غير كافي؟ دع الأصل يدفع."'
    }
  };

  const t = content[language]; // Translate

  return (
    <div className="mt-6 p-6 rounded-xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700 animate-in slide-in-from-top-4 duration-500">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-full bg-amber-200 dark:bg-amber-800">
          <Sparkles className="h-6 w-6 text-amber-700 dark:text-amber-300" />
        </div>
        <div>
          <p className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
            {t.promise}
          </p>
          <h3 className="text-xl font-bold text-foreground">{t.headline}</h3>
          <p className="text-muted-foreground mt-1">{t.subheadline}</p>
        </div>
      </div>

      <p className="text-foreground mb-6 p-4 bg-card rounded-lg border border-border">
        {t.description}
      </p>

      {/* Calculation Breakdown Box */}
      <div className="bg-card rounded-lg p-6 border border-border space-y-4">
        <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
          <Home className="h-5 w-5 text-primary" />
          {t.calculation.title}
        </h4>

        <div className="space-y-3">
          {/* Original Installment */}
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">{t.calculation.installment}</span>
            <span className="font-semibold text-foreground">{formatEGP(result.monthlyInstallment)}</span>
          </div>
          {/* Estimated Rent Deduction */}
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">{t.calculation.rental}</span>
            <span className="font-semibold text-success-green">-{formatEGP(estimatedRent)}</span>
          </div>

          <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />

          {/* New Net Payment */}
          <div className="flex justify-between items-center py-3 bg-primary/5 rounded-lg px-4">
            <span className="font-bold text-foreground">{t.calculation.youPay}</span>
            <span className="text-2xl font-bold text-primary">{formatEGP(netPayment)}</span>
          </div>
        </div>
      </div>

      {/* Final Result Badge */}
      <div className={`mt-6 flex items-center justify-center gap-3 p-4 rounded-lg ${canBeApproved
          ? 'bg-success-green/10 border border-success-green/30'
          : 'bg-amber-100 dark:bg-amber-900/30 border border-amber-300'
        }`}>
        <CheckCircle className={`h-8 w-8 ${canBeApproved ? 'text-success-green' : 'text-amber-600'}`} />
        <span className={`text-xl font-bold ${canBeApproved ? 'text-success-green' : 'text-amber-700 dark:text-amber-300'}`}>
          {t.result}
        </span>
      </div>
    </div>
  );
};

export default LeasingRescue;
