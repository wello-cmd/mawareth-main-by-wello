import { Card } from "@/components/ui/card"; // Import Card
import { Button } from "@/components/ui/button"; // Import Button
import { Download, Share2 } from "lucide-react"; // Import Icons
import { EstateCalculation, formatCurrency, formatPercentage, formatFraction } from "@/lib/shariaCalculator"; // Import Calculator helpers
import { generatePDF } from "@/lib/pdfGenerator"; // Import PDF generator
import { toast } from "sonner"; // Import Toast notifications
import { useLanguage } from "@/contexts/LanguageContext"; // Import Language context
import { translations } from "@/lib/i18n"; // Import Translations

// Props Interface
interface ResultsDisplayProps {
  calculation: EstateCalculation; // The Calculation Object
  onNewCalculation: () => void; // Reset Handler
}

// Component to display inheritance calculation results
export const ResultsDisplay = ({ calculation, onNewCalculation }: ResultsDisplayProps) => {
  const { language } = useLanguage(); // Get language
  const t = translations[language]; // Get translation strings

  // Handle PDF Generation
  const handleDownloadPDF = () => {
    try {
      generatePDF(calculation);
      toast.success(language === 'ar' ? "تم إنشاء PDF بنجاح!" : "PDF generated successfully!");
    } catch (error) {
      toast.error(language === 'ar' ? "فشل في إنشاء PDF" : "Failed to generate PDF");
    }
  };

  // Handle Sharing Results
  const handleShare = () => {
    const text = `Estate Calculation Results\nTotal Estate: ${formatCurrency(calculation.totalEstate)}\n${calculation.results.length} heirs`;

    // Use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'Inheritance Calculation',
        text: text,
      }).catch(() => { });
    } else {
      // Fallback to Clipboard
      navigator.clipboard.writeText(text);
      toast.success("Results copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Card - Total Estate */}
      <Card className="p-6 bg-gradient-primary/10 border-primary/20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t.calculationComplete}
          </h2>
          <p className="text-muted-foreground mb-4">
            {language === 'ar' ? 'وفقاً لأحكام الشريعة الإسلامية' : 'According to Sharia Inheritance Law'}
          </p>
          <div className="text-4xl font-bold text-foreground mb-2">
            {formatCurrency(calculation.totalEstate)}
          </div>
          <p className="text-sm text-muted-foreground">{t.estateValue}</p>
        </div>
      </Card>

      {/* Heirs Results List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          {t.inheritanceDistribution}
        </h3>

        {calculation.results.map((result) => (
          <Card key={result.heirId} className="p-6 hover:shadow-medium transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  {result.name}
                </h4>
                <p className="text-sm text-muted-foreground capitalize">
                  {result.relationship}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(result.amount)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatFraction(result.share)} • {formatPercentage(result.percentage)}
                </div>
              </div>
            </div>


            {/* Sharia Basis Explanation for this Heir */}
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{t.legalBasis}:</span> {result.basis}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Remaining Estate (Ta'sib or Unallocated) */}
      {calculation.remainingEstate > 0 && (
        <Card className="p-6 bg-accent/50 border-accent">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground">Remaining Estate</h4>
              <p className="text-sm text-muted-foreground">
                To be distributed as per state laws or will
              </p>
            </div>
            <div className="text-xl font-bold text-foreground">
              {formatCurrency(calculation.remainingEstate)}
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={handleDownloadPDF} className="flex-1" size="lg">
          <Download className="w-4 h-4 mr-2" />
          {t.downloadPDF}
        </Button>
        <Button onClick={handleShare} variant="outline" size="lg">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>

      <Button onClick={onNewCalculation} variant="ghost" className="w-full">
        {t.startNewCalculation}
      </Button>

      {/* Legal Disclaimer Footer */}
      <Card className="p-4 bg-muted/50 border-border">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Legal Disclaimer:</span> This calculation is based on Sharia inheritance principles and Egyptian law. For official legal proceedings, please consult with a qualified Islamic scholar and legal professional. This tool is for informational purposes only.
        </p>
      </Card>
    </div>
  );
};
