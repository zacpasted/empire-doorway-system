import { Button } from "@/components/ui/button";

interface FinalCTASectionProps {
  onApplyClick?: () => void;
}

const FinalCTASection = ({ onApplyClick }: FinalCTASectionProps) => {
  const handleClick = () => {
    if (onApplyClick) {
      onApplyClick();
    } else {
      // Scroll to top where the form is
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-2xl mx-auto px-4 text-center">
        <Button
          variant="premium"
          size="xl"
          className="rounded-md"
          onClick={handleClick}
        >
          Apply to Associate to Empire™
        </Button>
        
        <p className="text-sm text-muted-foreground mt-4">
          Limited seats. Applications reviewed manually.
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;
