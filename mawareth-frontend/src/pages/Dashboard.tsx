import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, MapPin, TrendingUp, Vote, Building, Share2, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageContainer } from "@/components/layout/PageContainer";
import { VotingBar } from "@/components/dashboard/VotingBar";

import { SilentConsensus } from "@/components/dashboard/SilentConsensus";
import { LeasingSimulator } from "@/components/dashboard/LeasingSimulator";
import { FinancingToggle } from "@/components/dashboard/FinancingToggle";
import { api, formatEGP } from "@/services/api";
import { Estate } from "@/types/models";
import { useEstates } from "@/hooks/useEstates";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { data: estates = [], isLoading: isLoadingEstates } = useEstates();
  const [selectedEstate, setSelectedEstate] = useState<Estate | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Auto-select first estate when loaded
  useEffect(() => {
    if (estates.length > 0 && !selectedEstate) {
      setSelectedEstate(estates[0]);
    }
  }, [estates, selectedEstate]);



  const handleConsensusVote = async (vote: 'accept' | 'reject') => {
    if (!selectedEstate) return;
    await api.estates.updateConsensus(selectedEstate._id, vote);
    setHasVoted(true);
  };

  const handleCopyLink = () => {
    if (!selectedEstate) return;
    const link = `${window.location.origin}/vote/${selectedEstate._id}`;
    navigator.clipboard.writeText(link);
    toast.success(language === 'en' ? "Voting link copied!" : "تم نسخ رابط التصويت!");
  };

  const content = {
    en: {
      title: "Heir Dashboard",
      subtitle: "Manage your inherited estates",
      yourEstates: "Your Estates",
      activeEstate: "Active Estate",
      yourShare: "Your Share",
      estateValue: "Estate Value",
      statusLabels: {
        disputed: "Disputed",
        voting: "Voting",
        listed: "Listed",
        sold: "Sold",
      },
      tabs: {
        overview: "Overview",
        voting: "Voting",
        financing: "Financing",
      },
      viewMarketplace: "View Marketplace",
      copyLink: "Copy Voting Link",
      copyLinkDesc: "Share this link with heirs to vote without an account",
    },
    ar: {
      title: "لوحة تحكم الوارث",
      subtitle: "أدر عقاراتك الموروثة",
      yourEstates: "عقاراتك",
      activeEstate: "العقار النشط",
      yourShare: "حصتك",
      estateValue: "قيمة العقار",
      statusLabels: {
        disputed: "متنازع عليه",
        voting: "تصويت",
        listed: "معروض",
        sold: "تم البيع",
      },
      tabs: {
        overview: "نظرة عامة",
        voting: "التصويت",
        financing: "التمويل",
      },
      viewMarketplace: "عرض السوق",
      copyLink: "نسخ رابط التصويت",
      copyLinkDesc: "شارك هذا الرابط مع الورثة للتصويت بدون حساب",
    },
  };

  const t = content[language];

  const statusColors = {
    disputed: "bg-destructive/10 text-destructive border-destructive/20",
    voting: "bg-accent/10 text-accent-foreground border-accent/20",
    listed: "bg-success-green/10 text-success-green border-success-green/20",
    sold: "bg-muted text-muted-foreground border-border",
  };

  if (isLoadingEstates) {
    return (
      <PageContainer>
        <div className="py-8">
          <Skeleton className="h-10 w-1/3 mb-4" />
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="lg:col-span-3 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {/* Page Header */}
      < section className="py-8 border-b border-border bg-card" >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t.title}</h1>
              <p className="text-muted-foreground mt-1">{t.subtitle}</p>
            </div>
            <Button onClick={() => navigate('/marketplace')} variant="outline" className="w-fit">
              {t.viewMarketplace}
            </Button>
          </div>
        </div>
      </section >

      {/* Main Content */}
      < section className="py-8" >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Estate Selector - Sidebar */}
            <div className="lg:col-span-1">
              <Card className="shadow-soft sticky top-24">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    {t.yourEstates}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {estates.map((estate) => (
                    <div
                      key={estate._id}
                      onClick={() => setSelectedEstate(estate)}
                      className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${selectedEstate?._id === estate._id
                        ? 'bg-primary/5 border-primary shadow-soft'
                        : 'bg-card hover:bg-muted border-transparent'
                        }`}
                    >
                      <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
                        {estate.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3" />
                        {estate.city}
                      </div>
                      <Badge className={`text-xs border ${statusColors[estate.status]}`}>
                        {t.statusLabels[estate.status]}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Estate Details - Main Content */}
            <div className="lg:col-span-3">
              {selectedEstate ? (
                <div className="space-y-6">
                  {/* Estate Header Card */}
                  <Card className="shadow-soft overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{t.activeEstate}</p>
                          <h2 className="text-xl md:text-2xl font-bold text-foreground">
                            {selectedEstate.title}
                          </h2>
                          <p className="text-muted-foreground flex items-center gap-1 mt-2 text-sm">
                            <MapPin className="w-4 h-4" />
                            {selectedEstate.address}
                          </p>
                        </div>
                        <Badge className={`border ${statusColors[selectedEstate.status]}`}>
                          {t.statusLabels[selectedEstate.status]}
                        </Badge>
                      </div>

                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-card rounded-lg text-center shadow-soft">
                          <p className="text-xs text-muted-foreground mb-1">{t.estateValue}</p>
                          <p className="text-lg font-bold text-foreground">
                            {formatEGP(selectedEstate.marketValuation)}
                          </p>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-lg text-center border border-primary/20">
                          <p className="text-xs text-primary mb-1">{t.yourShare}</p>
                          <p className="text-lg font-bold text-primary">
                            {selectedEstate.heirs[0]?.sharePercentage}%
                          </p>
                        </div>
                        <div className="p-4 bg-accent/10 rounded-lg text-center border border-accent/20">
                          <p className="text-xs text-accent-foreground mb-1">{t.yourShare}</p>
                          <p className="text-lg font-bold text-accent-foreground">
                            {formatEGP(selectedEstate.heirs[0]?.shareValue || 0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Tabbed Content */}
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full grid grid-cols-3 h-12 mb-6">
                      <TabsTrigger value="overview" className="gap-2">
                        <Home className="w-4 h-4" />
                        <span className="hidden sm:inline">{t.tabs.overview}</span>
                      </TabsTrigger>
                      <TabsTrigger value="voting" className="gap-2">
                        <Vote className="w-4 h-4" />
                        <span className="hidden sm:inline">{t.tabs.voting}</span>
                      </TabsTrigger>
                      <TabsTrigger value="financing" className="gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span className="hidden sm:inline">{t.tabs.financing}</span>
                      </TabsTrigger>

                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                      <VotingBar estate={selectedEstate} />
                      {selectedEstate.consensus && (
                        <SilentConsensus
                          acceptedCount={selectedEstate.consensus.accepted}
                          totalHeirs={selectedEstate.consensus.total}
                          hasVoted={hasVoted}
                          onVote={handleConsensusVote}
                        />
                      )}
                    </TabsContent>

                    <TabsContent value="voting" className="space-y-6">
                      <VotingBar estate={selectedEstate} />
                      {selectedEstate.consensus && (
                        <SilentConsensus
                          acceptedCount={selectedEstate.consensus.accepted}
                          totalHeirs={selectedEstate.consensus.total}
                          hasVoted={hasVoted}
                          onVote={handleConsensusVote}
                        />
                      )}


                      <Card className="mt-6 border-dashed border-2">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h4 className="font-semibold flex items-center gap-2">
                                <Share2 className="w-4 h-4 text-primary" />
                                {t.copyLink}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {t.copyLinkDesc}
                              </p>
                            </div>
                            <Button onClick={handleCopyLink} variant="secondary">
                              <Copy className="w-4 h-4 mr-2" />
                              {language === 'en' ? 'Copy Link' : 'نسخ الرابط'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="financing" className="space-y-6">
                      <LeasingSimulator
                        loanAmount={selectedEstate.heirs[0]?.shareValue || 0}
                        monthlyInstallment={Math.round((selectedEstate.heirs[0]?.shareValue || 0) * 1.15 / 60)}
                        estimatedRent={Math.round(selectedEstate.marketValuation * 0.005)}
                      />
                      <FinancingToggle assetPrice={selectedEstate.heirs[0]?.shareValue || 1000000} />
                    </TabsContent>


                  </Tabs>
                </div>
              ) : (
                <Card className="p-12 text-center shadow-soft">
                  <Home className="w-16 h-16 text-muted-foreground mx-auto mb-4" strokeWidth={1} />
                  <p className="text-xl text-muted-foreground">
                    {language === 'ar' ? 'اختر عقاراً لعرض التفاصيل' : 'Select an estate to view details'}
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section >
    </PageContainer >
  );
};

export default Dashboard;
