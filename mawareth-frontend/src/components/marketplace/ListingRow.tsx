import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Lock, Eye } from "lucide-react";
import { MarketplaceListing } from "@/types/models";
import { formatEGP } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";

interface ListingRowProps {
  listing: MarketplaceListing;
  onViewDetails: (listing: MarketplaceListing) => void;
}

export const ListingRow = ({ listing, onViewDetails }: ListingRowProps) => {
  const { language } = useLanguage();

  return (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg shadow-soft hover:shadow-medium transition-shadow">
      {/* Thumbnail */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
        <img 
          src={listing.images[0]} 
          alt={listing.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-foreground truncate mb-1">
          {listing.title}
        </h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>{listing.city}</span>
          <span className="mx-2">•</span>
          <span>{listing.area}m²</span>
        </div>
      </div>

      {/* Market Value (strikethrough) */}
      <div className="text-right hidden sm:block">
        <p className="text-xs text-muted-foreground">
          {language === 'ar' ? 'القيمة السوقية' : 'Market Value'}
        </p>
        <p className="text-sm text-muted-foreground line-through">
          {formatEGP(listing.marketValuation)}
        </p>
      </div>

      {/* Ask Price */}
      <div className="text-right">
        <p className="text-xs text-muted-foreground">
          {language === 'ar' ? 'سعر الطلب' : 'Ask Price'}
        </p>
        <p className="text-lg font-bold text-success-green">
          {formatEGP(listing.askPrice)}
        </p>
      </div>

      {/* Discount Badge */}
      <Badge className="bg-success-green/10 text-success-green border-0 hidden md:flex">
        -{listing.profitPercentage}%
      </Badge>

      {/* Action */}
      <Button 
        onClick={() => onViewDetails(listing)}
        variant="outline"
        size="sm"
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        {listing.isLocked ? (
          <>
            <Lock className="w-4 h-4 mr-1" />
            {language === 'ar' ? 'فتح' : 'Unlock'}
          </>
        ) : (
          <>
            <Eye className="w-4 h-4 mr-1" />
            {language === 'ar' ? 'عرض' : 'View'}
          </>
        )}
      </Button>
    </div>
  );
};
