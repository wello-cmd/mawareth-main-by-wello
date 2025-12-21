import { Input } from "@/components/ui/input"; // Input Component
import { Label } from "@/components/ui/label"; // Label Component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Select Components
import { Textarea } from "@/components/ui/textarea"; // Textarea Component
import { useLanguage } from "@/contexts/LanguageContext"; // Language Context
import { translations } from "@/lib/i18n"; // Translations

// Props Interface
interface HeirInfoProps {
  data: {
    numberOfHeirs: string;
    heirRelationships: string; // Description of relationships
    agreementStatus: string; // Status of agreement between heirs
  };
  updateData: (data: any) => void;
}

export const HeirInfo = ({ data, updateData }: HeirInfoProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground mb-4">{t.heirInfoTitle}</h2>
      <div className="space-y-6">
        {/* Number of Heirs Input */}
        <div>
          <Label htmlFor="numberOfHeirs">{t.numberOfHeirs}</Label>
          <Input
            id="numberOfHeirs"
            type="number"
            value={data.numberOfHeirs}
            onChange={(e) => updateData({ numberOfHeirs: e.target.value })}
            placeholder={t.numberOfHeirsPlaceholder}
            className="mt-2"
          />
        </div>

        {/* Relationships Text Area */}
        <div>
          <Label htmlFor="heirRelationships">{t.heirRelationships}</Label>
          <Textarea
            id="heirRelationships"
            value={data.heirRelationships}
            onChange={(e) => updateData({ heirRelationships: e.target.value })}
            placeholder={t.heirRelationshipsPlaceholder}
            className="mt-2"
            rows={4}
          />
        </div>

        {/* Agreement Status Selection */}
        <div>
          <Label htmlFor="agreementStatus">{t.agreementStatus}</Label>
          <Select value={data.agreementStatus} onValueChange={(value) => updateData({ agreementStatus: value })}>
            <SelectTrigger id="agreementStatus" className="mt-2">
              <SelectValue placeholder={t.selectAgreementStatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-agree">{t.allAgree}</SelectItem>
              <SelectItem value="some-disputes">{t.someDisputes}</SelectItem>
              <SelectItem value="major-disputes">{t.majorDisputes}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
