import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { Loader2, User, Briefcase, ShieldCheck } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';

const Auth: React.FC = () => {
  const { language } = useLanguage();
  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    role: 'heir' as 'heir' | 'investor' | 'admin'
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const content = {
    en: {
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Full Name',
      phone: 'Phone Number',
      role: 'I am a...',
      heir: 'Family Heir',
      heirDesc: 'I inherited property',
      investor: 'Investor',
      investorDesc: 'I want to invest',
      admin: 'Administrator',
      adminDesc: 'Manage platform',
      loginBtn: 'Sign In',
      signupBtn: 'Create Account',
      loginDesc: 'Welcome back! Sign in to your account.',
      signupDesc: 'Create your account to get started.',
      passwordMismatch: 'Passwords do not match',
      loginSuccess: 'Welcome back!',
      signupSuccess: 'Account created successfully!',
      loginError: 'Login failed',
      signupError: 'Signup failed'
    },
    ar: {
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      name: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      role: 'أنا...',
      heir: 'وريث عائلة',
      heirDesc: 'ورثت عقاراً',
      investor: 'مستثمر',
      investorDesc: 'أريد الاستثمار',
      admin: 'مسؤول',
      adminDesc: 'إدارة المنصة',
      loginBtn: 'دخول',
      signupBtn: 'إنشاء حساب',
      loginDesc: 'مرحباً بعودتك! سجل دخولك.',
      signupDesc: 'أنشئ حسابك للبدء.',
      passwordMismatch: 'كلمات المرور غير متطابقة',
      loginSuccess: 'مرحباً بعودتك!',
      signupSuccess: 'تم إنشاء الحساب بنجاح!',
      loginError: 'فشل تسجيل الدخول',
      signupError: 'فشل إنشاء الحساب'
    }
  };

  const t = content[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(loginData.email, loginData.password);

    if (result.success) {
      toast({ title: t.loginSuccess });
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } else {
      toast({ title: t.loginError, description: result.error, variant: 'destructive' });
    }

    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast({ title: t.passwordMismatch, variant: 'destructive' });
      return;
    }

    setIsLoading(true);

    const result = await signup({
      email: signupData.email,
      password: signupData.password,
      name: signupData.name,
      phone: signupData.phone,
      role: signupData.role
    });

    if (result.success) {
      toast({ title: t.signupSuccess });
      navigate('/dashboard');
    } else {
      toast({ title: t.signupError, description: result.error, variant: 'destructive' });
    }

    setIsLoading(false);
  };

  const roleOptions = [
    { value: 'heir', label: t.heir, desc: t.heirDesc, icon: User },
    { value: 'investor', label: t.investor, desc: t.investorDesc, icon: Briefcase },
    { value: 'admin', label: t.admin, desc: t.adminDesc, icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md border-border/50 shadow-lg">
          <Tabs defaultValue="login">
            <CardHeader className="pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{t.login}</TabsTrigger>
                <TabsTrigger value="signup">{t.signup}</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="login" className="mt-0">
                <CardTitle className="text-xl mb-2">{t.login}</CardTitle>
                <CardDescription className="mb-6">{t.loginDesc}</CardDescription>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t.email}</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      dir="ltr"
                      className="bg-background"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t.password}</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      dir="ltr"
                      className="bg-background"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t.loginBtn}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-0">
                <CardTitle className="text-xl mb-2">{t.signup}</CardTitle>
                <CardDescription className="mb-6">{t.signupDesc}</CardDescription>
                
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">{t.name}</Label>
                    <Input
                      id="signup-name"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      required
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">{t.email}</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                      dir="ltr"
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">{t.phone}</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                      required
                      dir="ltr"
                      className="bg-background"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t.password}</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      dir="ltr"
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">{t.confirmPassword}</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      required
                      dir="ltr"
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>{t.role}</Label>
                    <RadioGroup
                      value={signupData.role}
                      onValueChange={(value: 'heir' | 'investor' | 'admin') => setSignupData({ ...signupData, role: value })}
                      className="grid grid-cols-3 gap-3"
                    >
                      {roleOptions.map((option) => (
                        <Label
                          key={option.value}
                          htmlFor={`role-${option.value}`}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            signupData.role === option.value 
                              ? 'border-primary bg-primary/5 shadow-sm' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <RadioGroupItem value={option.value} id={`role-${option.value}`} className="sr-only" />
                          <option.icon className={`h-5 w-5 ${signupData.role === option.value ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className="font-medium text-sm">{option.label}</span>
                          <span className="text-[10px] text-muted-foreground text-center leading-tight">{option.desc}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t.signupBtn}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </main>

      <AppFooter />
    </div>
  );
};

export default Auth;
