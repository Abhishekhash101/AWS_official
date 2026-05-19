import { motion } from 'framer-motion';
import InteractiveHeroGrid from './InteractiveHeroGrid';

export default function Hero() {
  const levitateTransition = (delay) => ({
    repeat: Infinity,
    duration: 5,
    ease: 'easeInOut',
    delay: delay,
  });

  const levitateAnimation = {
    y: [0, -15, 0],
    scale: [1, 1.05, 1],
    boxShadow: [
      '0px 0px 0px 0px rgba(255, 153, 0, 0)',
      '10px 20px 30px -10px rgba(255, 153, 0, 0.5)',
      '0px 0px 0px 0px rgba(255, 153, 0, 0)',
    ],
  };

  return (
    <section
      className="relative min-h-[90vh] flex flex-col pt-12 pb-16 overflow-hidden w-full px-container-padding"
      id="home"
    >
      {/* Layer 0: The Floating Orange Blocks */}
      <motion.div
        animate={levitateAnimation}
        transition={levitateTransition(0)}
        className="absolute top-0 left-1/4 w-[160px] h-[160px] bg-[#FF9900] z-0 hidden md:block"
      ></motion.div>
      <motion.div
        animate={levitateAnimation}
        transition={levitateTransition(1.5)}
        className="absolute top-[160px] left-[12.5%] w-[80px] h-[80px] bg-[#FF9900] z-0 hidden md:block"
      ></motion.div>
      <motion.div
        animate={levitateAnimation}
        transition={levitateTransition(3)}
        className="absolute top-[160px] right-[20%] w-[80px] h-[80px] bg-[#FF9900] z-0 hidden md:block"
      ></motion.div>

      {/* Layer 10: The Interactive Hover Area */}
      <InteractiveHeroGrid />

      {/* Layer 20: The Content Wrapper */}
      <div className="relative z-20 w-full mt-32 md:mt-48 flex flex-col items-start text-left pointer-events-auto">
        {/* Status Badge */}
        <div className="mb-6 inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
          System Online
        </div>

        {/* Headline */}
        <h1 className="font-headline-xl text-[40px] md:text-[64px] text-white tracking-widest leading-tight mb-8 font-bold flex flex-col">
          <span>BUILD.</span>
          <span>LEARN.</span>
          <span>DEPLOY.</span>
        </h1>

        {/* Description + CTAs */}
        <div className="flex flex-col md:flex-row gap-8 items-start w-full">
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl border-l-2 border-primary-container pl-6 py-2">
            We are the architects of tomorrow. Formerly AWS STUDENT BUILDER @ VIT, now reborn with the same passion and bigger goals. Join a technical elite shaping the cloud infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0 md:ml-auto">
            <a
              className="bg-primary-container text-background font-headline-md text-label-md px-8 py-4 hover:bg-primary transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
              href="#join"
            >
              INITIATE SEQUENCE
              <span className="material-symbols-outlined">terminal</span>
            </a>
            <a
              className="bg-transparent border border-white/20 text-on-surface font-headline-md text-label-md px-8 py-4 hover:border-white/50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
              href="#about"
            >
              EXPLORE ARCHITECTURE
              <span className="material-symbols-outlined">architecture</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
