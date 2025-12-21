import React, { useState, useCallback } from 'react'; // Import React and hooks
import { useLanguage } from '@/contexts/LanguageContext'; // Import Language Context
import { useNavigate } from 'react-router-dom'; // Import Router Hook
import { Button } from '@/components/ui/button'; // Import Button
import { Input } from '@/components/ui/input'; // Import Input
import { Label } from '@/components/ui/label'; // Import Label
import { Slider } from '@/components/ui/slider'; // Import Slider
import { formatEGP } from '@/services/api'; // Import number formatter
import { ArrowRight, ArrowLeft, Phone, Shield, CheckCircle, Key, FileText, Coins } from 'lucide-react'; // Import icons
import { cn } from '@/lib/utils'; // Import class utility

interface MurabahaFlowProps {
  onBack: () => void; // Callback to go back to selection
}

// Murabaha Financing Calculator Component
const MurabahaFlow: React.FC<MurabahaFlowProps> = ({ onBack }) => {
  const { language } = useLanguage(); // Get language
  const navigate = useNavigate(); // Navigation hook
  const isArabic = language === 'ar';
  const Arrow = isArabic ? ArrowLeft : ArrowRight; // Directional icon
  const BackArrow = isArabic ? ArrowRight : ArrowLeft; // Directional icon

  // State for calculation
  const [shareValue, setShareValue] = useState(1000000); // 1M EGP Default
  const [monthlyIncome, setMonthlyIncome] = useState(25000); // 25k EGP Default
  const [repaymentYears, setRepaymentYears] = useState(5); // 5 Years Default

  // Murabaha Math (Simplified for Demo)
  // Concept: Bank buys asset -> Sells to user at markup (Profit)
  const profitMargin = 0.20; // 20% fixed profit over loan term
  const totalAmount = shareValue * (1 + profitMargin);
  const months = repaymentYears * 12;
  const monthlyInstallment = Math.round(totalAmount / months);

  // Eligibility Check
  const dtiRatio = monthlyIncome > 0 ? (monthlyInstallment / monthlyIncome) * 100 : 0;
  const isApproved = dtiRatio <= 40; // Max 40% DTI

  // Content Strings
  const content = {
    en: {
      back: 'Choose Different Path',
      title: 'Merath Murabaha Calculator',
      subtitle: 'Sharia-compliant financing with transparent, fixed pricing',
      shareValue: 'Share Value to Buy',
      monthlyIncome: 'Your Monthly Income',
      repaymentPeriod: 'Repayment Period',
      years: 'years',
      breakdown: 'Cost Breakdown',
      originalCost: 'Original Share Cost',
      profitMargin: 'Merath Profit (20%)',
      totalPrice: 'Total Sale Price',
      monthlyPayment: 'Monthly Payment',
      dtiRatio: 'Debt-to-Income Ratio',
      dtiNote: 'Max 40% allowed',
      approved: 'ELIGIBLE',
      rejected: 'NOT ELIGIBLE',
      howItWorks: 'How Murabaha Works',
      step1: 'Merath Buys',
      step1Desc: 'We purchase the share from your siblings at market value',
      step2: 'You Get Keys',
      step2Desc: 'Immediate possession of the property while you pay',
      step3: 'Fixed Payments',
      step3Desc: 'Pay us in fixed monthly installments (no interest)',
      step4: 'Full Ownership',
      step4Desc: 'Title deed transfers to you after final payment',
      cta: 'Start Application',
      contact: 'Talk to Expert'
    },
    ar: {
      back: 'اختر طريقاً مختلفاً',
      title: 'حاسبة مرابحة ميراث',
      subtitle: 'تمويل متوافق مع الشريعة بأسعار شفافة وثابتة',
      shareValue: 'قيمة الحصة للشراء',
      monthlyIncome: 'دخلك الشهري',
      repaymentPeriod: 'فترة السداد',
      years: 'سنة',
      breakdown: 'تفاصيل التكلفة',
      originalCost: 'التكلفة الأصلية للحصة',
      profitMargin: 'ربح ميراث (20%)',
      totalPrice: 'إجمالي سعر البيع',
      monthlyPayment: 'الدفعة الشهرية',
      dtiRatio: 'نسبة الدين للدخل',
      dtiNote: 'الحد الأقصى 40%',
      approved: 'مؤهل',
      rejected: 'غير مؤهل',
      howItWorks: 'كيف تعمل المرابحة',
      step1: 'ميراث تشتري',
      step1Desc: 'نشتري الحصة من إخوتك بالقيمة السوقية',
      step2: 'تحصل على المفاتيح',
      step2Desc: 'حيازة فورية للعقار أثناء السداد',
      step3: 'دفعات ثابتة',
      step3Desc: 'ادفع لنا بأقساط شهرية ثابتة (بدون فائدة)',
      step4: 'ملكية كاملة',
      step4Desc: 'ينتقل صك الملكية إليك بعد الدفعة الأخيرة',
      cta: 'ابدأ الطلب',
      contact: 'تحدث مع خبير'
    }
  };

  const t = content[language]; // Translate

  // Steps data
  const steps = [
    { icon: Coins, title: t.step1, desc: t.step1Desc },
    { icon: Key, title: t.step2, desc: t.step2Desc },
    { icon: FileText, title: t.step3, desc: t.step3Desc },
    { icon: CheckCircle, title: t.step4, desc: t.step4Desc }
  ];

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <BackArrow className="h-4 w-4" />
        {t.back}
      </Button>

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-green/10 text-success-green">
          <Shield className="h-5 w-5" />
          <span className="font-medium">Sharia Compliant</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t.title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      {/* How It Works Steps Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex flex-col items-center text-center p-4 rounded-xl bg-success-green/5 border border-success-green/20">
            {/* Step Number Badge */}
            <div className="absolute -top-2 -start-2 w-6 h-6 rounded-full bg-success-green text-white text-xs font-bold flex items-center justify-center">
              {idx + 1}
            </div>
            <step.icon className="h-8 w-8 text-success-green mb-3" />
            <h4 className="font-semibold text-foreground text-sm">{step.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Calculator Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Controls */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
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

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>{t.repaymentPeriod}</Label>
              <span className="text-lg font-bold text-success-green">
                {repaymentYears} {t.years}
              </span>
            </div>
            <Slider
              value={[repaymentYears]}
              onValueChange={([value]) => setRepaymentYears(value)}
              min={3}
              max={7}
              step={1}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>3 {t.years}</span>
              <span>7 {t.years}</span>
            </div>
          </div>
        </div>

        {/* Results & Breakdown */}
        <div className="bg-gradient-to-br from-success-green/5 to-success-green/10 rounded-xl border border-success-green/20 p-6 space-y-4">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-success-green" />
            {t.breakdown}
          </h3>

          <div className="space-y-3">
            {/* Cost Breakdown Lines */}
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">{t.originalCost}</span>
              <span className="font-semibold">{formatEGP(shareValue)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">{t.profitMargin}</span>
              <span className="font-semibold text-success-green">+{formatEGP(shareValue * profitMargin)}</span>
            </div>
            <div className="flex justify-between items-center py-3 bg-success-green/10 rounded-lg px-3">
              <span className="font-semibold">{t.totalPrice}</span>
              <span className="text-xl font-bold text-success-green">{formatEGP(totalAmount)}</span>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            {/* Monthly Payment */}
            <div className="flex justify-between items-center p-4 rounded-lg bg-card border border-border">
              <span className="text-muted-foreground">{t.monthlyPayment}</span>
              <span className="text-2xl font-bold text-foreground">{formatEGP(monthlyInstallment)}</span>
            </div>

            {/* DTI Status */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-card border border-border">
              <div>
                <span className="text-muted-foreground text-sm">{t.dtiRatio}</span>
                <p className="text-xs text-muted-foreground">{t.dtiNote}</p>
              </div>
              <span className={cn('text-xl font-bold', isApproved ? 'text-success-green' : 'text-destructive')}>
                {dtiRatio.toFixed(1)}%
              </span>
            </div>

            {/* Eligibility Badge */}
            <div className={cn(
              'flex items-center justify-center gap-3 p-4 rounded-lg',
              isApproved
                ? 'bg-success-green/20 border border-success-green/30'
                : 'bg-destructive/10 border border-destructive/30'
            )}>
              <CheckCircle className={cn('h-6 w-6', isApproved ? 'text-success-green' : 'text-destructive')} />
              <span className={cn('text-lg font-bold', isApproved ? 'text-success-green' : 'text-destructive')}>
                {isApproved ? t.approved : t.rejected}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button
          size="lg"
          onClick={() => navigate('/loan-application')}
          className="gap-2 bg-success-green hover:bg-success-green/90"
          disabled={!isApproved}
        >
          {t.cta}
          <Arrow className="h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate('/contact')}
          className="gap-2"
        >
          <Phone className="h-5 w-5" />
          {t.contact}
        </Button>
      </div>
    </div>
  );
};

export default MurabahaFlow;
