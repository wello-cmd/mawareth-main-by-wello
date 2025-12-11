import { useState, useEffect, forwardRef } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string | number;
  onChange: (value: string) => void;
  currency?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, currency = "EGP", className, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState("");

    // Format number with commas
    const formatNumber = (num: string | number): string => {
      const cleanNum = String(num).replace(/[^\d]/g, "");
      if (!cleanNum) return "";
      return new Intl.NumberFormat('en-EG').format(parseInt(cleanNum, 10));
    };

    // Parse formatted string back to raw number
    const parseNumber = (formatted: string): string => {
      return formatted.replace(/[^\d]/g, "");
    };

    useEffect(() => {
      setDisplayValue(formatNumber(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = parseNumber(e.target.value);
      setDisplayValue(formatNumber(rawValue));
      onChange(rawValue);
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          className={cn("pr-14 text-lg h-12", className)}
          {...props}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
          {currency}
        </span>
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";
