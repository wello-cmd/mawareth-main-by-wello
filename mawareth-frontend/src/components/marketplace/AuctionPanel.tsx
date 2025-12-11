import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Gavel, Clock, TrendingUp, User } from "lucide-react";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { formatEGP } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface AuctionBid {
  investorId: string;
  amount: number;
  timestamp: string;
}

interface AuctionPanelProps {
  listingId: string;
  currentHighestBid: number;
  minimumBid: number;
  endsAt: string;
  recentBids: AuctionBid[];
}

export const AuctionPanel = ({ 
  listingId, 
  currentHighestBid, 
  minimumBid,
  endsAt, 
  recentBids 
}: AuctionPanelProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState("");
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endsAt).getTime();
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft(language === 'ar' ? 'انتهى' : 'Ended');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [endsAt, language]);

  const handlePlaceBid = () => {
    const amount = parseInt(bidAmount, 10);
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

    toast({
      title: language === 'ar' ? 'تم تقديم العرض!' : 'Bid Placed!',
      description: language === 'ar' 
        ? `عرضك: ${formatEGP(amount)}`
        : `Your bid: ${formatEGP(amount)}`,
    });
    setBidModalOpen(false);
    setBidAmount("");
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

  const t = content[language];

  return (
    <>
      <Card className="p-6 border-2 border-primary/20 shadow-medium">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Gavel className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">{t.title}</h3>
        </div>

        {/* Current Highest Bid */}
        <div className="text-center mb-6 p-4 bg-success-green/10 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">{t.currentBid}</p>
          <p className="text-3xl font-bold text-success-green animate-pulse-slow">
            {formatEGP(currentHighestBid)}
          </p>
        </div>

        {/* Recent Bids */}
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

        {/* Timer */}
        <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-muted rounded-lg">
          <Clock className="w-5 h-5 text-destructive" />
          <span className="text-sm text-muted-foreground">{t.endsIn}:</span>
          <span className="font-bold text-foreground">{timeLeft}</span>
        </div>

        {/* Place Bid Button */}
        <Button 
          onClick={() => setBidModalOpen(true)}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12"
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          {t.placeBid}
        </Button>
      </Card>

      {/* Bid Modal */}
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
