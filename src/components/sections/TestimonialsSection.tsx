import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

interface TestimonialsSectionProps {
  onApplyClick?: () => void;
}

const testimonials = [
  {
    id: 1,
    name: "Dr Serena Wong",
    role: "Aesthetic Dentist",
    quote: "Working with this team has been an exceptional experience. They have consistently supported me with clarity, kindness, and a deep understanding of the dental field, which is rare in the marketing space. They gave me the confidence to tell my story in a way that feels authentic and aligned with who I am. They are always available, thoughtful in their approach, and genuinely care about the quality of their work — you never feel left on your own. I am very selective about what I put my name behind, and their work stands out for its intention, professionalism, creativity and attention to detail. I would highly recommend them to anyone looking for marketing that is both strategic and truly human.",
    featured: true,
  },
  {
    id: 2,
    name: "Dr Nav Atwal",
    role: "Dental Surgeon",
    quote: "Dr. Alan Clarke and Zac at Paste are helping translate vision into something tangible. They understand that strong brands are built with intention, not shortcuts.",
    featured: false,
  },
];

const TestimonialsSection = ({ onApplyClick }: TestimonialsSectionProps) => {
  const featuredTestimonial = testimonials.find((t) => t.featured);
  const regularTestimonials = testimonials.filter((t) => !t.featured);

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

        {/* Featured testimonial - larger format */}
        {featuredTestimonial && (
          <div className="mb-12 bg-background rounded-lg p-10 md:p-14 border border-border/50">
            <div className="max-w-3xl mx-auto text-center">
              <Quote className="w-10 h-10 text-primary/40 mx-auto mb-6" />
              <blockquote className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 font-serif italic">
                "{featuredTestimonial.quote}"
              </blockquote>
              <div>
                <p className="font-medium text-foreground">{featuredTestimonial.name}</p>
                <p className="text-sm text-muted-foreground">{featuredTestimonial.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Regular Testimonials Grid */}
        {regularTestimonials.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {regularTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-background rounded-lg p-8 border border-border/50 hover:border-border transition-colors"
              >
                <Quote className="w-6 h-6 text-primary/30 mb-4" />
                <blockquote className="text-foreground/80 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}

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
