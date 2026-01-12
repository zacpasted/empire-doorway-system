import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getBrandBySlug, brands } from "@/data/brands";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import OptimizedImage from "@/components/ui/optimized-image";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
};

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
    <motion.div 
      key={slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      <StickyHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div {...fadeIn}>
            <Link 
              to="/#brands-showcase" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to showcase</span>
            </Link>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.p 
                variants={fadeInUp}
                className="text-sm uppercase tracking-widest text-muted-foreground mb-4"
              >
                Case Study
              </motion.p>
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6"
              >
                {brand.name}
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-foreground/80 font-serif italic mb-6"
              >
                {brand.tagline}
              </motion.p>
              <motion.p 
                variants={fadeInUp}
                className="text-muted-foreground leading-relaxed mb-8"
              >
                {brand.description}
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Clock className="w-4 h-4" />
                <span>{brand.timeline}</span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              {...scaleIn}
              className="relative"
            >
              <OptimizedImage 
                src={brand.thumbnail} 
                alt={brand.name}
                priority
                wrapperClassName="w-full aspect-[4/5] rounded-lg overflow-hidden"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="py-16 border-y border-border/30"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {brand.services.map((service, index) => (
              <motion.span 
                key={index}
                variants={{
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-4 py-2 bg-secondary/30 rounded-full text-sm text-foreground/80"
              >
                {service}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Challenge & Solution */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                The Challenge
              </h2>
              <p className="text-lg text-foreground/90 leading-relaxed">
                {brand.challenge}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                The Solution
              </h2>
              <p className="text-lg text-foreground/90 leading-relaxed">
                {brand.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="py-20 md:py-28 bg-secondary/20"
      >
        <div className="container max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-widest text-muted-foreground mb-8 text-center"
          >
            The Results
          </motion.h2>
          <motion.div 
            className="grid sm:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {brand.results.map((result, index) => (
              <motion.div 
                key={index}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 bg-background rounded-lg border border-border/30"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-primary font-medium">{index + 1}</span>
                  </div>
                  <p className="text-foreground/90">{result}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-widest text-muted-foreground mb-12 text-center"
          >
            Project Gallery
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
          >
            {brand.examples.map((example, index) => (
              <motion.div 
                key={index}
                variants={{
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className={`relative overflow-hidden rounded-lg group cursor-pointer ${
                  index === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <OptimizedImage 
                  src={example.src} 
                  alt={example.label}
                  wrapperClassName="w-full h-full aspect-square"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-sm">{example.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 border-t border-border/30"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {prevBrand ? (
              <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
                <Link 
                  to={`/case-study/${prevBrand.slug}`}
                  className="flex items-center gap-3 group"
                >
                  <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Previous</p>
                    <p className="text-foreground font-serif">{prevBrand.name}</p>
                  </div>
                </Link>
              </motion.div>
            ) : <div />}
            
            {nextBrand ? (
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link 
                  to={`/case-study/${nextBrand.slug}`}
                  className="flex items-center gap-3 group text-right"
                >
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Next</p>
                    <p className="text-foreground font-serif">{nextBrand.name}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              </motion.div>
            ) : <div />}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 md:py-28 bg-secondary/20"
      >
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
            Ready for your transformation?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join the Associate to Empire™ community and build your brand infrastructure.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to="/#eligibility-form"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Check Your Eligibility
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
};

export default CaseStudy;
