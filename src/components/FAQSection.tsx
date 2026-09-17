import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp,
  HelpCircle, 
  Search, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  Package, 
  PhoneCall, 
  MessageSquare, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Building2,
  ThumbsUp,
  ThumbsDown,
  FileText,
  MapPin,
  Layers,
  Headphones,
  Zap,
  ArrowUpRight
} from 'lucide-react';

interface FAQSectionProps {
  onNavigate?: (path: string) => void;
  onOpenPartnerModal?: () => void;
  onOpenQuoteModal?: () => void;
}

interface FAQItem {
  id: string;
  category: 'general' | 'pricing' | 'tracking' | 'business' | 'vehicles';
  categoryLabel: string;
  categoryIcon: React.ElementType;
  question: string;
  answer: string;
  points?: string[];
  highlight?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onNavigate,
  onOpenQuoteModal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'yes' | 'no'>>({});

  const categories = useMemo(() => [
    { id: 'all', label: 'All Questions', icon: Layers },
    { id: 'general', label: 'Booking & Dispatch', icon: Clock },
    { id: 'pricing', label: 'Pricing & GST', icon: CreditCard },
    { id: 'tracking', label: 'Safety & GPS', icon: ShieldCheck },
    { id: 'business', label: 'Retailers & B2B', icon: Building2 },
    { id: 'vehicles', label: 'Fleet & Cargo', icon: Truck },
  ], []);

