import { CheckCircle2 } from "lucide-react";
const problems = [{
  pain: "You're posting content but getting zero traction",
  insight: "Random posts don't build authority. Strategic positioning does."
}, {
  pain: "You feel invisible compared to louder, less qualified dentists",
  insight: "Visibility isn't about volume—it's about clarity and consistency."
}, {
  pain: "You don't have time to figure out content strategy",
  insight: "You shouldn't have to. That's exactly what we do."
}, {
  pain: "You're worried about looking 'too salesy' or inauthentic",
  insight: "The right positioning makes you magnetic—not desperate."
}, {
  pain: "You've tried agencies before and felt like just another client",
  insight: "We only work with dentists. We know your world inside out."
}, {
  pain: "You know you should be building a personal brand, but where do you start?",
  insight: "With a system built specifically for dental professionals like you."
}];
const ProblemsWeSolveSection = () => {
  return <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            We Understand
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">
            The Silent Struggles<br />
            <span className="text-primary">No One Talks About</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            You didn't go to dental school to become a content creator. 
            But in today's market, visibility is everything.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {problems.map((item, index) => <div key={index} className="group p-6 md:p-8 border border-border rounded-lg bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300">
              <p className="text-foreground text-lg md:text-xl font-medium mb-3 leading-relaxed">
                "{item.pain}"
              </p>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  {item.insight}
                </p>
              </div>
            </div>)}
        </div>

        {/* Industry Positioning */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl" />
          <div className="relative p-8 md:p-12 text-center border border-primary/20 rounded-2xl">
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-6">
              Why PASTED
            </p>
            <h3 className="text-2xl md:text-4xl font-serif text-foreground mb-6">
              The Only Brand Agency Built<br />
              <span className="text-primary">Exclusively for Dentists</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
              While other agencies juggle fitness influencers, e-commerce brands, and whoever else walks through the door—we've spent years mastering one thing: 
              <span className="text-foreground font-medium"> building personal brands for dental professionals.</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-serif text-primary mb-1">97%</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Client retention </p>
              </div>
              <div className="hidden md:block w-px h-16 bg-border" />
              <div>
                <p className="text-3xl md:text-4xl font-serif text-primary mb-1">$100,000,000+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Generated </p>
              </div>
              <div className="hidden md:block w-px h-16 bg-border" />
              <div>
                <p className="text-3xl md:text-4xl font-serif text-primary mb-1">$5M</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ProblemsWeSolveSection;