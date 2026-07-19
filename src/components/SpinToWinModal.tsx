import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { supabase } from "../lib/supabase";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_CUSTOMER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  /*{ label: "5% OFF",  color: "#1a4a8a", accent: "#2563eb", text: "#93c5fd" },
  { label: "10% OFF", color: "#14532d", accent: "#16a34a", text: "#86efac" },
  { label: "15% OFF", color: "#7c2d12", accent: "#c2410c", text: "#fdba74" },
  { label: "30% OFF", color: "#4a1d96", accent: "#7c3aed", text: "#c4b5fd" },
  { label: "FREE BOT", color: "#7f1d1d", accent: "#b91c1c", text: "#fde68a", isFree: true },
  { label: "FREE BOT", color: "#A16207", accent: "#FACC15", text: "#FFFFFF", isFree: true }, 
  { label: "25% OFF", color: "#164e63", accent: "#0e7490", text: "#67e8f9" },*/ 
  const SEGS = [
     { label: "FREE BOT", color: "#B91C1C", accent: "#F87171", text: "#FFFFFF", isFree: true },
    
  { label: "10% OFF", color: "#16A34A", accent: "#4ADE80", text: "#FFFFFF" },
  { label: "15% OFF", color: "#EA580C", accent: "#FB923C", text: "#FFFFFF" },
  { label: "30% OFF", color: "#7C3AED", accent: "#A78BFA", text: "#FFFFFF" },
  { label: "5% OFF",  color: "#2563EB", accent: "#60A5FA", text: "#FFFFFF" },
  { label: "25% OFF", color: "#0891B2", accent: "#67E8F9", text: "#FFFFFF" }
];

const SLICE = (Math.PI * 2) / SEGS.length;
const probs = [0.00, 0.25, 0.60, 0.10, 0.05, 0.00];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateCouponCode(prize: string): string {
  const prefix = prize.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6);
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `NEX-${prefix}-${random}`;
}

function pickSeg() {
  const r = Math.random(); let c = 0;
  for (let i = 0; i < probs.length; i++) { c += probs[i]; if (r < c) return i; }
  return 2;
}

