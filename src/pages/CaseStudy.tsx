import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { getBrandBySlug, brands } from "@/data/brands";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const brand = slug ? getBrandBySlug(slug) : undefined;

  if (!brand) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-foreground mb-4">Case study not found</h1>
          <Link to="/" className="text-primary hover:underline">Return home</Link>
        </div>
      </div>
    );
  }

  // Find adjacent brands for navigation
  const currentIndex = brands.findIndex(b => b.slug === slug);
  const prevBrand = currentIndex > 0 ? brands[currentIndex - 1] : null;
  const nextBrand = currentIndex < brands.length - 1 ? brands[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container max-w-6xl mx-auto px-4">
          <Link 
            to="/#brands-showcase" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to showcase</span>
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                Case Study
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
                {brand.name}
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 font-serif italic mb-6">
                {brand.tagline}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {brand.description}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{brand.timeline}</span>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={brand.thumbnail} 
                alt={brand.name}
                className="w-full aspect-[4/5] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 border-y border-border/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {brand.services.map((service, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-secondary/30 rounded-full text-sm text-foreground/80"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                The Challenge
              </h2>
              <p className="text-lg text-foreground/90 leading-relaxed">
                {brand.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                The Solution
              </h2>
              <p className="text-lg text-foreground/90 leading-relaxed">
                {brand.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-8 text-center">
            The Results
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {brand.results.map((result, index) => (
              <div 
                key={index}
                className="p-6 bg-background rounded-lg border border-border/30"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-primary font-medium">{index + 1}</span>
                  </div>
                  <p className="text-foreground/90">{result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12 text-center">
            Project Gallery
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {brand.examples.map((example, index) => (
              <div 
                key={index}
                className={`relative overflow-hidden rounded-lg group ${
                  index === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <img 
                  src={example.src} 
                  alt={example.label}
                  className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-sm">{example.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 border-t border-border/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {prevBrand ? (
              <Link 
                to={`/case-study/${prevBrand.slug}`}
                className="flex items-center gap-3 group"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:-translate-x-1 transition-all" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Previous</p>
                  <p className="text-foreground font-serif">{prevBrand.name}</p>
                </div>
              </Link>
            ) : <div />}
            
            {nextBrand ? (
              <Link 
                to={`/case-study/${nextBrand.slug}`}
                className="flex items-center gap-3 group text-right"
              >
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Next</p>
                  <p className="text-foreground font-serif">{nextBrand.name}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
            Ready for your transformation?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join the Associate to Empire™ community and build your brand infrastructure.
          </p>
          <Link 
            to="/#eligibility"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Check Your Eligibility
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudy;
