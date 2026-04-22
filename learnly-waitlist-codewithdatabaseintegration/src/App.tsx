/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type ReactNode, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles,
  Brain, 
  UserCircle2,
  Link as LinkIcon, 
  Quote,
  CheckCircle2,
  MousePointer2,
  ArrowRight,
  Plus,
  History,
  LogOut,
  ChevronRight,
  FlaskConical,
  Book
} from 'lucide-react';

// --- Constants ---

const SUPABASE_URL = "https://ybncwxmmkhnxtajqyogn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibmN3eG1ta2hueHRhanF5b2duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MjQ2MzIsImV4cCI6MjA5MjQwMDYzMn0.MgN6f9eDA_rEvpOWz3ifgUuMYFq5ixYM6v738pAMAoM";

// --- Components ---

const Header = () => (
  <header className="w-full flex justify-center md:justify-between items-center px-6 md:px-8 py-8 md:py-10 max-w-7xl mx-auto">
    <motion.div 
      whileHover={{ scale: 1.05, rotate: -2 }}
      className="font-headline italic text-3xl tracking-tighter text-learnly-primary cursor-default select-none"
    >
      Learnly
    </motion.div>
  </header>
);

const Footer = ({ onPrivacyClick }: { onPrivacyClick: () => void }) => (
  <footer className="w-full bg-transparent mt-auto px-4 md:px-0">
    <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-8 py-8 md:py-12 max-w-7xl mx-auto gap-6 transition-all border-t border-learnly-ink/5">
      <div className="font-headline italic text-2xl text-learnly-ink">
        Learnly
      </div>
      <div className="flex gap-8 items-center text-sm font-label text-learnly-ink/60">
        <button 
          onClick={onPrivacyClick}
          className="hover:text-learnly-primary transition-colors cursor-pointer"
        >
          Privacy Policy
        </button>
        <a href="#" className="hover:text-learnly-ink transition-colors font-medium underline underline-offset-4">Contact</a>
      </div>
      <div className="text-sm font-label text-learnly-ink/40">
        © 2026 Learnly.
      </div>
    </div>
  </footer>
);

const PrivacyPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-grow flex flex-col px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-24 max-w-3xl mx-auto relative"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-learnly-ink/40 hover:text-learnly-primary transition-colors font-label text-xs font-bold tracking-widest uppercase mb-12 self-start group"
      >
        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
        Back to home
      </button>

      <div className="bg-white/60 backdrop-blur-xl p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] journal-shadow border border-white/50">
        <h1 className="font-headline text-4xl md:text-5xl text-learnly-ink mb-2">Learnly Waitlist Privacy Policy</h1>
        <p className="font-label text-xs text-learnly-ink/40 uppercase tracking-widest mb-12 italic">Last updated: April 21, 2026</p>

        <div className="space-y-12 font-body text-learnly-ink/80 leading-relaxed text-lg">
          <section>
            <h2 className="font-headline text-2xl text-learnly-ink mb-4 italic">What we collect</h2>
            <p>When you join the Learnly waitlist, we collect the email address you provide.</p>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-learnly-ink mb-4 italic">Why we collect it</h2>
            <p className="mb-4">We use your email address to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>measure interest in Learnly, and</li>
              <li>contact you about early access, beta testing, and product updates related to the waitlist.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-learnly-ink mb-4 italic">How we store it</h2>
            <p>We store waitlist emails in a database used for operating the waitlist. We take reasonable steps to protect this information.</p>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-learnly-ink mb-4 italic">How we share it</h2>
            <p className="mb-6">We do not sell your email address. We do not share your email address with third parties for advertising or marketing purposes.</p>
            <p>We may use trusted service providers to store waitlist data or send emails (for example, database hosting or email delivery services). These providers are only used to operate the waitlist.</p>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-learnly-ink mb-4 italic">Changes to this policy</h2>
            <p>We may update this policy as Learnly evolves. If we make material changes, we will update the “Last updated” date above.</p>
          </section>
        </div>
      </div>
    </motion.main>
  );
};

