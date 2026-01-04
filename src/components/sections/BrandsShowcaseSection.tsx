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

// OnlyFangs images
import onlyfangs01 from "@/assets/brands/onlyfangs/showcase-01.jpeg";
import onlyfangs02 from "@/assets/brands/onlyfangs/showcase-02.jpeg";
import onlyfangs03 from "@/assets/brands/onlyfangs/showcase-03.jpeg";
import onlyfangs04 from "@/assets/brands/onlyfangs/showcase-04.jpeg";
import onlyfangs05 from "@/assets/brands/onlyfangs/showcase-05.jpeg";
import onlyfangs06 from "@/assets/brands/onlyfangs/showcase-06.jpeg";
import onlyfangs07 from "@/assets/brands/onlyfangs/showcase-07.jpeg";
import onlyfangs08 from "@/assets/brands/onlyfangs/showcase-08.jpeg";
import onlyfangs09 from "@/assets/brands/onlyfangs/showcase-09.jpeg";
import onlyfangs10 from "@/assets/brands/onlyfangs/showcase-10.jpeg";

// Dr. Serena Wong images
import serena01 from "@/assets/brands/serena-wong/showcase-01.jpeg";
import serena02 from "@/assets/brands/serena-wong/showcase-02.jpeg";
import serena03 from "@/assets/brands/serena-wong/showcase-03.jpeg";
import serena04 from "@/assets/brands/serena-wong/showcase-04.jpeg";
import serena05 from "@/assets/brands/serena-wong/showcase-05.jpeg";
import serena06 from "@/assets/brands/serena-wong/showcase-06.jpeg";
import serena07 from "@/assets/brands/serena-wong/showcase-07.jpeg";
import serena08 from "@/assets/brands/serena-wong/showcase-08.jpeg";
import serena09 from "@/assets/brands/serena-wong/showcase-09.jpeg";
import serena10 from "@/assets/brands/serena-wong/showcase-10.jpeg";

// Brand 04 images (placeholder name - update when brand name is confirmed)
import brand04_01 from "@/assets/brands/brand-04/showcase-01.jpeg";
import brand04_02 from "@/assets/brands/brand-04/showcase-02.jpeg";
import brand04_03 from "@/assets/brands/brand-04/showcase-03.jpeg";
import brand04_04 from "@/assets/brands/brand-04/showcase-04.jpeg";
import brand04_05 from "@/assets/brands/brand-04/showcase-05.jpeg";
import brand04_06 from "@/assets/brands/brand-04/showcase-06.jpeg";
import brand04_07 from "@/assets/brands/brand-04/showcase-07.jpeg";
import brand04_08 from "@/assets/brands/brand-04/showcase-08.jpeg";
import brand04_09 from "@/assets/brands/brand-04/showcase-09.jpeg";

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
      name: "OnlyFangs",
      description: "Bold, unapologetic dental content that commands attention and builds authority.",
      thumbnail: onlyfangs01,
      examples: [
        { type: "image", label: "Brand Identity", src: onlyfangs01 },
        { type: "image", label: "Visual System", src: onlyfangs02 },
        { type: "image", label: "Content Strategy", src: onlyfangs03 },
        { type: "image", label: "Social Campaign", src: onlyfangs04 },
        { type: "image", label: "Brand Assets", src: onlyfangs05 },
        { type: "image", label: "Editorial Design", src: onlyfangs06 },
        { type: "image", label: "Brand Expression", src: onlyfangs07 },
        { type: "image", label: "Visual Identity", src: onlyfangs08 },
        { type: "image", label: "Content Design", src: onlyfangs09 },
        { type: "image", label: "Brand System", src: onlyfangs10 },
      ],
    },
    {
      id: 3,
      name: "Dr. Serena Wong",
      description: "Quiet confidence, beautifully expressed. Cosmetic dentistry with understated elegance.",
      thumbnail: serena03,
      examples: [
        { type: "image", label: "Storefront Branding", src: serena01 },
        { type: "image", label: "Window Display", src: serena02 },
        { type: "image", label: "Brand Identity", src: serena03 },
        { type: "image", label: "Typography System", src: serena04 },
        { type: "image", label: "Print Collateral", src: serena05 },
        { type: "image", label: "Brand Book", src: serena06 },
        { type: "image", label: "Logo Application", src: serena07 },
        { type: "image", label: "Brand Overview", src: serena08 },
        { type: "image", label: "Visual Identity", src: serena09 },
        { type: "image", label: "Brand System", src: serena10 },
      ],
    },
    {
      id: 4,
      name: "Brand Coming Soon",
      description: "A new brand showcase is being prepared. Check back soon for the full reveal.",
      thumbnail: brand04_01,
      examples: [
        { type: "image", label: "Brand Identity", src: brand04_01 },
        { type: "image", label: "Visual System", src: brand04_02 },
        { type: "image", label: "Brand Campaign", src: brand04_03 },
        { type: "image", label: "Content Strategy", src: brand04_04 },
        { type: "image", label: "Brand Assets", src: brand04_05 },
        { type: "image", label: "Editorial Design", src: brand04_06 },
        { type: "image", label: "Brand Expression", src: brand04_07 },
        { type: "image", label: "Visual Identity", src: brand04_08 },
        { type: "image", label: "Brand System", src: brand04_09 },
      ],
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
