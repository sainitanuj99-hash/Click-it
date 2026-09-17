import React, { useState } from 'react';
import { X, CheckCircle2, Truck, Smartphone, ShieldCheck, DollarSign, Clock, ArrowRight } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [vehicleType, setVehicleType] = useState('tata-ace');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Jaipur');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12141A] border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative text-white">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="space-y-1">
              <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2.5 py-1 rounded-md border border-orange-500/30">
                Partner Onboarding
              </span>
              <h2 className="text-2xl font-black text-white pt-1">
                Become a <span className="text-[#FF5D00]">Clickit</span> Delivery Partner
              </h2>
              <p className="text-xs text-zinc-400">
                Earn up to ₹45,000/month with daily & weekly payouts, flexible hours, and bonus incentives.
              </p>
            </div>

            {/* Perks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Flexible Hours</p>
                  <p className="text-[10px] text-zinc-400">Work when you want</p>
                </div>
              </div>

              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Weekly Payouts</p>
                  <p className="text-[10px] text-zinc-400">Direct to bank account</p>
                </div>
              </div>

              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Insurance Cover</p>
                  <p className="text-[10px] text-zinc-400">₹5 Lakh accident protection</p>
                </div>
              </div>

              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 flex items-center gap-2">
                <Truck className="w-4 h-4 text-orange-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Referral Bonuses</p>
                  <p className="text-[10px] text-zinc-400">Extra per friend joined</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Singh"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-zinc-900 text-xs text-white rounded-lg px-3 py-2.5 border border-zinc-800 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-900 text-xs text-white rounded-lg px-3 py-2.5 border border-zinc-800 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-900 text-xs text-white rounded-lg px-3 py-2.5 border border-zinc-800 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Jaipur">Jaipur</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Vehicle Type</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full bg-zinc-900 text-xs text-white rounded-lg px-3 py-2.5 border border-zinc-800 focus:border-orange-500 focus:outline-none"
                >
                  <option value="bike">2-Wheeler (Bike / Scooter)</option>
                  <option value="auto">3-Wheeler / Auto</option>
                  <option value="tata-ace">Tata Ace (Chota Hathi)</option>
                  <option value="pickup">8ft Bolero Pickup</option>
                  <option value="mini-truck">14ft / 19ft Container Truck</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF5D00] hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-lg shadow-orange-500/25 flex items-center justify-center gap-1.5"
              >
                Submit Partner Application <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Application Received!</h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Thank you, <strong className="text-white">{fullName}</strong>. Our onboarding team in {city} will contact you on <strong className="text-white">{phone}</strong> within 2 hours to complete document verification.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="bg-[#FF5D00] hover:bg-orange-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
