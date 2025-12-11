import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Building2, 
  Users, 
  FileText,
  Eye
} from 'lucide-react';
import { formatEGP } from '@/services/api';

interface PendingListing {
  _id: string;
  title: string;
  address: string;
  city: string;
  propertyType: string;
  askPrice: number;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  images: string[];
  description?: string;
}

const Admin: React.FC = () => {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  const [pendingListings, setPendingListings] = useState<PendingListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const content = {
    en: {
      title: 'Admin Dashboard',
      subtitle: 'Manage marketplace listings and users',
      pendingListings: 'Pending Listings',
      approvedListings: 'Approved',
      rejectedListings: 'Rejected',
      noListings: 'No pending listings',
      approve: 'Approve',
      reject: 'Reject',
      view: 'View',
      submittedBy: 'Submitted by',
      submittedAt: 'Submitted',
      askPrice: 'Asking Price',
      location: 'Location',
      unauthorized: 'You do not have permission to access this page',
      goHome: 'Go Home',
      approveSuccess: 'Listing approved successfully',
      rejectSuccess: 'Listing rejected',
      stats: {
        pending: 'Pending Review',
        approved: 'Approved Today',
        rejected: 'Rejected Today',
        totalUsers: 'Total Users'
      }
    },
    ar: {
      title: 'لوحة الإدارة',
      subtitle: 'إدارة قوائم السوق والمستخدمين',
      pendingListings: 'قوائم معلقة',
      approvedListings: 'موافق عليها',
      rejectedListings: 'مرفوضة',
      noListings: 'لا توجد قوائم معلقة',
      approve: 'موافقة',
      reject: 'رفض',
      view: 'عرض',
      submittedBy: 'مقدم من',
      submittedAt: 'تاريخ التقديم',
      askPrice: 'السعر المطلوب',
      location: 'الموقع',
      unauthorized: 'ليس لديك صلاحية للوصول لهذه الصفحة',
      goHome: 'العودة للرئيسية',
      approveSuccess: 'تمت الموافقة على القائمة بنجاح',
      rejectSuccess: 'تم رفض القائمة',
      stats: {
        pending: 'في انتظار المراجعة',
        approved: 'موافق عليها اليوم',
        rejected: 'مرفوضة اليوم',
        totalUsers: 'إجمالي المستخدمين'
      }
    }
  };

  const t = content[language];

  useEffect(() => {
    // Load pending listings from localStorage (mock mode)
    const loadPendingListings = () => {
      const stored = localStorage.getItem('merath_pending_listings');
      if (stored) {
        setPendingListings(JSON.parse(stored));
      }
      setIsLoading(false);
    };

    loadPendingListings();
  }, []);

  const handleApprove = (listingId: string) => {
    const listing = pendingListings.find(l => l._id === listingId);
    if (!listing) return;

    // Update status
    const updatedListings = pendingListings.map(l => 
      l._id === listingId ? { ...l, status: 'approved' as const } : l
    );
    setPendingListings(updatedListings);
    localStorage.setItem('merath_pending_listings', JSON.stringify(updatedListings));

    // Add to marketplace listings
    const marketplaceListings = JSON.parse(localStorage.getItem('merath_marketplace_listings') || '[]');
    const newMarketplaceListing = {
      _id: listing._id,
      estateId: listing._id,
      title: listing.title,
      address: listing.address,
      city: listing.city,
      area: 150, // Default
      propertyType: listing.propertyType,
      marketValuation: listing.askPrice * 1.1,
      askPrice: listing.askPrice,
      instantProfit: listing.askPrice * 0.1,
      profitPercentage: 10,
      badge: 'cash-deal',
      timeLeftDays: 30,
      images: listing.images || ['/placeholder.svg'],
      isLocked: false,
      depositRequired: listing.askPrice * 0.1
    };
    marketplaceListings.push(newMarketplaceListing);
    localStorage.setItem('merath_marketplace_listings', JSON.stringify(marketplaceListings));

    toast.success(t.approveSuccess);
  };

  const handleReject = (listingId: string) => {
    const updatedListings = pendingListings.map(l => 
      l._id === listingId ? { ...l, status: 'rejected' as const } : l
    );
    setPendingListings(updatedListings);
    localStorage.setItem('merath_pending_listings', JSON.stringify(updatedListings));
    toast.success(t.rejectSuccess);
  };

  // Check authorization
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-8 pb-8">
              <Shield className="w-16 h-16 mx-auto text-destructive mb-4" />
              <h2 className="text-xl font-bold mb-2">{t.unauthorized}</h2>
              <Button onClick={() => navigate('/')} className="mt-4">
                {t.goHome}
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    );
  }

  const pending = pendingListings.filter(l => l.status === 'pending');
  const approved = pendingListings.filter(l => l.status === 'approved');
  const rejected = pendingListings.filter(l => l.status === 'rejected');

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          </div>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pending.length}</p>
                  <p className="text-sm text-muted-foreground">{t.stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success-green/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{approved.length}</p>
                  <p className="text-sm text-muted-foreground">{t.stats.approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{rejected.length}</p>
                  <p className="text-sm text-muted-foreground">{t.stats.rejected}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {JSON.parse(localStorage.getItem('merath_users') || '[]').length}
                  </p>
                  <p className="text-sm text-muted-foreground">{t.stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listings Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {t.pendingListings} ({pending.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {t.approvedListings} ({approved.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              {t.rejectedListings} ({rejected.length})
            </TabsTrigger>
          </TabsList>

          {['pending', 'approved', 'rejected'].map(status => (
            <TabsContent key={status} value={status}>
              <div className="space-y-4">
                {pendingListings
                  .filter(l => l.status === status)
                  .map(listing => (
                    <Card key={listing._id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Image */}
                          <div className="w-full md:w-48 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={listing.images?.[0] || '/placeholder.svg'} 
                              alt={listing.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-lg">{listing.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {listing.address}, {listing.city}
                                </p>
                              </div>
                              <Badge variant={
                                listing.status === 'pending' ? 'secondary' :
                                listing.status === 'approved' ? 'default' : 'destructive'
                              }>
                                {listing.propertyType}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div>
                                <span className="text-muted-foreground">{t.askPrice}: </span>
                                <span className="font-semibold">{formatEGP(listing.askPrice)}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">{t.submittedBy}: </span>
                                <span className="font-medium">{listing.submittedBy}</span>
                              </div>
                            </div>

                            {status === 'pending' && (
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  onClick={() => handleApprove(listing._id)}
                                  className="bg-success-green hover:bg-success-green/90"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  {t.approve}
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleReject(listing._id)}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  {t.reject}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                {pendingListings.filter(l => l.status === status).length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">{t.noListings}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Admin;