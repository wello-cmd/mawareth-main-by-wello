import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export const WhatsAppButton = ({ 
  phoneNumber = "+201000000000", 
  message = "Hello, I need help with Mawareth",
  className 
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber.replace(/[^\d]/g, "")}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "w-14 h-14 rounded-full",
        "bg-success-green hover:bg-success-green/90",
        "shadow-strong hover:shadow-medium transition-all",
        "flex items-center justify-center",
        "group",
        className
      )}
      aria-label="WhatsApp Support"
    >
      <MessageCircle className="w-6 h-6 text-white" />
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-card text-foreground text-sm font-medium rounded-lg shadow-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Need Help?
      </span>
    </button>
  );
};
