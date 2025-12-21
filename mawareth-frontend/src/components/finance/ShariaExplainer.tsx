import { Card } from "@/components/ui/card"; // Import Card
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // Import Accordion
import { BookOpen, Users, Shield } from "lucide-react"; // Import Icons
import { useLanguage } from "@/contexts/LanguageContext"; // Import Language context
import { translations } from "@/lib/i18n"; // Import Translations

// Component to explain Sharia Inheritance Rules
export const ShariaExplainer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Card className="p-6 bg-primary/5 border-primary/20">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-6 h-6 text-primary" />
        <h3 className="font-semibold text-lg text-foreground">
          {t.shariaExplainerTitle}
        </h3>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {/* Fixed Shares (Fard) Explanation */}
        <AccordionItem value="fixed-shares">
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>{t.fixedSharesTitle}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground space-y-2">
            <p>{t.fixedSharesDesc}</p>
            <div className="bg-background/50 p-3 rounded-md text-sm space-y-1">
              <p>• {t.fixedSharesEx1}</p>
              <p>• {t.fixedSharesEx2}</p>
              <p>• {t.fixedSharesEx3}</p>
            </div>
            <p className="text-xs italic">{t.quranRef}: {t.quran411}</p>
          </AccordionContent>
        </AccordionItem>

        {/* Residual Shares (Ta'sib) Explanation */}
        <AccordionItem value="residual-shares">
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>{t.residualSharesTitle}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground space-y-2">
            <p>{t.residualSharesDesc}</p>
            <div className="bg-background/50 p-3 rounded-md text-sm space-y-1">
              <p>• {t.residualSharesEx1}</p>
              <p>• {t.residualSharesEx2}</p>
              <p>• {t.residualSharesEx3}</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Blocking Rules (Hajb) Explanation */}
        <AccordionItem value="blocking">
          <AccordionTrigger className="text-left">
            {t.blockingTitle}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground space-y-2">
            <p>{t.blockingDesc}</p>
            <div className="bg-background/50 p-3 rounded-md text-sm space-y-1">
              <p>• {t.blockingEx1}</p>
              <p>• {t.blockingEx2}</p>
              <p>• {t.blockingEx3}</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Step Relatives Explanation */}
        <AccordionItem value="step-relatives">
          <AccordionTrigger className="text-left">
            {t.stepRelativesTitle}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground space-y-2">
            <p>{t.stepRelativesDesc}</p>
            <div className="bg-background/50 p-3 rounded-md text-sm space-y-1">
              <p>• <strong>{t.stepmother}:</strong> {t.stepmotherDesc}</p>
              <p>• <strong>{t.stepbrotherPaternal}/{t.stepsisterPaternal}:</strong> {t.stepPaternalDesc}</p>
              <p>• <strong>{t.stepbrotherMaternal}/{t.stepsisterMaternal}:</strong> {t.stepMaternalDesc}</p>
            </div>
            <p className="text-xs italic">{t.quranRef}: {t.quran412}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
