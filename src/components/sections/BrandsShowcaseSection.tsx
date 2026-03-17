import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { brands } from "@/data/brands";
import OptimizedImage from "@/components/ui/optimized-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface BrandsShowcaseSectionProps {
  onApplyClick?: () => void;
}

const BrandsShowcaseSection = ({ onApplyClick }: BrandsShowcaseSectionProps) => {
  return (
    <section id="brands-showcase" className="py-20 md:py-28 bg-secondary/20">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Storytelling, Ads & Brand Systems Built for the Best
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The same strategic framework behind the most recognized names in aesthetic dentistry — storytelling, production, ads, and hospitality, all working as one.
          </p>
        </div>

        {/* Swipeable Brand Cards Carousel */}
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
                  className="group block text-left bg-background rounded-xl p-6 border border-border/50 transition-all duration-300 hover:border-primary/40 hover:shadow-lg h-full"
                >
                  {/* Brand thumbnail */}
                  <div className="aspect-video bg-secondary/50 rounded-lg mb-5 flex items-center justify-center overflow-hidden">
                  {brand.thumbnail ? (
                      <OptimizedImage 
                        src={brand.thumbnail} 
                        alt={brand.name}
                        wrapperClassName="w-full h-full"
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>

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
