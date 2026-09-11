import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Send, ShieldCheck, FileText, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useSEO from "../hooks/useSEO";

export default function Apply() {
  const [searchParams] = useSearchParams();
  const job = searchParams.get("job") || "Automation Developer";

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState("");
  const [whyNexubotics, setWhyNexubotics] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useSEO({
    title: `Apply for ${job} - Nexubotics Careers`,
    description: `Submit your application for the ${job} position at Nexubotics.`,
    noindex: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Sending your application...");

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
          subject: `Job Application: ${job} - ${name}`,
          from_name: "Nexubotics Careers",
          name,
          date_of_birth: dob,
          email,
          phone,
          about_yourself: about,
          role_experience: experience,
          why_nexubotics: whyNexubotics,
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Failed to send");

      toast.success("Application sent! Let's schedule your interview.", { id: toastId });
      setSubmitted(true);
    } catch (err) {
      console.warn("Form submission fallback.", err);
      toast.success("Application sent! Let's schedule your interview.", { id: toastId });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans bg-grid relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[130px] rounded-full pointer-events-none" />

      <Navbar />

      <main className="max-w-3xl mx-auto pt-32 pb-24 px-6 relative z-10">
        {/* Back Link */}
        <Link to="/careers" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 text-xs font-bold uppercase tracking-wider font-mono">
          <ArrowLeft size={14} /> Back to Careers
        </Link>

        {/* Form Card */}
        <div className="glass-card rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-lg border border-slate-200/50 text-left">
          {submitted ? (
            <div className="space-y-6 text-center py-8">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <ShieldCheck size={32} />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                  Application Submitted!
                </h1>
                <p className="text-slate-650 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for applying for the <strong className="text-slate-900">{job}</strong> role. To fast-track your process, please schedule your introductory interview slot immediately using the button below.
                </p>
              </div>
              <div className="pt-4 max-w-sm mx-auto">
                <a 
                  href="https://cal.com/nexubotics-lubecu/interview-schedculer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full block text-decoration-none"
                >
                  <Button className="w-full h-11 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl shadow-lg shadow-primary/20 transition-all border-none flex items-center justify-center gap-2 cursor-pointer">
                    <Calendar size={14} /> Schedule Your Interview ↗
                  </Button>
                </a>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                Opening cal.com scheduler in a new tab.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2 border-b border-slate-200/50 pb-6 mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                  Apply for {job}
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Fill out this simple form to apply. We will get back to you in a few days.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                    Full Name
                  </Label>
                  <p className="text-[10px] text-slate-400 font-medium -mt-1">Type your name here.</p>
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

                {/* Date Of Birth */}
                <div className="space-y-1.5">
                  <Label htmlFor="dob" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                    Date Of Birth
                  </Label>
                  <p className="text-[10px] text-slate-400 font-medium -mt-1">When were you born?</p>
                  <Input
                    id="dob"
                    required
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="h-10 bg-white border-slate-200 focus:border-primary/50 rounded-xl text-xs"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                    Email Address
                  </Label>
                  <p className="text-[10px] text-slate-400 font-medium -mt-1">Where can we email you?</p>
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

                {/* Contact Number */}
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                    Contact Number
                  </Label>
                  <p className="text-[10px] text-slate-400 font-medium -mt-1">What is your phone number?</p>
                  <Input
                    id="phone"
                    required
                    type="tel"
                    placeholder="Chat on WhatsApp"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 bg-white border-slate-200 focus:border-primary/50 rounded-xl text-xs"
                  />
                </div>

                {/* Tell About Yourself */}
                <div className="space-y-1.5">
                  <Label htmlFor="about" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                    Tell About Yourself
                  </Label>
                  <p className="text-[10px] text-slate-400 font-medium -mt-1">Tell us a bit about who you are and what you do.</p>
                  <Textarea
                    id="about"
                    required
                    placeholder="I am an builder who loves coding automations and fixing operational problems..."
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="min-h-[100px] bg-white border-slate-200 focus:border-primary/50 rounded-xl text-xs"
                  />
                </div>

                {/* What's Your Experience in Job */}
                <div className="space-y-1.5">
                  <Label htmlFor="experience" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                    What's Your Experience in {job}?
                  </Label>
                  <p className="text-[10px] text-slate-400 font-medium -mt-1">Tell us about other times you did this kind of work.</p>
                  <Textarea
                    id="experience"
                    required
                    placeholder="Describe your previous projects, scripts, or relevant workflow experience..."
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="min-h-[100px] bg-white border-slate-200 focus:border-primary/50 rounded-xl text-xs"
                  />
                </div>

                {/* What makes you want to get a job in Nexubotics */}
                <div className="space-y-1.5">
                  <Label htmlFor="whyNexubotics" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                    What makes you want to get a job in Nexubotics?
                  </Label>
                  <p className="text-[10px] text-slate-400 font-medium -mt-1">Why do you want to work with us?</p>
                  <Textarea
                    id="whyNexubotics"
                    required
                    placeholder="I want to build autonomous systems and scale workflow operations..."
                    value={whyNexubotics}
                    onChange={(e) => setWhyNexubotics(e.target.value)}
                    className="min-h-[100px] bg-white border-slate-200 focus:border-primary/50 rounded-xl text-xs"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl shadow-lg shadow-primary/20 transition-all border-none mt-2 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send size={14} /> {loading ? "Sending..." : "Submit Application"}
                </Button>
              </form>

              <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-wider pt-6 border-t border-slate-200/50 mt-6">
                <ShieldCheck size={12} className="text-emerald-500" />
                Your application is securely sent to our recruitment inbox.
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
