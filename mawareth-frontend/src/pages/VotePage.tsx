import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Home, Building2, MapPin, DollarSign } from 'lucide-react';
import { api, formatEGP } from '@/services/api';
import { Estate } from '@/types/models';

const VotePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { language } = useLanguage();
    const navigate = useNavigate();
    const [estate, setEstate] = useState<Estate | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasVoted, setHasVoted] = useState(false);
    const [nationalId, setNationalId] = useState('');

    const content = {
        en: {
            title: 'Estate Voting Request',
            subtitle: 'You have been invited to vote on the sale of this property.',
            loading: 'Loading estate details...',
            notFound: 'Estate not found or link expired.',
            details: 'Property Details',
            marketValue: 'Market Valuation',
            askPrice: 'Asking Price',
            yourVote: 'Your Vote',
            agree: 'I Agree to Sell',
            disagree: 'I Disagree',
            verify: 'Verify Identity',
            enterId: 'Enter National ID to confirming vote',
            voteSuccess: 'Your vote has been recorded successfully.',
            alreadyVoted: 'You have already voted on this estate.',
            backHome: 'Go to Home Page',
            confirmVote: 'Confirm Vote'
        },
        ar: {
            title: 'طلب تصويت على عقار',
            subtitle: 'تمت دعوتك للتصويت على بيع هذا العقار.',
            loading: 'جاري تحميل تفاصيل العقار...',
            notFound: 'العقار غير موجود أو الرابط منتهي.',
            details: 'تفاصيل العقار',
            marketValue: 'التقييم السوقي',
            askPrice: 'السعر المطلوب',
            yourVote: 'تصويتك',
            agree: 'أوافق على البيع',
            disagree: 'لا أوافق',
            verify: 'تحقق من الهوية',
            enterId: 'أدخل الرقم القومي لتأكيد التصويت',
            voteSuccess: 'تم تسجيل تصويتك بنجاح.',
            alreadyVoted: 'لقد قمت بالتصويت مسبقاً على هذا العقار.',
            backHome: 'الذهاب للصفحة الرئيسية',
            confirmVote: 'تأكيد التصويت'
        }
    };

    const t = content[language];

    useEffect(() => {
        const loadEstate = async () => {
            if (!id) return;
            // Simulate fetching by "token" (using ID for consistency in mock)
            const data = await api.estates.getById(id);
            if (data) {
                setEstate(data);
            }
            setIsLoading(false);
        };
        loadEstate();
    }, [id]);

    const handleVote = async (vote: 'agree' | 'disagree') => {
        if (!nationalId || nationalId.length < 14) {
            toast.error(language === 'en' ? 'Please enter a valid National ID' : 'يرجى إدخال رقم قومي صحيح');
            return;
        }

        try {
            // Call real backend endpoint
            await api.estates.updateVote(id!, { nationalId, vote });
            setHasVoted(true);
            toast.success(t.voteSuccess);
        } catch (error: any) {
            toast.error(error.message || 'Verification Failed');
        }
    };

    if (isLoading) {
        return (
            <PageContainer>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <p className="text-muted-foreground animate-pulse">{t.loading}</p>
                </div>
            </PageContainer>
        );
    }

    if (!estate) {
        return (
            <PageContainer>
                <div className="container mx-auto px-4 py-16 text-center">
                    <XCircle className="w-16 h-16 mx-auto text-destructive mb-4" />
                    <h2 className="text-xl font-bold mb-4">{t.notFound}</h2>
                    <Button onClick={() => navigate('/')}>{t.backHome}</Button>
                </div>
            </PageContainer>
        );
    }

    if (hasVoted) {
        return (
            <PageContainer>
                <div className="container mx-auto px-4 py-16 text-center">
                    <Card className="max-w-md mx-auto">
                        <CardContent className="pt-8 pb-8">
                            <CheckCircle className="w-16 h-16 mx-auto text-success-green mb-4" />
                            <h2 className="text-xl font-bold mb-2">{t.voteSuccess}</h2>
                            <p className="text-muted-foreground mb-6">{t.subtitle}</p>
                            <Button onClick={() => navigate('/')} variant="outline">
                                {t.backHome}
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
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
                        <p className="text-muted-foreground">{t.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Property Card */}
                        <Card>
                            <div className="aspect-video bg-muted relative">
                                <img
                                    src={estate.images?.[0] || '/placeholder.svg'}
                                    alt={estate.title}
                                    className="w-full h-full object-cover rounded-t-lg"
                                />
                                <Badge className="absolute top-2 right-2 bg-background/80 text-foreground backdrop-blur-sm">
                                    {estate.propertyType}
                                </Badge>
                            </div>
                            <CardHeader>
                                <CardTitle>{estate.title}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {estate.address}, {estate.city}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                    <span className="text-sm text-muted-foreground">{t.marketValue}</span>
                                    <span className="font-semibold">{formatEGP(estate.marketValuation)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg border border-primary/20">
                                    <span className="text-sm font-medium text-primary">{t.askPrice}</span>
                                    <span className="font-bold text-lg text-primary">{formatEGP(estate.solhAskPrice)}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Voting Action */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t.yourVote}</CardTitle>
                                <CardDescription>{t.verify}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t.enterId}</label>
                                    <input
                                        type="text"
                                        placeholder="Example: 2950101..."
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={nationalId}
                                        onChange={(e) => setNationalId(e.target.value)}
                                    />
                                </div>

                                <div className="grid gap-3">
                                    <Button
                                        className="w-full bg-success-green hover:bg-success-green/90 h-12 text-lg"
                                        onClick={() => handleVote('agree')}
                                    >
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        {t.agree}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full h-12 text-lg border-destructive text-destructive hover:bg-destructive/10"
                                        onClick={() => handleVote('disagree')}
                                    >
                                        <XCircle className="w-5 h-5 mr-2" />
                                        {t.disagree}
                                    </Button>
                                </div>

                                <div className="p-4 bg-muted rounded-lg text-xs text-muted-foreground">
                                    <p>
                                        {language === 'en'
                                            ? "By clicking agree, you authorize the sale of your share in this property at the listed price. This action is legally binding once confirmed."
                                            : "بالضغط على موافق، فإنك تفوض بيع حصتك في هذا العقار بالسعر المعلن. هذا الإجراء ملزم قانونياً بمجرد التأكيد."
                                        }
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default VotePage;