export default function SpinToWinModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [view, setView] = useState<"form" | "success">("form");
  const [existingClaim, setExistingClaim] = useState(false);
  const [prize, setPrize] = useState<{ label: string; isFree?: boolean } | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [formError, setFormError] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailFailed, setEmailFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dbSaved, setDbSaved] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentAngleRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lock background scroll while the modal is open, and restore the exact
  // scroll position on close. Without this, the page underneath the
  // backdrop could still be dragged/scrolled on touch devices.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevWidth = document.body.style.width;
    const scrollY = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = "";
      document.body.style.width = prevWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const wheelSize = isMobile ? 220 : 320;

  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width, R = W / 2;
    const scale = W / 320;
    ctx.clearRect(0, 0, W, W);
    SEGS.forEach((seg, i) => {
      const start = angle + i * SLICE - Math.PI / 2;
      const end = start + SLICE;
      const mid = start + SLICE / 2;
      ctx.beginPath(); ctx.moveTo(R, R); ctx.arc(R, R, R - 2, start, end); ctx.closePath();
      const gx = R + Math.cos(mid) * (R * 0.45);
      const gy = R + Math.sin(mid) * (R * 0.45);
      const grad = ctx.createRadialGradient(gx, gy, 0, R, R, R);
      grad.addColorStop(0, seg.accent + "cc"); grad.addColorStop(1, seg.color);
      ctx.fillStyle = grad; ctx.fill();
      ctx.beginPath(); ctx.moveTo(R, R);
      ctx.lineTo(R + Math.cos(start) * (R - 2), R + Math.sin(start) * (R - 2));
      ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(R, R, R - 2, start, end);
      ctx.strokeStyle = seg.accent + "66"; ctx.lineWidth = 3; ctx.stroke();

ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(R + Math.cos(mid) * (R - 10), R + Math.sin(mid) * (R - 10), 4, 0, Math.PI * 2);
      ctx.fillStyle = seg.text; ctx.fill();
      ctx.save();
      ctx.translate(R, R); ctx.rotate(mid); ctx.translate(R * 0.58, 0); ctx.rotate(Math.PI / 2);
      
        /*if (seg.isFree) {
  ctx.font = `900 ${Math.round(14 * scale)}px Syne, sans-serif`;

 ctx.fillStyle = "#FFFFFF";
  ctx.strokeStyle = "#FFF8DC";
  ctx.lineWidth = 1.5;

  ctx.textAlign = "center";

 ctx.shadowColor = "#FFD700";
ctx.shadowBlur = 25;

  ctx.strokeText("FREE", 0, -8 * scale);
  ctx.fillText("FREE", 0, -8 * scale);

  ctx.font = `900 ${Math.round(12 * scale)}px DM Sans, sans-serif`;

  ctx.strokeText("1ST BOT", 0, 10 * scale);
  ctx.fillText("1ST BOT", 0, 10 * scale);
        
} else {
  const parts = seg.label.split(" ");

  ctx.font = `bold ${Math.round(13 * scale)}px Syne, sans-serif`;
  ctx.fillStyle = seg.text;
  ctx.textAlign = "center";

  ctx.shadowColor = seg.text;
  ctx.shadowBlur = 6;

  ctx.fillText(parts[0], 0, -5 * scale);

  ctx.font = `600 ${Math.round(10 * scale)}px DM Sans, sans-serif`;

  ctx.shadowBlur = 3;
  ctx.fillText(parts[1] || "", 0, 8 * scale);
          ctx.restore();
      
}*/
      if (seg.isFree) {
  ctx.font = `900 ${Math.round(14 * scale)}px Syne, sans-serif`;
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";

  ctx.shadowColor = "#FFD700";
  ctx.shadowBlur = 12;

  ctx.fillText("FREE", 0, -10 * scale);

  ctx.font = `900 ${Math.round(12 * scale)}px Syne, sans-serif`;
  ctx.fillText("1ST BOT", 0, 12 * scale);

} else {
  const parts = seg.label.split(" ");

  ctx.font = `800 ${Math.round(18 * scale)}px Syne, sans-serif`;
  ctx.fillStyle = seg.text;
  ctx.textAlign = "center";

  ctx.shadowColor = seg.text;
  ctx.shadowBlur = 6;

  ctx.fillText(parts[0], 0, -5 * scale);

  ctx.font = `700 ${Math.round(14 * scale)}px DM Sans, sans-serif`;
  ctx.shadowBlur = 3;

  ctx.fillText(parts[1] || "", 0, 8 * scale);
}

ctx.restore();
        //===================//
    });
    ctx.beginPath(); ctx.arc(R, R, 24 * scale, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 2; ctx.stroke();
  };

  useEffect(() => { drawWheel(0); }, [wheelSize]);

  const saveToDatabase = async (wonPrize: string, code: string) => {
    const { error } = await supabase.from("spin_leads").insert({
      name: name.trim(), phone: phone.trim(),
      email: email.trim().toLowerCase(), services, prize: wonPrize, coupon_code: code,
    });
    if (error) { console.error("Database save error:", error); return false; }
    setDbSaved(true); return true;
  };

  const sendEmails = async (wonPrize: string, code: string) => {
    setEmailSending(true); setEmailFailed(false);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CUSTOMER_TEMPLATE_ID, {
        customer_name: name.trim(), customer_email: email.trim(),
        prize: wonPrize, coupon_code: code,
        services: services.join(", ") || "None selected",
      }, EMAILJS_PUBLIC_KEY);
      setEmailSent(true); return true;
    } catch (err) {
      console.error("EmailJS error:", err); setEmailFailed(true); return false;
    } finally { setEmailSending(false); }
  };

  const handleSpin = async () => {
    if (spinning) return;
    const n = name.trim(), p = phone.trim(), e = email.trim().toLowerCase();
    setNameErr(!n); setPhoneErr(!p); setFormError("");
    if (!n || !p || !e) { setEmailErr(!e); return; }
    if (!EMAIL_REGEX.test(e)) { setEmailErr(true); setFormError("Please enter a valid email address."); return; }
    setEmailErr(false);
    setCheckingEmail(true);
    const { data, error } = await supabase.from("spin_leads").select("prize, coupon_code").eq("email", e).limit(1);
    setCheckingEmail(false);
    if (error) { setFormError("Something went wrong checking your email. Please try again."); return; }
    if (data && data.length > 0) {
      const existing = data[0];
      setPrize({ label: existing.prize, isFree: /free/i.test(existing.prize) });
      setCouponCode(existing.coupon_code);
      setExistingClaim(true);
      setView("success");
      return;
    }
    setExistingClaim(false); setSpinning(true);
    const idx = pickSeg();
    const cur = currentAngleRef.current;
    const targetAngle = cur + Math.PI * 2 * 6 + (Math.PI * 2 - idx * SLICE - SLICE / 2 - (cur % (Math.PI * 2)));
    const startTime = performance.now(), dur = 5000, from = cur;
    const ease = (t: number) => t < 1 ? 1 - Math.pow(1 - t, 4) : 1;
    const finishSpin = async (i: number) => {
      const wonPrize = SEGS[i];
      const code = generateCouponCode(wonPrize.label);
      const saved = await saveToDatabase(wonPrize.label, code);
      if (!saved) return;
      setPrize(wonPrize); setCouponCode(code); setView("success");
      await sendEmails(wonPrize.label, code);
    };
    const frame = (now: number) => {
      const t = Math.min((now - startTime) / dur, 1);
      const angle = from + (targetAngle - from) * ease(t);
      currentAngleRef.current = angle; drawWheel(angle);
      if (t < 1) { rafRef.current = requestAnimationFrame(frame); }
      else { currentAngleRef.current = targetAngle; drawWheel(targetAngle); setSpinning(false); finishSpin(idx); }
    };
    rafRef.current = requestAnimationFrame(frame);
  };

  const resetAll = () => {
    cancelAnimationFrame(rafRef.current);
    currentAngleRef.current = 0; drawWheel(0);
    setView("form"); setExistingClaim(false); setSpinning(false);
    setPrize(null); setCouponCode("");
    setName(""); setPhone(""); setEmail(""); setServices([]);
    setNameErr(false); setPhoneErr(false); setEmailErr(false); setFormError("");
    setEmailSent(false); setEmailFailed(false); setDbSaved(false); setCopied(false);
    setIsOpen(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const toggleService = (s: string) =>
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  if (!isOpen) return null;

  const hubSize = Math.round(wheelSize * 0.2);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes spin-ring { to { transform: rotate(360deg); } }
        @keyframes twinkle {
          0%,100% { opacity:0; transform:scale(1); }
          50% { opacity:.6; transform:scale(1.5); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,198,255,0.4); }
          50% { box-shadow: 0 0 0 10px rgba(0,198,255,0); }
        }
        .hub-spinning .spin-ring-anim { opacity: 1 !important; }
        .spin-btn:hover { background: linear-gradient(90deg,#2352d4,#3b7dff) !important; }
        .done-btn:hover { background: rgba(0,198,255,.08) !important; }
        .close-x:hover { color:#94a3b8; background:rgba(255,255,255,.08); }
        .copy-btn:hover { background: rgba(0,198,255,0.15) !important; }
        .coupon-box { animation: pulse-glow 2s infinite; }
        .fadein { animation: fadeInUp 0.4s ease forwards; }
        * { box-sizing: border-box; }
      `}</style>

      {/* Backdrop — top-aligned and scrollable on mobile so the form/keyboard
          never traps the user or clips off-screen, and the page behind it
          can't be dragged since body scroll is locked while open. */}
      <div style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)",
        zIndex: 9997, display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "center",
        padding: 12,
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        paddingTop: isMobile ? "max(24px, env(safe-area-inset-top, 0px))" : 12,
        paddingBottom: isMobile ? "max(24px, env(safe-area-inset-bottom, 0px))" : 12,
      }}>
        {/* Gradient border */}
        <div style={{
          background: "conic-gradient(from 180deg,#00c6ff,#6d5aff,#ff3cac,#00c6ff)",
          padding: 2, borderRadius: 22,
          boxShadow: "0 0 60px rgba(0,198,255,.25),0 0 120px rgba(109,90,255,.15)",
          width: "100%", maxWidth: 900,
          maxHeight: isMobile ? "none" : "calc(100vh - 24px)",
          flexShrink: 0,
        }}>
          {/* ─────────────── CARD ─────────────── */}
          <div style={{
            background: "#0b1628", borderRadius: 20,
            width: "100%",
            maxHeight: isMobile ? "none" : "calc(100vh - 28px)",
            overflowY: isMobile ? "visible" : "auto", overflowX: "hidden",
            position: "relative",
          }}>
            {/* Close */}
            <button className="close-x" onClick={() => setIsOpen(false)} style={{
              position: "absolute", top: 14, right: 14, zIndex: 30,
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)",
              color: "#3f5a7a", fontSize: 15, width: 32, height: 32, borderRadius: "50%",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .2s",
            }}>✕</button>

            {/* ══════════ SUCCESS VIEW — replaces everything ══════════ */}
            {view === "success" ? (
              <div className="fadein" style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                textAlign: "center",
                padding: isMobile ? "48px 20px 36px" : "56px 50px 48px",
                background: "linear-gradient(135deg,#070f20 0%,#0b1628 60%,#0d1f3c 100%)",
                borderRadius: 20, minHeight: 400,
                position: "relative", overflow: "hidden",
              }}>
                {/* Glow blobs */}
                <div style={{ position:"absolute", top:-60, left:-60, width:200, height:200, borderRadius:"50%", background:"rgba(0,198,255,0.06)", filter:"blur(40px)", pointerEvents:"none" }} />
                <div style={{ position:"absolute", bottom:-60, right:-60, width:200, height:200, borderRadius:"50%", background:"rgba(109,90,255,0.06)", filter:"blur(40px)", pointerEvents:"none" }} />

                <div style={{ width:"100%", maxWidth:400, position:"relative", zIndex:1 }}>
                  <div style={{
                    width:64, height:64, borderRadius:"50%",
                    background:"rgba(0,198,255,.08)", border:"1.5px solid rgba(0,198,255,.3)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    margin:"0 auto 14px", fontSize:28,
                  }}>{existingClaim ? "👋" : "🏆"}</div>

                  <h2 style={{ fontFamily:"Syne,sans-serif", fontSize:isMobile?22:26, fontWeight:800, color:"#f0f8ff", margin:"0 0 6px" }}>
                    {existingClaim ? "Welcome Back!" : "Reward Unlocked!"}
                  </h2>
                  <p style={{ fontSize:13, color:"#3f5a7a", margin:"0 0 18px" }}>
                    {existingClaim ? "You've already claimed your Nexubotics reward" : "You won an exclusive Nexubotics discount"}
                  </p>

                  {/* Prize badge */}
                  <div style={{
                    padding:"10px 20px", borderRadius:10, marginBottom:20,
                    background: prize?.isFree ? "rgba(253,230,138,.08)" : "rgba(0,198,255,.08)",
                    border:`1px solid ${prize?.isFree ? "rgba(253,230,138,.3)" : "rgba(0,198,255,.3)"}`,
                    fontFamily:"Syne,sans-serif", fontSize:isMobile?18:22, fontWeight:800,
                    color: prize?.isFree ? "#fde68a" : "#00c6ff",
                  }}>{prize?.label}</div>

                  <p style={{ fontSize:10, color:"#4b6480", textTransform:"uppercase", letterSpacing:1, fontWeight:600, margin:"0 0 10px" }}>Your Coupon Code</p>

                  {/* Coupon box */}
                  <div className="coupon-box" style={{
                    background:"#060d1a", border:"2px dashed rgba(0,198,255,0.5)",
                    borderRadius:12, padding:"16px", marginBottom:12,
                    display:"flex", flexDirection:"column", alignItems:"center", gap:10,
                  }}>
                    <span style={{
                      fontFamily:"monospace", fontSize:isMobile?20:24, fontWeight:800,
                      color:"#00c6ff", letterSpacing:3, wordBreak:"break-all", textAlign:"center",
                    }}>{couponCode}</span>
                    <button className="copy-btn" onClick={copyCode} style={{
                      background:"rgba(0,198,255,0.08)", border:"1px solid rgba(0,198,255,0.3)",
                      color: copied?"#34d399":"#7dd3fc", borderRadius:8, padding:"8px 32px",
                      cursor:"pointer", fontSize:12, fontWeight:700, letterSpacing:0.5,
                      transition:"all .2s", width:"100%",
                    }}>
                      {copied ? "✓ Copied!" : "Copy Code"}
                    </button>
                  </div>

                  {existingClaim ? (
                    <p style={{ fontSize:11, color:"#4b6480", margin:"0 0 18px", lineHeight:1.6 }}>
                      This code was already sent to <strong style={{ color:"#7dd3fc" }}>{email}</strong> — feel free to reuse it.
                    </p>
                  ) : (
                    <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:16, fontSize:11 }}>
                      <div style={{ color: emailFailed?"#fca5a5":emailSending?"#4b6480":emailSent?"#34d399":"#4b6480", display:"flex", alignItems:"center", justifyContent:"center", gap:6, flexWrap:"wrap" }}>
                        {emailSending && <><span style={{ display:"inline-block", width:10, height:10, border:"2px solid #4b6480", borderTopColor:"#00c6ff", borderRadius:"50%", animation:"spin-ring 0.8s linear infinite", flexShrink:0 }}/> Sending coupon to your email...</>}
                        {emailSent && <>✅ Coupon sent to <strong style={{ color:"#7dd3fc" }}>{email}</strong></>}
                        {emailFailed && <>⚠️ Email failed — copy the code above to save it</>}
                      </div>
                      <div style={{ color:dbSaved?"#34d399":"#4b6480", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                        {dbSaved ? <>🗄️ Lead saved to database</> : <><span style={{ display:"inline-block", width:10, height:10, border:"2px solid #4b6480", borderTopColor:"#6d5aff", borderRadius:"50%", animation:"spin-ring 0.8s linear infinite" }}/> Saving...</>}
                      </div>
                    </div>
                  )}

                  <p style={{ fontSize:10, color:"#2a3f55", margin:"0 0 22px", lineHeight:1.6 }}>
                    Valid for 30 days · Applicable on all Nexubotics services<br/>
                    Show this code during your strategy call or booking
                  </p>

                  <button className="done-btn" onClick={resetAll} style={{
                    width:"100%", padding:"13px 38px", background:"transparent",
                    border:"1px solid rgba(0,198,255,.4)", color:"#7dd3fc",
                    fontSize:12, fontWeight:700, borderRadius:8, cursor:"pointer",
                    letterSpacing:1, textTransform:"uppercase", transition:"all .2s",
                  }}>Claim &amp; Close</button>
                </div>
              </div>

            ) : (
              /* ══════════ FORM VIEW ══════════ */
              <div style={{
                display:"flex",
                flexDirection: isMobile ? "column" : "row",
              }}>
                {/* Wheel panel */}
                <div style={{
                  display:"flex", alignItems:"center", justifyContent:"center",
                  padding: isMobile ? "28px 16px 10px" : "30px 20px",
                  flexShrink:0,
                }}>
                  <div style={{ position:"relative", width:wheelSize, height:wheelSize }}>
                    <div style={{ position:"absolute", inset: isMobile?-10:-14, borderRadius:"50%", background:"conic-gradient(from 0deg,#00c6ff,#6d5aff,#ff3cac,#ffe53b,#00c6ff)", animation:"spin-ring 8s linear infinite" }} />
                    <div style={{ position:"absolute", inset: isMobile?-5:-8, borderRadius:"50%", background:"#0b1628" }} />
                    <div style={{ position:"absolute", inset: isMobile?-2:-3, borderRadius:"50%", background:"conic-gradient(from 180deg,#1a3a5c,#0d2040,#1a3a5c)", boxShadow:"inset 0 0 30px rgba(0,0,0,.8)" }} />
                    <canvas ref={canvasRef} width={wheelSize} height={wheelSize}
                      style={{ position:"relative", zIndex:2, borderRadius:"50%", display:"block", filter:"drop-shadow(0 0 18px rgba(0,198,255,.3))" }} />
                    {/* Arrow */}
                    <div style={{ position:"absolute", top: isMobile?-3:-4, left:"50%", transform:"translateX(-50%)", zIndex:20, width:0, height:0,
                      borderLeft:`${isMobile?9:13}px solid transparent`,
                      borderRight:`${isMobile?9:13}px solid transparent`,
                      borderTop:`${isMobile?22:32}px solid #fff`,
                      filter:"drop-shadow(0 2px 8px rgba(255,255,255,.5))",
                    }} />
                    {/* Hub */}
                    <div className={spinning?"hub-spinning":""} onClick={handleSpin} style={{
                      position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
                      zIndex:15, width:hubSize, height:hubSize, borderRadius:"50%",
                      background:"radial-gradient(circle at 40% 35%,#1e3a5f,#07111f)",
                      border:`${isMobile?2:3}px solid #1e3f6a`,
                      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                      boxShadow:"0 0 0 2px rgba(0,198,255,.2),inset 0 2px 4px rgba(255,255,255,.05)", cursor:"pointer",
                    }}>
                      <div className="spin-ring-anim" style={{ position:"absolute", inset:-5, borderRadius:"50%", border:"2px solid transparent", borderTopColor:"#00c6ff", borderRightColor:"#6d5aff", animation:"spin-ring .9s linear infinite", opacity:0, transition:"opacity .3s" }} />
                      <span style={{ fontFamily:"Syne,sans-serif", fontSize:isMobile?7:9, fontWeight:800, color:"#7dd3fc", letterSpacing:".8px", lineHeight:1.3, textAlign:"center" }}>SPIN<br/>TO<br/>WIN</span>
                    </div>
                  </div>
                </div>

                {/* Form panel */}
                <div style={{
                  flex:1, minWidth:0,
                  padding: isMobile ? "8px 16px 28px" : "40px 36px 40px 20px",
                  display:"flex", flexDirection:"column", justifyContent:"center",
                  position:"relative",
                }}>
                  <Stars />

                  <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(0,198,255,.08)", border:"1px solid rgba(0,198,255,.2)", color:"#7dd3fc", fontSize:10, fontWeight:600, padding:"4px 11px", borderRadius:20, letterSpacing:".7px", textTransform:"uppercase", marginBottom:isMobile?8:12, width:"fit-content" }}>✦ Aura Rewards</div>

                  <h1 style={{ fontFamily:"Syne,sans-serif", fontSize:isMobile?24:34, fontWeight:800, color:"#f0f8ff", lineHeight:1.1, margin:"0 0 6px", letterSpacing:"-.5px" }}>
                    Spin to <span style={{ background:"linear-gradient(90deg,#00c6ff,#6d5aff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Win Big!</span>
                  </h1>
                  <p style={{ fontSize:12, color:"#3f5a7a", margin:"0 0 14px", lineHeight:1.6 }}>
                    Enter your details, then spin the wheel for an exclusive Nexubotics reward.
                  </p>

                  {formError && (
                    <div style={{ marginBottom:10, padding:"9px 12px", borderRadius:8, background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.3)", color:"#fca5a5", fontSize:12 }}>
                      {formError}
                    </div>
                  )}

                  {[
                    { label:"Name / Company", type:"text", value:name, set:setName, err:nameErr, setErr:setNameErr, placeholder:"Krish Sharma / Nexubotics" },
                    { label:"Phone Number", type:"tel", value:phone, set:setPhone, err:phoneErr, setErr:setPhoneErr, placeholder:"+91 99999 99999" },
                    { label:"Email Address", type:"email", value:email, set:setEmail, err:emailErr, setErr:setEmailErr, placeholder:"krish@nexubotics.com", extra:() => setFormError("") },
                  ].map(({ label, type, value, set, err, setErr, placeholder, extra }) => (
                    <div key={label} style={{ marginBottom:10 }}>
                      <label style={{ fontSize:10, color:"#4b6480", textTransform:"uppercase", letterSpacing:".7px", fontWeight:600, marginBottom:5, display:"block" }}>{label}</label>
                      <input type={type} value={value}
                        onChange={e => { set(e.target.value); setErr(false); extra?.(); }}
                        placeholder={placeholder}
                        style={{ width:"100%", background:"#071020", border:`1px solid ${err?"#ef4444":"#172844"}`, borderRadius:8, padding:"10px 13px", color:"#e2e8f0", fontSize:16, outline:"none", transition:"border-color .2s" }} />
                    </div>
                  ))}

                  <p style={{ fontSize:10, color:"#4b6480", textTransform:"uppercase", letterSpacing:".7px", fontWeight:600, margin:"0 0 8px" }}>Services you're interested in</p>
                  <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:"7px 12px", marginBottom:16 }}>
                    {["Chatbot","Calling Agent","Lead Generation","Automation","Custom","Nothing Specific"].map(s => (
                      <label key={s} style={{ display:"flex", alignItems:"center", gap:8, fontSize:12.5, color:"#6a8aaa", cursor:"pointer", userSelect:"none" }}>
                        <input type="checkbox" checked={services.includes(s)} onChange={() => toggleService(s)}
                          style={{ accentColor:"#2563eb", width:16, height:16, cursor:"pointer", flexShrink:0 }} />
                        {s}
                      </label>
                    ))}
                  </div>

                  <button className="spin-btn" onClick={handleSpin} disabled={spinning||checkingEmail} style={{
                    width:"100%", padding:13,
                    background:"linear-gradient(90deg,#1a3dbf,#2563eb)",
                    border:"1px solid rgba(0,198,255,.4)", color:"#e8f4ff",
                    fontSize:13, fontWeight:700, letterSpacing:"1.2px", borderRadius:9,
                    cursor:(spinning||checkingEmail)?"not-allowed":"pointer",
                    textTransform:"uppercase", transition:"all .2s",
                    opacity:(spinning||checkingEmail)?0.4:1,
                  }}>
                    ⟳ &nbsp;{spinning?"Spinning…":checkingEmail?"Checking...":"Spin the Wheel"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Stars() {
  const stars = Array.from({ length: 28 }, (_, i) => ({
    id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
    d: `${2 + Math.random() * 4}s`, delay: `${Math.random() * 4}s`,
  }));
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", borderRadius:20 }}>
      {stars.map(s => (
        <div key={s.id} style={{ position:"absolute", width:2, height:2, background:"#ffffff", borderRadius:"50%", left:s.left, top:s.top, opacity:0, animation:`twinkle ${s.d} ${s.delay} infinite` }} />
      ))}
    </div>
  );
}