  const faqs: FAQItem[] = useMemo(() => [
    {
      id: 'faq-1',
      category: 'general',
      categoryLabel: 'Booking & Dispatch',
      categoryIcon: Clock,
      question: 'How quickly does a Clickit driver partner arrive after booking?',
      answer: 'With our automated hyperlocal dispatch engine, driver partners are typically assigned in under 2 minutes and arrive at your pickup location within 10 to 15 minutes across all covered city zones.',
      points: [
        'Instant driver allocation powered by real-time proximity matching',
        'Fully verified drivers with valid commercial licenses and background checks',
        'Direct driver call and in-app messaging available immediately upon dispatch'
      ],
      highlight: '10-15 Min Pickup'
    },
    {
      id: 'faq-2',
      category: 'pricing',
      categoryLabel: 'Pricing & GST',
      categoryIcon: CreditCard,
      question: 'How is the fare calculated, and are there any hidden charges?',
      answer: 'Clickit offers 100% upfront, transparent pricing. The estimated trip fare is calculated based on vehicle category, total route distance, and standard loading buffer with zero surprise surcharges.',
      points: [
        'Zero surprise toll or surge fees — the fare you confirm is what you pay',
        'Transparent base fare + fixed per-kilometer rates',
        'Complimentary 30-45 minutes loading/unloading buffer included for commercial mini trucks'
      ],
      highlight: '100% Upfront'
    },
    {
      id: 'faq-3',
      category: 'vehicles',
      categoryLabel: 'Fleet & Cargo',
      categoryIcon: Truck,
      question: 'Which vehicle should I choose for my shipment size and weight?',
      answer: 'Clickit provides an extensive commercial fleet tailored for micro parcels, retail inventory, and heavy industrial freight:',
      points: [
        '2-Wheeler (Bike): Ideal for documents, packages, lunchboxes, and retail parcels under 20 kg.',
        '3-Wheeler Loader / E-Rickshaw: Perfect for cartons, consumer goods, and wholesale boxes up to 500 kg.',
        'Tata Ace / Chota Hathi (7ft): Standard choice for retail restocking, appliances, and hardware up to 750 kg.',
        '8ft / 9ft Pickup (Bolero): Built for furniture, industrial raw materials, and heavy loads up to 1,500 kg.',
        '14ft - 19ft Trucks: Enterprise-grade intra-city bulk freight and warehouse distribution up to 5,000 kg.'
      ],
      highlight: '20kg to 5 Tonnes'
    },
    {
      id: 'faq-4',
      category: 'tracking',
      categoryLabel: 'Safety & GPS',
      categoryIcon: ShieldCheck,
      question: 'Can I share live GPS tracking and delivery OTP with the recipient?',
      answer: 'Yes! As soon as your shipment is picked up, you and your consignee receive a live tracking link via SMS & WhatsApp. The driver requires a secure 4-digit drop OTP before handing over cargo to ensure zero loss or misplacement.',
      points: [
        'Live turn-by-turn map tracking with real-time ETA updates',
        'Secure receiver-side Drop OTP verification before release',
        'Digital proof of delivery (POD) with photo capture and timestamp'
      ],
      highlight: 'Live Turn-by-Turn GPS'
    },
    {
      id: 'faq-5',
      category: 'business',
      categoryLabel: 'Retailers & B2B',
      categoryIcon: Building2,
      question: 'Do you offer GST invoices and custom enterprise credit for businesses?',
      answer: 'Yes. Clickit is designed specifically for retailers, distributors, wholesalers, and e-commerce brands. You can enter your GSTIN during checkout or register for a B2B Business Account to receive automated monthly GST-compliant invoices with full Input Tax Credit (ITC).',
      points: [
        'Automated GST e-invoices sent straight to your accounting email',
        'Dedicated account manager and customized bulk credit terms for volume shippers',
        'Multi-point route optimization with single-click bulk dispatch'
      ],
      highlight: 'Full GST Tax Credit'
    },
    {
      id: 'faq-6',
      category: 'business',
      categoryLabel: 'Retailers & B2B',
      categoryIcon: Building2,
      question: 'Can I schedule multi-stop deliveries for wholesale and retail distribution?',
      answer: 'Yes. You can add up to 10 pickup and drop locations in a single trip. Our route planner automatically organizes stops in the most fuel- and time-efficient sequence, saving you up to 35% on logistics costs compared to booking multiple individual trips.',
      points: [
        'Up to 10 multiple drop-offs in one single booking',
        'Real-time sequence tracking for each merchant drop',
        'Individual digital POD signatures at every store'
      ],
      highlight: 'Multi-Stop Saver'
    },
    {
      id: 'faq-7',
      category: 'general',
      categoryLabel: 'Booking & Dispatch',
      categoryIcon: Package,
      question: 'What items and cargo are permitted to be transported on Clickit?',
      answer: 'We handle a wide spectrum of legal goods including consumer electronics, apparel, FMCG, retail inventory, home goods, industrial machinery, and packaged parcels. Hazardous materials or illegal contraband are strictly prohibited.',
      points: [
        'Permitted: Retail inventory, documents, food, furniture, appliances, wholesale boxes',
        'Prohibited: Flammable materials, hazardous chemicals, firearms, illegal contraband'
      ]
    },
    {
      id: 'faq-8',
      category: 'pricing',
      categoryLabel: 'Pricing & GST',
      categoryIcon: CreditCard,
      question: 'What payment methods are supported on Clickit?',
      answer: 'We support all popular payment modes including UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards, Net Banking, Clickit Corporate Wallet, and Cash/UPI on Delivery.',
      points: [
        'Instant UPI payments with automated transaction receipt',
        'Corporate billing and monthly consolidated invoicing for verified B2B partners',
        'Safe Cash on Delivery (COD) supported across intra-city routes'
      ],
      highlight: 'UPI, Cards & Wallet'
    }
  ], []);

  const toggleFAQ = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(faqs.map(f => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const handleFeedback = (id: string, type: 'yes' | 'no') => {
    setFeedbackGiven(prev => ({ ...prev, [id]: type }));
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (faq.points && faq.points.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [faqs, activeCategory, searchQuery]);

  const INITIAL_VISIBLE_COUNT = 4;
  const isFilteredOrSearched = searchQuery.trim() !== '' || activeCategory !== 'all';

  const visibleFaqs = useMemo(() => {
    if (isExpanded || isFilteredOrSearched) {
      return filteredFaqs;
    }
    return filteredFaqs.slice(0, INITIAL_VISIBLE_COUNT);
  }, [filteredFaqs, isExpanded, isFilteredOrSearched]);

  const hasMoreFaqs = filteredFaqs.length > INITIAL_VISIBLE_COUNT && !isFilteredOrSearched;
  const remainingCount = filteredFaqs.length - INITIAL_VISIBLE_COUNT;
  const areAllOpen = filteredFaqs.length > 0 && filteredFaqs.every(f => openIds.includes(f.id));

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: faqs.length };
    faqs.forEach(f => {
      counts[f.category] = (counts[f.category] || 0) + 1;
    });
    return counts;
  }, [faqs]);

