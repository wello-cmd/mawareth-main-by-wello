import { AlertTriangle, Clock, Users, Scale } from "lucide-react"; // Import icons
import { useLanguage } from "@/contexts/LanguageContext"; // Import language context

export const ProblemSection = () => {
  const { language } = useLanguage(); // Get current language

  // Content definition
  const content = {
    en: {
      eyebrow: "The Problem",
      headline: "Inheritance Disputes Tear Families Apart",
      description: "Every year, thousands of Egyptian families lose years—and relationships—fighting over inherited property.",
      painPoints: [
        {
          icon: Clock,
          title: "Years in Court",
          description: "Average inheritance case takes 5+ years to resolve through litigation.",
        },
        {
          icon: Users,
          title: "Family Conflict",
          description: "70% of inheritance disputes permanently damage family relationships.",
        },
        {
          icon: Scale,
          title: "Unfair Outcomes",
          description: "Without proper calculation, heirs often receive less than their Sharia right.",
        },
      ],
    },
    ar: {
      eyebrow: "المشكلة",
      headline: "نزاعات الميراث تمزق العائلات",
      description: "كل عام، تخسر آلاف العائلات المصرية سنوات من عمرها - وعلاقاتها - في النزاع على الميراث العقاري.",
      painPoints: [
        {
          icon: Clock,
          title: "سنوات في المحاكم",
          description: "قضية الميراث تستغرق +5 سنوات في المتوسط للحل عبر التقاضي.",
        },
        {
          icon: Users,
          title: "صراع عائلي",
          description: "70% من نزاعات الميراث تدمر العلاقات العائلية بشكل دائم.",
        },
        {
          icon: Scale,
          title: "نتائج غير عادلة",
          description: "بدون حساب صحيح، غالباً ما يحصل الورثة على أقل من حقهم الشرعي.",
        },
      ],
    },
  };

  const t = content[language]; // Translate content

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header content */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold text-destructive uppercase tracking-wide mb-3 flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.headline}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.description}
          </p>
        </div>

        {/* Problem cards grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.painPoints.map((point, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-card border border-border shadow-soft"
            >
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <point.icon className="w-6 h-6 text-destructive" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{point.title}</h3>
              <p className="text-muted-foreground text-sm">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
