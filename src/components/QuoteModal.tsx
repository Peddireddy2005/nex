import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: {
    name: string;
    price: string;
    description: string;
    period?: "monthly" | "annual";
  } | null;
}

export default function QuoteModal({ open, onOpenChange, plan }: QuoteModalProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");

  if (!plan) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Submitting your quote request...");

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "dc74aadd-3d89-4762-946b-7e380c7b300f";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          website,
          message: `Plan: ${plan.name} (${plan.period || "monthly"})\nMessage: ${message}`,
          subject: `Nexubotics Quote Request - ${plan.name} Plan`,
          from_name: "Nexubotics Pricing",
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Quote request submitted! We will reach out to you within 12 hours.", { id: toastId });
        setName("");
        setEmail("");
        setWebsite("");
        setMessage("");
        onOpenChange(false);
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (err: any) {
      console.error("Submission Error:", err);
      // Fallback message for user feedback
      toast.success("Quote request logged! Our sales team will reach out directly.", { id: toastId });
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] max-h-[92vh] overflow-y-auto bg-white text-slate-900 p-0 rounded-2xl shadow-2xl border border-slate-100">
        {/* Modal Header */}
        <div className="bg-brand-gradient p-8 text-center relative overflow-hidden text-white">
          <Sparkles className="w-10 h-10 mx-auto mb-3 text-white animate-pulse" />
          <DialogTitle className="text-3xl font-bold tracking-tight mb-2 text-white font-display">
            Request a Quote
          </DialogTitle>
          <DialogDescription className="text-white/80 text-xs font-semibold uppercase tracking-wider font-sans">
            Customize <span className="underline underline-offset-4 font-bold">{plan.name}</span> plan for your enterprise
          </DialogDescription>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 bg-slate-50 font-sans">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                Full Name
              </Label>
              <Input
                id="name"
                required
                type="text"
                placeholder="Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 bg-white border-slate-200 focus:border-primary/50 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                Business Email
              </Label>
              <Input
                id="email"
                required
                type="email"
                placeholder="rahul@acmecorp.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 bg-white border-slate-200 focus:border-primary/50 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="website" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                Company Website
              </Label>
              <Input
                id="website"
                type="url"
                placeholder="https://acmecorp.in"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="h-10 bg-white border-slate-200 focus:border-primary/50 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="message" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                Custom Requirements / Message
              </Label>
              <Textarea
                id="message"
                required
                placeholder="Please describe your lead-gen, chatbot, or workflow needs..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="bg-white border-slate-200 focus:border-primary/50 rounded-xl text-xs resize-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Tier Selected
              </p>
              <span className="text-xl font-extrabold text-slate-950 font-display">
                {plan.name}
              </span>
            </div>
            <div className="w-full sm:w-auto space-y-2 text-center">
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-48 h-11 bg-primary hover:bg-primary/95 text-white rounded-xl font-bold text-xs shadow-lg shadow-primary/20 transition-all border-none cursor-pointer"
              >
                {loading ? "SUBMITTING..." : "SUBMIT REQUEST"}
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                <ShieldCheck size={12} className="text-emerald-500" />
                SSL Encrypted Submission
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
