import { Building2 } from "lucide-react"; // Import icon
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { useLanguage } from "@/contexts/LanguageContext"; // Import language context

// Application Footer Component
export const AppFooter = () => {
  const navigate = useNavigate(); // Navigation function
  const { language } = useLanguage(); // Current language

  // Define footer navigation links
  const footerLinks = [
    { path: "/about", labelEn: "About", labelAr: "عن موارث" },
    { path: "/faq", labelEn: "FAQ", labelAr: "الأسئلة الشائعة" },
    { path: "/contact", labelEn: "Contact", labelAr: "تواصل معنا" },
  ];

  return (
    <footer className="border-t border-border bg-card"> {/* Footer container with top border and background */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <span className="text-xl font-bold text-foreground">Mawareth</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              {language === 'ar'
                ? 'نساعد العائلات المصرية على حل نزاعات الميراث العقاري بطريقة متوافقة مع الشريعة.'
                : 'Helping Egyptian families resolve real estate inheritance disputes in a Sharia-compliant way.'}
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  {language === 'ar' ? link.labelAr : link.labelEn}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === 'ar' ? 'تواصل معنا' : 'Contact'}
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>support@mawareth.com</p>
              <p>+20 100 000 0000</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Mawareth. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <button className="hover:text-foreground transition-colors">
              {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </button>
            <button className="hover:text-foreground transition-colors">
              {language === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
