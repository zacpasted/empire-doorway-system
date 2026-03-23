import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Dr. Marshall Hanson",
    role: "Founder, Marshall Hanson Method · Minnesota",
    quote: "Since working with PASTED, I've gone from being a well-kept secret to a nationally recognized brand. In one year, I went from doing zero veneer cases to now averaging 15–20 veneer cases per month — with patients flying in from across the country. They didn't just build my brand. They built the infrastructure that made this kind of growth possible. The content, the strategy, the paid acquisition — it all works together. And I never had to think about it. I just had to keep doing what I do best.",
  },
  {
    name: "Dr. Jon Marashi",
    role: "Celebrity Dentist, Los Angeles, CA",
    quote: "At this level, brand is not optional. It is fundamental. Zac and Alan understand this better than anyone I've worked with. Their taste, restraint, and execution are elite. If you are serious about building a real brand — one that lasts — I would not work with anyone else.",
  },
  {
    name: "Dr. Drew Ballard",
    role: "Celebrity Dentist, Phoenix, AZ · Founder, Halo Veneers & Halo Education",
    quote: "Halo did not scale by accident. The growth, the positioning, the clarity — it all came from a rock-solid foundation. Zac and Alan saw the vision early, protected it, and helped turn it into something far greater than I could have built alone.",
  },
  {
    name: "Dr. Brian Harris",
    role: "Celebrity Dentist, Gilbert, AZ · Founder, Smile Virtual & Smile Sculpt",
    quote: "This is an easy recommendation. If a doctor asks who they should trust with their brand, this is the answer. They understand dentists, but more importantly, they understand people. That combination is incredibly rare.",
  },
];

const FourTestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">What They Say</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
            From the dentists who've been through it.
          </h2>
        </motion.div>

        <div className="space-y-10">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              className="border-l-2 border-primary/30 pl-6 md:pl-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
            >
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed italic mb-4">
                "{t.quote}"
              </p>
              <footer>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FourTestimonialsSection;
