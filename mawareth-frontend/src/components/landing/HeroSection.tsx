import { ArrowRight, Shield, Clock, Users } from "lucide-react"; // Import icons
import { Button } from "@/components/ui/button"; // Import Button component
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { useLanguage } from "@/contexts/LanguageContext"; // Import language context

export const HeroSection = () => {
  const navigate = useNavigate(); // Navigation hook
  const { language } = useLanguage(); // Language context

  // Localized content
  const content = {
    en: {
      badge: "Sharia-Compliant Solutions",
      headline: "Turn Inherited Property",
      headlineAccent: "Into Family Harmony",
      subheadline: "Egypt's first platform to calculate inheritance shares, finance buyouts, and liquidate disputed assets—all in one place.",
      cta: "Calculate Your Share",
      ctaSecondary: "Learn How It Works",
      stats: [
        { icon: Users, value: "500+", label: "Families Helped" },
        { icon: Shield, value: "100%", label: "Sharia Compliant" },
        { icon: Clock, value: "48hrs", label: "Average Resolution" },
      ],
    },
    ar: {
      badge: "حلول متوافقة مع الشريعة",
      headline: "حوّل الميراث العقاري",
      headlineAccent: "إلى وئام عائلي",
      subheadline: "أول منصة في مصر لحساب أنصبة الميراث وتمويل شراء الحصص وتسييل الأصول المتنازع عليها - كل ذلك في مكان واحد.",
      cta: "احسب حصتك",
      ctaSecondary: "تعرف على الطريقة",
      stats: [
        { icon: Users, value: "+500", label: "عائلة تمت مساعدتها" },
        { icon: Shield, value: "100%", label: "متوافق مع الشريعة" },
        { icon: Clock, value: "48 ساعة", label: "متوسط الحل" },
      ],
    },
  };

  const t = content[language]; // Current translation

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.08),transparent_50%)]" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            {t.badge}
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t.headline}
            <br />
            <span className="text-primary">{t.headlineAccent}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {t.subheadline}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={() => navigate('/calculator')}
              size="lg"
              className="h-14 px-8 text-lg bg-accent hover:bg-accent/90 text-accent-foreground shadow-medium"
            >
              {t.cta}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => navigate('/about')}
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg border-2"
            >
              {t.ctaSecondary}
            </Button>
          </div>

          {/* Key Statistics */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {t.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
