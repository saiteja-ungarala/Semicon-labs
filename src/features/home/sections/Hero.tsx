import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

const HEADLINES = [
  "Industry Ready Programs.",
  "AI Powered Learning.",
  "Learn by Building.",
  "Career Accelerators.",
  "Future Skills.",
  "Enterprise Training.",
  "Pro Certifications.",
];

const BACKGROUND_WORDS = [
  "Freshers", "Placements", "Mentorship", "Tapeouts", "Physical Design", "Verification", "RTL", "Timing Closure", "UVM"
];

export function Hero() {
  const reduce = useReducedMotion();
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % HEADLINES.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 15, filter: 'blur(8px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const scrollingWords = [...BACKGROUND_WORDS, ...BACKGROUND_WORDS, ...BACKGROUND_WORDS];

  return (
    <section className="relative overflow-hidden pb-12 pt-8 sm:pb-16 sm:pt-12 flex flex-col justify-center items-center min-h-[60vh]">
      
          {/* Background Scrolling Words Masked in the Center */}
      <div 
        className="absolute top-[68%] sm:top-[65%] -translate-y-1/2 left-0 right-0 w-full overflow-hidden pointer-events-none select-none z-0"
        style={{
          // A softer, more natural mask that fades beautifully into the center
          maskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 25%, transparent 42%, transparent 58%, black 75%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 25%, transparent 42%, transparent 58%, black 75%, black 85%, transparent 100%)'
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-16 opacity-40 blur-[1px] transition-all duration-1000">
          {scrollingWords.map((w, i) => (
            <span key={i} className="text-4xl sm:text-6xl font-display font-extrabold text-ink-faint/30 whitespace-nowrap">
              {w}
            </span>
          ))}
        </div>
      </div>

      <Container className="relative z-10 w-full px-4 sm:px-6">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl flex flex-col items-center text-center mt-6 sm:mt-10"
        >
          
          {/* LOUD headline with Stagger / Blur */}
          <motion.h1
            variants={item}
            className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-tight text-ink w-full"
          >
            Solve real chip problems with the industry's
            <span className="relative block mt-1 sm:mt-2 mx-auto w-fit">
              <span className="relative z-10 block h-[1.2em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={headlineIndex}
                    initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap bg-gradient-to-r from-blue via-[#7B61FF] to-blue bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
                  >
                    {HEADLINES[headlineIndex]}
                  </motion.span>
                </AnimatePresence>
                {/* Invisible placeholder to keep width based on longest word */}
                <span className="opacity-0 pointer-events-none whitespace-nowrap font-extrabold">Industry Ready Programs.</span>
              </span>
            </span>
          </motion.h1>

          {/* Hand-drawn style subtitle with annotation */}
          <motion.div variants={item} className="mt-8 sm:mt-10 font-hand text-[clamp(1.5rem,3vw,2.5rem)] text-ink/80 leading-tight relative max-w-2xl">
            Practical, project-based, and{' '}
            <span className="relative inline-block whitespace-nowrap text-ink font-bold z-10 px-1">
              highly trusted!
              
              <svg className="absolute -bottom-1 left-0 w-full text-blue pointer-events-none opacity-80" viewBox="0 0 300 30" preserveAspectRatio="none" stroke="currentColor" fill="none" strokeWidth="5" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20Q150 5 295 25" />
              </svg>

              {/* Odoo style hand drawn arrow and note */}
              <div className="absolute -bottom-16 lg:-bottom-14 right-0 lg:-right-24 hidden md:flex flex-col items-center gap-1">
                <svg className="h-10 w-10 text-blue rotate-12 -ml-6 opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="M80 80 Q 50 30 20 20" />
                  <path d="M40 15 L 20 20 L 25 40" />
                </svg>
                <span className="font-hand text-lg font-bold rotate-6 text-blue whitespace-nowrap -mt-2 opacity-90">
                  Trusted by 2,300+ engineers
                </span>
              </div>
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm sm:max-w-none relative z-20">
            <Button to="/modules" size="lg" arrow className="w-full sm:w-auto text-[15px] px-8 h-12 shadow-glow">
              Explore Courses
            </Button>
            <Button to="/pricing" size="lg" variant="secondary" className="w-full sm:w-auto text-[15px] px-8 h-12 bg-white hover:bg-void-2">
              View Pricing
            </Button>
          </motion.div>

          <motion.p variants={item} className="mt-6 font-mono text-[11px] text-ink-dim tracking-wide uppercase font-medium relative z-20">
            Start free · No credit card ·{' '}
            <Link to="/domains" className="text-blue underline-offset-4 hover:underline font-bold transition-all">
              or browse domains →
            </Link>
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}

