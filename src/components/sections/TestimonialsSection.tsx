import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Player card images
import serenaWongCard from "@/assets/cards/serena-wong.jpeg";
import navAtwalCard from "@/assets/cards/nav-atwal.jpeg";
import timHoeschenCard from "@/assets/cards/tim-hoeschen.jpeg";
import nourDiabiCard from "@/assets/cards/nour-diabi.png";

interface TestimonialsSectionProps {
  onApplyClick?: () => void;
}

const testimonials = [
  {
    id: 1,
    name: "Dr Serena Wong",
    role: "Aesthetic Dentist",
    quote: "Working with this team has been an exceptional experience. They have consistently supported me with clarity, kindness, and a deep understanding of the dental field, which is rare in the marketing space. They gave me the confidence to tell my story in a way that feels authentic and aligned with who I am.",
    highlight: "I am very selective about what I put my name behind, and their work stands out for its intention, professionalism, creativity and attention to detail.",
    featured: true,
    cardImage: serenaWongCard,
  },
  {
    id: 2,
    name: "Dr Nav Atwal",
    role: "Dental Surgeon",
    quote: "Dr. Alan Clarke and Zac at Paste are helping translate vision into something tangible.",
    highlight: "They understand that strong brands are built with intention, not shortcuts.",
    featured: false,
    cardImage: navAtwalCard,
  },
  {
    id: 3,
    name: "Dr Tim Hoeschen",
    role: "Dentist",
    quote: "Working with Zac and Alan has been fantastic. They've pushed the boundaries of dental marketing, not by overhyping and making up a new meme. Instead they tapped into something lasting and refreshing — your own story.",
    highlight: "You have given us a voice and helped tell our story with vision, creativity and style.",
    featured: false,
    cardImage: timHoeschenCard,
  },
  {
    id: 4,
    name: "Dr Nour Diabi",
    role: "Clinician",
    quote: "Pasted Studio don't just create content, they tell your story. Alan and Zac captured who I am as a clinician with real depth and authenticity.",
    highlight: "Their focus on genuine storytelling over forced marketing is clear in every piece of content.",
    featured: false,
    cardImage: nourDiabiCard,
  },
];

const TestimonialCard = ({ 
  testimonial, 
  index, 
  isVisible 
}: { 
  testimonial: typeof testimonials[0]; 
  index: number;
  isVisible: boolean;
}) => {
  return (
    <div
      className={`group relative bg-card/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border/30 
        hover:border-primary/30 hover:bg-card/80 transition-all duration-500 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Decorative gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex flex-col h-full">
        {/* Player Card */}
        {testimonial.cardImage && (
          <div className="mb-6 flex justify-center">
            <div className="relative group/card">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg blur-sm opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
              <img 
                src={testimonial.cardImage} 
                alt={`${testimonial.name} player card`}
                className="relative w-32 h-auto rounded-lg shadow-lg transform group-hover/card:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        )}
        
        <Quote className="w-6 h-6 text-primary/40 mb-4 transform group-hover:scale-110 transition-transform duration-300" />
        
        <blockquote className="text-foreground/80 text-sm leading-relaxed mb-4 flex-grow">
          {testimonial.quote}
        </blockquote>
        
        {testimonial.highlight && (
          <p className="text-foreground text-sm font-medium leading-relaxed mb-4 border-l-2 border-primary/50 pl-4">
            {testimonial.highlight}
          </p>
        )}
        
        <div className="flex items-center gap-3 pt-4 border-t border-border/30">
          <div>
            <p className="font-medium text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = ({ onApplyClick }: TestimonialsSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const featuredTestimonial = testimonials.find((t) => t.featured);
  const regularTestimonials = testimonials.filter((t) => !t.featured);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            Voices of Trust
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Hear from dentists who chose substance over noise — and built brands that speak for themselves.
          </p>
        </div>

        {/* Featured testimonial */}
        {featuredTestimonial && (
          <div 
            className={`relative mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl blur-xl" />
            <div className="relative bg-card/60 backdrop-blur-sm rounded-2xl p-10 md:p-16 border border-border/30">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                {/* Player Card */}
                {featuredTestimonial.cardImage && (
                  <div className="flex-shrink-0">
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-br from-primary/40 to-primary/10 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                      <img 
                        src={featuredTestimonial.cardImage} 
                        alt={`${featuredTestimonial.name} player card`}
                        className="relative w-48 md:w-56 h-auto rounded-xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                  </div>
                )}
                
                {/* Quote Content */}
                <div className="flex-grow">
                  <Quote className="w-12 h-12 text-primary/50 mb-8" />
                  
                  <blockquote className="text-xl md:text-2xl text-foreground/90 leading-relaxed mb-6 font-serif">
                    "{featuredTestimonial.quote}"
                  </blockquote>
                  
                  {featuredTestimonial.highlight && (
                    <p className="text-lg md:text-xl text-primary font-medium leading-relaxed mb-10 italic">
                      "{featuredTestimonial.highlight}"
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-lg font-medium text-foreground">{featuredTestimonial.name}</p>
                      <p className="text-muted-foreground">{featuredTestimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Testimonials Grid */}
        {regularTestimonials.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {regularTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className={`mt-20 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Button 
            variant="premium"
            size="xl"
            onClick={onApplyClick}
            className="rounded-md"
          >
            Join These Dentists
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Build authority, not dependency.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
