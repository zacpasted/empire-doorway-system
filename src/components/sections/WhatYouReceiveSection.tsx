import { motion } from "framer-motion";
import { Film, Palette, Smartphone, FileText, Calendar, Target, Scissors, Clock, CheckCircle2, Sparkles } from "lucide-react";

const WhatYouReceiveSection = () => {
  const deliverables = [
    {
      category: "30+ Pieces of Creative / Month",
      icon: Film,
      accent: "from-primary/20 to-primary/5",
      items: [
        { icon: Sparkles, text: "30+ monthly creative assets — video, storytelling, ad content", highlight: true },
        { icon: Palette, text: "On-location production shoots — we fly to your practice" },
        { icon: Smartphone, text: "Platform-optimized for organic reach & paid campaigns" },
      ],
    },
    {
      category: "Full Ads & Growth Engine",
      icon: Target,
      accent: "from-primary/15 to-transparent",
      items: [
        { icon: Target, text: "Complete paid media strategy, build & management", highlight: true },
        { icon: FileText, text: "Ad creative produced from your storytelling assets" },
        { icon: Calendar, text: "Revenue attribution & real-time performance reporting" },
      ],
    },
    {
      category: "Hospitality & Conversion",
      icon: Scissors,
      accent: "from-primary/20 to-primary/5",
      items: [
        { icon: Scissors, text: "Hospitality-driven patient experience design", highlight: true },
        { icon: Clock, text: "Consultation & treatment presentation systems" },
        { icon: CheckCircle2, text: "CRM workflows, follow-up sequences & team training" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="py-32 md:py-48 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xs uppercase text-primary/80 mb-6"
          >
            The Delivery
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            What You{" "}
            <span className="italic text-muted-foreground">Receive</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            30+ pieces of creative per month. Full ad management. On-location shoots. One in-house team with the highest insider knowledge in aesthetic dentistry.
          </motion.p>
        </motion.div>

        {/* Deliverables grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {deliverables.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: groupIndex * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group"
            >
              {/* Card glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 h-full overflow-hidden">
                {/* Top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${group.accent}`} />
                
                {/* Animated corner decoration */}
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-lg"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: groupIndex * 0.5 }}
                />

                {/* Category header */}
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <group.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-playfair text-xl font-bold text-foreground">
                      {group.category}
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary/50 to-transparent mt-1" />
                  </div>
                </div>

                {/* Items */}
                <motion.ul
                  variants={containerVariants}
                  className="space-y-5"
                >
                  {group.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      variants={itemVariants}
                      className="flex items-start gap-3 group/item"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className={`mt-0.5 p-1.5 rounded-lg ${
                          item.highlight 
                            ? "bg-primary/20 text-primary" 
                            : "bg-muted/50 text-muted-foreground"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                      </motion.div>
                      <span className={`${
                        item.highlight 
                          ? "text-foreground font-medium" 
                          : "text-foreground/70"
                      } group-hover/item:text-foreground transition-colors`}>
                        {item.text}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Bottom ambient glow */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-to-t from-primary/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center relative"
        >
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-8"
          />
          
          <motion.p
            className="text-lg md:text-xl text-muted-foreground font-playfair italic"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            One team. Full ownership. Real results. No agencies. No handoffs. No surprises.
          </motion.p>

          {/* Animated checkmarks */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-8 mt-8"
          >
            {["On-location shoots", "Full ad management", "Hospitality-led conversion", "Revenue attribution"].map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatYouReceiveSection;
