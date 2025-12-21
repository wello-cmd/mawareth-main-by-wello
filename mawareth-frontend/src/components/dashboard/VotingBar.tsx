import { Progress } from "@/components/ui/progress"; // Import Progress
import { CheckCircle, XCircle, Clock, Users } from "lucide-react"; // Import Icons
import { Estate } from "@/types/models"; // Import Estate Type
import { calculateConsensus } from "@/services/api"; // Import Helper
import { useLanguage } from "@/contexts/LanguageContext"; // Import Language

// Props
interface VotingBarProps {
  estate: Estate; // The estate object being voted on
}

// Component to visualize voting distribution (Sell vs Keep)
export const VotingBar = ({ estate }: VotingBarProps) => {
  const { language } = useLanguage();

  // Count votes by type
  const sellVotes = estate.heirs.filter(h => h.vote === 'sell').length;
  const keepVotes = estate.heirs.filter(h => h.vote === 'keep').length;
  const pendingVotes = estate.heirs.filter(h => h.vote === 'pending').length;
  const totalHeirs = estate.heirs.length;
  // Calculate raw percentages
  const sellPercentage = calculateConsensus(estate, 'sell');
  const keepPercentage = calculateConsensus(estate, 'keep');

  const content = {
    en: {
      title: "Family Consensus",
      sellLabel: "Want to Sell",
      keepLabel: "Want to Keep",
      pendingLabel: "Pending",
      heirs: "heirs",
      consensusReached: "Consensus reached to sell!",
      needsMore: `${Math.ceil(totalHeirs / 2) + 1 - sellVotes} more votes needed to sell`,
    },
    ar: {
      title: "إجماع العائلة",
      sellLabel: "يريدون البيع",
      keepLabel: "يريدون الاحتفاظ",
      pendingLabel: "معلق",
      heirs: "ورثة",
      consensusReached: "تم التوصل لإجماع على البيع!",
      needsMore: `${Math.ceil(totalHeirs / 2) + 1 - sellVotes} صوت آخر مطلوب للبيع`,
    },
  };

  const t = content[language]; // Translate
  // Check if majority (>50%) reached for selling
  const hasMajority = sellVotes > totalHeirs / 2;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald" />
          {t.title}
        </h3>
        <span className="text-sm text-muted-foreground">
          {totalHeirs} {t.heirs}
        </span>
      </div>

      {/* Multi-colored Progress Bar */}
      <div className="h-8 rounded-full overflow-hidden flex bg-muted">
        {/* Sell Percentage (Green) */}
        {sellPercentage > 0 && (
          <div
            className="bg-success-green flex items-center justify-center text-xs font-semibold text-white transition-all"
            style={{ width: `${sellPercentage}%` }}
          >
            {sellPercentage > 15 && `${sellPercentage}%`}
          </div>
        )}
        {/* Keep Percentage (Red) */}
        {keepPercentage > 0 && (
          <div
            className="bg-destructive flex items-center justify-center text-xs font-semibold text-white transition-all"
            style={{ width: `${keepPercentage}%` }}
          >
            {keepPercentage > 15 && `${keepPercentage}%`}
          </div>
        )}
        {/* Pending Percentage (Gray) */}
        {100 - sellPercentage - keepPercentage > 0 && (
          <div
            className="bg-muted-foreground/30 flex items-center justify-center text-xs font-semibold text-foreground transition-all"
            style={{ width: `${100 - sellPercentage - keepPercentage}%` }}
          >
            {/* Show Text only if segment is wide enough */}
            {100 - sellPercentage - keepPercentage > 15 && `${100 - sellPercentage - keepPercentage}%`}
          </div>
        )}
      </div>

      {/* Legend / Key */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-success-green" />
          <span className="text-muted-foreground">{t.sellLabel}:</span>
          <span className="font-semibold text-foreground">{sellVotes}</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="w-4 h-4 text-destructive" />
          <span className="text-muted-foreground">{t.keepLabel}:</span>
          <span className="font-semibold text-foreground">{keepVotes}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{t.pendingLabel}:</span>
          <span className="font-semibold text-foreground">{pendingVotes}</span>
        </div>
      </div>

      {/* Consensus Status Message */}
      <div className={`p-3 rounded-lg text-sm font-medium ${hasMajority ? 'bg-success-green/10 text-success-green' : 'bg-gold/10 text-gold'}`}>
        {hasMajority ? t.consensusReached : t.needsMore}
      </div>
    </div>
  );
};
