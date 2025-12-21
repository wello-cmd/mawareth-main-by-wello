import { Button } from "@/components/ui/button"; // Import Button
import { Badge } from "@/components/ui/badge"; // Import Badge
import { MapPin, Lock, Eye } from "lucide-react"; // Import Icons
import { MarketplaceListing } from "@/types/models"; // Type Import
import { formatEGP } from "@/services/api"; // Formatter Import
import { useLanguage } from "@/contexts/LanguageContext"; // Language Context

// Props Interface
interface ListingRowProps {
  listing: MarketplaceListing;
  onViewDetails: (listing: MarketplaceListing) => void;
}

// Compact row display for a marketplace listing (for list view)
export const ListingRow = ({ listing, onViewDetails }: ListingRowProps) => {
  const { language } = useLanguage();

  if (!listing) return null;

  // Defensive access to images
  const imageUrl = Array.isArray(listing.images) && listing.images.length > 0
    ? listing.images[0]
    : '/placeholder.svg';

  return (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg shadow-soft hover:shadow-medium transition-shadow">
      {/* Thumbnail Image */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={listing.title || 'Property'}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Details (Title & Location) */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-foreground truncate mb-1">
          {listing.title || 'Untitled Property'}
        </h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>{listing.city || 'Unknown City'}</span>
          <span className="mx-2">•</span>
          <span>{listing.area || 0}m²</span>
        </div>
      </div>

      {/* Valuation Info (Hidden on mobile) */}
      <div className="text-right hidden sm:block">
        <p className="text-xs text-muted-foreground">
          {language === 'ar' ? 'القيمة السوقية' : 'Market Value'}
        </p>
        <p className="text-sm text-muted-foreground line-through">
          {formatEGP(listing.marketValuation || 0)}
        </p>
      </div>

      {/* Ask Price Column */}
      <div className="text-right">
        <p className="text-xs text-muted-foreground">
          {language === 'ar' ? 'سعر الطلب' : 'Ask Price'}
        </p>
        <p className="text-lg font-bold text-success-green">
          {formatEGP(listing.askPrice || 0)}
        </p>
      </div>

      {/* Profit Badge (Hidden on small mobile) */}
      <Badge className="bg-success-green/10 text-success-green border-0 hidden md:flex">
        -{listing.profitPercentage || 0}%
      </Badge>

      {/* Action Button */}
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
