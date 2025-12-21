import { Star, Quote } from "lucide-react"; // Import Icons
import { useLanguage } from "@/contexts/LanguageContext"; // Import Language

export const TrustSection = () => {
  const { language } = useLanguage(); // Current language

  // Testimonials and localized content
  const content = {
    en: {
      eyebrow: "Testimonials",
      headline: "Trusted by Egyptian Families",
      testimonials: [
        {
          quote: "Mawareth helped us resolve a 7-year dispute in just 3 months. My siblings and I are talking again.",
          name: "Ahmed M.",
          role: "Cairo",
        },
        {
          quote: "The Murabaha financing let me keep my father's apartment. I pay monthly and own it fully in 5 years.",
          name: "Fatima K.",
          role: "Alexandria",
        },
        {
          quote: "I finally understood my inheritance rights. The calculator explained everything clearly.",
          name: "Omar S.",
          role: "Giza",
        },
      ],
    },
    ar: {
      eyebrow: "آراء العملاء",
      headline: "موثوق من العائلات المصرية",
      testimonials: [
        {
          quote: "ساعدنا موارث في حل نزاع استمر 7 سنوات في 3 أشهر فقط. أنا وإخوتي نتحدث مرة أخرى.",
          name: "أحمد م.",
          role: "القاهرة",
        },
        {
          quote: "تمويل المرابحة مكنني من الاحتفاظ بشقة والدي. أدفع شهرياً وأمتلكها بالكامل في 5 سنوات.",
          name: "فاطمة ك.",
          role: "الإسكندرية",
        },
        {
          quote: "أخيراً فهمت حقوقي في الميراث. الحاسبة شرحت كل شيء بوضوح.",
          name: "عمر س.",
          role: "الجيزة",
        },
      ],
    },
  };

  const t = content[language]; // Translate

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header content */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t.headline}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-card border border-border shadow-soft"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => ( // 5 Star Rating
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
