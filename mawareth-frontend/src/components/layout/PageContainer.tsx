import { ReactNode } from "react"; // Import types
import { AppHeader } from "./AppHeader"; // Import header
import { AppFooter } from "./AppFooter"; // Import footer
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"; // Import WhatsApp button
import { useLanguage } from "@/contexts/LanguageContext"; // Import language context

// Props interface
interface PageContainerProps {
  children: ReactNode; // Page content
  showWhatsApp?: boolean; // Flag to show/hide WhatsApp button
}

// Layout container for pages
export const PageContainer = ({ children, showWhatsApp = true }: PageContainerProps) => {
  const { language } = useLanguage(); // Get language

  return (
    <div className="min-h-screen flex flex-col bg-background"> {/* Full screen flex container */}
      <AppHeader /> {/* Fixed Header */}
      <main className="flex-1"> {/* Main content area that grows */}
        {children}
      </main>
      <AppFooter /> {/* Footer */}
      {showWhatsApp && ( // Conditionally render WhatsApp floating button
        <WhatsAppButton
          message={language === 'ar' ? 'مرحباً، أحتاج مساعدة مع موارث' : 'Hello, I need help with Mawareth'}
        />
      )}
    </div>
  );
};
