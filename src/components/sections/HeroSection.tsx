import VideoPlayer from "@/components/VideoPlayer";
import EligibilityForm from "@/components/EligibilityForm";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen py-16 md:py-24">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Brand mark */}
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 animate-fade-up opacity-0 delay-100">
            PASTED
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6 animate-fade-up opacity-0 delay-200">
            The Operating System for Aesthetic Dentists<br />
            <span className="text-primary">Who Refuse to Be Anonymous.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-up opacity-0 delay-300 mb-8">
            From trained but invisible to chosen, trusted, and known.
          </p>
          
          <p className="text-base text-foreground/70 max-w-2xl mx-auto animate-fade-up opacity-0 delay-400">
            Not louder. Not busier. Not cheaper.<br />
            <span className="text-foreground font-medium">Clearer. Recognised. Selected.</span>
          </p>
        </div>

        {/* VSL */}
        <div className="mb-16 md:mb-20 animate-fade-up opacity-0 delay-400">
          <VideoPlayer />
        </div>

        {/* Eligibility Form */}
        <div className="max-w-2xl mx-auto animate-fade-up opacity-0 delay-500">
          <EligibilityForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
