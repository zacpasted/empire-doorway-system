import { X } from "lucide-react";

const WhoThisIsForSection = () => {
  const notFor = [
    "Pasted is not for chasers.",
    "Not for loud marketers.",
    "Not for certificate collectors.",
    "Not for volume-first clinicians.",
    "Not for those who confuse attention with respect."
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-3xl mx-auto px-4">
        <p className="text-primary uppercase tracking-[0.3em] text-sm text-center mb-12">
          Who This Is Not For
        </p>
        
        <div className="space-y-4 mb-12">
          {notFor.map((item, index) => (
            <p key={index} className="text-lg md:text-xl text-foreground/80 text-center">
              {item}
            </p>
          ))}
        </div>

        <div className="h-px bg-border/50 my-12 max-w-xs mx-auto" />

        <div className="text-center space-y-4">
          <p className="text-lg text-foreground">
            This work requires restraint, taste, and patience.
          </p>
          <p className="text-xl font-serif text-primary">
            If you want noise, this is not the place.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoThisIsForSection;
