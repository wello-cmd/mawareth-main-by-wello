import { Input } from "@/components/ui/input"; // Input Component
import { Label } from "@/components/ui/label"; // Label Component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Select Components
import { Checkbox } from "@/components/ui/checkbox"; // Checkbox Component
import { useLanguage } from "@/contexts/LanguageContext"; // Language Context
import { translations } from "@/lib/i18n"; // Translations

// Props Interface
interface EstateDetailsProps {
  data: {
    propertyType: string;
    propertyAddress: string;
    estimatedValue: string;
    hasDocuments: boolean; // Ownership documents availability
  };
  updateData: (data: any) => void;
}

export const EstateDetails = ({ data, updateData }: EstateDetailsProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground mb-4">{t.estateDetailsTitle}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Property Type Selection */}
        <div>
          <Label htmlFor="propertyType">{t.propertyType}</Label>
          <Select value={data.propertyType} onValueChange={(value) => updateData({ propertyType: value })}>
            <SelectTrigger id="propertyType" className="mt-2">
              <SelectValue placeholder={t.selectPropertyType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">{t.apartment}</SelectItem>
              <SelectItem value="villa">{t.villa}</SelectItem>
              <SelectItem value="land">{t.land}</SelectItem>
              <SelectItem value="commercial">{t.commercial}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Estimated Value Input */}
        <div>
          <Label htmlFor="estimatedValue">{t.estimatedValue}</Label>
          <Input
            id="estimatedValue"
            type="number"
            value={data.estimatedValue}
            onChange={(e) => updateData({ estimatedValue: e.target.value })}
            placeholder={t.estimatedValuePlaceholder}
            className="mt-2"
          />
        </div>

        {/* Address Input (Full width) */}
        <div className="md:col-span-2">
          <Label htmlFor="propertyAddress">{t.propertyAddress}</Label>
          <Input
            id="propertyAddress"
            value={data.propertyAddress}
            onChange={(e) => updateData({ propertyAddress: e.target.value })}
            placeholder={t.propertyAddressPlaceholder}
            className="mt-2"
          />
        </div>

        {/* Documents Checkbox */}
        <div className="md:col-span-2 flex items-center space-x-2">
          <Checkbox
            id="hasDocuments"
            checked={data.hasDocuments}
            onCheckedChange={(checked) => updateData({ hasDocuments: checked })}
          />
          <Label htmlFor="hasDocuments" className="cursor-pointer">
            {t.hasOwnershipDocuments}
          </Label>
        </div>
      </div>
    </div>
  );
};
