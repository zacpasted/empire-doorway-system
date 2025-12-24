import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Brand {
  id: number;
  name: string;
  description: string;
  examples: { type: "video" | "image"; label: string }[];
}

const BrandsShowcaseSection = () => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  // Placeholder brands - replace with real content
  const brands: Brand[] = [
    {
      id: 1,
      name: "Brand Name",
      description: "Aesthetic dentistry practice specializing in smile makeovers.",
      examples: [
        { type: "video", label: "Brand Film" },
        { type: "video", label: "Patient Story" },
        { type: "image", label: "Social Content" },
        { type: "image", label: "Photography" },
      ],
    },
    {
      id: 2,
      name: "Brand Name",
      description: "Cosmetic dental studio focused on veneers and composites.",
      examples: [
        { type: "video", label: "Introduction" },
        { type: "video", label: "Behind the Scenes" },
        { type: "image", label: "Case Studies" },
      ],
    },
    {
      id: 3,
      name: "Brand Name",
      description: "Modern dental practice with a focus on patient experience.",
      examples: [
        { type: "video", label: "Practice Tour" },
        { type: "image", label: "Content Library" },
        { type: "image", label: "Brand Assets" },
      ],
    },
    {
      id: 4,
      name: "Brand Name",
      description: "Specialist in restorative and implant dentistry.",
      examples: [
        { type: "video", label: "Educational Series" },
        { type: "video", label: "Testimonials" },
        { type: "image", label: "Before & After" },
      ],
    },
    {
      id: 5,
      name: "Brand Name",
      description: "Boutique practice known for high-end aesthetic work.",
      examples: [
        { type: "video", label: "Brand Story" },
        { type: "image", label: "Visual Identity" },
      ],
    },
    {
      id: 6,
      name: "Brand Name",
      description: "Multi-location practice with strong digital presence.",
      examples: [
        { type: "video", label: "Campaign Video" },
        { type: "video", label: "Social Reels" },
        { type: "image", label: "Content Strategy" },
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setSelectedBrand(brand)}
              className="group text-left bg-background rounded-xl p-6 border border-border/50 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              {/* Brand thumbnail placeholder */}
              <div className="aspect-video bg-secondary/50 rounded-lg mb-5 flex items-center justify-center overflow-hidden">
                <span className="text-muted-foreground text-sm group-hover:scale-105 transition-transform">
                  Brand Thumbnail
                </span>
              </div>

              <h3 className="text-lg font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
                {brand.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {brand.description}
              </p>

              {/* Example count */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 bg-secondary/50 rounded">
                  {brand.examples.filter((e) => e.type === "video").length} Videos
                </span>
                <span className="px-2 py-1 bg-secondary/50 rounded">
                  {brand.examples.filter((e) => e.type === "image").length} Assets
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Brand Detail Modal */}
        <Dialog open={!!selectedBrand} onOpenChange={() => setSelectedBrand(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedBrand && (
              <div className="pt-4">
                <h3 className="text-2xl font-serif text-foreground mb-2">
                  {selectedBrand.name}
                </h3>
                <p className="text-muted-foreground mb-8">
                  {selectedBrand.description}
                </p>

                {/* Examples Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedBrand.examples.map((example, index) => (
                    <div
                      key={index}
                      className={`${
                        example.type === "video" ? "aspect-video" : "aspect-[4/3]"
                      } bg-secondary/30 rounded-lg border border-border/50 flex items-center justify-center cursor-pointer hover:border-border transition-colors group`}
                    >
                      {example.type === "video" ? (
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
                      ) : (
                        <div className="text-center">
                          <svg
                            className="w-8 h-8 text-muted-foreground mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
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
