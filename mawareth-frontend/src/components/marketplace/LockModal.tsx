import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"; // Modal components
import { Button } from "@/components/ui/button"; // Button component
import { Card } from "@/components/ui/card"; // Card component
import { Lock, Shield, CreditCard, CheckCircle, MapPin, Maximize2 } from "lucide-react"; // Icons
import { MarketplaceListing } from "@/types/models"; // Type
import { formatEGP } from "@/services/api"; // Currency formatter
import { useLanguage } from "@/contexts/LanguageContext"; // Language context
import { useToast } from "@/hooks/use-toast"; // Toast hook

// Props Interface
interface LockModalProps {
  listing: MarketplaceListing | null; // Listing to unlock
  isOpen: boolean; // Modal visibility
  onClose: () => void; // Close handler
}

// Modal to prompt user for "Seriousness Deposit" before unlocking contact details
export const DEPOSIT_AMOUNT = 50000;
export const LockModal = ({ listing, isOpen, onClose }: LockModalProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();

  if (!listing) return null; // Don't render if no listing selected

  const content = {
    en: {
      title: "Unlock Property Details",
      description: "To view owner contact information and legal documents, place a seriousness deposit.",
      propertyInfo: "Property Information",
      locked: "LOCKED",
      ownerDetails: "Owner Contact Details",
      legalDocs: "Legal Documentation",
      whyDeposit: "Why a deposit?",
      reason1: "Ensures serious buyers only",
      reason2: "Refundable if deal doesn't proceed",
      reason3: "Protects seller privacy",
      depositAmount: "Deposit Amount",
      depositNote: "Fully refundable within 7 days",
      cta: "Deposit via Paymob",
      securePayment: "Secure payment processing",
    },
    ar: {
      title: "فتح تفاصيل العقار",
      description: "لعرض معلومات الاتصال بالمالك والمستندات القانونية، قم بإيداع مبلغ الجدية.",
      propertyInfo: "معلومات العقار",
      locked: "مغلق",
      ownerDetails: "تفاصيل الاتصال بالمالك",
      legalDocs: "الوثائق القانونية",
      whyDeposit: "لماذا الإيداع؟",
      reason1: "يضمن المشترين الجادين فقط",
      reason2: "قابل للاسترداد إذا لم تتم الصفقة",
      reason3: "يحمي خصوصية البائع",
      depositAmount: "مبلغ الإيداع",
      depositNote: "قابل للاسترداد بالكامل خلال 7 أيام",
      cta: "إيداع عبر باي موب",
      securePayment: "معالجة دفع آمنة",
    },
  };

  const t = content[language]; // Translate

  // Handle Mock Payment Process
  const handleDeposit = () => {
    toast({
      title: language === 'ar' ? 'جاري المعالجة...' : 'Processing...',
      description: language === 'ar' ? 'جاري تحويلك إلى بوابة الدفع' : 'Redirecting to payment gateway',
    });
    // In real implementation, this would redirect to Payment Gateway (Paymob)
    // Simulating success after 2 seconds
    setTimeout(() => {
      toast({
        title: language === 'ar' ? 'نجح!' : 'Success!',
        description: language === 'ar' ? 'تم فتح تفاصيل العقار' : 'Property details unlocked',
      });
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-gold" />
            {t.title}
          </DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Info Preview (Always visible) */}
          <Card className="p-4 bg-muted/50">
            <p className="text-sm font-semibold text-muted-foreground mb-2">{t.propertyInfo}</p>
            <h3 className="font-bold text-foreground mb-2">{listing.title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {listing.city}
              </span>
              <span className="flex items-center gap-1">
                <Maximize2 className="w-4 h-4" />
                {listing.area}m²
              </span>
            </div>
            <div className="mt-3 text-lg font-bold text-success-green">
              {formatEGP(listing.askPrice)}
            </div>
          </Card>

          {/* Locked Information Representation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm text-foreground">{t.ownerDetails}</span>
              <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded font-semibold">
                {t.locked}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm text-foreground">{t.legalDocs}</span>
              <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded font-semibold">
                {t.locked}
              </span>
            </div>
          </div>

          {/* Education on why deposit is needed */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">{t.whyDeposit}</p>
            <ul className="space-y-2">
              {[t.reason1, t.reason2, t.reason3].map((reason, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success-green flex-shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Amount and Payment CTA */}
          <Card className="p-4 border-2 border-gold/30 bg-gold/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.depositAmount}</p>
                <p className="text-2xl font-bold text-foreground">{formatEGP(DEPOSIT_AMOUNT)}</p>
                <p className="text-xs text-success-green">{t.depositNote}</p>
              </div>
              <CreditCard className="w-10 h-10 text-gold" />
            </div>
          </Card>

          {/* Deposit Button */}
          <Button onClick={handleDeposit} className="w-full bg-gold hover:bg-gold/90 text-emerald-dark" size="lg">
            <Shield className="w-5 h-5 mr-2" />
            {t.cta}
          </Button>
          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            {t.securePayment}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
