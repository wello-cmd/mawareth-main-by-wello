import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Home, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { PageContainer } from "@/components/layout/PageContainer";
import { ListingRow } from "@/components/marketplace/ListingRow";
import { LockModal } from "@/components/marketplace/LockModal";
import { api, formatEGP } from "@/services/api";
import { MarketplaceListing } from "@/types/models";
import { useMarketplaceListings } from "@/hooks/useMarketplace";
import { Skeleton } from "@/components/ui/skeleton";

const Marketplace = () => {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: listings = [], isLoading } = useMarketplaceListings();
  const [filteredListings, setFilteredListings] = useState<MarketplaceListing[]>([]);
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState<string>("all");

  useEffect(() => {
    let filtered = listings.filter(l => l.status === 'active');

    if (searchTerm) {
      filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (propertyType !== "all") {
      filtered = filtered.filter(l => l.propertyType === propertyType);
    }

    setFilteredListings(filtered);
  }, [searchTerm, propertyType, listings]);

  const handleViewDetails = (listing: MarketplaceListing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const content = {
    en: {
      title: "Solh Marketplace",
      subtitle: "Verified distressed assets at below-market prices",
      searchPlaceholder: "Search by location...",
      propertyType: "Property Type",
      all: "All Types",
      apartment: "Apartment",
      villa: "Villa",
      land: "Land",
      commercial: "Commercial",
      totalListings: "properties",
      totalValue: "Total Value",
      noResults: "No results found",
      submitListing: "List Your Property",
    },
    ar: {
      title: "سوق الصلح",
      subtitle: "أصول موثقة بأسعار أقل من السوق",
      searchPlaceholder: "ابحث بالموقع...",
      propertyType: "نوع العقار",
      all: "جميع الأنواع",
      apartment: "شقة",
      villa: "فيلا",
      land: "أرض",
      commercial: "تجاري",
      totalListings: "عقار",
      totalValue: "القيمة الإجمالية",
      noResults: "لا توجد نتائج",
      submitListing: "اعرض عقارك",
    },
  };

  const t = content[language];
  const totalValue = filteredListings.reduce((sum, l) => sum + l.askPrice, 0);

  return (
    <PageContainer>
      {/* Header */}
      <section className="py-8 md:py-12 border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{t.subtitle}</p>

              {/* Stats Row */}
              <div className="flex gap-8 text-sm">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">{filteredListings.length}</span>
                  <span className="text-muted-foreground">{t.totalListings}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-success-green">{formatEGP(totalValue)}</span>
                  <span className="text-muted-foreground">{t.totalValue}</span>
                </div>
              </div>
            </div>

            {/* Submit Listing Button */}
            <Button
              onClick={() => navigate(isAuthenticated ? '/submit-listing' : '/auth')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t.submitListing}
            </Button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 border-b border-border sticky top-16 bg-background z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px] max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-[180px] h-12">
                <Home className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t.propertyType} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="apartment">{t.apartment}</SelectItem>
                <SelectItem value="villa">{t.villa}</SelectItem>
                <SelectItem value="land">{t.land}</SelectItem>
                <SelectItem value="commercial">{t.commercial}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="space-y-4 max-w-5xl">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : (
            <div className="space-y-4 max-w-5xl">
              {filteredListings.map((listing) => (
                <ListingRow
                  key={listing._id}
                  listing={listing}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}

          {!isLoading && filteredListings.length === 0 && (
            <div className="text-center py-16">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">{t.noResults}</p>
            </div>
          )}
        </div>
      </section>

      {/* Lock Modal */}
      <LockModal
        listing={selectedListing}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </PageContainer>
  );
};

export default Marketplace;
