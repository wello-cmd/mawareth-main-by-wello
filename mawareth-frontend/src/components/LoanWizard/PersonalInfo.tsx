import { Input } from "@/components/ui/input"; // Input Component
import { Label } from "@/components/ui/label"; // Label Component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Select Components
import { useLanguage } from "@/contexts/LanguageContext"; // Language Context
import { translations } from "@/lib/i18n"; // Translations

// Props Interface
interface PersonalInfoProps {
  data: {
    fullName: string;
    nationalId: string;
    phone: string;
    email: string;
    address: string;
    employmentStatus: string;
    monthlyIncome: string;
  };
  updateData: (data: any) => void;
}

export const PersonalInfo = ({ data, updateData }: PersonalInfoProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground mb-4">{t.personalInfoTitle}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName">{t.fullName}</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            placeholder={t.fullNamePlaceholder}
            className="mt-2"
          />
        </div>

        {/* National ID */}
        <div>
          <Label htmlFor="nationalId">{t.nationalId}</Label>
          <Input
            id="nationalId"
            value={data.nationalId}
            onChange={(e) => updateData({ nationalId: e.target.value })}
            placeholder={t.nationalIdPlaceholder}
            className="mt-2"
          />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone">{t.phone}</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            placeholder={t.phonePlaceholder}
            className="mt-2"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">{t.email}</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder={t.emailPlaceholder}
            className="mt-2"
          />
        </div>

        {/* Address (Full Width) */}
        <div className="md:col-span-2">
          <Label htmlFor="address">{t.address}</Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder={t.addressPlaceholder}
            className="mt-2"
          />
        </div>

        {/* Employment Status */}
        <div>
          <Label htmlFor="employmentStatus">{t.employmentStatus}</Label>
          <Select value={data.employmentStatus} onValueChange={(value) => updateData({ employmentStatus: value })}>
            <SelectTrigger id="employmentStatus" className="mt-2">
              <SelectValue placeholder={t.selectEmployment} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employed">{t.employed}</SelectItem>
              <SelectItem value="self-employed">{t.selfEmployed}</SelectItem>
              <SelectItem value="unemployed">{t.unemployed}</SelectItem>
              <SelectItem value="retired">{t.retired}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Monthly Income */}
        <div>
          <Label htmlFor="monthlyIncome">{t.monthlyIncome}</Label>
          <Input
            id="monthlyIncome"
            type="number"
            value={data.monthlyIncome}
            onChange={(e) => updateData({ monthlyIncome: e.target.value })}
            placeholder={t.monthlyIncomePlaceholder}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};
