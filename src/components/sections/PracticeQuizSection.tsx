import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: { label: string; value: string; score: number }[];
}

const questions: QuizQuestion[] = [
  // ── Brand & Positioning ──
  {
    id: "brand_perception",
    category: "Brand & Positioning",
    question: "If a high-value patient Googled you right now, would your online presence convince them you're the best in your market?",
    options: [
      { label: "Honestly, no — our online presence doesn't reflect our clinical quality", value: "weak", score: 1 },
      { label: "It's decent, but nothing that would make someone choose us over competitors", value: "average", score: 2 },
      { label: "We look professional, but we don't stand out as the clear leader", value: "good", score: 3 },
      { label: "Absolutely — our brand is unmistakable and commands premium perception", value: "elite", score: 4 },
    ],
  },
  {
    id: "differentiation",
    category: "Brand & Positioning",
    question: "What makes your practice genuinely different from every other cosmetic dentist within 30 miles?",
    options: [
      { label: "I'm not sure we have a clear differentiator beyond clinical skill", value: "none", score: 1 },
      { label: "We have a vague positioning but haven't articulated it well", value: "vague", score: 2 },
      { label: "We know our niche but haven't built a brand around it yet", value: "aware", score: 3 },
      { label: "We own a specific category and everything we do reinforces it", value: "owned", score: 4 },
    ],
  },
  // ── Content & Visibility ──
  {
    id: "content_system",
    category: "Content & Visibility",
    question: "How is your content currently being created and published?",
    options: [
      { label: "We post when we remember to — no real system", value: "sporadic", score: 1 },
      { label: "We or our team handle it in-house, but it's inconsistent", value: "diy", score: 2 },
      { label: "An agency handles it, but the content feels generic and templated", value: "agency", score: 3 },
      { label: "Every piece is strategically scripted, produced, and deployed across channels", value: "strategic", score: 4 },
    ],
  },
  {
    id: "video_presence",
    category: "Content & Visibility",
    question: "How comfortable are you on camera, and how often does video drive new patients?",
    options: [
      { label: "I avoid video — it feels awkward and we rarely post any", value: "avoids", score: 1 },
      { label: "I've done a few videos but they don't perform well or feel authentic", value: "dabbling", score: 2 },
      { label: "We produce regular video content but haven't cracked virality or conversion", value: "regular", score: 3 },
      { label: "Video is our #1 growth driver — patients literally say 'I found you on Instagram/YouTube'", value: "engine", score: 4 },
    ],
  },
  // ── Revenue & Conversion ──
  {
    id: "revenue_source",
    category: "Revenue & Conversion",
    question: "Where does most of your high-value aesthetic revenue actually come from?",
    options: [
      { label: "Referrals and word of mouth — it's unpredictable month to month", value: "referrals", score: 1 },
      { label: "A mix of social and referrals, but nothing we can reliably scale", value: "mixed", score: 2 },
      { label: "Paid ads bring volume, but case quality and close rates are inconsistent", value: "paid", score: 3 },
      { label: "A coordinated system across organic, paid, and referrals that compounds monthly", value: "system", score: 4 },
    ],
  },
  {
    id: "case_acceptance",
    category: "Revenue & Conversion",
    question: "When a $30K–$80K case walks in, what's your close rate?",
    options: [
      { label: "Low — most patients ghost or go elsewhere after the consult", value: "low", score: 1 },
      { label: "Maybe 30–40% — we close some but lose too many we should land", value: "moderate", score: 2 },
      { label: "Around 50–60% — we're decent but know we're leaving money on the table", value: "solid", score: 3 },
      { label: "70%+ — our consult-to-close process is dialed and patients sell themselves", value: "elite", score: 4 },
    ],
  },
  // ── Operations & Scale ──
  {
    id: "team_leverage",
    category: "Operations & Scale",
    question: "How dependent is your practice's growth on you personally?",
    options: [
      { label: "100% dependent — if I stop, everything stops", value: "founder_dependent", score: 1 },
      { label: "Mostly me, with some team support on admin and clinical", value: "mostly_me", score: 2 },
      { label: "I've delegated operations but marketing and growth still need me", value: "partial", score: 3 },
      { label: "I focus on clinical excellence — growth, brand, and ops run without me", value: "leveraged", score: 4 },
    ],
  },
  {
    id: "growth_ceiling",
    category: "Operations & Scale",
    question: "What's the real bottleneck preventing your next $500K in revenue?",
    options: [
      { label: "Not enough new patient inquiries to fill the schedule", value: "volume", score: 1 },
      { label: "Inquiries come in but they're low-quality or don't convert to big cases", value: "conversion", score: 2 },
      { label: "Inconsistent months — great months followed by dead ones", value: "consistency", score: 3 },
      { label: "I've plateaued structurally — I need to rebuild the machine, not just optimize tactics", value: "plateau", score: 4 },
    ],
  },
];

