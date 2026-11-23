import React, { useState } from 'react';
import { X, CheckCircle2, Truck, ShieldCheck, Wallet, Clock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_TEL, SUPPORT_EMAIL, submitLead, isValidIndianMobile } from '../lib/leads';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [vehicleType, setVehicleType] = useState('tata-ace');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Jaipur');
  const [website, setWebsite] = useState(''); // honeypot, hidden from people
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidIndianMobile(phone)) {
      setStatus('error');
      setErrorMessage('Enter a valid 10-digit mobile number.');
      return;
    }
    setStatus('sending');
    setErrorMessage('');
    const result = await submitLead({ type: 'driver', fullName, phone, city, vehicleType, website });
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

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="partner-modal-title">
      <div className="bg-[#12141A] border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative text-white">

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        {status !== 'sent' ? (
          <>
            <div className="space-y-1">
              <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2.5 py-1 rounded-md border border-orange-500/30">
                Partner Onboarding
              </span>
              <h2 id="partner-modal-title" className="text-2xl font-black text-white pt-1">
                Become a <span className="text-[#FF5D00]">Clickit</span> Delivery Partner
              </h2>
              <p className="text-xs text-zinc-400">
                Earn up to ₹45,000/month with flexible hours, trip-by-trip earnings, and attractive bonus incentives.
              </p>
            </div>

            {/* Perks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Flexible Hours</p>
                  <p className="text-[11px] text-zinc-400">Work when you want</p>
                </div>
              </div>

              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Daily Earnings</p>
                  <p className="text-[11px] text-zinc-400">Instant trip-by-trip wallet settlement</p>
                </div>
              </div>

              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Insurance Cover</p>
                  <p className="text-[11px] text-zinc-400">₹5 Lakh accident protection</p>
                </div>
              </div>

              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 flex items-center gap-2">
                <Truck className="w-4 h-4 text-orange-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Referral Bonuses</p>
                  <p className="text-[11px] text-zinc-400">Extra per friend joined</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Honeypot: hidden from people and screen readers; bots tend to fill it in */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="partner-website">Website</label>
                <input id="partner-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>

              <div>
                <label htmlFor="partner-name" className="text-xs font-semibold text-zinc-300 block mb-1">Full Name</label>
                <input
                  id="partner-name"
                  type="text"
                  required
                  minLength={2}
                  autoComplete="name"
                  placeholder="e.g. Ramesh Singh"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-zinc-900 text-sm text-white rounded-lg px-3 py-2.5 border border-zinc-800 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="partner-phone" className="text-xs font-semibold text-zinc-300 block mb-1">Mobile Number</label>
                  <input
                    id="partner-phone"
                    type="tel"
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="10-digit mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-900 text-sm text-white rounded-lg px-3 py-2.5 border border-zinc-800 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="partner-city" className="text-xs font-semibold text-zinc-300 block mb-1">City</label>
                  <select
                    id="partner-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-900 text-sm text-white rounded-lg px-3 py-2.5 border border-zinc-800 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Jaipur">Jaipur</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="partner-vehicle" className="text-xs font-semibold text-zinc-300 block mb-1">Your Vehicle Type</label>
                <select
                  id="partner-vehicle"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full bg-zinc-900 text-sm text-white rounded-lg px-3 py-2.5 border border-zinc-800 focus:border-orange-500 focus:outline-none"
                >
                  <option value="bike">2-Wheeler (Bike / Scooter)</option>
                  <option value="auto">3-Wheeler / Auto</option>
                  <option value="tata-ace">Tata Ace (Chota Hathi)</option>
                  <option value="pickup">8ft Bolero Pickup</option>
                </select>
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

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-[#FF5D00] hover:bg-orange-600 disabled:opacity-70 disabled:cursor-wait text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-lg shadow-orange-500/25 flex items-center justify-center gap-1.5"
              >
                {status === 'sending' ? (
                  <>Sending… <Loader2 className="w-4 h-4 animate-spin" /></>
                ) : (
                  <>Submit Partner Application <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4" role="status">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Application Received!</h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Thank you, <strong className="text-white">{fullName}</strong>. Our onboarding team in {city} will contact you on <strong className="text-white">{phone}</strong> to complete document verification.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="bg-[#FF5D00] hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
