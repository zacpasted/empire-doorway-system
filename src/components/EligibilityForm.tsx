import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  // Contact Info (Step 1)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Core Eligibility
  currentRole: string;
  yearsInPractice: string;
  realCost: string[];
  realCostOther: string;
  brandMaturity: string;
  visibility: string;
  alignment: string;
  friction: string;
  commitment: string;
  // Future Direction
  careerHorizon: string;
  importantAreas: string[];
  readiness: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  currentRole: "",
  yearsInPractice: "",
  realCost: [],
  realCostOther: "",
  brandMaturity: "",
  visibility: "",
  alignment: "",
  friction: "",
  commitment: "",
  careerHorizon: "",
  importantAreas: [],
  readiness: "",
};

const EligibilityForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const { toast } = useToast();

  const totalSteps = 12;

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: keyof FormData, value: string) => {
    const current = formData[field] as string[];
    if (current.includes(value)) {
      updateField(field, current.filter((v) => v !== value));
    } else {
      updateField(field, [...current, value]);
    }
  };

  const savePartialSubmission = async () => {
    try {
      if (submissionId) {
        // Update existing submission
        const { error } = await supabase
          .from('eligibility_submissions')
          .update({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone || null,
            role_type: formData.currentRole || null,
            years_in_practice: formData.yearsInPractice || null,
            real_cost: formData.realCost.length > 0 ? formData.realCost : null,
            real_cost_other: formData.realCostOther || null,
            brand_maturity: formData.brandMaturity || null,
            visibility: formData.visibility || null,
            alignment: formData.alignment || null,
            friction: formData.friction || null,
            commitment: formData.commitment || null,
            career_horizon: formData.careerHorizon || null,
            important_areas: formData.importantAreas.length > 0 ? formData.importantAreas : null,
            readiness: formData.readiness || null,
            last_completed_step: step,
            is_partial: true,
          })
          .eq('id', submissionId);

        if (error) throw error;
      } else {
        // Create new submission
        const { data, error } = await supabase
          .from('eligibility_submissions')
          .insert({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone || null,
            last_completed_step: step,
            is_partial: true,
          })
          .select('id')
          .single();

        if (error) throw error;
        if (data) setSubmissionId(data.id);
      }
      
      console.log("Partial submission saved");
    } catch (error) {
      console.error("Error saving partial submission:", error);
    }
  };

  const saveCompleteSubmission = async () => {
    try {
      if (submissionId) {
        const { error } = await supabase
          .from('eligibility_submissions')
          .update({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone || null,
            role_type: formData.currentRole || null,
            years_in_practice: formData.yearsInPractice || null,
            real_cost: formData.realCost.length > 0 ? formData.realCost : null,
            real_cost_other: formData.realCostOther || null,
            brand_maturity: formData.brandMaturity || null,
            visibility: formData.visibility || null,
            alignment: formData.alignment || null,
            friction: formData.friction || null,
            commitment: formData.commitment || null,
            career_horizon: formData.careerHorizon || null,
            important_areas: formData.importantAreas.length > 0 ? formData.importantAreas : null,
            readiness: formData.readiness || null,
            last_completed_step: totalSteps,
            is_partial: false,
          })
          .eq('id', submissionId);

        if (error) throw error;
      } else {
        // Create complete submission directly
        const { error } = await supabase
          .from('eligibility_submissions')
          .insert({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone || null,
            role_type: formData.currentRole || null,
            years_in_practice: formData.yearsInPractice || null,
            real_cost: formData.realCost.length > 0 ? formData.realCost : null,
            real_cost_other: formData.realCostOther || null,
            brand_maturity: formData.brandMaturity || null,
            visibility: formData.visibility || null,
            alignment: formData.alignment || null,
            friction: formData.friction || null,
            commitment: formData.commitment || null,
            career_horizon: formData.careerHorizon || null,
            important_areas: formData.importantAreas.length > 0 ? formData.importantAreas : null,
            readiness: formData.readiness || null,
            last_completed_step: totalSteps,
            is_partial: false,
          });

        if (error) throw error;
      }
      
      console.log("Complete submission saved");
    } catch (error) {
      console.error("Error saving complete submission:", error);
      throw error;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: 
        return formData.firstName.trim() !== "" && 
               formData.lastName.trim() !== "" && 
               formData.email.trim() !== "" &&
               formData.email.includes("@");
      case 2: return formData.currentRole !== "";
      case 3: return formData.yearsInPractice !== "";
      case 4: return formData.realCost.length > 0;
      case 5: return formData.brandMaturity !== "";
      case 6: return formData.visibility !== "";
      case 7: return formData.alignment !== "";
      case 8: return formData.friction !== "";
      case 9: return formData.commitment !== "";
      case 10: return formData.careerHorizon !== "";
      case 11: return formData.importantAreas.length > 0;
      case 12: return formData.readiness !== "";
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      await saveCompleteSubmission();
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    // Save partial submission after every step to capture progress
    if (step < totalSteps) {
      await savePartialSubmission();
    }
    
    if (step === totalSteps) {
      handleSubmit();
    } else {
      setStep((s) => Math.min(s + 1, totalSteps));
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  if (isSubmitted) {
    return <ConfirmationScreen />;
  }

  return (
    <div className="bg-card rounded-lg p-8 md:p-12 shadow-sm max-w-2xl mx-auto">
      <div className="text-center mb-8 pb-6 border-b border-border">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
          See If You Qualify
        </h2>
        <p className="text-muted-foreground text-sm">
          Associate to Empire by PASTED was built to bring cutting-edge branding and content to dentistry's future stars.
          <br className="block" />
          <span className="block mt-2">Now accepting driven associates and new owners.</span>
        </p>
      </div>
      
      <ProgressBar current={step} total={totalSteps} />
      <div className="mt-8 min-h-[320px]">
        <QuestionRenderer
          step={step}
          formData={formData}
          updateField={updateField}
          toggleArrayField={toggleArrayField}
        />
      </div>
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        {step > 1 ? (
          <Button
            variant="ghost"
            onClick={prevStep}
            className="text-muted-foreground hover:text-foreground"
          >
            Back
          </Button>
        ) : (
          <div />
        )}
        <Button
          variant="premium"
          onClick={nextStep}
          disabled={!canProceed() || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : step === totalSteps ? "Submit Request" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs text-muted-foreground">
      <span>Question {current} of {total}</span>
      <span>{Math.round((current / total) * 100)}%</span>
    </div>
    <div className="h-1 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  </div>
);

const ConfirmationScreen = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="text-center space-y-8 animate-fade-up max-w-2xl mx-auto py-8">
      <div className="space-y-2">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
          Final Step to Proceed
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-foreground">
          Request Received
        </h2>
      </div>

      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Your request for consideration into Associate to Empire™ has been reviewed and provisionally accepted.
        </p>
        <p>
          The final step is a brief alignment conversation with <span className="text-foreground">Zac Orender</span>.
        </p>
        <p className="text-sm">
          This conversation exists to confirm strategic fit, maturity, and trajectory.
          <br />
          <span className="text-foreground/80">It is not a sales call.</span>
        </p>
      </div>

      <div className="py-6 space-y-4">
        <h3 className="text-lg font-serif text-foreground">
          Secure Your Conversation
        </h3>
        <p className="text-sm text-muted-foreground">
          Please schedule your conversation using the calendar below.
        </p>
        
        <div 
          className="calendly-inline-widget rounded-lg overflow-hidden border border-border" 
          data-url="https://calendly.com/getpasted/pasted-partner-discovery?primary_color=ff0000"
          style={{ minWidth: '320px', height: '700px' }}
        />
        
        <p className="text-xs text-muted-foreground">
          Availability is intentionally limited.
        </p>
      </div>

      <div className="bg-background/50 rounded-lg p-6 text-left space-y-4 border border-border">
        <h4 className="font-serif text-foreground text-sm">Capacity Notice</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Associate to Empire™ is approaching waitlist capacity.
          <br />
          Unbooked approvals may be released as remaining space tightens.
        </p>
      </div>

      <div className="space-y-4 text-left bg-card rounded-lg p-6 border border-border">
        <h4 className="font-serif text-foreground text-sm">Expectations</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This time is reserved for individuals who value clarity, preparation, and decisiveness.
          Please book only if you can arrive on time, be fully present, and engage thoughtfully.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This is a professional evaluation, not an exploratory discussion.
        </p>
      </div>

      <div className="space-y-4 text-left">
        <h4 className="font-serif text-foreground text-sm">Rescheduling & Attendance Policy</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          If rescheduling is necessary, it must be done no less than 24 hours in advance using the link in your calendar confirmation.
          Requests within 24 hours may result in forfeiture of your spot.
          Missed calls are not rescheduled.
        </p>
        <p className="text-xs text-muted-foreground/70">
          This policy is firm and intentional.
        </p>
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="font-serif text-foreground text-sm mb-2">Final Note</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This conversation is designed to be precise and conclusive.
          <br />
          If alignment exists, next steps will be outlined clearly.
          <br />
          If it does not, you will leave with direction and clarity.
        </p>
        <p className="text-sm text-foreground/80 mt-4">
          Proceed only if you are prepared for either outcome.
        </p>
      </div>
    </div>
  );
};

interface QuestionRendererProps {
  step: number;
  formData: FormData;
  updateField: (field: keyof FormData, value: string | string[]) => void;
  toggleArrayField: (field: keyof FormData, value: string) => void;
}

const QuestionRenderer = ({ step, formData, updateField, toggleArrayField }: QuestionRendererProps) => {
  const questionClass = "animate-fade-up space-y-6";

  switch (step) {
    case 1:
      return (
        <div className={questionClass}>
          <QuestionHeader
            number={1}
            section="Contact Information"
            title="Your Details"
            subtitle="We'll use this to follow up on your request."
          />
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm text-muted-foreground">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  placeholder="First name"
                  className="bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm text-muted-foreground">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  placeholder="Last name"
                  className="bg-background"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@example.com"
                className="bg-background"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm text-muted-foreground">Phone (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="(555) 123-4567"
                className="bg-background"
              />
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className={questionClass}>
          <QuestionHeader
            number={2}
            section="Core Eligibility"
            title="Current Role"
            subtitle="Which best describes you right now?"
          />
          <RadioGroup
            value={formData.currentRole}
            onValueChange={(v) => updateField("currentRole", v)}
            className="space-y-3"
          >
            <RadioOption value="associate" label="Associate" />
            <RadioOption value="associate-ownership" label="Associate with ownership path" />
            <RadioOption value="early-owner" label="Early-stage owner" />
            <RadioOption value="established-owner" label="Established owner" />
          </RadioGroup>
        </div>
      );

    case 3:
      return (
        <div className={questionClass}>
          <QuestionHeader
            number={3}
            section="Core Eligibility"
            title="Years in Practice"
            subtitle="How long have you been practicing?"
          />
          <RadioGroup
            value={formData.yearsInPractice}
            onValueChange={(v) => updateField("yearsInPractice", v)}
            className="space-y-3"
          >
            <RadioOption value="0-2" label="0–2 years" />
            <RadioOption value="3-5" label="3–5 years" />
            <RadioOption value="6-10" label="6–10 years" />
            <RadioOption value="10+" label="10+ years" />
          </RadioGroup>
        </div>
      );

    case 4:
      return (
        <div className={questionClass}>
          <QuestionHeader
            number={4}
            section="Core Eligibility"
            title="The Real Cost"
            subtitle="What feels most expensive about remaining where you are for the next 3–5 years?"
          />
          <div className="space-y-3">
            <CheckboxOption
              checked={formData.realCost.includes("unknown")}
              onCheckedChange={() => toggleArrayField("realCost", "unknown")}
              label="Being unknown"
            />
            <CheckboxOption
              checked={formData.realCost.includes("replaceable")}
              onCheckedChange={() => toggleArrayField("realCost", "replaceable")}
              label="Being replaceable"
            />
            <CheckboxOption
              checked={formData.realCost.includes("leverage")}
              onCheckedChange={() => toggleArrayField("realCost", "leverage")}
              label="Lack of leverage"
            />
            <CheckboxOption
              checked={formData.realCost.includes("direction")}
              onCheckedChange={() => toggleArrayField("realCost", "direction")}
              label="Unclear direction"
            />
            <div className="pt-2">
              <Label className="text-sm text-muted-foreground">Other</Label>
              <Input
                value={formData.realCostOther}
                onChange={(e) => updateField("realCostOther", e.target.value)}
                placeholder="Optional..."
                className="bg-background mt-1"
              />
            </div>
          </div>
        </div>
      );

    case 5:
      return (
        <div className={questionClass}>
          <QuestionHeader
            number={5}
            section="Core Eligibility"
            title="Brand Maturity"
            subtitle="Which statement feels most accurate right now?"
          />
          <RadioGroup
            value={formData.brandMaturity}
            onValueChange={(v) => updateField("brandMaturity", v)}
            className="space-y-3"
          >
            <RadioOption value="tactics" label="I need better tactics" />
            <RadioOption value="clarity" label="I need more clarity" />
            <RadioOption value="leverage" label="I need leverage" />
            <RadioOption value="confidence" label="I need confidence" />
          </RadioGroup>
        </div>
      );

    case 6:
      return (
        <div className={questionClass}>
          <QuestionHeader
            number={6}
            section="Core Eligibility"
            title="Relationship With Visibility"
            subtitle="Which best describes you today?"
          />
          <RadioGroup
            value={formData.visibility}
            onValueChange={(v) => updateField("visibility", v)}
            className="space-y-3"
          >
            <RadioOption value="comfortable-inconsistent" label="Comfortable but inconsistent" />
            <RadioOption value="uncomfortable-willing" label="Uncomfortable but willing" />
            <RadioOption value="strategic-unsupported" label="Strategic but unsupported" />
            <RadioOption value="avoidant" label="Avoidant" />
          </RadioGroup>
        </div>
      );

    case 7:
      return (
        <div className={questionClass}>
          <QuestionHeader
            number={7}
            section="Core Eligibility"
            title="Alignment"
            subtitle="Associate to Empire™ prioritizes identity, authority, and long-term positioning over speed or virality. Does that align with how you think about growth?"
          />
          <RadioGroup
            value={formData.alignment}
            onValueChange={(v) => updateField("alignment", v)}
            className="space-y-3"
          >
            <RadioOption value="yes" label="Yes" />
            <RadioOption value="no" label="No" />
            <RadioOption value="unsure" label="Unsure" />
          </RadioGroup>
        </div>
      );

    case 8:
      return (
        <div className={questionClass}>
          <QuestionHeader
            number={8}
            section="Core Eligibility"
            title="Friction Test"
            subtitle="Which would frustrate you most?"
          />
          <RadioGroup
            value={formData.friction}
            onValueChange={(v) => updateField("friction", v)}
            className="space-y-3"
          >
            <RadioOption value="slow-progress" label="Slow, deliberate progress" />
            <RadioOption value="no-guarantees" label="Lack of guarantees" />
            <RadioOption value="high-standards" label="High standards" />
            <RadioOption value="direct-feedback" label="Direct feedback" />
          </RadioGroup>
        </div>
      );

    case 9:
      return (
        <div className={questionClass}>
          <QuestionHeader
            number={9}
            section="Core Eligibility"
            title="Commitment"
            subtitle="If accepted, are you prepared to invest focused time and attention each month?"
          />
          <RadioGroup
            value={formData.commitment}
            onValueChange={(v) => updateField("commitment", v)}
            className="space-y-3"
          >
            <RadioOption value="yes" label="Yes" />
            <RadioOption value="no" label="No" />
            <RadioOption value="unsure" label="Unsure" />
          </RadioGroup>
        </div>
      );

    case 10:
      return (
        <div className={questionClass}>
          <QuestionHeader
            number={10}
            section="Future Direction & Trajectory"
            title="Career Horizon"
            subtitle="How do you see the next 12–24 months?"
          />
          <p className="text-xs text-muted-foreground -mt-2">
            Associate to Empire™ is often the starting point, not the destination.
          </p>
          <RadioGroup
            value={formData.careerHorizon}
            onValueChange={(v) => updateField("careerHorizon", v)}
            className="space-y-3"
          >
            <RadioOption value="associate-authority" label="Remaining an associate while building authority" />
            <RadioOption value="transitioning" label="Transitioning toward ownership" />
            <RadioOption value="owner-leverage" label="Already owning but building personal leverage" />
            <RadioOption value="unclear" label="Still unclear" />
          </RadioGroup>
        </div>
      );

    case 11:
      return (
        <div className={questionClass}>
          <QuestionHeader
            number={11}
            section="Future Direction & Trajectory"
            title="What Will Matter Most"
            subtitle="Which areas feel most important next?"
          />
          <p className="text-xs text-muted-foreground -mt-2">
            Select up to two
          </p>
          <div className="space-y-3">
            <CheckboxOption
              checked={formData.importantAreas.includes("brand-clarity")}
              onCheckedChange={() => toggleArrayField("importantAreas", "brand-clarity")}
              label="Personal brand clarity and positioning"
              disabled={formData.importantAreas.length >= 2 && !formData.importantAreas.includes("brand-clarity")}
            />
            <CheckboxOption
              checked={formData.importantAreas.includes("content")}
              onCheckedChange={() => toggleArrayField("importantAreas", "content")}
              label="Consistent premium content"
              disabled={formData.importantAreas.length >= 2 && !formData.importantAreas.includes("content")}
            />
            <CheckboxOption
              checked={formData.importantAreas.includes("practice-brand")}
              onCheckedChange={() => toggleArrayField("importantAreas", "practice-brand")}
              label="Practice or clinic brand development"
              disabled={formData.importantAreas.length >= 2 && !formData.importantAreas.includes("practice-brand")}
            />
            <CheckboxOption
              checked={formData.importantAreas.includes("acquisition")}
              onCheckedChange={() => toggleArrayField("importantAreas", "acquisition")}
              label="Patient acquisition and conversion systems"
              disabled={formData.importantAreas.length >= 2 && !formData.importantAreas.includes("acquisition")}
            />
            <CheckboxOption
              checked={formData.importantAreas.includes("growth-strategy")}
              onCheckedChange={() => toggleArrayField("importantAreas", "growth-strategy")}
              label="Long-term growth strategy"
              disabled={formData.importantAreas.length >= 2 && !formData.importantAreas.includes("growth-strategy")}
            />
          </div>
        </div>
      );

    case 12:
      return (
        <div className={questionClass}>
          <QuestionHeader
            number={12}
            section="Future Direction & Trajectory"
            title="Readiness"
            subtitle="Which statement feels most accurate?"
          />
          <RadioGroup
            value={formData.readiness}
            onValueChange={(v) => updateField("readiness", v)}
            className="space-y-3"
          >
            <RadioOption value="start-correctly" label="I want to start correctly and expand later" />
            <RadioOption value="move-decisively" label="I want to move decisively once aligned" />
            <RadioOption value="exploring-carefully" label="I'm exploring carefully" />
            <RadioOption value="current-role" label="I'm only focused on my current role" />
          </RadioGroup>
        </div>
      );

    default:
      return null;
  }
};

const QuestionHeader = ({
  number,
  section,
  title,
  subtitle,
}: {
  number: number;
  section: string;
  title: string;
  subtitle: string;
}) => (
  <div className="space-y-2">
    <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
      {section}
    </p>
    <h3 className="text-xl md:text-2xl font-serif text-foreground">
      {number}. {title}
    </h3>
    <p className="text-muted-foreground leading-relaxed">
      {subtitle}
    </p>
  </div>
);

const RadioOption = ({ value, label }: { value: string; label: string }) => (
  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-background/50 hover:bg-background transition-colors cursor-pointer">
    <RadioGroupItem value={value} id={value} />
    <Label htmlFor={value} className="font-normal cursor-pointer flex-1">
      {label}
    </Label>
  </div>
);

const CheckboxOption = ({
  checked,
  onCheckedChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onCheckedChange: () => void;
  label: string;
  disabled?: boolean;
}) => (
  <div
    className={cn(
      "flex items-center space-x-3 p-3 rounded-lg border border-border bg-background/50 hover:bg-background transition-colors cursor-pointer",
      disabled && "opacity-50 cursor-not-allowed"
    )}
    onClick={() => !disabled && onCheckedChange()}
  >
    <Checkbox checked={checked} disabled={disabled} />
    <Label className={cn("font-normal cursor-pointer flex-1", disabled && "cursor-not-allowed")}>
      {label}
    </Label>
  </div>
);

export default EligibilityForm;