const categories = ["Brand & Positioning", "Content & Visibility", "Revenue & Conversion", "Operations & Scale"];

type ScoreTier = {
  label: string;
  headline: string;
  description: string;
  ctaText: string;
};

const getScoreTier = (score: number): ScoreTier => {
  const maxScore = questions.length * 4; // 32
  const pct = score / maxScore;

  if (pct <= 0.3) return {
    label: "Foundation Stage",
    headline: "You're Leaving $500K+ on the Table Every Year",
    description: "Your clinical skills aren't the problem — it's the infrastructure around them. The practices dominating your market aren't better dentists. They have better systems. A structured partnership typically adds $500K–$1M in year one by fixing these exact gaps.",
    ctaText: "See How We'd Fix This",
  };
  if (pct <= 0.55) return {
    label: "Growth Stage",
    headline: "You Have Traction — But You're Hitting a Ceiling",
    description: "You've built something real, but without a unified system across brand, content, and conversion, you're capped. Practices at your stage typically see the fastest ROI from partnership because the foundation exists — it just needs architecture.",
    ctaText: "Unlock Your Next Level",
  };
  if (pct <= 0.8) return {
    label: "Acceleration Stage",
    headline: "You're Good — But 'Good' Isn't 'Category Leader'",
    description: "You're operating well above average. The question is whether you want to optimize incrementally or dominate your market entirely. The top 1% of aesthetic practices operate with a level of brand infrastructure most never build.",
    ctaText: "Book Discovery Call",
  };
  return {
    label: "Elite Stage",
    headline: "You're Already in Rare Air",
    description: "Very few practices score this high. You've built real systems. If you're looking to maintain dominance, scale to new markets, or build a personal brand that transcends dentistry — the PASTED Partnership exists for exactly this.",
    ctaText: "Talk to Us Directly",
  };
};

const getCategoryScore = (answers: Record<string, { value: string; score: number }>, category: string) => {
  const categoryQuestions = questions.filter(q => q.category === category);
  const maxCat = categoryQuestions.length * 4;
  const scored = categoryQuestions.reduce((sum, q) => sum + (answers[q.id]?.score || 0), 0);
  return { scored, max: maxCat, pct: Math.round((scored / maxCat) * 100) };
};

const getCategoryVerdict = (pct: number): { label: string; color: string } => {
  if (pct <= 37) return { label: "Needs Work", color: "text-red-400" };
  if (pct <= 62) return { label: "Developing", color: "text-yellow-400" };
  if (pct <= 87) return { label: "Strong", color: "text-emerald-400" };
  return { label: "Elite", color: "text-primary" };
};

