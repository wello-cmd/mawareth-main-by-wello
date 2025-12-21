import { Card } from "@/components/ui/card"; // Import Card
import { Button } from "@/components/ui/button"; // Import Button
import { Badge } from "@/components/ui/badge"; // Import Badge
import { Progress } from "@/components/ui/progress"; // Import Progress Bar
import { MapPin, Maximize2, Clock, TrendingUp, Lock } from "lucide-react"; // Import Icons
import { MarketplaceListing } from "@/types/models"; // Type Definition
import { formatEGP } from "@/services/api"; // Currency Formatter
import { useLanguage } from "@/contexts/LanguageContext"; // Language Hook

// Props interface
interface DealCardProps {
  listing: MarketplaceListing; // The listing data object
  onViewDetails: (listing: MarketplaceListing) => void; // Handler for viewing details
}

// Component representing a single property deal card in the marketplace grid
export const DealCard = ({ listing, onViewDetails }: DealCardProps) => {
  const { language } = useLanguage();

  // Style config for different badges
  const badgeColors = {
    'cash-deal': 'bg-destructive text-destructive-foreground',
    'buyout-opportunity': 'bg-trust-blue text-white',
  };

  // Localized Badge Labels
  const badgeLabels = {
    'cash-deal': language === 'ar' ? 'صفقة نقدية' : 'Cash Deal',
    'buyout-opportunity': language === 'ar' ? 'فرصة شراء' : 'Buyout Opportunity',
  };

  // Calculate percentage of time remaining (normalized to 100%)
  const timeProgress = Math.max(0, 100 - (listing.timeLeftDays / 30) * 100);

  return (
    <Card className="overflow-hidden group hover:shadow-strong transition-all duration-300 border-2 border-transparent hover:border-emerald/20">
      {/* Property Image Header */}
      <div className="relative h-48 bg-muted">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        {/* Deal Type Badge (Top Right) */}
        <Badge className={`absolute top-3 right-3 ${badgeColors[listing.badge]}`}>
          {badgeLabels[listing.badge]}
        </Badge>
        {/* Instant Profit Indicator (Bottom Left) */}
        <div className="absolute bottom-3 left-3 bg-success-green text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          +{listing.profitPercentage}% {language === 'ar' ? 'ربح' : 'Profit'}
        </div>
      </div>

      {/* Only show public details, hide specific location/owner unless unlocked */}
      <div className="p-5">
        {/* Title & Key Stats */}
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">
          {listing.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {listing.city}
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 className="w-4 h-4" />
            {listing.area}m²
          </span>
        </div>

        {/* Pricing Breakdown */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-muted-foreground line-through">
              {formatEGP(listing.marketValuation)}
            </span>
            <span className="text-xs text-muted-foreground">
              {language === 'ar' ? 'القيمة السوقية' : 'Market Value'}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-success-green">
              {formatEGP(listing.askPrice)}
            </span>
          </div>
          <div className="text-sm text-gold font-semibold">
            {language === 'ar' ? 'ربح فوري:' : 'Instant Profit:'} +{formatEGP(listing.instantProfit)}
          </div>
        </div>

        {/* Action Time Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {language === 'ar' ? 'الوقت المتبقي' : 'Time Left'}
            </span>
            <span className="font-semibold text-foreground">
              {listing.timeLeftDays} {language === 'ar' ? 'يوم' : 'days'}
            </span>
          </div>
          <Progress value={timeProgress} className="h-2" />
        </div>

        {/* View Details / Unlock Button */}
        <Button
          onClick={() => onViewDetails(listing)}
          className="w-full bg-emerald hover:bg-emerald/90 text-white"
        >
          <Lock className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
        </Button>
      </div>
    </Card>
  );
};
