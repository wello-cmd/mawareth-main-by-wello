import { CheckCircle, ArrowRight } from "lucide-react"; // Import icons
import { Button } from "@/components/ui/button"; // Import Button
import { useNavigate } from "react-router-dom"; // Import navigate hook
import { useLanguage } from "@/contexts/LanguageContext"; // Import language context

export const SolutionSection = () => {
  const navigate = useNavigate(); // Navigation hook
  const { language } = useLanguage(); // Language context

  // Content Strings
  const content = {
    en: {
      eyebrow: "The Solution",
      headline: "Mawareth: Your Path to Resolution",
      description: "We combine Sharia expertise, modern technology, and financial solutions to help families resolve inheritance disputes fairly and peacefully.",
      benefits: [
        "Accurate Sharia-compliant share calculations",
        "Islamic financing for family buyouts (Murabaha)",
        "Private marketplace for asset liquidation",
        "Professional mediation support",
      ],
      cta: "Start Your Journey",
    },
    ar: {
      eyebrow: "الحل",
      headline: "موارث: طريقك نحو الحل",
      description: "نجمع بين الخبرة الشرعية والتكنولوجيا الحديثة والحلول المالية لمساعدة العائلات على حل نزاعات الميراث بعدل وسلام.",
      benefits: [
        "حساب دقيق للأنصبة وفق الشريعة الإسلامية",
        "تمويل إسلامي لشراء حصص الورثة (مرابحة)",
        "سوق خاص لتسييل الأصول",
        "دعم وساطة مهنية",
      ],
      cta: "ابدأ رحلتك",
    },
  };

  const t = content[language]; // Get translation

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
              {t.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.headline}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t.description}
            </p>

            {/* Benefits List */}
            <ul className="space-y-4 mb-8">
              {t.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success-green flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => navigate('/calculator')}
              size="lg"
              className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {t.cta}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Visual: 4-Step Process Grid */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-8 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="p-6 bg-card rounded-xl shadow-medium border border-border">
                  <p className="text-4xl font-bold text-primary mb-1">01</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'احسب' : 'Calculate'}
                  </p>
                </div>
                <div className="p-6 bg-card rounded-xl shadow-medium border border-border mt-8">
                  <p className="text-4xl font-bold text-primary mb-1">02</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'تفاوض' : 'Negotiate'}
                  </p>
                </div>
                <div className="p-6 bg-card rounded-xl shadow-medium border border-border -mt-4">
                  <p className="text-4xl font-bold text-primary mb-1">03</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'موّل' : 'Finance'}
                  </p>
                </div>
                <div className="p-6 bg-card rounded-xl shadow-medium border border-border mt-4">
                  <p className="text-4xl font-bold text-accent mb-1">04</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'أنجز' : 'Resolve'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