const PracticeQuizSection = () => {
  // Quiz section with diagnostic anchor ID
  const [currentStep, setCurrentStep] = useState<"intro" | number | "capture" | "result">("intro");
  const [answers, setAnswers] = useState<Record<string, { value: string; score: number }>>({});
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const handleStart = () => {
    trackCTAClick({ ctaId: "quiz-start", ctaText: "Take the Quiz", section: "practice-quiz" });
    setCurrentStep(0);
  };

  const handleAnswer = useCallback((questionId: string, value: string, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: { value, score } }));
    
    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex < questions.length - 1) {
      setTimeout(() => setCurrentStep(questionIndex + 1), 300);
    } else {
      const newAnswers = { ...answers, [questionId]: { value, score } };
      const total = Object.values(newAnswers).reduce((sum, a) => sum + a.score, 0);
      setTotalScore(total);
      setTimeout(() => setCurrentStep("capture"), 300);
    }
  }, [answers]);

  const handleSubmitLead = async () => {
    if (!firstName.trim() || !email.trim()) return;
    
    setIsSubmitting(true);
    const tier = getScoreTier(totalScore);
    
    try {
      const sessionId = sessionStorage.getItem('cta_session_id') || crypto.randomUUID();
      await (supabase.from('quiz_submissions') as any).insert({
        first_name: firstName.trim(),
        email: email.trim(),
        score: totalScore,
        score_label: tier.label,
        answers: Object.fromEntries(Object.entries(answers).map(([k, v]) => [k, v.value])),
        session_id: sessionId,
        page_url: window.location.pathname,
        user_agent: navigator.userAgent,
        viewport_width: window.innerWidth,
      });
    } catch {
      // Silently continue
    }
    
    trackCTAClick({ ctaId: "quiz-complete", ctaText: tier.label, section: "practice-quiz" });
    setIsSubmitting(false);
    setCurrentStep("result");
  };

  const handleResultCTA = () => {
    const tier = getScoreTier(totalScore);
    trackCTAClick({ ctaId: "quiz-result-cta", ctaText: tier.ctaText, section: "practice-quiz" });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const progressPercent = typeof currentStep === "number" 
    ? ((currentStep + 1) / questions.length) * 100 
    : currentStep === "capture" ? 100 
    : 0;

  const currentCategory = typeof currentStep === "number" ? questions[currentStep].category : null;

  return (
    <section id="diagnostic" className="py-16 md:py-24">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-10 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* INTRO */}
            {currentStep === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-primary/70 mb-4 font-medium">
                  Practice Growth Diagnostic
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-4 leading-tight">
                  Where Does Your Practice<br />
                  <span className="text-muted-foreground/70">Actually Stand?</span>
                </h2>
                <p className="text-sm md:text-base text-muted-foreground/60 mb-3 max-w-md mx-auto">
                  8 diagnostic questions across 4 growth pillars. Get a detailed scorecard showing exactly where you're strong — and where you're bleeding revenue.
                </p>

                {/* Category preview */}
                <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto mb-8">
                  {categories.map((cat) => (
                    <div key={cat} className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground/40 py-2 px-3 border border-border/20 rounded-md">
                      {cat}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleStart}
                  className="px-10 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-[0.2em] uppercase rounded-sm transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]"
                >
                  Start the Diagnostic
                </button>
                <p className="text-[10px] text-muted-foreground/40 mt-4">
                  No signup required to start · Results in 2 minutes
                </p>
              </motion.div>
            )}

            {/* QUESTIONS */}
            {typeof currentStep === "number" && (
              <motion.div
                key={`q-${currentStep}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-primary/60 font-medium">
                      {currentCategory}
                    </span>
                    <span className="text-[10px] text-muted-foreground/40">
                      {currentStep + 1} / {questions.length}
                    </span>
                  </div>
                  <div className="h-0.5 bg-border/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary/70 rounded-full"
                      initial={{ width: `${((currentStep) / questions.length) * 100}%` }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <h3 className="text-base md:text-lg font-serif text-foreground mb-6 leading-snug">
                  {questions[currentStep].question}
                </h3>

                <div className="space-y-2.5">
                  {questions[currentStep].options.map((option, i) => {
                    const isSelected = answers[questions[currentStep].id]?.value === option.value;
                    return (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.3 }}
                        onClick={() => handleAnswer(questions[currentStep].id, option.value, option.score)}
                        className={`w-full text-left p-3.5 rounded-lg border transition-all duration-200 group ${
                          isSelected
                            ? "border-primary/60 bg-primary/10"
                            : "border-border/30 bg-card/30 hover:border-border/60 hover:bg-card/60"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected ? "border-primary bg-primary" : "border-muted-foreground/30 group-hover:border-muted-foreground/50"
                          }`}>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-1.5 h-1.5 rounded-full bg-primary-foreground"
                              />
                            )}
                          </div>
                          <span className="text-[13px] md:text-sm text-foreground/80 leading-snug">{option.label}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* LEAD CAPTURE */}
            {currentStep === "capture" && (
              <motion.div
                key="capture"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2">
                  Your Diagnostic Is Ready
                </h3>
                <p className="text-sm text-muted-foreground/60 mb-6">
                  See your score across all 4 growth pillars — plus a personalized growth assessment.
                </p>

                <div className="max-w-sm mx-auto space-y-3 mb-6">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    maxLength={100}
                    className="w-full px-4 py-3 bg-background/50 border border-border/40 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    className="w-full px-4 py-3 bg-background/50 border border-border/40 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <button
                  onClick={handleSubmitLead}
                  disabled={!firstName.trim() || !email.trim() || isSubmitting}
                  className="w-full max-w-sm mx-auto block px-8 py-3.5 bg-primary text-primary-foreground text-sm font-medium tracking-[0.15em] uppercase rounded-sm transition-all duration-200 hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Loading..." : "See My Full Diagnostic"}
                </button>

                <p className="text-[9px] text-muted-foreground/30 mt-4">
                  We respect your privacy. No spam, ever.
                </p>
              </motion.div>
            )}

            {/* RESULTS */}
            {currentStep === "result" && (() => {
              const tier = getScoreTier(totalScore);
              const maxScore = questions.length * 4;
              const percent = Math.round((totalScore / maxScore) * 100);
              return (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Score ring + overall */}
                  <div className="text-center mb-8">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="4" opacity="0.2" />
                        <motion.circle
                          cx="50" cy="50" r="42" fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 42}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - percent / 100) }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-serif font-bold text-foreground">{totalScore}</span>
                        <span className="text-[9px] text-muted-foreground/50">/ {maxScore}</span>
                      </div>
                    </div>

                    <p className="text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-2 font-medium">
                      {tier.label}
                    </p>
                    <h3 className="text-lg md:text-xl font-serif text-foreground mb-2 leading-tight">
                      {tier.headline}
                    </h3>
                    <p className="text-sm text-muted-foreground/60 max-w-md mx-auto leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Category breakdown */}
                  <div className="space-y-3 mb-8">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 mb-1">
                      Pillar Breakdown
                    </p>
                    {categories.map((cat, i) => {
                      const catData = getCategoryScore(answers, cat);
                      const verdict = getCategoryVerdict(catData.pct);
                      return (
                        <motion.div
                          key={cat}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                          className="flex items-center gap-3 p-3 rounded-lg border border-border/20 bg-card/30"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-medium text-foreground/80 truncate">{cat}</span>
                              <span className={`text-[10px] tracking-[0.1em] uppercase font-medium ${verdict.color}`}>
                                {verdict.label}
                              </span>
                            </div>
                            <div className="h-1 bg-border/20 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-primary/60 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${catData.pct}%` }}
                                transition={{ duration: 0.8, delay: 0.7 + i * 0.15, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground/50 tabular-nums w-10 text-right">
                            {catData.scored}/{catData.max}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <button
                      onClick={handleResultCTA}
                      className="px-10 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-[0.2em] uppercase rounded-sm transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]"
                    >
                      {tier.ctaText}
                    </button>

                    <p className="text-[10px] text-muted-foreground/40 mt-4">
                      Book a 45-min strategy call · 30 practices per year
                    </p>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PracticeQuizSection;
