import { Card } from "@/components/ui/card"; // Import Card component
import { Calculator, Handshake, Gavel, ArrowRight } from "lucide-react"; // Import icons
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { useLanguage } from "@/contexts/LanguageContext"; // Import language context

export const ServiceGrid = () => {
  const navigate = useNavigate(); // Navigation hook
  const { language } = useLanguage(); // Current language

  // Content Strings
  const content = {
    en: {
      eyebrow: "Our Services",
      headline: "Three Paths to Resolution",
    },
    ar: {
      eyebrow: "خدماتنا",
      headline: "ثلاث طرق للحل",
    },
  };

  const t = content[language]; // Translate

  // Service options logic
  const services = [
    {
      icon: Calculator,
      titleEn: "Calculate Shares",
      titleAr: "حساب الأنصبة",
      subtextEn: "Get your exact Sharia-compliant inheritance share in minutes. Free, accurate, and educational.",
      subtextAr: "احصل على حصتك الشرعية الدقيقة في دقائق. مجاني ودقيق وتعليمي.",
      path: "/calculator",
      color: "primary",
    },
    {
      icon: Handshake,
      titleEn: "Family Buyout",
      titleAr: "شراء حصص الورثة",
      subtextEn: "Finance the purchase of other heirs' shares through Sharia-compliant Murabaha.",
      subtextAr: "موّل شراء حصص الورثة الآخرين من خلال المرابحة الإسلامية.",
      path: "/finance",
      color: "accent",
    },
    {
      icon: Gavel,
      titleEn: "Asset Liquidation",
      titleAr: "تسييل الأصول",
      subtextEn: "Sell disputed property to verified investors at competitive prices.",
      subtextAr: "بيع العقارات المتنازع عليها لمستثمرين موثقين بأسعار تنافسية.",
      path: "/marketplace",
      color: "success-green",
    },
  ];

  // Colors for each service type
  const colorClasses = {
    primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
    accent: "bg-accent/10 text-accent-foreground group-hover:bg-accent group-hover:text-accent-foreground",
    "success-green": "bg-success-green/10 text-success-green group-hover:bg-success-green group-hover:text-white",
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t.headline}
          </h2>
        </div>

        {/* Grid of services */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, idx) => (
            <Card
              key={idx}
              onClick={() => navigate(service.path)}
              className="group cursor-pointer p-8 bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 shadow-soft hover:shadow-medium"
            >
              <div className="flex flex-col h-full">
                {/* Icon wrapper with dynamic colors */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${colorClasses[service.color as keyof typeof colorClasses]}`}>
                  <service.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {language === 'ar' ? service.titleAr : service.titleEn}
                </h3>
                <p className="text-muted-foreground text-sm flex-1 mb-6">
                  {language === 'ar' ? service.subtextAr : service.subtextEn}
                </p>

                {/* Arrow Link Effect */}
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  <span>{language === 'ar' ? 'ابدأ الآن' : 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
