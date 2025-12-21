import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CurrencyInput } from '@/components/ui/CurrencyInput';
import { toast } from 'sonner';
import { Upload, Building2, MapPin, DollarSign, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const SubmitListing: React.FC = () => {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    propertyType: '',
    askPrice: '',
    area: '',
    description: '',
    images: [] as string[]
  });

  const content = {
    en: {
      title: 'Submit Property Listing',
      subtitle: 'List your inherited property on the marketplace. All listings require admin approval.',
      propertyDetails: 'Property Details',
      propertyTitle: 'Property Title',
      propertyTitlePlaceholder: 'e.g., Family Villa in Maadi',
      address: 'Address',
      addressPlaceholder: 'Street address',
      city: 'City',
      cityPlaceholder: 'Select city',
      propertyType: 'Property Type',
      askPrice: 'Asking Price (EGP)',
      area: 'Area (m²)',
      description: 'Description',
      descriptionPlaceholder: 'Describe the property, its features, and any relevant details...',
      images: 'Property Images',
      uploadImages: 'Upload Images',
      submit: 'Submit for Review',
      submitting: 'Submitting...',
      loginRequired: 'Please login to submit a listing',
      login: 'Login',
      successTitle: 'Listing Submitted!',
      successMessage: 'Your listing has been submitted for admin review. You will be notified once it is approved.',
      errorMessage: 'Please fill in all required fields',
      cities: ['Cairo', 'Alexandria', 'Giza', 'Sharm El Sheikh', 'Hurghada', 'Luxor', 'Aswan', 'Mansoura'],
      propertyTypes: [
        { value: 'apartment', label: 'Apartment' },
        { value: 'villa', label: 'Villa' },
        { value: 'land', label: 'Land' },
        { value: 'commercial', label: 'Commercial' }
      ]
    },
    ar: {
      title: 'تقديم عقار للبيع',
      subtitle: 'اعرض عقارك الموروث في السوق. جميع القوائم تتطلب موافقة الإدارة.',
      propertyDetails: 'تفاصيل العقار',
      propertyTitle: 'عنوان العقار',
      propertyTitlePlaceholder: 'مثال: فيلا عائلية في المعادي',
      address: 'العنوان',
      addressPlaceholder: 'عنوان الشارع',
      city: 'المدينة',
      cityPlaceholder: 'اختر المدينة',
      propertyType: 'نوع العقار',
      askPrice: 'السعر المطلوب (جنيه)',
      area: 'المساحة (م²)',
      description: 'الوصف',
      descriptionPlaceholder: 'صف العقار وميزاته وأي تفاصيل ذات صلة...',
      images: 'صور العقار',
      uploadImages: 'رفع الصور',
      submit: 'تقديم للمراجعة',
      submitting: 'جاري التقديم...',
      loginRequired: 'يرجى تسجيل الدخول لتقديم عقار',
      login: 'تسجيل الدخول',
      successTitle: 'تم تقديم العقار!',
      successMessage: 'تم تقديم عقارك للمراجعة من قبل الإدارة. سيتم إعلامك عند الموافقة عليه.',
      errorMessage: 'يرجى ملء جميع الحقول المطلوبة',
      cities: ['القاهرة', 'الإسكندرية', 'الجيزة', 'شرم الشيخ', 'الغردقة', 'الأقصر', 'أسوان', 'المنصورة'],
      propertyTypes: [
        { value: 'apartment', label: 'شقة' },
        { value: 'villa', label: 'فيلا' },
        { value: 'land', label: 'أرض' },
        { value: 'commercial', label: 'تجاري' }
      ]
    }
  };

  const t = content[language];

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.address || !formData.city || !formData.propertyType || !formData.askPrice) {
      toast.error(t.errorMessage);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newListing = {
      _id: generateId(),
      title: formData.title,
      address: formData.address,
      city: formData.city,
      propertyType: formData.propertyType,
      askPrice: parseInt(formData.askPrice),
      area: parseInt(formData.area) || 0,
      description: formData.description,
      images: formData.images.length > 0 ? formData.images : ['/placeholder.svg'],
      submittedBy: user?.name || 'Unknown',
      submittedAt: new Date().toISOString(),
      status: 'pending' as const
    };

    // Save to localStorage
    const existingListings = JSON.parse(localStorage.getItem('merath_pending_listings') || '[]');
    existingListings.push(newListing);
    localStorage.setItem('merath_pending_listings', JSON.stringify(existingListings));

    setIsSubmitting(false);
    toast.success(t.successTitle, { description: t.successMessage });
    navigate('/marketplace');
  };

  if (!isAuthenticated) {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-8 pb-8">
              <AlertCircle className="w-16 h-16 mx-auto text-warning mb-4" />
              <h2 className="text-xl font-bold mb-2">{t.loginRequired}</h2>
              <Button onClick={() => navigate('/auth')} className="mt-4">
                {t.login}
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {t.propertyDetails}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">{t.propertyTitle} *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder={t.propertyTitlePlaceholder}
                    required
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">{t.address} *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder={t.addressPlaceholder}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* City & Property Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t.city} *</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => setFormData({ ...formData, city: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.cityPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {t.cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t.propertyType} *</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.propertyType} />
                      </SelectTrigger>
                      <SelectContent>
                        {t.propertyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price & Area */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t.askPrice} *</Label>
                    <CurrencyInput
                      value={formData.askPrice}
                      onChange={(value) => setFormData({ ...formData, askPrice: value })}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.area}</Label>
                    <Input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="150"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">{t.description}</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={t.descriptionPlaceholder}
                    rows={4}
                  />
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  className="w-full h-12" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      {t.submitting}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {t.submit}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default SubmitListing;