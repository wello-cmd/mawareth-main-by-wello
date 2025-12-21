import { useState, useEffect, forwardRef } from "react"; // React hooks
import { Input } from "./input"; // Base Input component
import { cn } from "@/lib/utils"; // Utility for class names

// Props Interface
interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string | number; // Raw numeric value
  onChange: (value: string) => void; // Handler for raw value changes
  currency?: string; // Currency symbol (default EGP)
}

// Input component that formats numbers with commas as currency (e.g. 1,000,000)
export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, currency = "EGP", className, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(""); // Formatted value for display

    // Format number with commas for visual display
    const formatNumber = (num: string | number): string => {
      const cleanNum = String(num).replace(/[^\d]/g, ""); // Remove non-digits
      if (!cleanNum) return "";
      // Use standard locale formatter
      return new Intl.NumberFormat('en-EG').format(parseInt(cleanNum, 10));
    };

    // Parse formatted string back to raw number string for state
    const parseNumber = (formatted: string): string => {
      return formatted.replace(/[^\d]/g, "");
    };

    // Update display value when external value prop changes
    useEffect(() => {
      setDisplayValue(formatNumber(value));
    }, [value]);

    // Handle user input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = parseNumber(e.target.value);
      setDisplayValue(formatNumber(rawValue)); // Update UI immediately
      onChange(rawValue); // Send raw value up
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          type="text"
          inputMode="numeric" // Mobile keyboard optimization
          value={displayValue}
          onChange={handleChange}
          className={cn("pr-14 text-lg h-12", className)} // extra padding for currency suffix
          {...props}
        />
        {/* Currency Suffix */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
          {currency}
        </span>
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";
