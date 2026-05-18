import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const FORM_SECTION = "application_form";
const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "role",
  "yearsInPractice",
  "currentGoal",
  "whyBrand",
];

const ApplicationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasStartedRef = useRef(false);
  const focusedFieldsRef = useRef<Set<string>>(new Set());
  const completedFieldsRef = useRef<Set<string>>(new Set());
  const completionFiredRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);

  const handleFormStart = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    startTimeRef.current = Date.now();
    trackCTAClick({
      ctaId: "application_form_start",
      ctaText: "Form Start",
      section: FORM_SECTION,
    });
  };

  const handleFieldFocus = (fieldId: string) => {
    handleFormStart();
    if (focusedFieldsRef.current.has(fieldId)) return;
    focusedFieldsRef.current.add(fieldId);
    trackCTAClick({
      ctaId: `application_form_focus_${fieldId}`,
      ctaText: `Focus: ${fieldId}`,
      section: FORM_SECTION,
    });
  };

  const handleFieldComplete = (fieldId: string, value: string) => {
    if (!value || value.trim() === "") return;
    if (completedFieldsRef.current.has(fieldId)) return;
    completedFieldsRef.current.add(fieldId);
    trackCTAClick({
      ctaId: `application_form_complete_${fieldId}`,
      ctaText: `Complete: ${fieldId}`,
      section: FORM_SECTION,
    });

    // Fire all-required-complete event once
    if (
      !completionFiredRef.current &&
      REQUIRED_FIELDS.every((f) => completedFieldsRef.current.has(f))
    ) {
      completionFiredRef.current = true;
      trackCTAClick({
        ctaId: "application_form_all_fields_complete",
        ctaText: "All Required Fields Complete",
        section: FORM_SECTION,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const durationMs = startTimeRef.current
      ? Date.now() - startTimeRef.current
      : null;
    trackCTAClick({
      ctaId: "application_form_submit",
      ctaText: durationMs
        ? `Submit (${Math.round(durationMs / 1000)}s)`
        : "Submit",
      section: FORM_SECTION,
    });

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      trackCTAClick({
        ctaId: "application_form_submit_success",
        ctaText: "Submit Success",
        section: FORM_SECTION,
      });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-lg p-8 md:p-10 text-center animate-fade-up">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-serif text-foreground">Thanks for applying.</h3>
          <p className="text-muted-foreground leading-relaxed">
            Our team reviews every application personally.<br />
            If it's a fit, you'll hear from us shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-8 md:p-10 shadow-sm">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif text-foreground mb-2">
          Apply to Associate to Empire™
        </h3>
        <p className="text-sm text-muted-foreground">
          This program is selective. Applications are reviewed manually.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="First name"
              required
              className="bg-background"
              onFocus={() => handleFieldFocus("firstName")}
              onBlur={(e) => handleFieldComplete("firstName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Last name"
              required
              className="bg-background"
              onFocus={() => handleFieldFocus("lastName")}
              onBlur={(e) => handleFieldComplete("lastName", e.target.value)}
            />
          </div>
        </div>

        {/* Email + Instagram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="bg-background"
              onFocus={() => handleFieldFocus("email")}
              onBlur={(e) => handleFieldComplete("email", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram Handle</Label>
            <Input
              id="instagram"
              placeholder="@handle or 'Not active yet'"
              className="bg-background"
              onFocus={() => handleFieldFocus("instagram")}
              onBlur={(e) => handleFieldComplete("instagram", e.target.value)}
            />
          </div>
        </div>

        {/* Location + Current Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location (City + State)</Label>
            <Input
              id="location"
              placeholder="e.g., Austin, TX"
              className="bg-background"
              onFocus={() => handleFieldFocus("location")}
              onBlur={(e) => handleFieldComplete("location", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Current Role</Label>
            <Select
              required
              onValueChange={(v) => {
                handleFieldFocus("role");
                handleFieldComplete("role", v);
              }}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="associate">Associate</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="transitioning">Transitioning</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Years in Practice + Current Goal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Years in Practice</Label>
            <Select
              required
              onValueChange={(v) => {
                handleFieldFocus("yearsInPractice");
                handleFieldComplete("yearsInPractice", v);
              }}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0–2 years</SelectItem>
                <SelectItem value="3-5">3–5 years</SelectItem>
                <SelectItem value="6-10">6–10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>What best describes your current goal?</Label>
            <Select
              required
              onValueChange={(v) => {
                handleFieldFocus("currentGoal");
                handleFieldComplete("currentGoal", v);
              }}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visibility">Build visibility and recognition</SelectItem>
                <SelectItem value="patients">Attract more ideal patients</SelectItem>
                <SelectItem value="authority">Position myself as an authority</SelectItem>
                <SelectItem value="ownership">Prepare for practice ownership</SelectItem>
                <SelectItem value="growth">Grow an existing practice</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Why Personal Brand */}
        <div className="space-y-2">
          <Label htmlFor="whyBrand">
            Why do you want to build a personal brand right now?
          </Label>
          <Textarea
            id="whyBrand"
            placeholder="Share your thoughts..."
            className="bg-background min-h-[100px] resize-none"
            required
            onFocus={() => handleFieldFocus("whyBrand")}
            onBlur={(e) => handleFieldComplete("whyBrand", e.target.value)}
          />
        </div>

        {/* On Camera */}
        <div className="space-y-3">
          <Label>Are you willing to appear on camera for your content?</Label>
          <RadioGroup
            defaultValue="yes"
            className="flex flex-wrap gap-4"
            onValueChange={(v) => {
              handleFieldFocus("onCamera");
              handleFieldComplete("onCamera", v);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="camera-yes" />
              <Label htmlFor="camera-yes" className="font-normal cursor-pointer">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="camera-no" />
              <Label htmlFor="camera-no" className="font-normal cursor-pointer">
                No
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unsure" id="camera-unsure" />
              <Label htmlFor="camera-unsure" className="font-normal cursor-pointer">
                Unsure
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="premium"
            size="xl"
            className="w-full rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            If accepted, you'll receive next steps by email.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