  return (
    <section id="faq-section" className="relative bg-[#F8F9FD] text-zinc-900 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 overflow-hidden">
      
      {/* =========================================================================
          LIGHT BACKGROUND AMBIENCE & WARM MESH LIGHTING
          ========================================================================= */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF5D00]/8 via-[#FF5D00]/0 to-transparent pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* =========================================================================
            HEADER
            ========================================================================= */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#FF5D00] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5D00]" />
            <span>Help &amp; Knowledge Base</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
            Frequently Asked{' '}
            <span className="text-[#FF5D00]">
              Questions
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-zinc-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Clear, transparent answers on express intra-city logistics, instant driver assignment, pricing, and enterprise delivery contracts.
          </p>
        </div>

        {/* =========================================================================
            TWO-COLUMN DESKTOP ARCHITECTURE (SIDEBAR NAV + QUESTION CARDS)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: STICKY SEARCH, CATEGORIES & CONCIERGE CARD
              ========================================================================= */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Search Input Card */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 shadow-sm">
              <label htmlFor="faq-search" className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wider">
                Quick Search
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  id="faq-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. fare, GST, Tata Ace, OTP..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-9 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#FF5D00] focus:ring-1 focus:ring-[#FF5D00] focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-900 bg-zinc-200 w-5 h-5 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Category Navigation Pills List */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-2.5 shadow-sm space-y-1">
              <div className="px-3 py-2 text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                <span>Filter By Topic</span>
                <span className="text-zinc-500 font-medium">{filteredFaqs.length} results</span>
              </div>

              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FF5D00] text-white shadow-md shadow-[#FF5D00]/25'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-orange-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                      <span>{cat.label}</span>
                    </div>

                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isActive 
                        ? 'bg-white/25 text-white' 
                        : 'bg-zinc-100 text-zinc-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Concierge Support Mini-Card */}
            <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/50 border border-orange-200 rounded-2xl p-5 shadow-sm space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF5D00] text-white flex items-center justify-center shadow-md shadow-orange-500/20">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-zinc-900 leading-tight">Need direct assistance?</h4>
                  <p className="text-xs text-zinc-600 font-medium">Our logistics desk is active 24/7</p>
                </div>
              </div>

              <div className="pt-1 flex flex-col gap-2">
                {onOpenQuoteModal && (
                  <button
                    type="button"
                    onClick={onOpenQuoteModal}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#FF5D00] hover:bg-[#E05200] text-white text-xs font-bold transition-all shadow-md shadow-[#FF5D00]/25 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Request B2B Rate Card</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate('/help-support')}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 text-xs font-bold border border-zinc-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Open Help Desk Ticket</span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: ELEGANT FAQ ACCORDIONS
              ========================================================================= */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Header Control Row (Count + Expand/Collapse) */}
            <div className="flex items-center justify-between px-1 text-xs text-zinc-600 pb-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5D00]" />
                <span>
                  Showing <strong className="text-zinc-900 font-bold">{visibleFaqs.length}</strong> of{' '}
                  <strong className="text-zinc-900 font-bold">{filteredFaqs.length}</strong> questions
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={areAllOpen ? collapseAll : expandAll}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-orange-300 text-xs font-bold text-zinc-700 hover:text-zinc-900 transition-all cursor-pointer shadow-xs"
                >
                  {areAllOpen ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5 text-[#FF5D00]" />
                      <span>Collapse All Answers</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5 text-[#FF5D00]" />
                      <span>Expand All Answers</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Questions List */}
            {visibleFaqs.length > 0 ? (
              <div className="space-y-3.5">
                {visibleFaqs.map((faq) => {
                  const isOpen = openIds.includes(faq.id);
                  const Icon = faq.categoryIcon;
                  const feedback = feedbackGiven[faq.id];

                  return (
                    <motion.div
                      key={faq.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isOpen 
                          ? 'bg-white border-orange-300 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.25)] ring-1 ring-[#FF5D00]/20' 
                          : 'bg-white hover:bg-zinc-50/90 border-zinc-200/90 hover:border-zinc-300 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]'
                      }`}
                    >
                      {/* Accordion Trigger Button */}
                      <button
                        type="button"
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 select-none focus:outline-none transition-colors cursor-pointer group"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-start gap-3.5 pr-2">
                          {/* Category Icon Badge */}
                          <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border mt-0.5 transition-colors ${
                            isOpen
                              ? 'bg-[#FFF2EA] border-[#FF5D00]/30 text-[#FF5D00]'
                              : 'bg-zinc-100 border-zinc-200 text-zinc-600 group-hover:bg-[#FFF2EA] group-hover:text-[#FF5D00] group-hover:border-[#FF5D00]/20'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          {/* Question Text & Highlights */}
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight leading-snug group-hover:text-black break-words">
                                {faq.question}
                              </span>
                              {faq.highlight && (
                                <span className="text-[11px] font-bold bg-[#FFF2EA] text-[#FF5D00] px-2.5 py-0.5 rounded-md border border-[#FF5D00]/30 shadow-xs whitespace-nowrap">
                                  {faq.highlight}
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-medium text-zinc-400 block">
                              {faq.categoryLabel}
                            </span>
                          </div>
                        </div>

                        {/* Animated Chevron Indicator */}
                        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          isOpen 
                            ? 'bg-[#FF5D00] text-white border-[#FF5D00] shadow-sm shadow-[#FF5D00]/30 rotate-180' 
                            : 'bg-zinc-100 text-zinc-600 border-zinc-200 group-hover:bg-zinc-200 rotate-0'
                        }`}>
                          <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      </button>

                      {/* Smooth Expanded Answer Content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-6 pb-6 pt-1 text-zinc-700 text-sm sm:text-base leading-relaxed border-t border-zinc-100 space-y-4 bg-white">
                              <p className="font-normal text-zinc-700 leading-relaxed pt-2 break-words">
                                {faq.answer}
                              </p>

                              {/* Structured Key Takeaways */}
                              {faq.points && faq.points.length > 0 && (
                                <div className="bg-zinc-50/90 rounded-xl p-4 border border-zinc-200/80 space-y-2.5">
                                  {faq.points.map((pt, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5 text-zinc-700 text-xs sm:text-sm font-medium">
                                      <CheckCircle2 className="w-4 h-4 text-[#FF5D00] shrink-0 mt-0.5" />
                                      <span className="leading-snug break-words">{pt}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Feedback Sub-widget */}
                              <div className="pt-2 flex items-center justify-between border-t border-zinc-100 text-xs text-zinc-500">
                                <span className="font-medium">Was this information helpful?</span>
                                
                                {feedback ? (
                                  <span className="text-[#FF5D00] font-semibold flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Thanks for your feedback!
                                  </span>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => handleFeedback(faq.id, 'yes')}
                                      className="px-2.5 py-1 rounded-md border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-800 text-zinc-600 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                                    >
                                      <ThumbsUp className="w-3 h-3" /> Yes
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleFeedback(faq.id, 'no')}
                                      className="px-2.5 py-1 rounded-md border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-800 text-zinc-600 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                                    >
                                      <ThumbsDown className="w-3 h-3" /> No
                                    </button>
                                  </div>
                                )}
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                {/* Expand / Collapse Section Button */}
                {!isFilteredOrSearched && filteredFaqs.length > INITIAL_VISIBLE_COUNT && (
                  <div className="relative pt-4 text-center">
                    {!isExpanded && (
                      <div className="absolute -top-20 left-0 right-0 h-20 bg-gradient-to-t from-[#F8F9FD] via-[#F8F9FD]/90 to-transparent pointer-events-none" />
                    )}
                    
                    <button
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="relative z-10 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-[#FF5D00] hover:from-orange-600 hover:to-orange-500 text-white font-bold text-sm shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                          <span>Show Fewer Questions</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 stroke-[2.5] animate-bounce" />
                          <span>Expand All FAQs ({remainingCount} More Questions)</span>
                        </>
                      )}
                    </button>
                    
                    {!isExpanded && (
                      <p className="text-xs text-zinc-500 mt-2.5 font-medium">
                        Showing 4 of {filteredFaqs.length} questions • Click to view all
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 px-6 rounded-3xl bg-white border border-zinc-200 shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF5D00] flex items-center justify-center mx-auto border border-orange-200">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-zinc-900">No matching questions found</h4>
                <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
                  We couldn't find questions matching "<span className="text-zinc-800 font-medium">{searchQuery}</span>". Try searching for topics like fare, GST, or mini trucks.
                </p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-sm text-white font-semibold hover:bg-zinc-800 transition-colors shadow-md cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
