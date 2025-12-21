import { Card } from "@/components/ui/card"; // Import Card
import { Button } from "@/components/ui/button"; // Import Button
import { Calculator, Banknote, Store, ArrowRight, DoorOpen } from "lucide-react"; // Import Icons
import { useNavigate } from "react-router-dom"; // Import Navigation
import { useLanguage } from "@/contexts/LanguageContext"; // Import Language

export const ThreeDoorsSection = () => {
  const navigate = useNavigate(); // Navigate hook
  const { language } = useLanguage(); // Language context

  // Content configurations for 3 doors
  const content = {
    en: {
      sectionTitle: "We give you",
      highlight: "three doors",
      subtitle: "You don't have to fight. You just have to choose a door.",
      door1: {
        number: "01",
        title: "Know Your Rights",
        subtitle: "The Calculator",
        description: "Get your exact Sharia-compliant share in seconds. Free, instant, and verified by Al-Azhar scholars.",
        cta: "Calculate Now",
        path: "/calculator",
      },
      door2: {
        number: "02",
        title: "Keep the House",
        subtitle: "The Buyout Loan",
        description: "Want to buy out your siblings? Get immediate financing through our partner banks. Fast approval, flexible terms.",
        cta: "Apply for Loan",
        path: "/loan-application",
      },
      door3: {
        number: "03",
        title: "Split the Cash",
        subtitle: "The Solh Marketplace",
        description: "Ready to sell? List on Solh and get cash offers from verified investors. No more waiting for family consensus.",
        cta: "View Marketplace",
        path: "/marketplace",
      },
    },
    ar: {
      sectionTitle: "نقدم لك",
      highlight: "ثلاثة أبواب",
      subtitle: "ليس عليك أن تتقاتل. عليك فقط أن تختار باباً.",
      door1: {
        number: "01",
        title: "اعرف حقوقك",
        subtitle: "الحاسبة",
        description: "احصل على نصيبك الشرعي الدقيق في ثوانٍ. مجاني، فوري، وموثق من علماء الأزهر.",
        cta: "احسب الآن",
        path: "/calculator",
      },
      door2: {
        number: "02",
        title: "احتفظ بالبيت",
        subtitle: "قرض الشراء",
        description: "تريد شراء حصص إخوتك؟ احصل على تمويل فوري من خلال بنوكنا الشريكة. موافقة سريعة، شروط مرنة.",
        cta: "تقدم للقرض",
        path: "/loan-application",
      },
      door3: {
        number: "03",
        title: "اقسموا النقود",
        subtitle: "سوق الصلح",
        description: "مستعد للبيع؟ اعرض على الصلح واحصل على عروض نقدية من مستثمرين موثقين. لا مزيد من الانتظار.",
        cta: "عرض السوق",
        path: "/marketplace",
      },
    },
  };

  const t = content[language];
  const doors = [t.door1, t.door2, t.door3];
  const icons = [Calculator, Banknote, Store];
  const colors = ["bg-emerald", "bg-trust-blue", "bg-gold"]; // Dynamic bg colors
  const textColors = ["text-emerald", "text-trust-blue", "text-gold"]; // Dynamic text colors

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald/10 text-emerald px-4 py-2 rounded-full mb-4">
            <DoorOpen className="w-5 h-5" />
            <span className="font-semibold">{language === 'ar' ? 'الحل' : 'The Solution'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.sectionTitle} <span className="text-gold">{t.highlight}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Doors Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {doors.map((door, idx) => {
            const Icon = icons[idx];
            return (
              <Card
                key={idx}
                className="relative overflow-hidden group hover:shadow-strong transition-all duration-300 border-2 border-transparent hover:border-emerald/20"
              >
                {/* Door number watermark */}
                <div className="absolute top-4 right-4 text-7xl font-bold text-muted/20 select-none">
                  {door.number}
                </div>
                <div className="p-8 relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${colors[idx]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <p className={`text-sm font-semibold ${textColors[idx]} mb-2`}>{door.subtitle}</p>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{door.title}</h3>
                  <p className="text-muted-foreground mb-8 min-h-[80px]">
                    {door.description}
                  </p>
                  {/* CTA */}
                  <Button
                    onClick={() => navigate(door.path)}
                    className={`w-full ${idx === 0 ? 'bg-emerald hover:bg-emerald/90' : idx === 1 ? 'bg-trust-blue hover:bg-trust-blue/90' : 'bg-gold hover:bg-gold/90'} text-white`}
                  >
                    {door.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
