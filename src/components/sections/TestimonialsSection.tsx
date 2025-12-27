import { Button } from "@/components/ui/button";

interface TestimonialsSectionProps {
  onApplyClick?: () => void;
}

const TestimonialsSection = ({ onApplyClick }: TestimonialsSectionProps) => {
  // Placeholder testimonials - replace with real content
  const testimonials = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            What Dentists Are Saying
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real results from dentists building their authority.
          </p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-background rounded-lg p-8 border border-border/50 hover:border-border transition-colors"
            >
              {/* Placeholder for testimonial content */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  {/* Avatar placeholder */}
                  <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">Photo</span>
                  </div>
                  <div>
                    <div className="h-4 w-32 bg-muted rounded mb-2" />
                    <div className="h-3 w-24 bg-muted/60 rounded" />
                  </div>
                </div>
                {/* Quote placeholder */}
                <div className="space-y-2">
                  <div className="h-3 w-full bg-muted/40 rounded" />
                  <div className="h-3 w-full bg-muted/40 rounded" />
                  <div className="h-3 w-3/4 bg-muted/40 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured testimonial - larger format */}
        <div className="mt-12 bg-background rounded-lg p-10 md:p-14 border border-border/50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Photo</span>
            </div>
            <div className="space-y-3 mb-6">
              <div className="h-4 w-full max-w-2xl mx-auto bg-muted/40 rounded" />
              <div className="h-4 w-full max-w-xl mx-auto bg-muted/40 rounded" />
              <div className="h-4 w-3/4 max-w-lg mx-auto bg-muted/40 rounded" />
            </div>
            <div className="h-4 w-40 bg-muted rounded mx-auto mb-1" />
            <div className="h-3 w-32 bg-muted/60 rounded mx-auto" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button 
            onClick={onApplyClick}
            className="px-8 py-6 text-base"
          >
            Request Consideration
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Join dentists who are building authority, not dependency.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
