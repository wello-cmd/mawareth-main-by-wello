import { cn } from "@/lib/utils"; // Utility for class names

// Props Interface
interface MashrabiyaPatternProps {
  className?: string; // Optional custom classes
  opacity?: number; // Opacity level
}

// Background SVG pattern inspired by Islamic geometry (Mashrabiya)
// Used for decorative backgrounds to add cultural aesthetic
export const MashrabiyaPattern = ({ className, opacity = 0.05 }: MashrabiyaPatternProps) => {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice" // Ensure pattern fills area
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Define the repeatable pattern tile */}
          <pattern
            id="mashrabiya"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            {/* Eight-pointed star center element */}
            <polygon
              points="10,0 12,8 20,10 12,12 10,20 8,12 0,10 8,8"
              fill="currentColor"
              className="text-primary"
            />
            {/* Corner diamond accents */}
            <polygon
              points="0,0 3,0 0,3"
              fill="currentColor"
              className="text-accent"
            />
            <polygon
              points="20,0 17,0 20,3"
              fill="currentColor"
              className="text-accent"
            />
            <polygon
              points="0,20 3,20 0,17"
              fill="currentColor"
              className="text-accent"
            />
            <polygon
              points="20,20 17,20 20,17"
              fill="currentColor"
              className="text-accent"
            />
          </pattern>
        </defs>
        {/* Fill the entire container with the pattern */}
        <rect width="100%" height="100%" fill="url(#mashrabiya)" />
      </svg>
    </div>
  );
};
