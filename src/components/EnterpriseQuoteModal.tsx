import React, { useState } from 'react';
import { Building2, Sparkles, Send, CheckCircle2, X, AlertCircle, Loader2 } from 'lucide-react';
import { SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_TEL, SUPPORT_EMAIL, submitLead, isValidIndianMobile } from '../lib/leads';

interface EnterpriseQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCargoDetails?: any;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

const VOLUME_OPTIONS: Record<string, string> = {
  '10': '10 to 25 Tons / Month (Standard Business)',
  '50': '25 to 100 Tons / Month (Gold Partner)',
  '250': '100+ Tons / Month (Enterprise Dedicated Fleet)',
};

const GSTIN_RE = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

export const EnterpriseQuoteModal: React.FC<EnterpriseQuoteModalProps> = ({ isOpen, onClose, initialCargoDetails }) => {
  const [companyName, setCompanyName] = useState('');
  const [gstin, setGstin] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [monthlyVolumeTons, setMonthlyVolumeTons] = useState('10');
  const [notes, setNotes] = useState(
    initialCargoDetails
      ? `Requesting dedicated vehicle quote for ${initialCargoDetails.goodsType} (${initialCargoDetails.weightKg} kg) from ${initialCargoDetails.origin} to ${initialCargoDetails.destination}.`
      : ''
  );
  const [website, setWebsite] = useState(''); // honeypot, hidden from people

  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [aiError, setAiError] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleFetchAiAdvisor = async () => {
    setIsAiLoading(true);
    setAiError(false);
    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goodsType: initialCargoDetails?.goodsType || 'General goods',
          monthlyVolume: VOLUME_OPTIONS[monthlyVolumeTons],
          origin: initialCargoDetails?.origin || 'Jaipur',
          destination: initialCargoDetails?.destination || 'Jaipur',
          specialInstructions: notes
        })
      });
      const data = await res.json();
      if (!res.ok || !data.advice) throw new Error('No advice returned');
      setAiAdvice(data.advice);
    } catch (err) {
      console.error('AI Advisor error:', err);
      setAiError(true);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedGstin = gstin.trim().toUpperCase();
    if (!isValidIndianMobile(phone)) {
      setStatus('error');
      setErrorMessage('Enter a valid 10-digit mobile number.');
      return;
    }
    if (!GSTIN_RE.test(normalizedGstin)) {
      setStatus('error');
      setErrorMessage('Enter a valid 15-character GSTIN, for example 08ABCDE1234F1Z5.');
      return;
    }
    setStatus('sending');
    setErrorMessage('');
    const result = await submitLead({
      type: 'b2b',
      companyName,
      gstin: normalizedGstin,
      contactPerson,
      phone,
      monthlyVolume: VOLUME_OPTIONS[monthlyVolumeTons],
      notes,
      website,
    });
    if (result.ok) {
      setStatus('sent');
    } else {
      setStatus('error');
      setErrorMessage(result.message);
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  const inputClass = 'w-full bg-zinc-950 text-sm text-white rounded-xl px-3.5 py-2.5 border border-zinc-800 focus:border-[#FF5D00] focus:outline-none placeholder:text-zinc-600';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
      <div className="bg-[#12141A] border border-zinc-800 rounded-3xl max-w-2xl w-full p-4 sm:p-8 shadow-2xl relative space-y-5 my-4 sm:my-8 text-white overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 min-w-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-500/20 text-[#FF5D00] border border-orange-500/30 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 id="quote-modal-title" className="text-base sm:text-lg font-extrabold text-white truncate">Clickit Corporate & B2B Rates</h3>
              <p className="text-[11px] sm:text-xs text-zinc-400 truncate">Dedicated Fleet SLA • GST Invoicing • Custom Rates</p>
            </div>
          </div>
          <button type="button" onClick={handleClose} aria-label="Close" className="text-zinc-400 hover:text-white p-1 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === 'sent' ? (
          <div className="text-center py-8 space-y-4" role="status">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-white">Quote Request Received!</h4>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Our key account team will contact <strong>{contactPerson}</strong> at {phone} with a custom rate card and credit terms.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="bg-[#FF5D00] hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl"
            >
              Back to Clickit
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitQuote} className="space-y-4 text-xs">
            {/* Honeypot: hidden from people and screen readers; bots tend to fill it in */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="quote-website">Website</label>
              <input id="quote-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="quote-company" className="text-zinc-300 font-semibold mb-1 block">Company / Business Name</label>
                <input
                  id="quote-company"
                  type="text"
                  required
                  autoComplete="organization"
                  placeholder="e.g. Shree Ganesh Traders"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="quote-gstin" className="text-zinc-300 font-semibold mb-1 block">GSTIN Number</label>
                <input
                  id="quote-gstin"
                  type="text"
                  required
                  maxLength={15}
                  autoCapitalize="characters"
                  placeholder="15-character GSTIN"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value.toUpperCase())}
                  className={`${inputClass} font-mono`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="quote-contact" className="text-zinc-300 font-semibold mb-1 block">Primary Contact Person</label>
                <input
                  id="quote-contact"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Full name"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="quote-phone" className="text-zinc-300 font-semibold mb-1 block">Contact Mobile Number</label>
                <input
                  id="quote-phone"
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="10-digit mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="quote-volume" className="text-zinc-300 font-semibold mb-1 block">Estimated Monthly Deliveries / Freight Tonnage</label>
              <select
                id="quote-volume"
                value={monthlyVolumeTons}
                onChange={(e) => setMonthlyVolumeTons(e.target.value)}
                className={inputClass}
              >
                {Object.entries(VOLUME_OPTIONS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quote-notes" className="text-zinc-300 font-semibold mb-1 block">Specific Delivery Requirements</label>
              <textarea
                id="quote-notes"
                rows={3}
                placeholder="e.g. Daily Tata Ace for store restocking between VKIA and Malviya Nagar"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-zinc-950 text-sm text-white rounded-xl p-3 border border-zinc-800 focus:border-[#FF5D00] focus:outline-none placeholder:text-zinc-600"
              />
            </div>

            {/* AI Advisor Output Area */}
            <div className="bg-zinc-950 p-4 rounded-2xl border border-orange-500/20 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-orange-400" /> AI Route & Cargo Advisor
                </span>
                <button
                  type="button"
                  onClick={handleFetchAiAdvisor}
                  disabled={isAiLoading}
                  className="bg-[#FF5D00]/20 hover:bg-[#FF5D00]/40 text-orange-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-orange-500/30 transition-colors disabled:cursor-wait"
                >
                  {isAiLoading ? 'Analyzing…' : 'Run AI Analysis'}
                </button>
              </div>

              {aiAdvice ? (
                <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-zinc-300 whitespace-pre-wrap leading-relaxed font-sans text-xs" aria-live="polite">
                  {aiAdvice}
                </div>
              ) : aiError ? (
                <p className="text-xs text-red-300" role="alert">
                  The advisor isn't available right now. You can still send your request and our team will suggest the right vehicle.
                </p>
              ) : (
                <p className="text-xs text-zinc-500 italic">
                  Click 'Run AI Analysis' for an instant vehicle recommendation and cargo guidelines.
                </p>
              )}
            </div>

            {status === 'error' && (
              <div role="alert" className="flex gap-2 items-start bg-red-500/10 border border-red-500/30 text-red-200 text-xs rounded-lg p-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <p>
                  {errorMessage}{' '}
                  You can also call <a className="underline font-semibold" href={SUPPORT_PHONE_TEL}>{SUPPORT_PHONE_DISPLAY}</a> or email{' '}
                  <a className="underline font-semibold" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="w-1/3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-sm font-bold py-3 rounded-xl border border-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-2/3 bg-[#FF5D00] hover:bg-orange-600 disabled:opacity-70 disabled:cursor-wait text-white text-sm font-extrabold py-3 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>Sending… <Loader2 className="w-4 h-4 animate-spin" /></>
                ) : (
                  <>Submit Quote Request <Send className="w-4 h-4" /></>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
