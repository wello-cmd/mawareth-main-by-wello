import { useState, useEffect } from "react"; // React hooks
import { Card } from "@/components/ui/card"; // Main container
import { Button } from "@/components/ui/button"; // Interaction button
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Modal components
import { Gavel, Clock, TrendingUp, User } from "lucide-react"; // Icons for auction context
import { CurrencyInput } from "@/components/ui/CurrencyInput"; // Custom input for currency
import { formatEGP } from "@/services/api"; // Currency formatter helper
import { useLanguage } from "@/contexts/LanguageContext"; // Hook for localization
import { useToast } from "@/hooks/use-toast"; // Hook for notifications

// Type definition for a single Bid
interface AuctionBid {
  investorId: string;
  amount: number;
  timestamp: string;
}

// Props for the Auction Panel Component
interface AuctionPanelProps {
  listingId: string;
  currentHighestBid: number;
  minimumBid: number;
  endsAt: string; // ISO Date String
  recentBids: AuctionBid[];
}

// Component managing the live auction interface for a property
export const AuctionPanel = ({
  listingId,
  currentHighestBid,
  minimumBid,
  endsAt,
  recentBids
}: AuctionPanelProps) => {
  const { language } = useLanguage(); // Get current language
  const { toast } = useToast(); // Toast notification handler
  const [timeLeft, setTimeLeft] = useState(""); // Countdown timer state
  const [bidModalOpen, setBidModalOpen] = useState(false); // Modal visibility state
  const [bidAmount, setBidAmount] = useState(""); // Input bid amount state

  // Effect to handle countdown timer logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endsAt).getTime();
      const now = Date.now();
      const diff = end - now;

      // Handle auction ended state
      if (diff <= 0) {
        setTimeLeft(language === 'ar' ? 'انتهى' : 'Ended');
        return;
      }

      // Calculate time components
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft(); // Initial call
    const interval = setInterval(calculateTimeLeft, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, [endsAt, language]);

  // Handle Bid Submission
  const handlePlaceBid = () => {
    const amount = parseInt(bidAmount, 10);
    // Validation: Bid must be higher than current highest
    if (amount <= currentHighestBid) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar'
          ? `يجب أن يكون العرض أكبر من ${formatEGP(currentHighestBid)}`
          : `Bid must be higher than ${formatEGP(currentHighestBid)}`,
        variant: "destructive",
      });
      return;
    }

    // Success feedback (Mock logic)
    toast({
      title: language === 'ar' ? 'تم تقديم العرض!' : 'Bid Placed!',
      description: language === 'ar'
        ? `عرضك: ${formatEGP(amount)}`
        : `Your bid: ${formatEGP(amount)}`,
    });
    setBidModalOpen(false); // Close modal
    setBidAmount(""); // Reset input
  };

  const content = {
    en: {
      title: "Live Auction",
      currentBid: "Current Highest Bid",
      recentBids: "Recent Bids",
      endsIn: "Ends in",
      placeBid: "Place Bid",
      enterBid: "Enter Your Bid",
      minBid: "Minimum bid:",
      submit: "Submit Bid",
    },
    ar: {
      title: "مزاد مباشر",
      currentBid: "أعلى عرض حالي",
      recentBids: "العروض الأخيرة",
      endsIn: "ينتهي في",
      placeBid: "تقديم عرض",
      enterBid: "أدخل عرضك",
      minBid: "الحد الأدنى:",
      submit: "تقديم العرض",
    },
  };

  const t = content[language]; // Translate

  return (
    <>
      <Card className="p-6 border-2 border-primary/20 shadow-medium">
        {/* Panel Header */}
        <div className="flex items-center gap-2 mb-6">
          <Gavel className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">{t.title}</h3>
        </div>

        {/* Current Highest Bid Display */}
        <div className="text-center mb-6 p-4 bg-success-green/10 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">{t.currentBid}</p>
          <p className="text-3xl font-bold text-success-green animate-pulse-slow">
            {formatEGP(currentHighestBid)}
          </p>
        </div>

        {/* Recent Bids Feed */}
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground mb-3">{t.recentBids}</p>
          <div className="space-y-2">
            {recentBids.slice(0, 3).map((bid, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-lg text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>Investor #{bid.investorId.slice(-3)}</span>
                </div>
                <span className="font-semibold text-foreground">
                  {formatEGP(bid.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-muted rounded-lg">
          <Clock className="w-5 h-5 text-destructive" />
          <span className="text-sm text-muted-foreground">{t.endsIn}:</span>
          <span className="font-bold text-foreground">{timeLeft}</span>
        </div>

        {/* CTA Button - Opens Modal */}
        <Button
          onClick={() => setBidModalOpen(true)}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12"
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          {t.placeBid}
        </Button>
      </Card>

      {/* Place Bid Modal */}
      <Dialog open={bidModalOpen} onOpenChange={setBidModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.enterBid}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t.minBid} {formatEGP(currentHighestBid + minimumBid)}
            </p>
            <CurrencyInput
              value={bidAmount}
              onChange={setBidAmount}
              placeholder="0"
            />
            <Button
              onClick={handlePlaceBid}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12"
              disabled={!bidAmount}
            >
              {t.submit}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
