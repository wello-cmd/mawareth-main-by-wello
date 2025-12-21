import React from 'react'; // Import React
import { useLanguage } from '@/contexts/LanguageContext'; // Import Language Context
import { Building2, Shield, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'; // Import icons
import { FinancingType } from '@/types/models'; // Import financing type
import { cn } from '@/lib/utils'; // Import class names utility

// Props interface
interface FinancingPathSelectorProps {
  selected: FinancingType | null; // Selected option (nullable)
  onSelect: (type: FinancingType) => void; // Selection handler
}

// Component to select between Conventional Loan and Islamic Murabaha
const FinancingPathSelector: React.FC<FinancingPathSelectorProps> = ({ onSelect }) => {
  const { language } = useLanguage(); // Current language
  const isArabic = language === 'ar'; // Check Arabic
  const Arrow = isArabic ? ArrowLeft : ArrowRight; // Directional arrow based on locale

  // Content for options
  const content = {
    en: {
      headline: 'Keep the Legacy. Choose Your Path.',
      subheadline: 'Select the financing option that aligns with your values',
      standard: {
        title: 'Standard Bank Loan',
        badge: 'Conventional',
        tagline: 'Borrow Cash, Pay Interest',
        features: [
          'Up to 20 years repayment',
          'Competitive interest rates',
          'Immediate full ownership',
          'Mortgage-backed financing'
        ],
        cta: 'Explore Bank Loan'
      },
      murabaha: {
        title: 'Merath Murabaha',
        badge: 'Sharia Compliant',
        tagline: 'Trade, Not Debt — Zero Riba',
        features: [
          '5-7 years repayment period',
          'Fixed profit margin (no interest)',
          'Immediate possession (keys)',
          'Full ownership after final payment'
        ],
        cta: 'Explore Murabaha',
        recommended: 'Recommended'
      }
    },
    ar: {
      headline: 'حافظ على الإرث. اختر طريقك.',
      subheadline: 'اختر خيار التمويل الذي يتوافق مع قيمك',
      standard: {
        title: 'قرض بنكي تقليدي',
        badge: 'تقليدي',
        tagline: 'اقترض نقداً، وادفع الفائدة',
        features: [
          'سداد حتى 20 سنة',
          'أسعار فائدة تنافسية',
          'ملكية كاملة فورية',
          'تمويل مضمون برهن'
        ],
        cta: 'استكشف القرض البنكي'
      },
      murabaha: {
        title: 'مرابحة ميراث',
        badge: 'متوافق مع الشريعة',
        tagline: 'تجارة، لا دين — بدون ربا',
        features: [
          'فترة سداد 5-7 سنوات',
          'هامش ربح ثابت (بدون فائدة)',
          'حيازة فورية (المفاتيح)',
          'ملكية كاملة بعد السداد الأخير'
        ],
        cta: 'استكشف المرابحة',
        recommended: 'موصى به'
      }
    }
  };

  const t = content[language]; // Translate

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {t.headline}
        </h2>
        <p className="text-muted-foreground">{t.subheadline}</p>
      </div>

      {/* Options Grid */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {/* Standard Bank Loan Option */}
        <button
          onClick={() => onSelect('standard')}
          className={cn(
            'group relative flex flex-col p-6 lg:p-8 rounded-2xl border-2 text-start transition-all duration-300',
            'bg-card hover:bg-muted/50',
            'border-border hover:border-primary/50 hover:shadow-xl'
          )}
        >
          {/* Header & Icon */}
          <div className="flex items-start justify-between mb-6">
            <div className="p-3 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors">
              <Building2 className="h-8 w-8 text-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground font-medium">
              {t.standard.badge}
            </span>
          </div>

          <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
            {t.standard.title}
          </h3>
          <p className="text-primary font-medium mb-6">{t.standard.tagline}</p>

          {/* Features List */}
          <ul className="space-y-3 mb-8 flex-1">
            {t.standard.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA Link */}
          <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
            {t.standard.cta}
            <Arrow className="h-4 w-4" />
          </div>
        </button>

        {/* Merath Murabaha Option - Highlighted */}
        <button
          onClick={() => onSelect('murabaha')}
          className={cn(
            'group relative flex flex-col p-6 lg:p-8 rounded-2xl border-2 text-start transition-all duration-300',
            'bg-gradient-to-br from-success-green/5 via-card to-success-green/10',
            'border-success-green/30 hover:border-success-green hover:shadow-xl hover:shadow-success-green/10'
          )}
        >
          {/* Recommended Badge */}
          <div className="absolute -top-3 start-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-success-green text-white text-xs font-semibold shadow-lg">
              <Sparkles className="h-3.5 w-3.5" />
              {t.murabaha.recommended}
            </span>
          </div>

          {/* Header & Icon */}
          <div className="flex items-start justify-between mb-6 mt-2">
            <div className="p-3 rounded-xl bg-success-green/10 group-hover:bg-success-green/20 transition-colors">
              <Shield className="h-8 w-8 text-success-green" />
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full bg-success-green/20 text-success-green font-medium">
              {t.murabaha.badge}
            </span>
          </div>

          <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
            {t.murabaha.title}
          </h3>
          <p className="text-success-green font-medium mb-6">{t.murabaha.tagline}</p>

          {/* Features List */}
          <ul className="space-y-3 mb-8 flex-1">
            {t.murabaha.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-success-green" />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA Link */}
          <div className="flex items-center gap-2 text-success-green font-semibold group-hover:gap-3 transition-all">
            {t.murabaha.cta}
            <Arrow className="h-4 w-4" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default FinancingPathSelector;
