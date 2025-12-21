import { Button } from "@/components/ui/button"; // Import Button component
import { Globe } from "lucide-react"; // Import Globe icon
import { useLanguage } from "@/contexts/LanguageContext"; // Import language context hook

// Component to toggle between application languages
export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage(); // Get current language and toggle function

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage}> {/* Button to trigger toggle */}
      <Globe className="w-4 h-4 mr-2" /> {/* Icon */}
      {language === 'en' ? 'العربية' : 'English'} {/* Label based on current language */}
    </Button>
  );
};
