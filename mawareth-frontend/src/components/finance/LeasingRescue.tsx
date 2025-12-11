import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, ArrowDown, CheckCircle, Sparkles } from 'lucide-react';
import { formatEGP } from '@/services/api';
import { AffordabilityResult } from './AffordabilityCalculator';

interface LeasingRescueProps {
  result: AffordabilityResult;
  estimatedRent?: number;
}

const LeasingRescue: React.FC<LeasingRescueProps> = ({ result, estimatedRent = 15000 }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Only show if rejected
  if (result.status !== 'rejected') return null;

  const netPayment = Math.max(0, result.monthlyInstallment - estimatedRent);
  const canBeApproved = netPayment <= result.monthlyIncome * 0.4;

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

  const t = content[language];

  return (
    <div className="mt-6 p-6 rounded-xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700 animate-in slide-in-from-top-4 duration-500">
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

      <div className="bg-card rounded-lg p-6 border border-border space-y-4">
        <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
          <Home className="h-5 w-5 text-primary" />
          {t.calculation.title}
        </h4>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">{t.calculation.installment}</span>
            <span className="font-semibold text-foreground">{formatEGP(result.monthlyInstallment)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">{t.calculation.rental}</span>
            <span className="font-semibold text-success-green">-{formatEGP(estimatedRent)}</span>
          </div>

          <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />

          <div className="flex justify-between items-center py-3 bg-primary/5 rounded-lg px-4">
            <span className="font-bold text-foreground">{t.calculation.youPay}</span>
            <span className="text-2xl font-bold text-primary">{formatEGP(netPayment)}</span>
          </div>
        </div>
      </div>

      <div className={`mt-6 flex items-center justify-center gap-3 p-4 rounded-lg ${
        canBeApproved 
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
