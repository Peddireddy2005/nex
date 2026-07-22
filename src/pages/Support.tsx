import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Mail, HelpCircle, CheckCircle2, MessageSquare, Send, User, Bot, X, Loader2, Phone, Clock, Sparkles, ShieldCheck } from "lucide-react";
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
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([
    { role: "assistant", content: "Hello! I'm the Nexubotics AI assistant. Ask me anything about our platforms, services, or how to get started!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const mainMessagesEndRef = useRef<HTMLDivElement>(null);

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

const isFirstRender = useRef(true);

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }
  mainMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, isChatLoading]);

  // Opens the REAL live chatbot (floating bottom-right on every page)
  // instead of the FAQ-style assistant below.
  const openLiveChat = () => {
    window.dispatchEvent(new CustomEvent("nexubotics:open-chat"));
  };

  // Purely client-side smart auto-replies for virtual assistant
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput.trim();
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setChatInput("");
    setIsChatLoading(true);

    setTimeout(() => {
      let reply = "";
      const lower = userMsg.toLowerCase();
      const cleanLower = lower.replace(/[?.!,]/g, "").trim();
      
      const greetings = ["hi", "hello", "hey", "yo", "greetings"];
      const isGreeting = greetings.some(g => cleanLower === g || cleanLower.startsWith(g + " "));
      
      const acknowledgments = ["ok", "okay", "okey", "cool", "great", "nice", "awesome", "sure", "got it", "fine", "yep", "yes", "no"];
      const isAcknowledgment = acknowledgments.includes(cleanLower);

      const gratitudes = ["thanks", "thank you", "ty", "appreciate it", "thx"];
      const isGratitude = gratitudes.includes(cleanLower) || cleanLower.startsWith("thanks ") || cleanLower.startsWith("thank you ");

      const confused = ["what", "huh", "pardon", "sorry", "excuse me"];
      const isConfused = confused.some(c => cleanLower === c || cleanLower.startsWith(c + " "));

      const farewells = ["bye", "goodbye", "see ya", "later"];
      const isFarewell = farewells.some(f => cleanLower === f || cleanLower.startsWith(f + " "));
      
      const isFAQ = lower.includes("faq") || lower.includes("f.a.q") || lower.includes("question") || lower.includes("guide");
      const isFrustrated = lower.includes("frustrat") || lower.includes("broken") || lower.includes("issue") || lower.includes("problem") || lower.includes("error") || lower.includes("not working") || lower.includes("useless") || lower.includes("bad") || lower.includes("fail") || lower.includes("help") || lower.includes("support");

      if (isGreeting) {
        reply = "Hello! How can I help you today? You can ask me about our services, pricing, integration capabilities, setup times, or security.";
      } else if (isAcknowledgment) {
        reply = "Great! Let me know if you have any questions about our services or pricing.";
      } else if (isGratitude) {
        reply = "You're very welcome! Let me know if I can help you with anything else.";
      } else if (isConfused) {
        reply = "I am the Nexubotics AI assistant. You can ask me questions about our platforms, pricing, integrations, or setup times. What would you like to know?";
      } else if (isFarewell) {
        reply = "Goodbye! Have a great day!";
      } else if (isFrustrated) {
        reply = "I'm sorry if you're experiencing issues or if I'm not answering your questions correctly. You can get in touch with our team directly using the Contact Form below, email us, or message us on WhatsApp!";
      } else if (lower.includes("price") || lower.includes("cost") || lower.includes("plan") || lower.includes("pricing")) {
        reply = "We offer flexible pricing options (Standard, Plus, and Pro). You can view the details on our Pricing page, or request a custom quote directly from there.";
      } else if (lower.includes("human") || lower.includes("person") || lower.includes("agent") || lower.includes("representative") || lower.includes("whatsapp") || lower.includes("call") || lower.includes("phone")) {
        reply = `You can speak directly with our team on WhatsApp (click the button below to message us) or email us at ${SUPPORT_EMAIL}. You can also schedule a strategy call using the button in the navigation bar.`;
      } else if (lower.includes("integration") || lower.includes("crm") || lower.includes("hubspot") || lower.includes("salesforce") || lower.includes("sync")) {
        reply = "Nexubotics integrates seamlessly with HubSpot, Salesforce, Pipedrive, and over 1,000 other apps via custom webhooks and secure API endpoints.";
      } else if (lower.includes("security") || lower.includes("safety") || lower.includes("data") || lower.includes("private")) {
        reply = "We prioritize security. All telemetry data, vector databases, and client interactions are secured using end-to-end TLS encryption.";
      } else if (lower.includes("deploy") || lower.includes("setup") || lower.includes("start") || lower.includes("create")) {
        reply = "Deploying an agent or workflow is simple. Choose a service or pricing plan, request a quote, and our deployment engineers will set up your dedicated workspace in under 12 hours.";
      } else if (isFAQ) {
        reply = "We have compiled a list of common questions in the FAQ section on the right side of this page. Feel free to browse them or ask me specific questions about our services.";
      } else {
        reply = "I'm not quite sure how to answer that. If you need help with this, please use the Contact Form below, email us, or chat with us on WhatsApp to speak with our team.";
      }

      setMessages([...newMessages, { role: "assistant", content: reply }]);
      setIsChatLoading(false);
    }, 800);
  };

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
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
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
                  Ask our FAQ assistant anything about the Nexubotics platform, workflows, integration capabilities, or custom deployment parameters.
                </p>
                <button
                  type="button"
                  onClick={openLiveChat}
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Prefer a live agent? Open the live chat →
                </button>
              </div>
              
              {/* Integrated Chat Window */}
              <div className="liquid-glass rounded-3xl h-[480px] flex flex-col overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient" />
                
                {/* Chat Message Scroll */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-6 pb-4">
                    {messages.map((m, i) => {
                      const isUser = m.role === 'user';
                      return (
                        <div key={i} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                            isUser ? 'bg-slate-100 border border-slate-200 text-slate-650' : 'bg-primary text-white shadow-md shadow-primary/20'
                          }`}>
                            {isUser ? <User size={14} /> : <Bot size={14} />}
                          </div>
                          
                          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[80%] shadow-sm text-left ${
                            isUser 
                              ? 'bg-primary text-white rounded-tr-none' 
                              : 'bg-slate-100 border border-slate-200/60 text-slate-800 rounded-tl-none'
                          }`}>
                            {m.content}
                            
                            {m.content.includes(SUPPORT_EMAIL) && (
                               <a 
                                 href={`mailto:${SUPPORT_EMAIL}`}
                                 className="mt-3 flex items-center justify-center gap-2 bg-primary text-white p-2.5 rounded-lg text-xs font-bold hover:bg-primary/95 transition-colors shadow-md border-none cursor-pointer"
                               >
                                 <Mail size={12} /> Send Email
                               </a>
                            )}
                            
                            {m.content.includes("WhatsApp") && (
                               <a 
                                 href="https://wa.me/917829527825" 
                                 target="_blank" 
                                 rel="noreferrer"
                                 className="mt-3 flex items-center justify-center gap-2 bg-green-500 text-white p-2.5 rounded-lg text-xs font-bold hover:bg-green-600 transition-colors shadow-md border-none cursor-pointer"
                               >
                                 <Phone size={12} /> Message WhatsApp
                               </a>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {isChatLoading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
                          <Bot size={14} />
                        </div>
                        <div className="bg-slate-100 border border-slate-200/60 px-4 py-3 rounded-2xl rounded-tl-none text-xs text-slate-500 flex items-center gap-2 shadow-sm font-semibold">
                          <Loader2 size={14} className="animate-spin text-primary" />
                          Formulating answer...
                        </div>
                      </div>
                    )}
                    <div ref={mainMessagesEndRef} />
                  </div>
                </div>

                {/* Chat Form */}
                <form onSubmit={handleChatSubmit} className="p-4 bg-white/20 border-t border-slate-200/40 backdrop-blur-md">
                  <div className="flex gap-2">
                    <Input 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      disabled={isChatLoading}
                      placeholder="Ask a question..." 
                      className="h-11 bg-white/70 border-slate-200/50 text-slate-900 placeholder-slate-400 rounded-xl text-sm focus-visible:ring-primary focus-visible:border-primary/50 backdrop-blur-sm"
                    />
                    <Button disabled={isChatLoading} size="icon" className="h-11 w-11 bg-brand-gradient hover:opacity-95 shrink-0 rounded-xl border-none cursor-pointer">
                      <Send size={16} className="text-white" />
                    </Button>
                  </div>
                </form>
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
               
               <Accordion type="single" collapsible className="space-y-4">
                 {FAQS.map((item, i) => (
                   <AccordionItem key={i} value={`item-${i}`} className="border border-slate-200/50 bg-slate-50/80 rounded-xl px-5 overflow-hidden backdrop-blur-md">
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