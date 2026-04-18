/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, PenTool, Brain, Share2, Sparkles, UserCheck, AlertCircle, Loader2 } from 'lucide-react';

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join waitlist.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col paper-texture selection:bg-learnly-primary/10">
      <Header />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <LandingPage 
                onSubscribe={handleSubmit} 
                email={email} 
                setEmail={setEmail} 
                error={error}
                isLoading={isLoading}
              />
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <SuccessPage email={email} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="w-full px-8 py-10 max-w-7xl mx-auto flex justify-between items-center">
      <div className="font-serif italic text-3xl tracking-tighter text-learnly-primary">
        Lernly
      </div>
    </header>
  );
}

function LandingPage({ 
  onSubscribe, 
  email, 
  setEmail,
  error,
  isLoading
}: { 
  onSubscribe: (e: React.FormEvent) => void; 
  email: string; 
  setEmail: (val: string) => void;
  error: string | null;
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-col items-center px-6 pt-12 pb-24 max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full bg-learnly-primary/10 text-learnly-primary font-sans text-sm font-semibold tracking-wide border border-learnly-primary/20"
        >
          <Sparkles className="w-3 h-3" />
          Early Access — Waitlist Open
        </motion.div>

        <h1 className="font-serif text-5xl md:text-7xl text-learnly-ink leading-[1.1] mb-8 tracking-tight max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="block"
          >
            Stop forgetting 
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="block"
          >
            what you studied. <span className="italic text-learnly-primary">Patch the gaps.</span>
          </motion.span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-sans text-lg md:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Lernly turns your class notes into quick checks that find weak spots early — then guides short repair sessions so the knowledge actually sticks.
        </motion.p>

        {/* Waitlist Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="w-full max-w-md mx-auto space-y-4"
        >
          <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <div className="relative w-full">
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email" 
                className={`w-full px-6 py-4 rounded-full bg-white border-none journal-shadow focus:ring-2 outline-none transition-all ${
                  error ? 'focus:ring-red-400' : 'focus:ring-learnly-primary'
                }`}
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto whitespace-nowrap bg-learnly-primary text-white px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide transition-all h-full hover:scale-105 active:scale-95 journal-shadow flex items-center justify-center disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Join the waitlist'
              )}
            </button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 text-red-500 font-sans text-sm justify-center px-4"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <p className="mt-4 text-[10px] font-sans text-stone-400 uppercase tracking-[0.2em] font-semibold">Join students building study confidence that lasts.</p>
      </section>

      {/* Visual Anchor: Notebook Mockup */}
      <div className="relative w-full max-w-4xl mx-auto mt-8">
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-learnly-primary/10 rounded-full blur-3xl opacity-50" />
        
        <motion.div 
          whileHover={{ rotate: 0 }}
          className="border-[12px] border-stone-100 bg-white rounded-[2.5rem] journal-shadow rotate-1 sm:rotate-2 transition-transform duration-700 overflow-hidden"
        >
          <div className="p-2 md:p-4">
            <div className="overflow-hidden rounded-lg aspect-[16/10] relative bg-stone-50">
              <img 
                src="https://drive.google.com/thumbnail?authuser=0&sz=w1200&id=1vh8lC1VOJC_FgEq1khEUF8HT97PrwuDc"
                alt="Learnly Dashboard Prototype" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              
              {/* Overlay Label for Mockup */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-stone-200">
                <span className="text-[10px] font-bold text-learnly-primary uppercase tracking-widest">Learnly Beta</span>
              </div>
            </div>
            
            <div className="mt-6 px-4 pb-4 border-t border-dashed border-stone-200 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-sans uppercase tracking-widest text-stone-400 font-bold">Internal Preview</span>
                <span className="font-serif text-xl italic text-learnly-ink">What our devs are working on</span>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white shadow-sm" />
                <div className="w-8 h-8 rounded-full bg-violet-100 border-2 border-white shadow-sm" />
                <div className="w-8 h-8 rounded-full bg-stone-100 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-stone-400">+</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hand-drawn Accent Style */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="absolute -bottom-8 -left-4 md:-left-12 max-w-[180px] hidden md:block"
        >
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl asymmetric-border journal-shadow border-t-2 border-orange-200/30">
            <p className="font-serif italic text-learnly-secondary text-sm leading-tight">
              "A sneak peek at the new Lernly dashboard."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        className="w-full mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <FeatureCard 
          icon={<Brain className="w-8 h-8 text-learnly-primary" />}
          title="Fast gap detection"
          description="Upload your notes and Lernly generates a 5-minute baseline check to pinpoint what you’re missing — not what you already know."
        />
        <FeatureCard 
          icon={<UserCheck className="w-8 h-8 text-learnly-secondary" />}
          title="Repair sessions that prove mastery"
          description="Each gap comes with a short repair path plus a follow-up check. No “done” unless you can actually recall it."
          className="md:translate-y-8"
        />
        <FeatureCard 
          icon={<Sparkles className="w-8 h-8 text-violet-400" />}
          title="Less planning, more progress"
          description="You get 1–3 priorities per session, based on what’s leaking most. No calendar. No chaos. Just the next best action."
        />
      </motion.section>

      {/* Bottom CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full mt-32 mb-12 text-center px-4"
      >
        <div className="bg-stone-50 rounded-[2.5rem] p-10 md:p-16 border border-stone-100 journal-shadow max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
          
          <h2 className="font-serif text-3xl md:text-5xl text-learnly-ink mb-6 relative z-10">
            Ready to <span className="italic text-learnly-primary font-medium">patch the gaps?</span>
          </h2>
          <p className="font-sans text-stone-600 mb-10 max-w-xl mx-auto relative z-10 text-lg">
            Join the students determined to retain what they studied hard for.
          </p>
          
          <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mx-auto relative z-10">
            <div className="relative w-full">
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email" 
                className={`w-full px-6 py-4 rounded-full bg-white border-none journal-shadow focus:ring-2 outline-none transition-all ${
                  error ? 'focus:ring-red-400' : 'focus:ring-learnly-primary'
                }`}
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto whitespace-nowrap bg-learnly-primary text-white px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide transition-all h-full hover:scale-105 active:scale-95 journal-shadow flex items-center justify-center disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Join the waitlist'
              )}
            </button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex items-center gap-2 text-red-500 font-sans text-sm justify-center"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
}

function FeatureCard({ icon, title, description, className = "" }: { icon: React.ReactNode, title: string, description: string, className?: string }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      whileHover={{ y: -5 }}
      className={`p-8 bg-white rounded-xl journal-shadow flex flex-col gap-4 border border-stone-100 ${className}`}
    >
      <div className="p-3 bg-stone-50 rounded-lg w-fit">
        {icon}
      </div>
      <h3 className="font-serif text-2xl text-learnly-ink">{title}</h3>
      <p className="text-stone-500 leading-relaxed font-sans text-sm">{description}</p>
    </motion.div>
  );
}

function SuccessPage({ email }: { email: string }) {
  return (
    <div className="max-w-2xl w-full mx-auto px-6 py-24 relative overflow-hidden">
      {/* Decorative Ambient Element */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-learnly-primary/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl opacity-50" />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl p-10 md:p-16 flex flex-col gap-10 journal-shadow border border-stone-100 relative z-10"
      >
        <div className="flex flex-col gap-4">
          <div className="-translate-x-2">
            <span className="text-orange-500 font-sans text-xs font-bold tracking-[0.2em] uppercase opacity-70">Confirmation</span>
            <h1 className="font-serif text-5xl md:text-6xl text-learnly-ink mt-2 leading-tight">
              You're on the list.
            </h1>
          </div>
          <p className="font-sans text-lg text-stone-600 leading-relaxed max-w-md">
            We’ll email you when your early access is ready. In the meantime, share your link to move up — the sooner you’re in, the sooner you can start patching gaps.
          </p>
        </div>

        {/* Share Section */}
        <div className="bg-stone-50 rounded-2xl p-8 flex flex-col gap-6 border border-stone-100">
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-2xl text-learnly-ink">Jump the queue</h2>
            <p className="font-sans text-sm text-stone-500">Each friend who joins with your link moves you up 50 spots. More invites = faster access.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="w-full bg-white border border-stone-200/60 rounded-full px-6 py-4 flex items-center justify-between group">
              <span className="font-sans text-learnly-primary text-sm font-medium truncate">lernly.app/join/scholar_{Math.floor(Math.random() * 100000)}</span>
              <Share2 className="w-4 h-4 text-stone-300 group-hover:text-learnly-primary transition-colors" />
            </div>
            <button 
              onClick={() => {
                const link = `lernly.app/join/scholar_${Math.floor(Math.random() * 100000)}`;
                try {
                   navigator.clipboard.writeText(link);
                } catch (e) {
                   // Fallback
                }
              }}
              className="w-full md:w-auto bg-learnly-primary text-white font-sans text-sm font-bold px-8 py-4 rounded-full shadow-lg shadow-learnly-primary/20 hover:scale-105 transition-all active:scale-95 whitespace-nowrap"
            >
              Copy link
            </button>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center gap-4 py-4 border-t border-dashed border-stone-200">
          <div className="flex -space-x-3">
            {[1, 2].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-stone-200 shadow-sm">
                <img 
                  src={`https://picsum.photos/seed/person-${i}/100/100`} 
                  alt="Scholar" 
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-orange-100 text-orange-600 font-sans text-[10px] font-bold shadow-sm">
              +k
            </div>
          </div>
          <p className="font-sans text-sm text-stone-500 italic leading-snug">
            Join thousands of students already waiting to study with less stress and more confidence.
          </p>
        </div>
      </motion.div>

      <div className="mt-12 text-center md:text-left md:pl-8 opacity-50 italic font-serif text-stone-600 text-lg">
        “Study once. Remember when it counts.”
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-learnly-bg/50 backdrop-blur-sm border-t border-stone-200/50 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 max-w-7xl mx-auto gap-8">
        <div className="font-serif italic text-xl text-learnly-ink">
          Lernly
        </div>
        <div className="flex gap-8 items-center text-sm font-sans text-stone-500">
          <a href="#" className="hover:text-learnly-ink transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-learnly-ink transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-learnly-ink transition-colors border-b border-stone-400">Contact</a>
        </div>
        <div className="text-stone-400 text-[10px] font-sans uppercase tracking-widest font-bold text-center md:text-left">
          © 2026 Lernly. Built to help you remember what matters.
        </div>
      </div>
    </footer>
  );
}
