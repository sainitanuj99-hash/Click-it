import React, { useState } from 'react';
import { X, Weight, Box, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Info, Sparkles, Layers, Truck } from 'lucide-react';
import { VehicleType } from '../types';
import { VEHICLE_FLEET } from '../data/mockData';
import { VehicleIllustration } from './VehicleIllustrations';

interface VehicleSizeWeightModalProps {
  vehicle: VehicleType | null;
  userWeightKg?: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectVehicle: (vehicleId: string) => void;
}

export const VehicleSizeWeightModal: React.FC<VehicleSizeWeightModalProps> = ({
  vehicle,
  userWeightKg = 500,
  isOpen,
  onClose,
  onSelectVehicle
}) => {
  const [activeVehicleId, setActiveVehicleId] = useState<string>(vehicle?.id || 'tata-ace');

  if (!isOpen) return null;

  const currentVehicle = VEHICLE_FLEET.find(v => v.id === activeVehicleId) || vehicle || VEHICLE_FLEET[2];
  const isOverweight = userWeightKg > currentVehicle.capacityKg;
  const weightPercent = Math.min(Math.round((userWeightKg / currentVehicle.capacityKg) * 100), 150);

  // Suggested upgrade vehicle if overweight
  const upgradeVehicle = isOverweight 
    ? VEHICLE_FLEET.find(v => v.capacityKg >= userWeightKg) || VEHICLE_FLEET[3]
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#12141C] border border-zinc-800 rounded-3xl max-w-3xl w-full p-5 sm:p-7 space-y-6 shadow-2xl relative text-white animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4 pr-10 min-w-0">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#00a6c7] text-xs font-bold mb-1 shrink-0">
              <Box className="w-3.5 h-3.5" /> Porter-Style Vehicle Spec Guide
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2 truncate">
              {currentVehicle.name} Specifications
            </h2>
          </div>
          <span className="text-xs font-extrabold bg-[#00a6c7] text-white px-3 py-1 rounded-full w-fit shrink-0 self-start sm:self-auto">
            {currentVehicle.badge || currentVehicle.sizeCategoryTag}
          </span>
        </div>

        {/* Fleet Selector Tabs (Porter Style) */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
          {VEHICLE_FLEET.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVehicleId(v.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 flex items-center gap-1.5 ${
                v.id === activeVehicleId
                  ? 'bg-[#00a6c7] border-[#00a6c7] text-white shadow-lg shadow-orange-500/20'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <span>{v.name}</span>
              <span className="text-[10px] opacity-80 font-mono">({v.capacityDisplay})</span>
            </button>
          ))}
        </div>

        {/* Overweight Warning Banner */}
        {isOverweight && (
          <div className="bg-amber-500/15 border border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-amber-300">Payload Exceeded Warning</p>
                <p className="text-zinc-300 mt-0.5">
                  Your estimated cargo weight <strong className="text-white">{userWeightKg} kg</strong> exceeds <strong className="text-amber-400">{currentVehicle.name}</strong> limit of <strong className="text-white">{currentVehicle.capacityKg} kg</strong>.
                </p>
              </div>
            </div>
            {upgradeVehicle && (
              <button
                onClick={() => {
                  setActiveVehicleId(upgradeVehicle.id);
                  onSelectVehicle(upgradeVehicle.id);
                }}
                className="bg-amber-500 hover:bg-amber-600 text-black font-extrabold px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1 shadow-md"
              >
                Upgrade to {upgradeVehicle.name} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Main Grid: Visual Size Diagram + Weight Gauge + What Fits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* LEFT: 3D Cargo Bed Dimensions & Visual Drawing */}
          <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
              <span className="text-xs font-extrabold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Box className="w-4 h-4 text-[#00a6c7]" /> Cargo Bed Dimensions (L x W x H)
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">{currentVehicle.dimensions}</span>
            </div>

            {/* Vehicle Illustration Graphic */}
            <div className="bg-[#181A24] rounded-2xl p-4 border border-zinc-800/60 flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-orange-500/10 border border-orange-500/20 text-[#00a6c7] text-[10px] font-bold px-2 py-0.5 rounded">
                Volume: {currentVehicle.volumeCuFt} cu.ft
              </div>

              <VehicleIllustration vehicleId={currentVehicle.id} className="w-36 h-20" />

              {/* Dimension Arrow Badges */}
              <div className="grid grid-cols-3 gap-2 w-full pt-1 text-center">
                <div className="bg-zinc-900/90 p-2 rounded-xl border border-zinc-800 text-[11px]">
                  <span className="text-zinc-500 block text-[9px] uppercase font-bold">Length</span>
                  <span className="font-extrabold text-white">{currentVehicle.lengthFt} ft</span>
                </div>
                <div className="bg-zinc-900/90 p-2 rounded-xl border border-zinc-800 text-[11px]">
                  <span className="text-zinc-500 block text-[9px] uppercase font-bold">Width</span>
                  <span className="font-extrabold text-white">{currentVehicle.widthFt} ft</span>
                </div>
                <div className="bg-zinc-900/90 p-2 rounded-xl border border-zinc-800 text-[11px]">
                  <span className="text-zinc-500 block text-[9px] uppercase font-bold">Height</span>
                  <span className="font-extrabold text-white">{currentVehicle.heightFt} ft</span>
                </div>
              </div>
            </div>

            {/* Weight Payload Bar */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Weight className="w-3.5 h-3.5 text-[#00a6c7]" /> Payload Weight Capacity
                </span>
                <span className={`font-extrabold ${isOverweight ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {userWeightKg} kg / {currentVehicle.capacityKg} kg ({weightPercent}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-zinc-800 relative">
                <div 
                  className={`h-full transition-all duration-300 rounded-full ${
                    isOverweight ? 'bg-gradient-to-r from-amber-500 to-red-500' : 'bg-gradient-to-r from-emerald-500 to-[#00a6c7]'
                  }`}
                  style={{ width: `${Math.min(weightPercent, 100)}%` }}
                />
              </div>

              <p className="text-[11px] text-zinc-500">
                {isOverweight 
                  ? '⚠️ Exceeds vehicle weight limit. Overloading can result in delay or refusal.' 
                  : '✅ Weight is within safe legal payload guidelines for this vehicle.'}
              </p>
            </div>

          </div>

          {/* RIGHT: Real-World "What Fits Inside" Checklist */}
          <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-3">
                <span className="text-xs font-extrabold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#00a6c7]" /> What Fits Inside ({currentVehicle.name})
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                  Size Guide
                </span>
              </div>

              <div className="space-y-2">
                {currentVehicle.whatFitsInside.map((item, idx) => (
                  <div key={idx} className="bg-[#12141C] p-2.5 rounded-xl border border-zinc-800/80 flex items-start gap-2.5 text-xs text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#00a6c7] shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Ideal Use Cases */}
              <div className="mt-4 space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Recommended For</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentVehicle.idealFor.map((useCase) => (
                    <span key={useCase} className="bg-zinc-900 text-zinc-300 text-[10px] px-2.5 py-1 rounded-md border border-zinc-800">
                      • {useCase}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Fare Summary & Select Button */}
            <div className="bg-[#181A24] p-3.5 rounded-2xl border border-zinc-800 space-y-3 mt-4">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-400 block text-[10px]">Base Fare & Rate</span>
                  <span className="font-extrabold text-white text-sm">₹{currentVehicle.baseFare} <span className="text-xs text-zinc-400 font-normal">(+ ₹{currentVehicle.perKmRate}/km)</span></span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-400 block text-[10px]">Body Type</span>
                  <span className="font-bold text-orange-400 text-xs">{currentVehicle.bodyType}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectVehicle(currentVehicle.id);
                  onClose();
                }}
                className="w-full bg-[#00a6c7] hover:bg-orange-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-1.5"
              >
                Select {currentVehicle.name} for Booking <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
