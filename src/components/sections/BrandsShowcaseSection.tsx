import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Dr. Michaela Tozzi images
import tozzi01 from "@/assets/brands/tozzi/showcase-01.jpeg";
import tozzi02 from "@/assets/brands/tozzi/showcase-02.jpeg";
import tozzi03 from "@/assets/brands/tozzi/showcase-03.jpeg";
import tozzi04 from "@/assets/brands/tozzi/showcase-04.jpeg";
import tozzi05 from "@/assets/brands/tozzi/showcase-05.jpeg";
import tozzi06 from "@/assets/brands/tozzi/showcase-06.jpeg";
import tozzi07 from "@/assets/brands/tozzi/showcase-07.jpeg";
import tozzi08 from "@/assets/brands/tozzi/showcase-08.jpeg";
import tozzi09 from "@/assets/brands/tozzi/showcase-09.jpeg";
import tozzi10 from "@/assets/brands/tozzi/showcase-10.jpeg";

interface BrandExample {
  type: "video" | "image";
  label: string;
  src?: string;
}

interface Brand {
  id: number;
  name: string;
  description: string;
  thumbnail?: string;
  examples: BrandExample[];
}

interface BrandsShowcaseSectionProps {
  onApplyClick?: () => void;
}

const BrandsShowcaseSection = ({ onApplyClick }: BrandsShowcaseSectionProps) => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const brands: Brand[] = [
    {
      id: 1,
      name: "Dr. Michaela Tozzi",
      description: "Luxury dentistry without the noise. For decision-makers who refuse to settle.",
      thumbnail: tozzi02,
      examples: [
        { type: "image", label: "Brand Campaign", src: tozzi01 },
        { type: "image", label: "Identity Portrait", src: tozzi02 },
        { type: "image", label: "Brand Manifesto", src: tozzi03 },
        { type: "image", label: "Lifestyle Campaign", src: tozzi04 },
        { type: "image", label: "Brand System", src: tozzi05 },
        { type: "image", label: "Brand Book", src: tozzi06 },
        { type: "image", label: "Social Content", src: tozzi07 },
        { type: "image", label: "Visual Identity", src: tozzi08 },
        { type: "image", label: "Editorial Portrait", src: tozzi09 },
        { type: "image", label: "Profile Design", src: tozzi10 },
      ],
    },
    {
      id: 2,
      name: "Coming Soon",
      description: "Additional brand examples will be featured here.",
      examples: [],
    },
    {
      id: 3,
      name: "Coming Soon",
      description: "Additional brand examples will be featured here.",
      examples: [],
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-secondary/20">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Brands We've Built
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Click to explore the work we've created for leading dental professionals.
          </p>
        </div>

        {/* Clickable Brand Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => brand.examples.length > 0 && setSelectedBrand(brand)}
              disabled={brand.examples.length === 0}
              className={`group text-left bg-background rounded-xl p-6 border border-border/50 transition-all duration-300 ${
                brand.examples.length > 0 
                  ? "hover:border-primary/40 hover:shadow-lg cursor-pointer" 
                  : "opacity-60 cursor-not-allowed"
              }`}
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
              <p className="text-sm text-muted-foreground mb-4">
                {brand.description}
              </p>

              {/* Example count */}
              {brand.examples.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-secondary/50 rounded">
                    {brand.examples.filter((e) => e.type === "video").length} Videos
                  </span>
                  <span className="px-2 py-1 bg-secondary/50 rounded">
                    {brand.examples.filter((e) => e.type === "image").length} Assets
                  </span>
                </div>
              )}
            </button>
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

        {/* Brand Detail Modal */}
        <Dialog open={!!selectedBrand} onOpenChange={() => setSelectedBrand(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            {selectedBrand && (
              <div className="pt-4">
                <h3 className="text-2xl font-serif text-foreground mb-2">
                  {selectedBrand.name}
                </h3>
                <p className="text-muted-foreground mb-8">
                  {selectedBrand.description}
                </p>

                {/* Examples Grid - Masonry-like layout */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedBrand.examples.map((example, index) => (
                    <div
                      key={index}
                      className={`${
                        index === 0 ? "col-span-2 row-span-2" : ""
                      } rounded-lg overflow-hidden border border-border/30 hover:border-primary/40 transition-colors group cursor-pointer`}
                    >
                      {example.src ? (
                        <img 
                          src={example.src} 
                          alt={example.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : example.type === "video" ? (
                        <div className="aspect-video bg-secondary/30 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-14 h-14 rounded-full bg-background/80 flex items-center justify-center mx-auto mb-2 group-hover:bg-background group-hover:scale-105 transition-all">
                              <svg
                                className="w-5 h-5 text-foreground ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {example.label}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-[4/3] bg-secondary/30 flex items-center justify-center">
                          <span className="text-sm text-muted-foreground">
                            {example.label}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default BrandsShowcaseSection;
