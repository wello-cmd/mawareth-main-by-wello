import React, { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FinancingType } from '@/types/models';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import FinancingPathSelector from '@/components/finance/FinancingPathSelector';
import MurabahaFlow from '@/components/finance/MurabahaFlow';
import StandardLoanFlow from '@/components/finance/StandardLoanFlow';
import { motion, AnimatePresence } from 'framer-motion';

const Finance: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [financingType, setFinancingType] = useState<FinancingType | null>(null);

  const content = {
    en: {
      title: 'Family Buyout Simulator',
      subtitle: 'Calculate your path to keeping the family legacy',
      back: 'Choose Different Path'
    },
    ar: {
      title: 'محاكي شراء حصص العائلة',
      subtitle: 'احسب طريقك للحفاظ على إرث العائلة',
      back: 'اختر طريقاً مختلفاً'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <motion.div 
            className="text-center space-y-3 mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t.title}</h1>
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!financingType ? (
              <motion.div
                key="selector"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <FinancingPathSelector 
                  selected={null} 
                  onSelect={setFinancingType} 
                />
              </motion.div>
            ) : financingType === 'murabaha' ? (
              <motion.div
                key="murabaha"
                initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isArabic ? 50 : -50 }}
                transition={{ duration: 0.4 }}
              >
                <MurabahaFlow onBack={() => setFinancingType(null)} />
              </motion.div>
            ) : (
              <motion.div
                key="standard"
                initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isArabic ? -50 : 50 }}
                transition={{ duration: 0.4 }}
              >
                <StandardLoanFlow onBack={() => setFinancingType(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Finance;
