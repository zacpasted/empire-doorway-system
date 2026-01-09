import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/ui/optimized-image";
import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Player card images
import marshallHansonCard from "@/assets/cards/marshall-hanson.jpeg";
import jonMarashiCard from "@/assets/cards/jon-marashi.jpeg";
import drewBallardCard from "@/assets/cards/drew-ballard.jpeg";
import kooperRuminerCard from "@/assets/cards/kooper-ruminer.jpeg";
import serenaWongCard from "@/assets/cards/serena-wong.jpeg";
import navAtwalCard from "@/assets/cards/nav-atwal.jpeg";
import timHoeschenCard from "@/assets/cards/tim-hoeschen.jpeg";
import nourDiabiCard from "@/assets/cards/nour-diabi.png";
import beauMurpheyCard from "@/assets/cards/beau-murphey.jpeg";
import michaelAllenCard from "@/assets/cards/michael-allen.jpeg";
import pastedPlaceholder from "@/assets/logos/pasted-placeholder.png";

interface TestimonialsSectionProps {
  onApplyClick?: () => void;
}

const testimonials = [
  {
    id: 1,
    name: "Dr. Marshall Hanson",
    role: "Aesthetic Dentist, Provo, UT · Founder, Marshall Hanson Method",
    quote: "There is so much out there that looks artistic and beautiful on the surface, but very little of it is truly holistic or empathetic. What Zac and Alan do is different. They are, quite simply, the best practitioners in the world at what they do. Their understanding of brand, identity, and human psychology is unmatched. What makes this so special is that they are making this level of talent accessible to doctors who genuinely need it. I believe everyone needs this. If you need to build a brand and you don't want to do it yourself, I would not recommend anyone else.",
    featured: true,
    cardImage: marshallHansonCard,
  },
  {
    id: 2,
    name: "Dr. Jon Marashi",
    role: "Celebrity Dentist, Los Angeles, CA",
    quote: "At this level, brand is not optional. It is fundamental. Zac and Alan understand this better than anyone I've worked with. Their taste, restraint, and execution are elite. If you are serious about building a real brand—one that lasts—I would not work with anyone else.",
    featured: false,
    cardImage: jonMarashiCard,
  },
  {
    id: 3,
    name: "Dr. Drew Ballard",
    role: "Celebrity Dentist, Phoenix, AZ · Founder, Halo Veneers & Halo Education",
    quote: "I'm deeply grateful for everything we've built together. Halo did not scale by accident. The growth, the positioning, the clarity—it all came from a rock-solid foundation. Zac and Alan saw the vision early, protected it, and helped turn it into something far greater than I could have built alone.",
    featured: false,
    cardImage: drewBallardCard,
  },
  {
    id: 4,
    name: "Dr. Brian Harris",
    role: "Celebrity Dentist, Gilbert, AZ · Founder, Smile Virtual & Smile Sculpt",
    quote: "This is an easy recommendation. If a doctor asks who they should trust with their brand, this is the answer. They understand dentists, but more importantly, they understand people. That combination is incredibly rare.",
    featured: false,
    cardImage: pastedPlaceholder,
  },
  {
    id: 5,
    name: "Dr. Kooper Ruminer",
    role: "Associate & Practice Owner, Oklahoma City, OK",
    quote: "I've built practices from the ground up, and I can say with absolute certainty—doing this without Zac and Alan would have taken years longer and cost far more mistakes. They remove confusion while preserving ambition. That alone is invaluable.",
    featured: false,
    cardImage: kooperRuminerCard,
  },
  {
    id: 6,
    name: "Dr. Sam Saleh",
    role: "Celebrity Dentist, Los Angeles & London",
    quote: "This is world-class work in every sense. The strategy is genius-level, the execution is flawless, and there is zero fluff. I could not recommend them more highly.",
    featured: false,
    cardImage: pastedPlaceholder,
  },
  {
    id: 7,
    name: "Dr. Beau Murphey",
    role: "Cosmetic Dentist, Ridgeland, MS",
    quote: "I was genuinely scared of content. I avoided it for years. Nothing ever worked, and it always felt uncomfortable. This is the first time content felt natural—and the first time it actually worked. That completely changed my outlook and my results.",
    featured: false,
    cardImage: beauMurpheyCard,
  },
  {
    id: 8,
    name: "Dr. Vik Ravoory",
    role: "Associate Dentist, Boca Raton, FL",
    quote: "As a young associate, this completely changed the trajectory of my career—faster than I thought possible. The clarity, confidence, and direction I gained gave me control over my future instead of guessing my next move.",
    featured: false,
  },
  {
    id: 9,
    name: "Dr. Mark Hughes",
    role: "Celebrity Dentist, Harley Street, London",
    quote: "My brand is highly distinguished, and I am extremely selective about who I trust with it. I would not hand this responsibility to anyone else. I'm also incredibly glad that this level of work is now accessible to more doctors.",
    featured: false,
  },
  {
    id: 10,
    name: "Dr. Rhona Eksander",
    role: "Celebrity Dentist, Chelsea Dental Clinic, London",
    quote: "This work is intelligent, restrained, and deeply respectful of individuality. Zac and Alan build brands with intention and integrity. I'm genuinely grateful that more doctors can now access something this refined and thoughtful.",
    featured: false,
  },
  {
    id: 11,
    name: "Dr. Serena Wong",
    role: "Cosmetic Dentist & Owner, Ottawa, ON",
    quote: "Working with this team has been an exceptional experience. They have consistently supported me with clarity, kindness, and a deep understanding of the dental field, which is rare in the marketing space. They gave me the confidence to tell my story in a way that feels authentic and aligned with who I am. I am very selective about what I put my name behind, and their work stands out for its intention, professionalism, creativity and attention to detail.",
    featured: false,
    cardImage: serenaWongCard,
  },
  {
    id: 12,
    name: "Dr. Nav Atwal",
    role: "Associate, Miami, FL",
    quote: "Dr. Alan Clarke and Zac at Paste are helping translate vision into something tangible. They understand that strong brands are built with intention, not shortcuts.",
    featured: false,
    cardImage: navAtwalCard,
  },
  {
    id: 13,
    name: "Dr. Tim Hoeschen",
    role: "General Dentist & Owner, Ottawa",
    quote: "Working with Zac and Alan has been fantastic. They've pushed the boundaries of dental marketing, not by overhyping and making up a new meme. Instead they tapped into something lasting and refreshing — your own story. You have given us a voice and helped tell our story with vision, creativity and style.",
    featured: false,
    cardImage: timHoeschenCard,
  },
  {
    id: 14,
    name: "Dr. Nour Diabi",
    role: "Associate, Liverpool",
    quote: "Pasted Studio don't just create content, they tell your story. Alan and Zac captured who I am as a clinician with real depth and authenticity. Their focus on genuine storytelling over forced marketing is clear in every piece of content.",
    featured: false,
    cardImage: nourDiabiCard,
  },
  {
    id: 15,
    name: "Dr. Gage Lidder",
    role: "Associate, London",
    quote: "Juggling clinical work, patient satisfaction, admin, and social media can feel overwhelming, especially when you're stepping into a new environment and trying to stand out. Pasted took that pressure off my shoulders. They helped me translate who I am in the clinic into a clear, authentic personal brand the world can actually see. As a dentist, trust and perception matter and Pasted understood that instantly. They didn't just create content or advertisements—they helped me communicate confidence, credibility, and personality without it feeling forced or salesy. It finally feels like my online presence matches the standard of my work.",
    featured: false,
    cardImage: pastedPlaceholder,
  },
  {
    id: 16,
    name: "Dr. Michael Allen",
    role: "Celebrity Dentist & Owner, Tucson, AZ · Co-founder, Smile Trend Institute",
    quote: "Working with Zac and his team have helped me realize how powerful social media can be to bringing in that perfect cosmetic patient. Not only do I have a consistent flow of cosmetic patients in my practice, it has also helped to establish me as the expert in my field, especially in my local area. Just meeting and talking with the team have helped me develop the skills in marketing and in cosmetic dentistry that I might have lacked in the past. I've already recommended PASTED to many other dentists. I've used the skills that I've learned from PASTED to help market other ventures that I'm involved in (SMILETREND). In my opinion, it's been a great investment for my practice, and I plan to continue using them for a long time.",
    featured: false,
    cardImage: michaelAllenCard,
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
              <OptimizedImage 
                src={testimonial.cardImage} 
                alt={`${testimonial.name} player card`}
                wrapperClassName="w-32 rounded-lg shadow-lg overflow-hidden"
                className="w-full h-auto transform group-hover/card:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        )}
        
        <Quote className="w-6 h-6 text-primary/40 mb-4 transform group-hover:scale-110 transition-transform duration-300" />
        
        <blockquote className="text-foreground/80 text-sm leading-relaxed mb-4 flex-grow">
          {testimonial.quote}
        </blockquote>
        
        
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
                      <OptimizedImage 
                        src={featuredTestimonial.cardImage} 
                        alt={`${featuredTestimonial.name} player card`}
                        priority
                        wrapperClassName="w-48 md:w-56 rounded-xl shadow-2xl overflow-hidden"
                        className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-300"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {regularTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index % 6}
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
