import { Card } from "@/components/ui/card"; // Import Card
import { Button } from "@/components/ui/button"; // Import Button
import { Calculator, Star, TrendingUp, Users, Home, Quote } from "lucide-react"; // Import Icons
import { useNavigate } from "react-router-dom"; // Import Navigation
import { useLanguage } from "@/contexts/LanguageContext"; // Import Language context
import { MashrabiyaPattern } from "@/components/ui/MashrabiyaPattern"; // Import Pattern

export const VictorySection = () => {
  const navigate = useNavigate(); // Hook for navigation
  const { language } = useLanguage(); // Language context

  // Content for both languages
  const content = {
    en: {
      tagline: "The Victory",
      title: "Grandma's empty house becomes",
      highlight: "cash in your pocket",
      subtitle: "The family feud ends. The capital flows back into the economy.",
      finalTagline: "Mawareth: Don't fight over bricks. Split the cash.",
      stat1: "500+",
      stat1Label: "Families Helped",
      stat2: "₤2.5B",
      stat2Label: "Assets Unlocked",
      stat3: "98%",
      stat3Label: "Satisfaction Rate",
      testimonial: "After 4 years of fighting, Mawareth helped us resolve our inheritance in just 3 weeks. My brothers and I are speaking again.",
      testimonialAuthor: "Mohamed K., Cairo",
      cta: "Start Your Resolution",
    },
    ar: {
      tagline: "النصر",
      title: "بيت جدتي الفارغ يصبح",
      highlight: "نقوداً في جيبك",
      subtitle: "ينتهي الخلاف العائلي. يعود رأس المال للتدفق في الاقتصاد.",
      finalTagline: "موارث: لا تتقاتلوا على الطوب. اقسموا النقود.",
      stat1: "+500",
      stat1Label: "عائلة تمت مساعدتها",
      stat2: "2.5 مليار جنيه",
      stat2Label: "أصول تم تحريرها",
      stat3: "98%",
      stat3Label: "معدل الرضا",
      testimonial: "بعد 4 سنوات من الخلاف، ساعدتنا موارث في حل ميراثنا في 3 أسابيع فقط. أنا وإخوتي نتحدث مرة أخرى.",
      testimonialAuthor: "محمد ك.، القاهرة",
      cta: "ابدأ حلك الآن",
    },
  };

  const t = content[language]; // Translate

  return (
    <section className="py-24 bg-emerald relative overflow-hidden">
      <MashrabiyaPattern opacity={0.06} /> {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald via-emerald to-emerald-dark/80" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Victory Message Header */}
          <div className="text-center mb-16">
            <p className="text-gold font-semibold text-lg mb-4 flex items-center justify-center gap-2">
              <Star className="w-5 h-5" />
              {t.tagline}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-foreground mb-4">
              {t.title} <span className="text-gold">{t.highlight}</span>
            </h2>
            <p className="text-xl text-emerald-foreground/80 mb-8">
              {t.subtitle}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-emerald-foreground border-t border-b border-emerald-foreground/20 py-6 inline-block">
              {t.finalTagline}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-emerald-foreground/10 border-emerald-foreground/20 p-8 text-center backdrop-blur-sm">
              <Users className="w-10 h-10 text-gold mx-auto mb-4" />
              <p className="text-4xl font-bold text-emerald-foreground mb-2">{t.stat1}</p>
              <p className="text-emerald-foreground/70">{t.stat1Label}</p>
            </Card>
            <Card className="bg-emerald-foreground/10 border-emerald-foreground/20 p-8 text-center backdrop-blur-sm">
              <TrendingUp className="w-10 h-10 text-gold mx-auto mb-4" />
              <p className="text-4xl font-bold text-emerald-foreground mb-2">{t.stat2}</p>
              <p className="text-emerald-foreground/70">{t.stat2Label}</p>
            </Card>
            <Card className="bg-emerald-foreground/10 border-emerald-foreground/20 p-8 text-center backdrop-blur-sm">
              <Home className="w-10 h-10 text-gold mx-auto mb-4" />
              <p className="text-4xl font-bold text-emerald-foreground mb-2">{t.stat3}</p>
              <p className="text-emerald-foreground/70">{t.stat3Label}</p>
            </Card>
          </div>

          {/* Featured Testimonial */}
          <Card className="bg-emerald-foreground/10 border-emerald-foreground/20 p-8 mb-12 backdrop-blur-sm">
            <Quote className="w-10 h-10 text-gold mb-4" />
            <p className="text-xl text-emerald-foreground italic mb-4">
              "{t.testimonial}"
            </p>
            <p className="text-gold font-semibold">— {t.testimonialAuthor}</p>
          </Card>

          {/* Final Call to Action */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => navigate('/calculator')}
              className="bg-gold hover:bg-gold/90 text-emerald-dark shadow-strong text-lg px-12 py-6"
            >
              <Calculator className="w-5 h-5 mr-2" />
              {t.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
