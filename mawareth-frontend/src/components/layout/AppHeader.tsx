import { Building2, Menu, X, User, LogOut, Shield } from "lucide-react"; // Import icons
import { useState } from "react"; // Import React state hook
import { useNavigate, useLocation } from "react-router-dom"; // Import Router hooks
import { Button } from "@/components/ui/button"; // Import Button component
import { LanguageToggle } from "@/components/common/LanguageToggle"; // Import language toggle
import { useLanguage } from "@/contexts/LanguageContext"; // Import language context
import { useAuth } from "@/contexts/AuthContext"; // Import auth context
import { cn } from "@/lib/utils"; // Import class utility
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import dropdown menu components

// Application Header Component
export const AppHeader = () => {
  const navigate = useNavigate(); // Navigation hook
  const location = useLocation(); // Location hook
  const { language } = useLanguage(); // Current language
  const { user, isAuthenticated, logout } = useAuth(); // Auth state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu state

  // Navigation items configuration
  const navItems = [
    { path: "/calculator", labelEn: "Calculator", labelAr: "الحاسبة" },
    { path: "/marketplace", labelEn: "Marketplace", labelAr: "السوق" },
    { path: "/merath-docs", labelEn: "Docs", labelAr: "المستندات" },
    { path: "/dashboard", labelEn: "Dashboard", labelAr: "لوحة التحكم" },
  ];

  const isActive = (path: string) => location.pathname === path; // Check if path is active
  const isAdmin = ['admin', 'super_admin', 'moderator'].includes(user?.role || ''); // Check if user is admin

  const handleLogout = () => {
    logout(); // Perform logout
    navigate('/'); // Redirect to home
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-soft">
              <Building2 className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
            </div>
            <span className="text-xl font-bold text-foreground">Mawareth</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-primary/10 text-primary" // Active style
                    : "text-muted-foreground hover:text-foreground hover:bg-muted" // Inactive style
                )}
              >
                {language === 'ar' ? item.labelAr : item.labelEn}
              </button>
            ))}
            {isAdmin && ( // Admin Panel Link
              <button
                onClick={() => navigate('/admin')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1",
                  isActive('/admin')
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Shield className="w-4 h-4" />
                {language === 'ar' ? 'الإدارة' : 'Admin'}
              </button>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle /> {/* Language Switcher */}

            {isAuthenticated && user ? (
              // Authenticated User Menu
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="hidden sm:flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    {isAdmin && <Shield className="w-3 h-3 text-primary" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <Shield className="w-4 h-4 mr-2" />
                      {language === 'ar' ? 'لوحة الإدارة' : 'Admin Panel'}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Guest Login Button
              <Button
                onClick={() => navigate('/auth')}
                className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground h-10"
              >
                {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
              </Button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {language === 'ar' ? item.labelAr : item.labelEn}
                </button>
              ))}
              {isAdmin && (
                <button
                  onClick={() => {
                    navigate('/admin');
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left flex items-center gap-2",
                    isActive('/admin')
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Shield className="w-4 h-4" />
                  {language === 'ar' ? 'الإدارة' : 'Admin'}
                </button>
              )}
              {isAuthenticated ? (
                <Button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="mt-2 h-12"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navigate('/auth');
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground h-12"
                >
                  {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};