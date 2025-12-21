import { Card } from "@/components/ui/card"; // Import Card
import { Shield, Scale, Building2, CheckCircle } from "lucide-react"; // Import Icons
import { useLanguage } from "@/contexts/LanguageContext"; // Import Language Context

export const TheGuide = () => {
  const { language } = useLanguage(); // Get language

  // Content
  const content = {
    en: {
      intro: "Enter Mawareth",
      title: "We are the",
      highlight: "'Peacemaker'",
      description: "We combine the precision of Sharia Law with the speed of Modern Fintech to dissolve disputes before they start.",
      badge1: "Sharia Compliant",
      badge1Desc: "Al-Azhar Verified",
      badge2: "Legal Verified",
      badge2Desc: "Court Recognized",
      badge3: "Bank Partnered",
      badge3Desc: "Leading Egyptian Banks",
    },
    ar: {
      intro: "دخول موارث",
      title: "نحن",
      highlight: "'صانعو السلام'",
      description: "نجمع بين دقة الشريعة الإسلامية وسرعة التكنولوجيا المالية الحديثة لحل النزاعات قبل أن تبدأ.",
      badge1: "متوافق مع الشريعة",
      badge1Desc: "موثق من الأزهر",
      badge2: "موثق قانونياً",
      badge2Desc: "معترف به من المحاكم",
      badge3: "شراكة مع البنوك",
      badge3Desc: "البنوك المصرية الرائدة",
    },
  };

  const t = content[language]; // Translate

  // Trust Badges Data
  const badges = [
    { icon: Shield, title: t.badge1, desc: t.badge1Desc, color: "text-emerald" },
    { icon: Scale, title: t.badge2, desc: t.badge2Desc, color: "text-trust-blue" },
    { icon: Building2, title: t.badge3, desc: t.badge3Desc, color: "text-gold" },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative">
        {/* Header Content */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-emerald font-semibold text-lg mb-4">{t.intro}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.title} <span className="text-gold">{t.highlight}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {badges.map((badge, idx) => (
            <Card
              key={idx}
              className="p-8 text-center hover:shadow-medium transition-all group bg-card border-2 border-transparent hover:border-emerald/20"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <badge.icon className={`w-8 h-8 ${badge.color}`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{badge.title}</h3>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-success-green" />
                {badge.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
