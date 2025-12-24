import { Check, X } from "lucide-react";

const WhoThisIsForSection = () => {
  const forYou = [
    "You are an associate or young owner",
    "You know visibility matters now",
    "You want to be recognized, trusted, and referred",
    "You value structure and guidance",
  ];

  const notForYou = [
    "You want shortcuts or hacks",
    "You want to stay invisible",
    "You are unwilling to show up at all",
    "You are looking for cheap templates",
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* For You */}
          <div>
            <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-8">
              This is for you if:
            </h3>
            <ul className="space-y-4">
              {forYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </span>
                  <span className="text-lg text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For You */}
          <div>
            <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-8">
              This is not for you if:
            </h3>
            <ul className="space-y-4">
              {notForYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </span>
                  <span className="text-lg text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoThisIsForSection;
