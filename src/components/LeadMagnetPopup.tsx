import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Download, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeadMagnetPopupProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl?: string;
}

const LeadMagnetPopup = ({ isOpen, onClose, webhookUrl }: LeadMagnetPopupProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !firstName) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to Zapier webhook if configured
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
          body: JSON.stringify({
            firstName,
            email,
            source: "lead_magnet_popup",
            asset: "content_filming_minicourse",
            timestamp: new Date().toISOString(),
          }),
        });
      }

      setIsSubmitted(true);
      toast({
        title: "Check your inbox!",
        description: "Your mini-course is on its way.",
      });
    } catch (error) {
      console.error("Error submitting lead magnet form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg p-8 max-w-md w-full shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Video className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Free Download
              </p>
              <h3 className="text-2xl font-serif text-foreground mb-3">
                Film Content That Attracts The Right Patients
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get our mini-course on creating content that positions you as the obvious choice — 
                not just another dentist competing for attention.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-background"
                required
              />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
                required
              />
              <Button
                type="submit"
                variant="premium"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Me The Mini-Course"}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-xs text-muted-foreground text-center mt-4">
              Plus, get weekly insights on building authority. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-serif text-foreground mb-3">
              Check Your Inbox
            </h3>
            <p className="text-muted-foreground mb-6">
              Your mini-course is on its way. Look for an email from PASTED.
            </p>
            <Button variant="outline" onClick={onClose}>
              Continue Watching
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadMagnetPopup;
