import { Button } from "@/components/ui/button"; // Import UI button
import { Calculator, ArrowRight, AlertTriangle, Clock, Users } from "lucide-react"; // Import icons
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { useLanguage } from "@/contexts/LanguageContext"; // Import language context
import { MashrabiyaPattern } from "@/components/ui/MashrabiyaPattern"; // Import decorative pattern

export const HeroNightmare = () => {
  const navigate = useNavigate(); // Hook for navigation
  const { language } = useLanguage(); // Hook for current language

  // Define content for both languages
  const content = {
    en: {
      nightmareTitle: "In Egypt, inheritance isn't a gift;",
      nightmareHighlight: "it's a burden.",
      nightmareDesc: "Families are torn apart. Brothers stop speaking. And worst of all, billions of pounds in real estate sit empty and rotting because 5 heirs can't agree on one signature.",
      painPoint: "You own a fortune on paper, but you can't pay your bills.",
      tagline: "Don't Fight Over Bricks.",
      taglineHighlight: "Split the Cash.",
      subtitle: "The first platform to calculate, finance, and liquidate inherited real estate in Egypt.",
      cta1: "Calculate Your Share",
      cta2: "Learn How It Works",
      stat1: "3+ Years",
      stat1Label: "Average dispute duration",
      stat2: "₤50B+",
      stat2Label: "Frozen in inherited assets",
      stat3: "70%",
      stat3Label: "Families face disputes"
    },
    ar: {
      nightmareTitle: "في مصر، الميراث ليس هدية؛",
      nightmareHighlight: "إنه عبء.",
      nightmareDesc: "العائلات تتمزق. الإخوة يتوقفون عن الكلام. والأسوأ من ذلك، مليارات الجنيهات من العقارات تجلس فارغة ومتهالكة لأن 5 ورثة لا يستطيعون الاتفاق على توقيع واحد.",
      painPoint: "أنت تملك ثروة على الورق، لكنك لا تستطيع دفع فواتيرك.",
      tagline: "لا تتقاتلوا على الطوب.",
      taglineHighlight: "اقسموا النقود.",
      subtitle: "أول منصة لحساب وتمويل وتسييل العقارات الموروثة في مصر.",
      cta1: "احسب نصيبك",
      cta2: "اعرف كيف تعمل",
      stat1: "+3 سنوات",
      stat1Label: "متوسط مدة النزاع",
      stat2: "+50 مليار جنيه",
      stat2Label: "مجمدة في الأصول الموروثة",
      stat3: "70%",
      stat3Label: "من العائلات تواجه نزاعات"
    }
  };
  const t = content[language]; // Select content based on language

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-emerald">
      {/* Dark emerald background with pattern */}
      <div className="absolute inset-0 bg-emerald" />
      <MashrabiyaPattern opacity={0.08} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald/95 via-emerald to-emerald-dark/90" />

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-5xl mx-auto">
          {/* The Nightmare Section */}
          <div className="mb-12">
            <p className="text-gold font-semibold text-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {language === 'ar' ? 'المشكلة' : 'The Problem'}
            </p>
            <h2 className="text-2xl md:text-3xl text-emerald-foreground/80 mb-2">
              {t.nightmareTitle}
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6">
              {t.nightmareHighlight}
            </h2>
            <p className="text-lg md:text-xl text-emerald-foreground/70 max-w-3xl leading-relaxed mb-4">
              {t.nightmareDesc}
            </p>
            <p className="text-xl md:text-2xl text-emerald-foreground font-semibold italic border-l-4 border-gold pl-4">
              "{t.painPoint}"
            </p>
          </div>

          {/* The Solution Tagline */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-emerald-foreground mb-4">
              {t.tagline}
              <br />
              <span className="text-gold">{t.taglineHighlight}</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-foreground/80 max-w-2xl">
              {t.subtitle}
            </p>
          </div>

          {/* Call to Actions (CTAs) */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" onClick={() => navigate('/calculator')} className="bg-gold hover:bg-gold/90 text-emerald-dark shadow-strong text-lg px-8 py-6">
              <Calculator className="w-5 h-5 mr-2" />
              {t.cta1}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/about')} className="border-emerald-foreground/30 text-lg px-8 py-6 text-popover bg-muted-foreground">
              {t.cta2}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Pain Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-emerald-foreground/20">
            <div className="text-center">
              <Clock className="w-8 h-8 text-gold mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold text-emerald-foreground">{t.stat1}</p>
              <p className="text-sm text-emerald-foreground/60">{t.stat1Label}</p>
            </div>
            <div className="text-center">
              <AlertTriangle className="w-8 h-8 text-gold mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold text-emerald-foreground">{t.stat2}</p>
              <p className="text-sm text-emerald-foreground/60">{t.stat2Label}</p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-gold mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold text-emerald-foreground">{t.stat3}</p>
              <p className="text-sm text-emerald-foreground/60">{t.stat3Label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};