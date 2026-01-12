import { Button } from "@/components/ui/button";

interface FinalCTASectionProps {
  onApplyClick?: () => void;
}

const FinalCTASection = ({ onApplyClick }: FinalCTASectionProps) => {
  const handleClick = () => {
    if (onApplyClick) {
      onApplyClick();
    } else {
      document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-2xl mx-auto px-4 text-center">
        <p className="text-lg text-muted-foreground mb-8">
          Associate to Empire™ is intentionally selective.
        </p>

        <p className="text-foreground/80 mb-6">
          This is not an enrollment.<br />
          <span className="text-foreground">It is a request for consideration.</span>
        </p>
        
        <p className="text-muted-foreground mb-12 italic">
          We are granting access to a trajectory.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="premium"
            size="xl"
            className="rounded-md"
            onClick={handleClick}
          >
            Request Access
          </Button>
          <Button
            variant="outline"
            size="xl"
            className="rounded-md border-border/50 text-foreground/80 hover:text-foreground hover:bg-card/50"
            onClick={handleClick}
          >
            Explore Eligibility
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mt-6">
          Applications reviewed manually. Scarcity is structural, not promotional.
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;