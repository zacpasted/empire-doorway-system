import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { brands } from "@/data/brands";

interface BrandsShowcaseSectionProps {
  onApplyClick?: () => void;
}

const BrandsShowcaseSection = ({ onApplyClick }: BrandsShowcaseSectionProps) => {
  return (
    <section id="brands-showcase" className="py-20 md:py-28 bg-secondary/20">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Brands We've Built for A2E Members
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Click to explore the work we've created for Associate to Empire clients.
          </p>
        </div>

        {/* Clickable Brand Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/case-study/${brand.slug}`}
              className="group text-left bg-background rounded-xl p-6 border border-border/50 transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
            >
              {/* Brand thumbnail */}
              <div className="aspect-video bg-secondary/50 rounded-lg mb-5 flex items-center justify-center overflow-hidden">
                {brand.thumbnail ? (
                  <img 
                    src={brand.thumbnail} 
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

              {/* View case study link */}
              <div className="flex items-center gap-2 text-sm text-foreground/60 group-hover:text-primary transition-colors">
                <span>View case study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
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
            This is not an application for a service. It is a request for access.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcaseSection;
