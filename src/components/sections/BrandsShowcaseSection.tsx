const BrandsShowcaseSection = () => {
  // Placeholder for brand logos
  const brands = [1, 2, 3, 4, 5, 6];
  
  // Placeholder for reference videos
  const referenceVideos = [1, 2, 3, 4];

  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Brands We've Built */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Brands We've Built
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We work with some of the most respected names in aesthetic dentistry.
          </p>
        </div>

        {/* Brand Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20">
          {brands.map((brand) => (
            <div
              key={brand}
              className="aspect-[3/2] bg-secondary/50 rounded-lg flex items-center justify-center border border-border/30 hover:border-border/60 transition-colors"
            >
              <span className="text-muted-foreground text-sm">Logo</span>
            </div>
          ))}
        </div>

        {/* Reference Videos */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
            Our Work in Action
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See the content and brands we've created.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {referenceVideos.map((video) => (
            <div
              key={video}
              className="aspect-video bg-secondary/30 rounded-lg border border-border/50 flex items-center justify-center hover:border-border transition-colors group cursor-pointer"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-background/80 flex items-center justify-center mx-auto mb-3 group-hover:bg-background transition-colors">
                  <svg
                    className="w-6 h-6 text-foreground ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-muted-foreground text-sm">Video Placeholder</span>
              </div>
            </div>
          ))}
        </div>

        {/* Additional showcase row for more videos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6">
          {[1, 2, 3, 4].map((video) => (
            <div
              key={video}
              className="aspect-[9/16] bg-secondary/30 rounded-lg border border-border/50 flex items-center justify-center hover:border-border transition-colors group cursor-pointer"
            >
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center mx-auto mb-2 group-hover:bg-background transition-colors">
                  <svg
                    className="w-4 h-4 text-foreground ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-muted-foreground text-xs">Reel</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcaseSection;
