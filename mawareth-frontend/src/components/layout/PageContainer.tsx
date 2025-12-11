import { ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";

interface PageContainerProps {
  children: ReactNode;
  showWhatsApp?: boolean;
}

export const PageContainer = ({ children, showWhatsApp = true }: PageContainerProps) => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        {children}
      </main>
      <AppFooter />
      {showWhatsApp && (
        <WhatsAppButton 
          message={language === 'ar' ? 'مرحباً، أحتاج مساعدة مع موارث' : 'Hello, I need help with Mawareth'}
        />
      )}
    </div>
  );
};
