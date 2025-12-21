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
  Eye,
  Trash2,
  UserCheck,
  UserX,
  UserCog,
  User
} from 'lucide-react';
import { formatEGP, api } from '@/services/api';
import { AuthUser } from '@/types/models';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const { user: currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  const [pendingListings, setPendingListings] = useState<PendingListing[]>([]);
  const [users, setUsers] = useState<AuthUser[]>([]);
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
      },
      promotedSuccess: "User Promoted Successfully",
      loading: "Loading Dashboard...",
      usersTab: 'Users',
      usersList: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
        joined: 'Joined',
        status: 'Status',
        actions: 'Actions',
        verified: 'Verified',
        unverified: 'Unverified',
        delete: 'Delete User',
        promote: 'Make Moderator',
        demote: 'Remove Role',
        noUsers: 'No users found',
        deleteConfirm: 'User deleted successfully',
        promoteConfirm: 'User promoted to Moderator',
        demoteConfirm: 'User role updated to Heir'
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
      },
      usersTab: 'المستخدمين',
      promotedSuccess: "تمت ترقية المستخدم بنجاح",
      loading: "جاري تحميل اللوحة...",
      usersList: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        role: 'الدور',
        joined: 'تاريخ الانضمام',
        status: 'الحالة',
        actions: 'إجراءات',
        verified: 'موثق',
        unverified: 'غير موثق',
        delete: 'حذف المستخدم',
        promote: 'تعيين مشرف',
        demote: 'إزالة الصلاحية',
        noUsers: 'لا يوجد مستخدمين',
        deleteConfirm: 'تم حذف المستخدم بنجاح',
        promoteConfirm: 'تم تعيين المستخدم كمشرف',
        demoteConfirm: 'تم تحديث دور المستخدم إلى وريث'
      }
    }
  };

  const t = content[language];

  // Load data from Backend (Live Mode)
  const loadData = async () => {
    setIsLoading(true);
    try {
      const listings = await api.marketplace.getAll();

      const estates = await api.estates.getAll();
      const usersData = await api.users.getAll();
      setUsers(usersData);

      const joinedListings = listings.map(l => {
        const estate = estates.find(e => e._id === (l.estateId as any) || e._id === l.estateId);
        return {
          _id: l._id,
          title: estate?.title || (l as any).title || 'Untitled Listing',
          address: estate?.address || 'Unknown Address',
          city: estate?.city || 'Cairo',
          propertyType: estate?.propertyType || 'Property',
          askPrice: l.startingBid || 0,
          submittedBy: 'System',
          submittedAt: new Date().toISOString(),
          status: (l.status === 'pending_review' ? 'pending' : l.status === 'active' ? 'approved' : (l.status as any)) as any,
          images: estate?.images || []
        };
      });

      setPendingListings(joinedListings);

    } catch (e) {
      console.error("Failed to load admin data", e);
      toast.error("Failed to load data from server");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (listingId: string) => {
    try {
      await api.marketplace.updateStatus(listingId, 'active');
      toast.success(t.approveSuccess || "Listing Approved");
      loadData();
    } catch (e: any) {
      toast.error(e.message || "Failed to approve listing");
    }
  };

  const handleReject = async (listingId: string) => {
    try {
      await api.marketplace.updateStatus(listingId, 'rejected');
      toast.success(t.rejectSuccess || "Listing Rejected");
      loadData();
    } catch (e: any) {
      toast.error(e.message || "Failed to reject listing");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to reject/delete this user?")) return;
    try {
      await api.users.delete(userId);
      toast.success("User Rejected/Deleted");
      loadData();
    } catch (e: any) {
      toast.error(e.message || "Failed to delete user");
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      await api.users.updateRole(userId, newRole);
      setUsers(prev => prev.map(u =>
        u._id === userId ? { ...u, role: newRole as any } : u
      ));
      toast.success(`User role updated to ${newRole}`);
    } catch (e) {
      toast.error("Failed to update role");
    }
  };

  const handleApproveUser = async (userId: string) => {
    try {
      await api.users.approve(userId);
      toast.success(t.promotedSuccess || "User Approved");
      loadData(); // Reload
    } catch (e: any) {
      toast.error(e.message || "Failed to approve user");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">{t.loading}</div>;
  }

  // Check authorization
  const allowedRoles = ['admin', 'super_admin', 'moderator'];
  if (!isAuthenticated || !currentUser || !allowedRoles.includes(currentUser.role)) {
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

  const pendingUsers = users.filter(u => !u.isVerified);
  const activeUsers = users.filter(u => u.isVerified);

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

          {/* Only Super Admin/Admin sees Users stats */}
          {['admin', 'super_admin'].includes(currentUser?.role || '') && (
            <>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {activeUsers.length}
                      </p>
                      <p className="text-sm text-muted-foreground">{t.stats.totalUsers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <UserCog className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{pendingUsers.length}</p>
                      <p className="text-sm text-muted-foreground">Pending Requests</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
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

            {/* Limit Users tab to Admins only */}
            {['admin', 'super_admin'].includes(currentUser?.role || '') && (
              <>
                <TabsTrigger value="requests" className="flex items-center gap-2">
                  <UserCog className="w-4 h-4" />
                  Role Requests ({pendingUsers.length})
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {t.usersTab} ({activeUsers.length})
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {['pending', 'approved', 'rejected'].map(status => (
            <TabsContent key={status} value={status}>
              <div className="space-y-4">
                {pendingListings
                  .filter(l => l.status === status)
                  .map(listing => (
                    <Card key={listing._id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <img
                              src={listing.images?.[0] || '/placeholder.svg'}
                              alt={listing.title}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg">{listing.title}</h3>
                                <div className="text-sm text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                                  {listing.propertyType}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {listing.address}, {listing.city}
                              </p>
                              <div className="flex gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Submitted by: </span>
                                  <span className="font-medium">{listing.submittedBy}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Date: </span>
                                  <span className="font-medium">
                                    {new Date(listing.submittedAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Ask Price: </span>
                                  <span className="font-medium text-primary">
                                    {formatEGP(listing.askPrice)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {status === 'pending' && (
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleApprove(listing._id)}
                                className="bg-success-green hover:bg-success-green/90"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {t.approve}
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleReject(listing._id)}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                {t.reject}
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {pendingListings.filter(l => l.status === status).length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No {status} listings found
                  </div>
                )}
              </div>
            </TabsContent>
          ))}

          <TabsContent value="requests">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Role Requests</CardTitle>
                  <CardDescription>Users waiting for admin approval</CardDescription>
                </CardHeader>
                <CardContent>
                  {pendingUsers.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <UserCheck className="w-12 h-12 mx-auto mb-2 opacity-20" />
                      <p>No pending role requests</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingUsers.map(user => (
                        <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-muted rounded-full">
                              <User className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{user.name}</h4>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <Badge variant="outline" className="mt-1">{user.role}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => handleApproveUser(user._id)}
                              className="bg-success-green hover:bg-success-green/90"
                              size="sm"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteUser(user._id)}
                              size="sm"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t.usersTab}</CardTitle>
                  <CardDescription>{t.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-start py-3 px-4">{t.usersList.name}</th>
                          <th className="text-start py-3 px-4">{t.usersList.email}</th>
                          <th className="text-start py-3 px-4">{t.usersList.role}</th>
                          <th className="text-start py-3 px-4">{t.usersList.status}</th>
                          <th className="text-start py-3 px-4">{t.usersList.joined}</th>
                          <th className="text-end py-3 px-4">{t.usersList.actions}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(targetUser => (
                          <tr key={targetUser._id} className="border-b last:border-0 hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{targetUser.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{targetUser.email}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline">{targetUser.role}</Badge>
                            </td>
                            <td className="py-3 px-4">
                              {targetUser.isVerified ? (
                                <Badge variant="default" className="bg-success-green flex w-fit items-center gap-1">
                                  <UserCheck className="w-3 h-3" /> {t.usersList.verified}
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="flex w-fit items-center gap-1">
                                  <UserX className="w-3 h-3" /> {t.usersList.unverified}
                                </Badge>
                              )}
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {new Date(targetUser.createdAt || Date.now()).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-end">
                              <div className="flex justify-end gap-2 items-center">
                                <Select
                                  defaultValue={targetUser.role}
                                  onValueChange={(value) => handleUpdateRole(targetUser._id, value as any)}
                                  disabled={targetUser.role === 'super_admin' || targetUser._id === currentUser?._id}
                                >
                                  <SelectTrigger className="w-[110px] h-8 text-xs">
                                    <SelectValue placeholder="Role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="heir">Heir</SelectItem>
                                    <SelectItem value="investor">Investor</SelectItem>
                                    <SelectItem value="moderator">Moderator</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteUser(targetUser._id)}
                                  title={t.usersList.delete}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {users.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-2 opacity-20" />
                      <p>{t.usersList.noUsers}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Admin;