const LandingPage = ({ onJoin }: { onJoin: (duplicate: boolean) => void }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    // Validation
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          email: normalizedEmail,
          source: 'landing',
          user_agent: navigator.userAgent
        })
      });

      if (response.status === 201 || response.status === 200) {
        setEmail('');
        setStatus('success');
        onJoin(false); // Show success page
      } else if (response.status === 409) {
        setEmail('');
        setStatus('duplicate');
        onJoin(true); // Show success page with duplicate message
      } else {
        const errorData = await response.text();
        console.error('Supabase error:', errorData);
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-grow flex flex-col items-center px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-24 max-w-6xl mx-auto relative overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="text-center mb-20 md:mb-32 px-4 relative z-10 w-full flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 md:mb-10 px-4 py-1.5 rounded-full bg-learnly-primary/10 text-learnly-primary font-label text-[10px] md:text-xs font-semibold tracking-wide border border-learnly-primary/15"
        >
          <Sparkles className="w-3 md:w-3.5 h-3 md:h-3.5" />
          Early Access — Waitlist Open
        </motion.div>
        
        <div className="relative">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-learnly-ink leading-tight sm:leading-[1.1] md:leading-[1] mb-8 md:mb-10 tracking-tight max-w-5xl font-medium">
            Stop forgetting what you studied. <span className="italic text-learnly-primary ink-highlighter">Patch the gaps.</span>
          </h1>
        </div>
        
        <p className="font-body text-lg md:text-2xl text-learnly-ink/70 max-w-2xl mx-auto leading-relaxed mb-12 md:mb-16">
          Learnly turns your class notes into quick checks that find weak spots early — then guides short repair sessions so the knowledge actually sticks.
        </p>

        {/* Waitlist Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-lg mx-auto mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
            <div className="relative w-full group">
              <input 
                className="w-full px-8 py-5 rounded-full bg-white/80 backdrop-blur-sm border border-learnly-ink/5 journal-shadow outline-none focus:ring-4 focus:ring-learnly-primary/10 text-learnly-ink placeholder:text-learnly-ink/30 transition-all font-body text-lg"
                placeholder="Enter email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
              />
              <div className="absolute inset-0 rounded-full border-2 border-learnly-primary/5 -z-10 group-focus-within:scale-105 transition-transform" />
            </div>
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto whitespace-nowrap bg-learnly-primary text-white px-10 py-5 rounded-full font-label font-bold text-base tracking-wide transition-all hover:brightness-110 hover:-translate-y-1 active:scale-95 journal-shadow group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Joining...' : 'Join the waitlist'}
            </button>
          </div>
          
          <div className="mt-4 h-6">
            <AnimatePresence mode="wait">
              {status === 'error' && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-red-500 font-label text-xs font-bold tracking-wider uppercase"
                >
                  Something went wrong. Try again.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
        
        <p className="text-[11px] font-label text-learnly-ink/40 uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3">
          <span className="w-8 h-[1px] bg-learnly-ink/10" />
          Join students building study confidence
          <span className="w-8 h-[1px] bg-learnly-ink/10" />
        </p>
      </section>

      {/* Visual Anchor: Notebook Mockup with asymmetrical tilt */}
      <div className="relative w-full max-w-6xl mx-auto mb-24 md:mb-48 group px-2 sm:px-4">
        <motion.div 
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="bg-white/40 backdrop-blur-xl p-2 sm:p-4 md:p-6 rounded-[1.5rem] sm:rounded-[2.5rem] journal-shadow relative overflow-hidden ring-1 ring-white/50 group-hover:rotate-0 transition-transform duration-1000"
        >
           {/* Mock Content */}
           <div className="aspect-[16/10] sm:aspect-[16/9] bg-white rounded-xl sm:rounded-2xl overflow-hidden relative shadow-2xl ring-1 ring-learnly-ink/5 flex flex-col">
               {/* Browser Top Bar */}
               <div className="h-6 sm:h-10 bg-white/80 backdrop-blur-md border-b border-learnly-ink/5 flex items-center justify-between px-3 sm:px-6">
                 <div className="flex gap-1.5 sm:gap-2">
                   <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-red-400/20" />
                   <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-yellow-400/20" />
                   <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-400/20" />
                 </div>
                 <div className="text-[6px] sm:text-[9px] uppercase tracking-widest font-bold opacity-20 truncate max-w-[150px]">learnly.world/chemistry</div>
               </div>

               {/* Dashboard Application UI */}
               <div className="flex-grow flex flex-col bg-[#fdfcfb]">
                 {/* Internal App Header */}
                 <header className="h-10 sm:h-16 border-b border-learnly-ink/5 flex items-center justify-between px-4 sm:px-8 bg-white/50">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="font-headline italic text-xs sm:text-lg text-learnly-primary">Learnly</span>
                      <ChevronRight className="w-2 sm:w-3 h-2 sm:h-3 text-learnly-ink/20" />
                      <span className="text-[8px] sm:text-[10px] font-label font-bold text-learnly-ink/40 tracking-[0.2em] uppercase">Chemistry</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-6">
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-learnly-ink/5 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[8px] font-label font-bold text-learnly-ink/60 tracking-wider">SUNIONIUNI@GMAIL.COM</span>
                      </div>
                      <LogOut className="w-3 sm:w-4 h-3 sm:h-4 text-learnly-ink/20" />
                    </div>
                 </header>

                 <div className="flex-grow flex overflow-hidden">
                   {/* Sidebar */}
                   <aside className="w-24 sm:w-64 border-r border-learnly-ink/5 bg-white/30 p-2 sm:p-6 flex flex-col gap-4 sm:gap-8">
                     <div>
                       <h3 className="text-[10px] sm:text-lg font-headline font-medium text-learnly-ink mb-4 sm:mb-6">Subjects</h3>
                       <button className="w-full h-8 sm:h-12 bg-white rounded-lg sm:rounded-xl border border-learnly-ink/5 shadow-sm flex items-center justify-center gap-2 text-learnly-primary hover:bg-learnly-primary/5 transition-colors">
                         <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
                         <span className="hidden sm:inline text-[9px] font-label font-black tracking-[0.15em] uppercase">New Subject</span>
                       </button>
                     </div>

                     <div className="flex flex-col gap-1 sm:gap-2">
                        <p className="text-[6px] sm:text-[9px] font-label font-black text-learnly-ink/20 tracking-[0.2em] uppercase mb-1 sm:mb-2 px-2 sm:px-4">Subjects Mastery</p>
                        <div className="flex items-center gap-2 sm:gap-4 p-1.5 sm:p-3 bg-white rounded-xl border border-learnly-ink/5 shadow-sm border-l-4 border-l-learnly-primary">
                          <div className="w-6 sm:w-10 h-6 sm:h-10 bg-learnly-primary/5 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-3 sm:w-5 h-3 sm:h-5 text-learnly-primary" />
                          </div>
                          <div className="hidden sm:flex flex-grow items-center justify-between">
                            <span className="text-[10px] font-label font-bold text-learnly-ink tracking-widest uppercase">Chemistry</span>
                            <ChevronRight className="w-3 h-3 text-learnly-ink/10" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 p-1.5 sm:p-3 opacity-40 hover:opacity-60 transition-opacity cursor-not-allowed">
                          <div className="w-6 sm:w-10 h-6 sm:h-10 bg-learnly-ink/5 rounded-lg flex items-center justify-center">
                            <Book className="w-3 sm:w-5 h-3 sm:h-5 text-learnly-ink" />
                          </div>
                          <span className="hidden sm:inline text-[10px] font-label font-bold text-learnly-ink tracking-widest uppercase">Modern Physics</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 p-1.5 sm:p-3 opacity-40 hover:opacity-60 transition-opacity cursor-not-allowed">
                          <div className="w-6 sm:w-10 h-6 sm:h-10 bg-learnly-ink/5 rounded-lg flex items-center justify-center">
                             <Book className="w-3 sm:w-5 h-3 sm:h-5 text-learnly-ink" />
                          </div>
                          <span className="hidden sm:inline text-[10px] font-label font-bold text-learnly-ink tracking-widest uppercase">Math</span>
                        </div>
                     </div>
                   </aside>

                   {/* Main Content Area */}
                   <main className="flex-grow p-4 sm:p-12 overflow-y-auto bg-white/40">
                     <div className="max-w-4xl flex flex-col gap-6 sm:gap-12">
                        {/* Title Section */}
                        <div className="flex items-center gap-4 sm:gap-10">
                          <div className="w-12 sm:w-24 h-12 sm:h-24 bg-white rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center border border-learnly-ink/5 ring-1 ring-learnly-ink/5">
                             <div className="w-10 sm:w-20 h-10 sm:h-20 border-2 border-learnly-secondary/20 rounded-lg flex items-center justify-center">
                               <Book className="w-5 sm:w-10 h-5 sm:h-10 text-learnly-secondary/60" />
                             </div>
                          </div>
                          <div className="flex flex-col gap-1 sm:gap-2">
                             <h1 className="text-2xl sm:text-7xl font-headline font-medium tracking-tighter text-learnly-ink">Chemistry</h1>
                             <p className="text-[8px] sm:text-lg font-body text-learnly-ink/40">Manage your chemistry sources and repair identified gaps.</p>
                          </div>
                        </div>

                        {/* Intervals Section */}
                        <div className="flex flex-col gap-4 sm:gap-8">
                           <div className="flex items-center justify-between">
                             <div className="flex flex-col gap-0.5 sm:gap-1">
                               <span className="text-[6px] sm:text-[9px] font-label font-black text-blue-800 tracking-[0.3em] uppercase opacity-40">Gaps</span>
                               <h2 className="text-lg sm:text-3xl font-headline font-medium text-learnly-ink flex items-center gap-2">
                                 <History className="w-4 sm:w-6 h-4 sm:h-6 text-learnly-ink/20" />
                                 Review progress
                               </h2>
                             </div>
                             <button className="px-3 sm:px-6 py-1.5 sm:py-3 bg-white rounded-full border border-learnly-ink/5 shadow-sm text-[6px] sm:text-[10px] font-label font-black text-learnly-secondary tracking-[0.2em] uppercase transition-all hover:bg-learnly-paper active:scale-95">Show everything</button>
                           </div>

                           {/* Timeline Item */}
                           <div className="relative pl-6 sm:pl-10">
                              <div className="absolute left-[7px] sm:left-[11px] top-2 sm:top-4 bottom-0 w-[1px] bg-learnly-ink/10" />
                              <div className="absolute left-0 top-1 sm:top-2 w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-[#fdfcfb] border border-learnly-ink/5 flex items-center justify-center">
                                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-learnly-secondary/40" />
                              </div>

                              {/* Card */}
                              <div className="bg-white rounded-2xl sm:rounded-[2.5rem] border border-learnly-ink/5 shadow-xl sm:shadow-2xl p-4 sm:p-10 flex flex-col gap-4 sm:gap-10">
                                <div className="flex items-center justify-between">
                                  <div className="px-3 sm:px-6 py-1.5 sm:py-3 bg-learnly-paper rounded-full border border-learnly-ink/5 text-[7px] sm:text-[11px] font-label font-black text-learnly-secondary tracking-[0.2em] uppercase">Review now</div>
                                  <button className="h-8 sm:h-16 px-4 sm:px-10 bg-learnly-secondary text-white rounded-full flex items-center gap-2 sm:gap-4 shadow-xl hover:brightness-110 active:scale-95 transition-all">
                                    <FlaskConical className="w-3 sm:w-6 h-3 sm:h-6 text-white/80" />
                                    <span className="text-[9px] sm:text-base font-label font-black tracking-widest uppercase">Repair</span>
                                  </button>
                                </div>

                                <div className="flex flex-col gap-1 sm:gap-2">
                                  <h3 className="text-xl sm:text-5xl font-headline font-medium tracking-tight text-learnly-ink">Elemental Reactivity Patterns</h3>
                                  <p className="text-[10px] sm:text-xl font-body text-learnly-ink/40 font-light">Due for review</p>
                                </div>

                                <div className="h-[1px] bg-learnly-ink/5" />

                                <div className="flex items-center gap-6 sm:gap-12">
                                  <div className="flex items-center gap-1.5 sm:gap-3 opacity-30">
                                    <History className="w-3 sm:w-5 h-3 sm:h-5" />
                                    <span className="text-[7px] sm:text-[11px] font-label font-bold tracking-[0.15em] uppercase whitespace-nowrap">Last check: Apr 11, 2026</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 sm:gap-3 opacity-30">
                                    <ArrowRight className="w-3 sm:w-5 h-3 sm:h-5 rotate-[-45deg]" />
                                    <span className="text-[7px] sm:text-[11px] font-label font-bold tracking-[0.15em] uppercase whitespace-nowrap">Progress: 4</span>
                                  </div>
                                </div>
                              </div>
                           </div>
                        </div>
                     </div>
                   </main>
                 </div>
               </div>
            </div>

            <div className="mt-8 md:mt-12 px-4 sm:px-8 pb-4 pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div className="flex flex-col gap-1">
               <span className="text-[9px] sm:text-[10px] font-label uppercase tracking-[0.2em] sm:tracking-[0.3em] text-learnly-ink/30 font-black mb-1 sm:mb-2 flex items-center gap-2">
                 <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-red-400" />
                 LIVE DEVELOPMENT PREVIEW
                </span>
               <span className="font-headline text-xl sm:text-3xl font-medium text-learnly-ink flex items-center gap-3 sm:gap-4">
                 <MousePointer2 className="w-5 sm:w-6 h-5 sm:h-6 text-learnly-primary -rotate-12 animate-float" />
                 What our devs are working on
                </span>
             </div>
             <div className="flex -space-x-3 sm:-space-x-4 items-center">
               {[1, 2, 3].map(i => (
                 <div key={i} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-learnly-paper border-[3px] sm:border-4 border-white journal-shadow overflow-hidden group/avatar">
                    <img src={`https://picsum.photos/seed/stud${i}/100/100`} className="group-hover/avatar:scale-110 transition-transform" referrerPolicy="no-referrer" alt="Scholar" />
                 </div>
               ))}
               <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-learnly-ink/5 border-[3px] sm:border-4 border-white flex items-center justify-center text-[10px] sm:text-xs font-bold text-learnly-ink/40 journal-shadow">+12</div>
             </div>
           </div>
        </motion.div>

      </div>

      {/* Features Grid with asymmetrical heights and rotations */}
      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-24 md:mb-60 relative px-2">
        <FeatureCard 
          icon={<div className="p-4 bg-purple-100/50 rounded-2xl rotate-[-2deg]"><Brain className="w-8 h-8 text-learnly-primary" /></div>}
          title="Fast gap detection"
          description="Upload your notes and Learnly generates a 5-minute baseline check to pinpoint what you're missing."
          className="md:rotate-[-1deg] md:translate-y-8"
          delay={0.1}
        />
        <FeatureCard 
          icon={<div className="p-4 bg-orange-100/50 rounded-2xl rotate-[3deg]"><UserCircle2 className="w-8 h-8 text-learnly-secondary" /></div>}
          title="Repair sessions that stick"
          description="Each gap comes with a short repair path plus a follow-up check. No 'done' unless you recall it."
          className="md:rotate-[1deg]"
          delay={0.2}
        />
        <FeatureCard 
          icon={<div className="p-4 bg-purple-100/50 rounded-2xl rotate-[-4deg]"><Sparkles className="w-8 h-8 text-learnly-primary" /></div>}
          title="Minimal planning"
          description="You get 1–3 priorities per session, based on what’s leaking most. No chaos. Just progress."
          className="md:rotate-[-0.5deg] md:translate-y-12"
          delay={0.3}
        />
      </section>

        {/* Bottom CTA Card with organic shape */}
        <motion.section 
          whileInView={{ scale: 1, opacity: 1 }}
          initial={{ scale: 0.95, opacity: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl bg-white/60 p-10 md:p-24 asymmetric-soft text-center journal-shadow border-4 border-white flex flex-col items-center relative overflow-hidden backdrop-blur-xl"
        >
          <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10">
             <Quote className="w-20 md:w-32 h-20 md:h-32 text-learnly-primary" />
          </div>
          
          <h2 className="font-headline text-4xl sm:text-5xl md:text-8xl text-learnly-ink leading-tight mb-8 md:mb-10 font-medium md:translate-x-[-10px]">
            Ready to <span className="italic text-learnly-primary/80 ink-highlighter">patch the gaps?</span>
          </h2>
          <p className="font-body text-lg md:text-2xl text-learnly-ink/60 mb-10 md:mb-16 max-w-2xl mx-auto md:translate-x-[10px]">
            Join the students determined to retain what they studied hard for.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
              <div className="relative w-full group">
                <input 
                  className="w-full px-8 py-5 rounded-full bg-white border-0 journal-shadow outline-none focus:ring-4 focus:ring-learnly-primary/10 text-learnly-ink placeholder:text-learnly-ink/30 transition-all font-body text-lg"
                  placeholder="Enter email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                />
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto whitespace-nowrap bg-learnly-primary text-white px-10 py-5 rounded-full font-label font-bold text-base tracking-wide transition-all hover:brightness-110 hover:-rotate-1 journal-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Joining...' : 'Join the waitlist'}
              </button>
            </div>
            
            <div className="mt-4 h-6">
              <AnimatePresence mode="wait">
                {status === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-red-500 font-label text-xs font-bold tracking-wider uppercase"
                  >
                    Something went wrong. Try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.section>
    </motion.main>
  );
};

const FeatureCard = ({ icon, title, description, className = "", delay = 0 }: { icon: ReactNode, title: string, description: string, className?: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.8, 
      delay, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    }}
    whileHover={{ y: -12 }}
    className={`p-10 bg-white rounded-[2.5rem] journal-shadow flex flex-col gap-6 border border-learnly-ink/5 asymmetric-card ${className}`}
  >
    <div>
      {icon}
    </div>
    <h3 className="font-headline text-3xl text-learnly-ink leading-tight">{title}</h3>
    <p className="font-body text-learnly-ink/60 leading-relaxed text-base">{description}</p>
  </motion.div>
);

const SuccessPage = ({ isDuplicate }: { isDuplicate: boolean }) => {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-grow flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24 relative overflow-hidden"
    >
      <div className="w-full max-w-2xl relative">
        <div className="bg-white/60 backdrop-blur-3xl p-8 sm:p-12 md:p-16 asymmetric-soft journal-shadow border-4 border-white relative z-10">
          <div className="flex flex-col gap-6 sm:gap-10 mb-8 sm:mb-12 text-center">
            <div className="flex flex-col gap-3 sm:gap-4">
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-learnly-ink leading-tight tracking-tight">
                {isDuplicate ? (
                  <>Already <span className="italic text-learnly-primary ink-highlighter">on the list.</span></>
                ) : (
                  <>You're in. <span className="italic text-learnly-primary ink-highlighter">Learnly.</span></>
                )}
              </h1>
              <p className="font-body text-lg sm:text-xl text-learnly-ink/60 leading-relaxed max-w-md mx-auto">
                {isDuplicate 
                  ? "We've already got your spot saved! We'll reach out soon."
                  : "Congrats! Your waitlist spot is confirmed :)"}
              </p>
            </div>
          </div>

          {/* Next Steps Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-learnly-paper/80 rounded-[1.5rem] sm:rounded-[2.5rem] p-8 sm:p-12 flex flex-col gap-6 journal-shadow border border-white/50 relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
               <Sparkles className="w-20 h-20 text-learnly-primary" />
            </div>
            
            <div className="flex flex-col gap-3 relative z-10">
              <h2 className="font-headline text-3xl text-learnly-ink">What happens next</h2>
              <p className="font-body text-sm sm:text-base text-learnly-ink/50 leading-relaxed max-w-sm mx-auto">
                We’ll email you as soon as we're ready to get our first iteration of testers online.
              </p>
            </div>

            <div className="pt-4 border-t border-learnly-ink/5 relative z-10">
               <p className="font-label text-[10px] uppercase tracking-[0.2em] font-black text-learnly-primary">Keep an eye on your inbox</p>
            </div>
          </motion.div>

          {/* Status Indicator */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:row items-center justify-center gap-6 py-6 border-t border-learnly-ink/5 bg-white/20 rounded-b-[1.5rem] sm:rounded-b-[2rem] px-4 -mx-4 -mb-4">
            <div className="flex -space-x-3 sm:-space-x-4">
              {[1, 2, 4].map((i) => (
                <div key={i} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-[3px] sm:border-4 border-white overflow-hidden bg-learnly-accent/10 shadow-sm">
                  <img 
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    alt="User" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-[3px] sm:border-4 border-white flex items-center justify-center bg-learnly-accent text-learnly-secondary font-label text-[9px] sm:text-[10px] font-black shadow-sm">
                +50
              </div>
            </div>
            <p className="font-body text-sm sm:text-base text-learnly-ink/60 italic leading-relaxed text-center sm:text-left">
              Join <span className="ink-highlighter font-bold border-b border-learnly-accent/30">50+ students</span> already waiting to patch gaps before exams.
            </p>
          </div>
        </div>

        {/* Footer Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center italic font-headline text-learnly-ink/70 text-2xl max-w-lg mx-auto"
        >
          “Learn once. Remember when it counts.”
        </motion.div>
      </div>
    </motion.main>
  );
};

export default function App() {
  const [view, setView] = useState<'landing' | 'success' | 'privacy'>('landing');
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleJoin = (duplicate: boolean) => {
    setIsDuplicate(duplicate);
    setView('success');
  };

  return (
    <div className="min-h-screen flex flex-col paper-texture bg-dots relative">
      <Header />
      
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <div key="landing">
            <LandingPage onJoin={handleJoin} />
          </div>
        )}
        {view === 'success' && (
          <div key="success">
            <SuccessPage isDuplicate={isDuplicate} />
          </div>
        )}
        {view === 'privacy' && (
          <div key="privacy">
            <PrivacyPage onBack={() => setView('landing')} />
          </div>
        )}
      </AnimatePresence>

      <Footer onPrivacyClick={() => setView('privacy')} />
    </div>
  );
}
