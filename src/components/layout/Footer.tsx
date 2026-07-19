import { Link } from "react-router-dom";
import { SUPPORT_EMAIL } from "@/constants";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/50 py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 text-sm font-brand">
              N
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
              Nexubotics
            </span>
          </Link>
          <p className="text-sm text-slate-600 max-w-xs leading-relaxed font-normal">
            Building intelligent AI systems for the modern enterprise. High-performance automation solutions engineered to scale your operations.
          </p>
        </div>
        
        <div>
          <h4 className="text-slate-900 font-bold mb-6 text-sm font-display">Products</h4>
          <ul className="space-y-4 text-sm text-slate-600">
            <li><Link to="/services" className="hover:text-primary transition-colors">AI Chatbots</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Lead Gen Systems</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Voice SDR Agents</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Workflows</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-bold mb-6 text-sm font-display">Company</h4>
          <ul className="space-y-4 text-sm text-slate-600">
            <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing Plans</Link></li>
            <li><Link to="/support" className="hover:text-primary transition-colors">Help Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-bold mb-6 text-sm font-display">Connect</h4>
          <ul className="space-y-4 text-sm text-slate-600">
            <li>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-primary transition-colors break-all">
                {SUPPORT_EMAIL}
              </a>
            </li>
            <li><a href="https://x.com/nexubotics" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter / X</a></li>
            <li><a href="https://linkedin.com/company/nexubotics" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Nexubotics Platform. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
