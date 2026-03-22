import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; value: string; score: number }[];
}

const questions: QuizQuestion[] = [
  {
    id: "revenue_source",
    question: "Where does most of your aesthetic revenue come from?",
    options: [
      { label: "Referrals & word of mouth", value: "referrals", score: 1 },
      { label: "Social media & content", value: "social", score: 2 },
      { label: "Paid ads (Meta, Google)", value: "paid", score: 3 },
      { label: "A coordinated system across all three", value: "system", score: 4 },
    ],
  },
  {
    id: "brand_perception",
    question: "How would patients describe your brand vs. competitors?",
    options: [
      { label: "They probably couldn't tell us apart", value: "undifferentiated", score: 1 },
      { label: "We're known locally but not beyond that", value: "local", score: 2 },
      { label: "We have a strong presence but it's inconsistent", value: "inconsistent", score: 3 },
      { label: "We're the obvious category leader in our market", value: "leader", score: 4 },
    ],
  },
  {
    id: "content_system",
    question: "How is your content created and deployed?",
    options: [
      { label: "We post when we remember to", value: "sporadic", score: 1 },
      { label: "In-house team or we do it ourselves", value: "diy", score: 2 },
      { label: "Agency handles it but it feels generic", value: "agency", score: 3 },
      { label: "Scripted, shot, and strategically deployed across channels", value: "strategic", score: 4 },
    ],
  },
  {
    id: "growth_ceiling",
    question: "What's your biggest growth bottleneck right now?",
    options: [
      { label: "Not enough new patient inquiries", value: "volume", score: 1 },
      { label: "Inquiries come in but don't convert to high-value cases", value: "conversion", score: 2 },
      { label: "Inconsistent months — feast or famine", value: "consistency", score: 3 },
      { label: "I've plateaued — I need a structural shift", value: "plateau", score: 4 },
    ],
  },
];

type ScoreTier = {
  label: string;
  headline: string;
  description: string;
  ctaText: string;
};

const getScoreTier = (score: number): ScoreTier => {
  if (score <= 6) return {
    label: "Foundation Stage",
    headline: "You're Leaving Significant Revenue on the Table",
    description: "Most practices at this stage are operating with fragmented systems. The good news: a structured partnership typically adds $500K+ in the first 12 months by fixing these exact gaps.",
    ctaText: "See How We'd Fix This",
  };
  if (score <= 10) return {
    label: "Growth Stage",
    headline: "You're Close — But Structure Is the Missing Piece",
    description: "You have traction, but without a unified system across brand, content, and conversion, you're likely hitting a ceiling. Practices at your stage typically see the fastest ROI from partnership.",
    ctaText: "Unlock Your Next Level",
  };
  if (score <= 14) return {
    label: "Acceleration Stage",
    headline: "You're Operating Well — But Not at Category-Leader Level Yet",
    description: "You've built something real. The question is whether you want to optimize or dominate. The top 1% of aesthetic practices operate with a level of infrastructure most never build.",
    ctaText: "Apply for Partnership",
  };
  return {
    label: "Elite Stage",
    headline: "You're Already in the Top Tier",
    description: "Very few practices operate at this level. If you're looking to maintain dominance while scaling further, the PASTED Partnership is designed specifically for practices like yours.",
    ctaText: "Talk to Us Directly",
  };
};

const PracticeQuizSection = () => {
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
      // Calculate score and go to capture
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

  return (
    <section className="py-16 md:py-24">
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
                  60-Second Assessment
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-4 leading-tight">
                  Where Does Your Practice<br />
                  <span className="text-muted-foreground/70">Actually Stand?</span>
                </h2>
                <p className="text-sm md:text-base text-muted-foreground/60 mb-8 max-w-md mx-auto">
                  4 questions. Instant scorecard. See how your growth infrastructure compares to the top-performing aesthetic practices.
                </p>
                <button
                  onClick={handleStart}
                  className="px-10 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-[0.2em] uppercase rounded-sm transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]"
                >
                  Take the Assessment
                </button>
                <p className="text-[10px] text-muted-foreground/40 mt-4">
                  No signup required to start · Results in 60 seconds
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
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">
                      Question {currentStep + 1} of {questions.length}
                    </span>
                    <span className="text-[10px] text-muted-foreground/40">
                      {Math.round(progressPercent)}%
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

                <h3 className="text-lg md:text-xl font-serif text-foreground mb-6 leading-snug">
                  {questions[currentStep].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentStep].options.map((option, i) => {
                    const isSelected = answers[questions[currentStep].id]?.value === option.value;
                    return (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        onClick={() => handleAnswer(questions[currentStep].id, option.value, option.score)}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-200 group ${
                          isSelected
                            ? "border-primary/60 bg-primary/10"
                            : "border-border/30 bg-card/30 hover:border-border/60 hover:bg-card/60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected ? "border-primary bg-primary" : "border-muted-foreground/30 group-hover:border-muted-foreground/50"
                          }`}>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-primary-foreground"
                              />
                            )}
                          </div>
                          <span className="text-sm md:text-base text-foreground/80">{option.label}</span>
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
                  Your Scorecard Is Ready
                </h3>
                <p className="text-sm text-muted-foreground/60 mb-6">
                  Enter your details below to see your personalized growth assessment.
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
                  {isSubmitting ? "Loading..." : "See My Results"}
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
                  className="text-center"
                >
                  {/* Score ring */}
                  <div className="relative w-28 h-28 mx-auto mb-6">
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
                      <span className="text-2xl font-serif font-bold text-foreground">{totalScore}</span>
                      <span className="text-[9px] text-muted-foreground/50">/ {maxScore}</span>
                    </div>
                  </div>

                  <p className="text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-2 font-medium">
                    {tier.label}
                  </p>
                  <h3 className="text-xl md:text-2xl font-serif text-foreground mb-3 leading-tight">
                    {tier.headline}
                  </h3>
                  <p className="text-sm text-muted-foreground/60 mb-8 max-w-md mx-auto leading-relaxed">
                    {tier.description}
                  </p>

                  <button
                    onClick={handleResultCTA}
                    className="px-10 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-[0.2em] uppercase rounded-sm transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]"
                  >
                    {tier.ctaText}
                  </button>

                  <p className="text-[10px] text-muted-foreground/40 mt-4">
                    Book a 45-min strategy call · 30 practices per year
                  </p>
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