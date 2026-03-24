import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { brands } from "@/data/brands";
import OptimizedImage from "@/components/ui/optimized-image";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const BrandsShowcaseSection = () => {
  return (
    <section id="brands-showcase" className="py-24 md:py-34 bg-secondary/20">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="section-label text-xs tracking-[0.3em] text-foreground/50 uppercase mb-4">
            The Work
          </p>
          <h2 className="text-[36px] md:text-4xl font-serif text-foreground mb-4">
            The work behind the names.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The strategic framework behind the most recognised practices in aesthetic dentistry.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {brands.map((brand) => (
              <CarouselItem key={brand.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                <Link
                  to={`/case-study/${brand.slug}`}
                  className="group block text-left bg-background rounded-xl p-6 border border-border/50 transition-all duration-250 hover:border-primary/50 hover:scale-[1.015] hover:shadow-lg h-full focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                  {/* Brand thumbnail with grayscale treatment */}
                  <div className="aspect-video bg-secondary/50 rounded-lg mb-5 flex items-center justify-center overflow-hidden">
                    {brand.thumbnail ? (
                      <OptimizedImage 
                        src={brand.thumbnail} 
                        alt={brand.name}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-400"
                      />
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {brand.tagline}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-foreground/60 group-hover:text-primary transition-colors">
                    <span>View case study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>

        {/* PASTED Branding CTA */}
        <div className="mt-14 pt-10 text-center" style={{ borderTop: '1px solid rgba(185,146,79,0.2)' }}>
          <p className="text-xs tracking-[0.28em] uppercase text-muted-foreground/60 mb-3 font-sans">
            PASTED Branding
          </p>
          <p
            className="text-[14px] mx-auto mb-6 max-w-[440px]"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            We are the best branding team in the world for aesthetic dental practices. If you want a brand built to the highest standard — not templated, not delegated — this is where that conversation starts.
          </p>
          <button
            onClick={() => {
              trackCTAClick({ ctaId: "branding_consultation_cta", ctaText: "Book a Branding Consultation", section: "brands-showcase" });
              document.getElementById("eligibility-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="inline-block font-sans text-[12px] tracking-[0.15em] uppercase px-7 py-3 rounded-sm transition-all duration-200"
            style={{
              color: 'rgba(185,146,79,0.9)',
              border: '1px solid rgba(185,146,79,0.6)',
              background: 'transparent',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(185,146,79,0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            Book a Branding Consultation →
          </button>
          <p
            className="text-[12px] italic text-center mt-4 max-w-sm mx-auto"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Design, identity, and brand strategy for practices that refuse to look like everyone else.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcaseSection;
