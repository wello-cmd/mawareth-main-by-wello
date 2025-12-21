import { MessageCircle } from "lucide-react"; // Icon
import { cn } from "@/lib/utils"; // Utility

// Props Interface
interface WhatsAppButtonProps {
  phoneNumber?: string; // Target phone number (international format)
  message?: string; // Pre-filled message
  className?: string; // Custom classes
}

// Floating action button for instant WhatsApp support
export const WhatsAppButton = ({
  phoneNumber = "+201000000000",
  message = "Hello, I need help with Mawareth",
  className
}: WhatsAppButtonProps) => {
  // Construct WhatsApp URL and open in new tab
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber.replace(/[^\d]/g, "")}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed bottom-6 right-6 z-50", // Fixed positioning
        "w-14 h-14 rounded-full", // Circular shape
        "bg-success-green hover:bg-success-green/90", // WhatsApp brand color
        "shadow-strong hover:shadow-medium transition-all", // Depth effects
        "flex items-center justify-center", // Center icon
        "group", // Enable group hover for tooltip
        className
      )}
      aria-label="WhatsApp Support"
    >
      <MessageCircle className="w-6 h-6 text-white" />
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-card text-foreground text-sm font-medium rounded-lg shadow-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Need Help?
      </span>
    </button>
  );
};
