import React, { useState } from 'react';
import { Building2, Sparkles, Send, CheckCircle2, ShieldCheck, X, Bot, FileText } from 'lucide-react';

interface EnterpriseQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCargoDetails?: any;
}

export const EnterpriseQuoteModal: React.FC<EnterpriseQuoteModalProps> = ({ isOpen, onClose, initialCargoDetails }) => {
  const [companyName, setCompanyName] = useState('Clickit B2B Client');
  const [gstin, setGstin] = useState('27AABCU9603R1ZM');
  const [contactPerson, setContactPerson] = useState('Tanuj Saini');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [monthlyVolumeTons, setMonthlyVolumeTons] = useState('50');
  const [notes, setNotes] = useState(
    initialCargoDetails
      ? `Requesting dedicated vehicle quote for ${initialCargoDetails.goodsType} (${initialCargoDetails.weightKg} kg) from ${initialCargoDetails.origin} to ${initialCargoDetails.destination}.`
      : 'Interested in dedicated 14ft container trucks for intercity dispatches.'
  );

  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFetchAiAdvisor = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goodsType: initialCargoDetails?.goodsType || 'Industrial Cargo',
          weightKg: initialCargoDetails?.weightKg || Number(monthlyVolumeTons) * 1000,
          origin: initialCargoDetails?.origin || 'Jaipur',
          destination: initialCargoDetails?.destination || 'Jaipur',
          specialInstructions: notes
        })
      });
      const data = await res.json();
      if (data.advice) {
        setAiAdvice(data.advice);
      }
    } catch (err) {
      console.error('AI Advisor error:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#12141A] border border-zinc-800 rounded-3xl max-w-2xl w-full p-4 sm:p-8 shadow-2xl relative space-y-5 my-4 sm:my-8 text-white overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 min-w-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-500/20 text-[#00a6c7] border border-orange-500/30 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-extrabold text-white truncate">Clickit Corporate & B2B Rates</h3>
              <p className="text-[11px] sm:text-xs text-zinc-400 truncate">Dedicated Fleet SLA • GST Invoicing • Custom Rates</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {quoteSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-white">Quote Request Received!</h4>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Our Senior Key Account Manager will contact <strong>{contactPerson}</strong> at {phone} within 30 minutes with custom rate card & credit terms.
            </p>
            <button
              onClick={() => { setQuoteSubmitted(false); onClose(); }}
              className="bg-[#00a6c7] hover:bg-orange-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl"
            >
              Back to Clickit App
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitQuote} className="space-y-4 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-300 font-semibold mb-1 block">Company / Business Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-zinc-950 text-white rounded-xl px-3.5 py-2.5 border border-zinc-800 focus:border-[#00a6c7] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-zinc-300 font-semibold mb-1 block">GSTIN Number</label>
                <input
                  type="text"
                  required
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="w-full bg-zinc-950 text-white font-mono rounded-xl px-3.5 py-2.5 border border-zinc-800 focus:border-[#00a6c7] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-300 font-semibold mb-1 block">Primary Contact Person</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full bg-zinc-950 text-white rounded-xl px-3.5 py-2.5 border border-zinc-800 focus:border-[#00a6c7] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-zinc-300 font-semibold mb-1 block">Contact Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-950 text-white rounded-xl px-3.5 py-2.5 border border-zinc-800 focus:border-[#00a6c7] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-300 font-semibold mb-1 block">Estimated Monthly Deliveries / Freight Tonnage</label>
              <select
                value={monthlyVolumeTons}
                onChange={(e) => setMonthlyVolumeTons(e.target.value)}
                className="w-full bg-zinc-950 text-white rounded-xl px-3.5 py-2.5 border border-zinc-800 focus:border-[#00a6c7] focus:outline-none"
              >
                <option value="10">10 to 25 Tons / Month (Standard Business)</option>
                <option value="50">25 to 100 Tons / Month (Gold Partner)</option>
                <option value="250">100+ Tons / Month (Enterprise Dedicated Fleet)</option>
              </select>
            </div>

            <div>
              <label className="text-zinc-300 font-semibold mb-1 block">Specific Delivery Requirements</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-zinc-950 text-white rounded-xl p-3 border border-zinc-800 focus:border-[#00a6c7] focus:outline-none"
              />
            </div>

            {/* Gemini AI Advisor Output Area */}
            <div className="bg-zinc-950 p-4 rounded-2xl border border-orange-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00a6c7] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#00a6c7]" /> Gemini AI Route & Cargo Advisor
                </span>
                <button
                  type="button"
                  onClick={handleFetchAiAdvisor}
                  disabled={isAiLoading}
                  className="bg-[#00a6c7]/20 hover:bg-[#00a6c7]/40 text-[#00a6c7] text-[11px] font-bold px-3 py-1 rounded-lg border border-orange-500/30 transition-colors"
                >
                  {isAiLoading ? 'Analyzing...' : 'Run AI Analysis'}
                </button>
              </div>

              {aiAdvice ? (
                <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-zinc-300 whitespace-pre-wrap leading-relaxed font-sans text-xs">
                  {aiAdvice}
                </div>
              ) : (
                <p className="text-[11px] text-zinc-500 italic">
                  Click 'Run AI Analysis' for instant vehicle recommendation & cargo guidelines.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold py-3 rounded-xl border border-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-2/3 bg-[#00a6c7] hover:bg-orange-600 text-white font-extrabold py-3 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                Submit Quote Request <Send className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

