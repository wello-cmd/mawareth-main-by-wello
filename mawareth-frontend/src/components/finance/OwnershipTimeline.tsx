import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Key, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { FinancingType } from '@/types/models';

interface OwnershipTimelineProps {
  financingType: FinancingType;
  repaymentYears: number;
}

const OwnershipTimeline: React.FC<OwnershipTimelineProps> = ({ financingType, repaymentYears }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Only show for Murabaha
  if (financingType !== 'murabaha') return null;

  const content = {
    en: {
      title: 'Your Ownership Journey',
      start: {
        title: 'Receive Keys & Possession',
        description: 'Move in immediately after signing'
      },
      end: {
        title: 'Receive Title Deed',
        description: `Full ownership after ${repaymentYears} years`
      },
      during: 'During installment payments, you have full possession and use of the property'
    },
    ar: {
      title: 'رحلة ملكيتك',
      start: {
        title: 'استلم المفاتيح والحيازة',
        description: 'انتقل فوراً بعد التوقيع'
      },
      end: {
        title: 'استلم صك الملكية',
        description: `الملكية الكاملة بعد ${repaymentYears} سنوات`
      },
      during: 'خلال فترة الأقساط، لديك الحيازة والاستخدام الكامل للعقار'
    }
  };

  const t = content[language];
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="mt-8 p-6 rounded-xl bg-success-green/5 border border-success-green/20">
      <h3 className="text-xl font-bold text-foreground mb-6 text-center">{t.title}</h3>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        {/* Start Point */}
        <div className="flex-1 text-center p-6 bg-card rounded-xl border-2 border-success-green shadow-soft">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-green/20 mb-4">
            <Key className="h-8 w-8 text-success-green" />
          </div>
          <h4 className="font-bold text-lg text-foreground mb-2">{t.start.title}</h4>
          <p className="text-sm text-muted-foreground">{t.start.description}</p>
          <div className="mt-3 px-3 py-1 rounded-full bg-success-green text-success-green/10 text-xs font-bold inline-block">
            <span className="text-primary-foreground">{isArabic ? 'الآن' : 'NOW'}</span>
          </div>
        </div>

        {/* Arrow & Timeline */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-12 h-1 bg-gradient-to-r from-success-green to-primary rounded-full" />
            <Arrow className="h-6 w-6 text-primary" />
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-gold rounded-full" />
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {repaymentYears} {isArabic ? 'سنوات' : 'years'}
          </span>
        </div>

        {/* End Point */}
        <div className="flex-1 text-center p-6 bg-card rounded-xl border-2 border-gold shadow-soft">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-4">
            <FileText className="h-8 w-8 text-gold" />
          </div>
          <h4 className="font-bold text-lg text-foreground mb-2">{t.end.title}</h4>
          <p className="text-sm text-muted-foreground">{t.end.description}</p>
          <div className="mt-3 px-3 py-1 rounded-full bg-gold text-gold/10 text-xs font-bold inline-block">
            <span className="text-accent-foreground">{isArabic ? 'ملكية كاملة' : 'FULL OWNERSHIP'}</span>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-6 p-4 bg-muted rounded-lg">
        {t.during}
      </p>
    </div>
  );
};

export default OwnershipTimeline;
