import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import useSEO from "../hooks/useSEO";

export default function Terms() {
  useSEO({
    title: "NexuBotics - Terms of Service",
    description: "NexuBotics Terms of Service. Review the rules, usage limits, and termination terms for our AI automation platform.",
    keywords: "NexuBotics terms of service, AI usage limits, terms of use autonomous systems"
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
              Terms of Service
            </h1>
            <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">
              Last updated: May 26, 2026
            </p>
          </div>

          {/* Terms Sections */}
          <div className="prose prose-slate max-w-none space-y-10 text-slate-650 font-normal leading-relaxed text-sm md:text-base">
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                01. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the NexuBotics services, website, or platform, you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and NexuBotics. If you do not agree to these terms, you must not access or use the platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                02. Eligibility & Age Restrictions
              </h2>
              <p>
                You must be at least 13 years of age to access and use our platform. Minors aged 13 and older may use our services only under the direct supervision of a parent or legal guardian who agrees to be bound by these Terms. Use of the platform by anyone under the age of 13 is strictly prohibited.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                03. User Accounts & Security
              </h2>
              <p>
                To access certain features of the platform, you may be required to register for an account. You agree to provide accurate, current, and complete registration info. You are solely responsible for maintaining the confidentiality of your account credentials, including security tokens and API keys, and for all activities that occur under your account.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                04. Billing, Subscriptions & Refunds
              </h2>
              <p>
                Certain features of our services are offered on a subscription-based plan, while others may require one-time fee structures. Pricing, billing frequency, and features are subject to change, structured to support flexible operations:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Cancellation Policy:</strong> You may cancel your subscription at any time via your account settings dashboard. Upon cancellation, your access will continue until the end of your current active billing cycle.
                </li>
                <li>
                  <strong>Refund Policy:</strong> All subscription payments and one-time fees are strictly non-refundable, except as required by applicable consumer protection laws in local jurisdictions.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                05. Acceptable Use & Account Termination Rights
              </h2>
              <p>
                We reserve the right to immediately terminate or suspend your account, access to the API, and platform access without prior notice, at our sole discretion, for any conduct that we determine violates these Terms. Activities that will result in immediate termination include, but are not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Abuse, harassment, or transmitting spam, malicious scripts, or malware.
                </li>
                <li>
                  Fraudulent transactions, payment defaults, or payment processor chargebacks.
                </li>
                <li>
                  API abuse, including bypassing access controls, exceeding rate limits, or launching denial-of-service attacks.
                </li>
                <li>
                  Data scraping, automated data extraction, data mining, or indexing platform contents without explicit authorization.
                </li>
                <li>
                  Reverse engineering, decompiling, or attempting to discover the source code of our proprietary AI models and automation logic.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                06. AI Integration & Limitation of Liability
              </h2>
              <p>
                Our platform orchestrates AI models and visual workflows. AI systems are subject to operational errors, code bugs, and data inaccuracies. All AI-generated outputs, scripts, and workflows are provided to you on an **"as-is"** basis. It is your sole responsibility to inspect, test, and approve all AI-generated content or integrations before deploy. In no event shall NexuBotics be liable for damages resulting from AI hallucinations, incorrect code scripts, or model failures.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                07. Governing Law & Dispute Resolution
              </h2>
              <p>
                These Terms of Service and any disputes arising out of or in connection with them shall be governed by, and construed in accordance with, the laws of India. Any legal action or proceeding related to the platform shall be brought exclusively in the courts located in Bengaluru, Karnataka, India.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display">
                08. Contact Information
              </h2>
              <p>
                For questions regarding these Terms of Service, please contact us at nexubotics@gmail.com.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
