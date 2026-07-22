import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import useSEO from "../hooks/useSEO";

export default function Privacy() {
  useSEO({
    title: "NexuBotics - Privacy Policy",
    description: "NexuBotics Privacy Policy. Review how we manage, store, and secure user data for our AI and automation systems.",
    keywords: "NexuBotics privacy policy, AI data protection, secure automation systems"
  });

  return (
    <div className="min-h-screen bg-white p-6 md:p-16 lg:p-24 font-sans selection:bg-blue-500/20 text-left overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-16 text-xs font-bold uppercase tracking-wider font-mono">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="space-y-4 border-b border-slate-100 pb-8">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-display">
              Privacy Policy
            </h1>
            <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">
              Last updated: May 26, 2026
            </p>
          </div>

          {/* Policy Sections */}
          <div className="prose prose-slate max-w-none space-y-10 text-slate-650 font-normal leading-relaxed text-sm md:text-base">
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                01. Scope & Jurisdiction
              </h2>
              <p>
                This Privacy Policy describes how NexuBotics ("we", "us", or "our") collects, uses, and discloses information in connection with your use of our AI automation services, website, and platform. Our data handling practices are structured around common industry standards and governed by the laws applicable in Karnataka, India, with the intent to support relevant compliance frameworks.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                02. Data We Collect & How We Use It
              </h2>
              <p>
                We collect personal information necessary to deliver platform functionality, manage user accounts, and provide customer support. The exact categories of data stored may evolve as our services develop but are aligned with common practices. This includes basic account identifiers (such as name, email address, contact information, and billing details once payments are configured).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                03. AI Systems & Model Training Notice (Data Protection)
              </h2>
              <p>
                NexuBotics is built on transparent data principles. **User content, including uploaded files, database schemas, workflow structures, and prompts submitted to our AI features, is not used to train external or internal AI models unless you explicitly opt-in or state otherwise.**
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                04. Age Eligibility (Minors)
              </h2>
              <p>
                Our platform is not targeted toward or designed for children under the age of 13. Minors aged 13 and older may use the platform under the supervision of a parent or guardian. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has submitted information to us, please contact us immediately to request deletion.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                05. Communication Preferences
              </h2>
              <p>
                We may send transactional or service-related emails necessary for account security, billing notifications, and core system updates. Promotional or marketing emails (such as newsletters, features highlights, and operational announcements) will only be sent to you with your explicit opt-in consent. You can unsubscribe from marketing lists at any time by clicking the link at the bottom of our emails.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                06. Cookies & Tracking Technologies
              </h2>
              <p>
                We may utilize cookies, local storage, and similar analytical technologies depending on operational requirements to manage authenticated sessions, preserve settings, and analyze site performance. You may configure your browser settings to reject cookies, though doing so might disable certain interactive features of the platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                07. Data Subject Rights & Deletion
              </h2>
              <p>
                We store personal data only as long as necessary to fulfill account functions and service delivery. You have the right to request access to your stored personal information, request corrections, or request complete deletion of your account and related data records by contacting our support team.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                08. Contact Information
              </h2>
              <p>
                If you have any questions or concerns regarding our privacy practices, please contact us at nexubotics@gmail.com.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
