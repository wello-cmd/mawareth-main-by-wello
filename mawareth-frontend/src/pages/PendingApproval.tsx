import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, LogOut } from 'lucide-react';

const PendingApproval: React.FC = () => {
    const { language } = useLanguage();
    const { logout, user } = useAuth();

    const t = {
        en: {
            title: "Account Pending Approval",
            description: "Your account is currently under review by our administrators.",
            message: `Hello ${user?.name}, thank you for registering as a ${user?.role}.`,
            instruction: "You will receive full access once your identity and role have been verified.",
            contact: "If you believe this is an error, please contact support.",
            logout: "Sign Out"
        },
        ar: {
            title: "الحساب قيد المراجعة",
            description: "حسابك قيد المراجعة حالياً من قبل الإدارة.",
            message: `مرحباً ${user?.name}، شكراً لتسجيلك كـ ${user?.role === 'admin' ? 'مسؤول' : user?.role === 'moderator' ? 'مشرف' : user?.role}.`,
            instruction: "ستحصل على الصلاحيات الكاملة بمجرد التحقق من هويتك ودورك.",
            contact: "إذا كنت تعتقد أن هناك خطأ، يرجى الاتصال بالدعم.",
            logout: "تسجيل الخروج"
        }
    }[language];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <Card className="max-w-md w-full shadow-lg border-2 border-amber-200">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                        <ShieldAlert className="w-8 h-8 text-amber-600" />
                    </div>
                    <CardTitle className="text-2xl text-amber-800">{t.title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                        {t.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 text-sm text-amber-900">
                        <p className="font-semibold mb-1">{t.message}</p>
                        <p>{t.instruction}</p>
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                        {t.contact}
                    </p>
                    <Button
                        onClick={logout}
                        variant="outline"
                        className="w-full border-amber-200 hover:bg-amber-50 text-amber-900"
                    >
                        <LogOut className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                        {t.logout}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default PendingApproval;
