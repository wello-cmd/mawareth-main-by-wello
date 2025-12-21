import { Card } from "@/components/ui/card"; // Import Card
import { Button } from "@/components/ui/button"; // Import Button
import { CheckCircle, XCircle, Users, Shield } from "lucide-react"; // Import Icons
import { useLanguage } from "@/contexts/LanguageContext"; // Import Language context
import { useToast } from "@/hooks/use-toast"; // Import Toast

// Props
interface SilentConsensusProps {
  acceptedCount: number; // Number of heirs who accepted
  totalHeirs: number; // Total number of heirs
  hasVoted: boolean; // Whether current user has voted
  onVote: (vote: 'accept' | 'reject') => void; // Vote handler
}

// Component for anonymous voting system to reach price consensus
export const SilentConsensus = ({
  acceptedCount,
  totalHeirs,
  hasVoted,
  onVote
}: SilentConsensusProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();

  const percentage = Math.round((acceptedCount / totalHeirs) * 100);
  const isComplete = acceptedCount === totalHeirs; // Check if consensus reached

  // Handle user vote action
  const handleVote = (vote: 'accept' | 'reject') => {
    onVote(vote);
    toast({
      title: language === 'ar' ? 'تم تسجيل صوتك' : 'Vote Recorded',
      description: language === 'ar'
        ? `صوتك: ${vote === 'accept' ? 'قبول' : 'رفض'}`
        : `Your vote: ${vote === 'accept' ? 'Accept' : 'Reject'}`,
    });
  };

  const content = {
    en: {
      title: "Dispute Resolution",
      status: `${acceptedCount} of ${totalHeirs} Heirs Accepted`,
      privacy: "Names are kept private",
      yourVote: "Your Vote",
      accept: "Accept Price",
      reject: "Reject",
      complete: "Ready for Legal Processing",
      waiting: "Awaiting remaining votes",
      voted: "You have already voted",
    },
    ar: {
      title: "حل النزاع",
      status: `${acceptedCount} من ${totalHeirs} ورثة وافقوا`,
      privacy: "الأسماء محفوظة بسرية",
      yourVote: "صوتك",
      accept: "قبول السعر",
      reject: "رفض",
      complete: "جاهز للمعالجة القانونية",
      waiting: "في انتظار باقي الأصوات",
      voted: "لقد صوتت بالفعل",
    },
  };

  const t = content[language]; // Translate

  // Create array segments for progress bar visual
  const segments = Array.from({ length: totalHeirs }, (_, i) => i < acceptedCount);

  return (
    <Card className="p-6 shadow-medium">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">{t.title}</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Shield className="w-3 h-3" />
          {t.privacy}
        </div>
      </div>

      {/* Segmented Progress Bar Visualizing Consensus */}
      <div className="mb-4">
        <div className="flex gap-1">
          {segments.map((filled, idx) => (
            <div
              key={idx}
              className={`h-4 flex-1 rounded-sm transition-colors ${filled ? 'bg-success-green' : 'bg-muted'
                }`}
            />
          ))}
        </div>
        <p className="text-center text-sm font-medium text-foreground mt-3">
          {t.status}
        </p>
      </div>

      {/* Current Status Message */}
      <div className={`p-3 rounded-lg text-center text-sm font-medium mb-6 ${isComplete
          ? 'bg-success-green/10 text-success-green'
          : 'bg-muted text-muted-foreground'
        }`}>
        {isComplete ? t.complete : t.waiting}
      </div>

      {/* Voting Actions Area */}
      {!hasVoted ? (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">{t.yourVote}</p>
          <div className="grid grid-cols-2 gap-4">
            {/* Accept Button */}
            <Button
              onClick={() => handleVote('accept')}
              className="h-12 bg-success-green hover:bg-success-green/90 text-white"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {t.accept}
            </Button>
            {/* Reject Button */}
            <Button
              onClick={() => handleVote('reject')}
              variant="outline"
              className="h-12 border-destructive text-destructive hover:bg-destructive hover:text-white"
            >
              <XCircle className="w-5 h-5 mr-2" />
              {t.reject}
            </Button>
          </div>
        </div>
      ) : (
        // Already Voted State
        <p className="text-center text-sm text-muted-foreground">{t.voted}</p>
      )}
    </Card>
  );
};
