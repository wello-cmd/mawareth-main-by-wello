import { Card } from "@/components/ui/card"; // Import Card
import { Home, TrendingDown, TrendingUp, Wallet } from "lucide-react"; // Import icons
import { formatEGP } from "@/services/api"; // Import formatter
import { useLanguage } from "@/contexts/LanguageContext"; // Import Language context

// Props
interface LeasingSimulatorProps {
  loanAmount: number;
  monthlyInstallment: number;
  estimatedRent: number;
}

// Component to simulate how rental income affects loan affordability (Ijarah/Leasing model)
export const LeasingSimulator = ({
  loanAmount,
  monthlyInstallment,
  estimatedRent
}: LeasingSimulatorProps) => {
  const { language } = useLanguage();
  // Calculate what the user actually pays after collecting rent
  const netPayment = monthlyInstallment - estimatedRent;

  const content = {
    en: {
      title: "Buyout Affordability Calculator",
      subtitle: "See how rental income helps pay your loan",
      loanAmount: "Buyout Loan Amount",
      installment: "Monthly Loan Installment",
      rental: "Estimated Rental Income",
      netPayment: "You Only Pay",
      perMonth: "/month",
      note: "Mawareth manages the tenant. You own the asset.",
    },
    ar: {
      title: "حاسبة القدرة على الشراء",
      subtitle: "شاهد كيف يساعد دخل الإيجار في سداد قرضك",
      loanAmount: "مبلغ قرض الشراء",
      installment: "القسط الشهري",
      rental: "دخل الإيجار المتوقع",
      netPayment: "تدفع فقط",
      perMonth: "/شهرياً",
      note: "موارث يدير المستأجر. أنت تملك الأصل.",
    },
  };

  const t = content[language]; // Translate

  return (
    <Card className="p-6 shadow-medium bg-card">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Home className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">{t.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">{t.subtitle}</p>

      {/* Loan Principal Display */}
      <div className="p-4 bg-muted rounded-lg mb-4">
        <p className="text-sm text-muted-foreground">{t.loanAmount}</p>
        <p className="text-xl font-bold text-foreground">{formatEGP(loanAmount)}</p>
      </div>

      {/* Cash Flow Breakdown */}
      <div className="space-y-3 mb-6">
        {/* Outflow (Loan Payment) */}
        <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-destructive" />
            <span className="text-sm text-foreground">{t.installment}</span>
          </div>
          <span className="text-lg font-bold text-destructive">
            -{formatEGP(monthlyInstallment)}
          </span>
        </div>

        {/* Inflow (Rental Income) */}
        <div className="flex items-center justify-between p-4 bg-success-green/10 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success-green" />
            <span className="text-sm text-foreground">{t.rental}</span>
          </div>
          <span className="text-lg font-bold text-success-green">
            +{formatEGP(estimatedRent)}
          </span>
        </div>

        {/* Net Flow (User Burden) */}
        <div className="flex items-center justify-between p-6 bg-trust-blue/10 rounded-lg border-2 border-trust-blue/30">
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-trust-blue" />
            <span className="text-base font-semibold text-foreground">{t.netPayment}</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-trust-blue">
              {formatEGP(netPayment)}
            </span>
            <span className="text-sm text-muted-foreground">{t.perMonth}</span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-sm text-muted-foreground italic">
        "{t.note}"
      </p>
    </Card>
  );
};
