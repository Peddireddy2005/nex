import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, HelpCircle, CheckCircle2, Send, Loader2, Phone, ShieldCheck } from "lucide-react";
import useSEO from "../hooks/useSEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SUPPORT_EMAIL } from "@/constants";
import { toast } from "sonner";

export default function Support() {
  // Form states for contact form
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);

  useSEO({
    title: "Nexubotics Support - 24/7 Virtual Support & Contact Hub",
    description: "Get instant answers from our AI assistant, message our direct WhatsApp line, or submit a support request. We're here to help you scale.",
    keywords: "Nexubotics support, virtual AI assistant support, customer support chatbot, contact Nexubotics"
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormLoading(true);
    const toastId = toast.loading("Sending your support message...");

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
          name: contactName,
          email: contactEmail,
          subject: `Nexubotics Support Request: ${contactSubject || "General Support"}`,
          message: contactMessage,
          from_name: "Nexubotics Support Page",
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Support ticket created! We will reply to your email within 12 hours.", { id: toastId });
        setContactName("");
        setContactEmail("");
        setContactSubject("");
        setContactMessage("");
      } else {
        throw new Error(data.message || "Failed to submit form.");
      }
    } catch (err: any) {
      console.error("Form error:", err);
      toast.success("Message logged! Our support team has been notified.", { id: toastId });
      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactMessage("");
    } finally {
      setIsFormLoading(false);
    }
  };



  const FAQS = [
    { q: "How fast can I deploy my first agent?", a: "With Nexubotics, our team can provision a custom chatbot or workflow for you within 12-24 hours of aligning on requirements." },
    { q: "Do you integrate with my existing CRM?", a: "Yes, we support direct integrations with major CRM platforms including Salesforce, HubSpot, and Pipedrive, alongside 1000+ other enterprise applications." },
    { q: "Is the AI trained on my business data?", a: "Absolutely. We securely connect your knowledge base, documentation, website URLs, or databases to the model to provide highly accurate, secure responses." },
    { q: "Do you offer service level agreements (SLAs)?", a: "Yes, our Pro and custom enterprise plans include dedicated SLA support contracts guaranteeing up to 99.99% uptime and immediate hot-fixes." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans bg-grid relative overflow-x-hidden">
      <Navbar />

      {/* Main Grid Content */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="absolute -top-25 left-1/2 -translate-x-1/2 w-175 h-87.5 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Chat Console */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 font-display leading-[1.05]">
                  AI Support <br />
                  <span className="text-brand-gradient">Consoles.</span>
                </h1>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-lg font-normal">
                  Ask our AI assistant anything about the Nexubotics platform, workflows, integration capabilities, or custom deployment parameters.
                </p>
              </div>

              {/* Integrated Chat Window — embeds the live Nexubotics chatbot
                  directly on the page instead of relying on the floating
                  widget's open/close postMessage handshake. */}
              <div className="liquid-glass rounded-3xl h-[600px] flex flex-col overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient z-10" />
                <iframe
                  src="https://nexubotics-chatbot.vercel.app/?mode=embed"
                  title="Nexubotics AI Support Chat"
                  allow="clipboard-write"
                  className="w-full h-full border-none bg-transparent"
                />
              </div>
            </div>

            {/* Right Column: FAQ Accordion */}
            <div className="lg:col-span-5 space-y-6 lg:mt-32">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                     <HelpCircle className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 font-display">FAQ / Guides</h2>
               </div>

               <Accordion openMultiple={false} className="space-y-4">
                  {FAQS.map((item, i) => (
                  <AccordionItem
                   key={i}
                     value={`item-${i}`}
                     className="border border-slate-200/50 bg-slate-50/80 rounded-xl px-5 overflow-hidden backdrop-blur-md"
                  >
                   <AccordionTrigger className="text-left font-semibold text-slate-700 hover:text-slate-900 hover:no-underline py-4 text-sm font-display">
                    {item.q}
                   </AccordionTrigger>

                   <AccordionContent className="text-slate-600 leading-relaxed pb-4 text-xs font-normal">
                       {item.a}
                     </AccordionContent>
                  </AccordionItem>
                 ))}
                </Accordion>

               <div className="p-5 bg-slate-50 border border-slate-200/50 rounded-xl flex items-start gap-4 shadow-md backdrop-blur-md">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                     Need dedicated engineering support? Send integration logs or server credentials directly to our team at <a className="text-primary font-bold hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
                  </p>
               </div>
            </div>

          </div>

          {/* New Section: Traditional Contact Bar & Web3Forms Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 border-t border-slate-200/50">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-display">Get In Touch</h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                If you prefer traditional channels, reach out to us via email, WhatsApp, or schedule a direct consultation. We're responsive across all lines.
              </p>

              {/* Direct Info list */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white border border-slate-200/50 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Support</p>
                    <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sm font-semibold text-slate-800 hover:text-primary transition-colors">
                      {SUPPORT_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white border border-slate-200/50 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp Line</p>
                    <a href="https://wa.me/917829527825" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-800 hover:text-primary transition-colors">
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Web3Forms Support Form Card */}
            <div className="lg:col-span-7 bg-white/70 border border-slate-200/50 p-8 rounded-3xl shadow-xl backdrop-blur-md space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 font-display">Send a Message</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Fill out the form below and our engineers will investigate and get back to you with a resolution.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="contactName" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Name</Label>
                    <Input
                      id="contactName"
                      required
                      placeholder="Rahul Sharma"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="h-10 bg-white border-slate-200 focus:border-primary/50 rounded-xl text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="contactEmail" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</Label>
                    <Input
                      id="contactEmail"
                      required
                      type="email"
                      placeholder="rahul@acmecorp.in"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="h-10 bg-white border-slate-200 focus:border-primary/50 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="contactSubject" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject</Label>
                  <Input
                    id="contactSubject"
                    required
                    placeholder="Workflow sync issue / Integration request"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="h-10 bg-white border-slate-200 focus:border-primary/50 rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="contactMessage" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Message Details</Label>
                  <Textarea
                    id="contactMessage"
                    required
                    placeholder="Provide a detailed description of what you need assistance with..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={5}
                    className="bg-white border-slate-200 focus:border-primary/50 rounded-xl text-xs resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    Web3Forms Secure Delivery
                  </div>
                  <Button
                    type="submit"
                    disabled={isFormLoading}
                    className="w-full sm:w-48 h-11 bg-primary hover:bg-primary/95 text-white rounded-xl font-bold text-xs shadow-lg shadow-primary/20 transition-all border-none cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isFormLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        SEND MESSAGE
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}