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

const stackedLines = [
  "Your brand is not just graphics.",
  "It's how your phone is answered.",
  "How your consultation flows.",
  "How your photography looks.",
  "How your space feels.",
  "How your team speaks.",
  "How your content moves.",
  "How your systems operate.",
];

const BrandsShowcaseSection = () => {
  return (
    <section id="brands-showcase" style={{ padding: '120px 0', background: 'var(--color-surface)' }}>
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label text-center justify-center mb-4">The Brand</p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: '52px', color: 'var(--color-text)', lineHeight: '1.1', letterSpacing: '-0.01em' }}>
            Brand is not decoration. It's direction.
          </h2>
          <p className="font-serif italic max-w-2xl mx-auto" style={{ fontSize: '20px', color: 'var(--color-text-muted)', lineHeight: '1.3' }}>
            We build identities, systems, and experiences that make practices impossible to compare — and impossible to ignore.
          </p>
        </div>

        {/* Body copy */}
        <div className="text-center max-w-[680px] mx-auto space-y-6 mb-14" style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
          <p>Most dental branding starts with colours, logos, and typography. We start with belief. Because patients don't choose based on credentials alone. They choose based on how a practice makes them feel — long before they ever walk through the door.</p>
          <p>Our branding team is intentionally recruited outside of dentistry. From hospitality. Fashion. Film. Luxury retail. Experience design. We've brought talent from environments like One Hotels, Paramount, Disney, Yves Saint Laurent, Acne Studios, and Rosewood — places where brand is not visual. It's lived.</p>
          <p>Because nothing we build should feel dental. It should feel unmistakably you.</p>
        </div>

        {/* Stacked italic lines */}
        <div className="text-center mb-14 space-y-3">
          {stackedLines.map((line) => (
            <p key={line} className="font-serif italic" style={{ fontSize: '22px', color: 'var(--color-text)', lineHeight: '1.3', opacity: 0.8 }}>
              {line}
            </p>
          ))}
        </div>

        {/* Remaining body */}
        <div className="text-center max-w-[680px] mx-auto space-y-6 mb-14" style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
          <p>Brand informs systems. Systems reinforce brand. Content amplifies both. When these elements align, differentiation stops being a marketing tactic — and becomes your reality.</p>
          <p>We don't fit practices into a mould. We design identities that break them. Because the strongest brands don't look like dentistry. They redefine it.</p>
        </div>

        {/* Closing gold italic line */}
        <p className="font-serif italic text-center mb-16 max-w-xl mx-auto" style={{ fontSize: '16px', color: 'rgba(185,146,79,0.7)', lineHeight: '1.75' }}>
          How you do one thing is how patients assume you do everything.
        </p>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {brands.map((brand) => (
              <CarouselItem key={brand.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                <Link
                  to={`/case-study/${brand.slug}`}
                  className="group block text-left p-6 transition-all duration-300 h-full"
                  style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(185,146,79,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                  }}
                >
                  <div className="aspect-video mb-5 flex items-center justify-center overflow-hidden" style={{ background: 'var(--color-surface)', borderRadius: '2px' }}>
                    {brand.thumbnail ? (
                      <OptimizedImage 
                        src={brand.thumbnail} 
                        alt={brand.name}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-400"
                      />
                    ) : (
                      <span className="font-sans" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Coming Soon</span>
                    )}
                  </div>
                  <h3 className="font-serif mb-2 group-hover:text-primary transition-colors" style={{ fontSize: '18px', color: 'var(--color-text)' }}>
                    {brand.name}
                  </h3>
                  <p className="font-sans mb-4 line-clamp-2" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{brand.tagline}</p>
                  <div className="flex items-center gap-2 group-hover:text-primary transition-colors" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
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
        <div className="mt-14 pt-10 text-center" style={{ borderTop: '1px solid var(--color-border-gold)' }}>
          <p className="font-sans uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '0.25em', color: 'var(--color-text-subtle)' }}>
            PASTED Branding
          </p>
          <p className="font-sans mx-auto mb-6 max-w-[440px]" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            We are the best branding team in the world for aesthetic dental practices. If you want a brand built to the highest standard — not templated, not delegated — this is where that conversation starts.
          </p>
          <button
            onClick={() => {
              trackCTAClick({ ctaId: "branding_consultation_cta", ctaText: "Book a Branding Consultation", section: "brands-showcase" });
              document.getElementById("eligibility-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="inline-block font-sans uppercase transition-all duration-300"
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: '#B8924F',
              border: '1px solid rgba(185,146,79,0.5)',
              background: 'transparent',
              padding: '14px 28px',
              borderRadius: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(185,146,79,0.06)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(185,146,79,0.8)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(185,146,79,0.5)';
            }}
          >
            Book a Branding Consultation →
          </button>
          <p className="font-serif italic text-center mt-4 max-w-sm mx-auto" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            Design, identity, and brand strategy for practices that refuse to look like everyone else.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcaseSection;
