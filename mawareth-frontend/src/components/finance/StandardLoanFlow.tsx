import React, { useState } from 'react'; // Import React hook
import { useLanguage } from '@/contexts/LanguageContext'; // Import Language context
import { useNavigate } from 'react-router-dom'; // Import router
import { Button } from '@/components/ui/button'; // Import Button
import { Input } from '@/components/ui/input'; // Import Input
import { Label } from '@/components/ui/label'; // Import Label
import { Slider } from '@/components/ui/slider'; // Import Slider
import { formatEGP } from '@/services/api'; // Import Currency Formatter
import { ArrowRight, ArrowLeft, Phone, Building2, CheckCircle, XCircle, TrendingUp, Clock, Home } from 'lucide-react'; // Import Icons
import { cn } from '@/lib/utils'; // Import class names utility

interface StandardLoanFlowProps {
  onBack: () => void; // Callback to go back
}

// Standard Bank Loan Calculator
const StandardLoanFlow: React.FC<StandardLoanFlowProps> = ({ onBack }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isArabic = language === 'ar';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const BackArrow = isArabic ? ArrowRight : ArrowLeft;

  // Defaults
  const [shareValue, setShareValue] = useState(1000000);
  const [monthlyIncome, setMonthlyIncome] = useState(25000);
  const [repaymentYears, setRepaymentYears] = useState(10);
  const [interestRate, setInterestRate] = useState(15);

  // Simple interest calculation (Demo logic, not compound)
  // Total Interest = Principal * Rate * Years
  const totalInterest = shareValue * (interestRate / 100) * repaymentYears;
  const totalAmount = shareValue + totalInterest;
  const months = repaymentYears * 12;
  const monthlyInstallment = Math.round(totalAmount / months);
  // Eligibility Check
  const dtiRatio = monthlyIncome > 0 ? (monthlyInstallment / monthlyIncome) * 100 : 0;
  const isApproved = dtiRatio <= 40; // CBE regulation max 40%

  const content = {
    en: {
      back: 'Choose Different Path',
      title: 'Standard Bank Loan Calculator',
      subtitle: 'Traditional financing with competitive interest rates',
      shareValue: 'Share Value to Buy',
      monthlyIncome: 'Your Monthly Income',
      repaymentPeriod: 'Repayment Period',
      interestRate: 'Annual Interest Rate',
      years: 'years',
      breakdown: 'Loan Breakdown',
      principal: 'Principal Amount',
      totalInterest: 'Total Interest',
      totalRepayment: 'Total Repayment',
      monthlyPayment: 'Monthly Payment',
      dtiRatio: 'Debt-to-Income Ratio',
      dtiNote: 'Max 40% allowed',
      approved: 'ELIGIBLE',
      rejected: 'NOT ELIGIBLE',
      features: 'Loan Features',
      feature1: 'Immediate Ownership',
      feature1Desc: 'Full legal ownership from day one',
      feature2: 'Long Tenure',
      feature2Desc: 'Up to 20 years to repay',
      feature3: 'Flexible Rates',
      feature3Desc: 'Competitive market rates',
      note: 'Note: Property will be mortgaged to the bank until loan is fully repaid.',
      cta: 'Start Application',
      contact: 'Talk to Expert'
    },
    ar: {
      back: 'اختر طريقاً مختلفاً',
      title: 'حاسبة القرض البنكي',
      subtitle: 'تمويل تقليدي بأسعار فائدة تنافسية',
      shareValue: 'قيمة الحصة للشراء',
      monthlyIncome: 'دخلك الشهري',
      repaymentPeriod: 'فترة السداد',
      interestRate: 'معدل الفائدة السنوي',
      years: 'سنة',
      breakdown: 'تفاصيل القرض',
      principal: 'المبلغ الأساسي',
      totalInterest: 'إجمالي الفائدة',
      totalRepayment: 'إجمالي السداد',
      monthlyPayment: 'الدفعة الشهرية',
      dtiRatio: 'نسبة الدين للدخل',
      dtiNote: 'الحد الأقصى 40%',
      approved: 'مؤهل',
      rejected: 'غير مؤهل',
      features: 'مميزات القرض',
      feature1: 'ملكية فورية',
      feature1Desc: 'ملكية قانونية كاملة من اليوم الأول',
      feature2: 'فترة طويلة',
      feature2Desc: 'حتى 20 سنة للسداد',
      feature3: 'أسعار مرنة',
      feature3Desc: 'أسعار سوق تنافسية',
      note: 'ملاحظة: سيتم رهن العقار للبنك حتى يتم سداد القرض بالكامل.',
      cta: 'ابدأ الطلب',
      contact: 'تحدث مع خبير'
    }
  };

  const t = content[language]; // Translate

  // Feature cards data
  const features = [
    { icon: Home, title: t.feature1, desc: t.feature1Desc },
    { icon: Clock, title: t.feature2, desc: t.feature2Desc },
    { icon: TrendingUp, title: t.feature3, desc: t.feature3Desc }
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
          <Building2 className="h-5 w-5" />
          <span className="font-medium">Conventional Banking</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t.title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      {/* Feature Icons Row */}
      <div className="grid md:grid-cols-3 gap-4">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/50 border border-border">
            <feature.icon className="h-8 w-8 text-primary mb-3" />
            <h4 className="font-semibold text-foreground">{feature.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Calculator Area */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Parameters */}
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

          {/* Repayment Years Slider */}
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
              max={20}
              step={1}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 {t.years}</span>
              <span>20 {t.years}</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>{t.interestRate}</Label>
              <span className="text-lg font-bold text-primary">
                {interestRate}%
              </span>
            </div>
            <Slider
              value={[interestRate]}
              onValueChange={([value]) => setInterestRate(value)}
              min={8}
              max={25}
              step={0.5}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>8%</span>
              <span>25%</span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6 space-y-4">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            {t.breakdown}
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">{t.principal}</span>
              <span className="font-semibold">{formatEGP(shareValue)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">{t.totalInterest}</span>
              <span className="font-semibold text-amber-600">+{formatEGP(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center py-3 bg-primary/10 rounded-lg px-3">
              <span className="font-semibold">{t.totalRepayment}</span>
              <span className="text-xl font-bold text-primary">{formatEGP(totalAmount)}</span>
            </div>
          </div>

          <div className="pt-4 space-y-3">
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

            {/* Approval Badge */}
            <div className={cn(
              'flex items-center justify-center gap-3 p-4 rounded-lg',
              isApproved
                ? 'bg-success-green/20 border border-success-green/30'
                : 'bg-destructive/10 border border-destructive/30'
            )}>
              {isApproved ? (
                <CheckCircle className="h-6 w-6 text-success-green" />
              ) : (
                <XCircle className="h-6 w-6 text-destructive" />
              )}
              <span className={cn('text-lg font-bold', isApproved ? 'text-success-green' : 'text-destructive')}>
                {isApproved ? t.approved : t.rejected}
              </span>
            </div>
          </div>

          {/* Mortgage Note */}
          <p className="text-xs text-muted-foreground text-center pt-2 italic">
            {t.note}
          </p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button
          size="lg"
          onClick={() => navigate('/loan-application')}
          className="gap-2"
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

export default StandardLoanFlow;
