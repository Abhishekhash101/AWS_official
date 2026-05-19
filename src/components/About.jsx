import { useEffect, useRef } from 'react';
import hqSvg from '../assets/aws_club_hq.svg';
import { useInView, motion, useMotionValue, useTransform, animate } from 'framer-motion';

const stats = [
  { value: 50, suffix: '+', label: 'Members' },
  { value: 10, suffix: '+', label: 'Events' },
  { value: 3, suffix: '+', label: 'Projects' },
];

function AnimatedCounter({ targetValue, inView }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      animate(count, targetValue, { duration: 2, ease: 'easeOut' });
    }
  }, [inView, count, targetValue]);

  return <motion.span>{rounded}</motion.span>;
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 relative bg-background border-b border-white/10" id="about">
      <div className="w-full px-container-padding relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left Column — Text Content */}
        <div className="flex flex-col">
          <h2 className="font-headline-lg text-[40px] md:text-[56px] text-white mb-6 uppercase tracking-widest leading-tight">
            AWS STUDENT BUILDER <br />at VIT VELLORE →{' '}
            <br />
            {/* <span className="text-primary-container">
                AWS Student Builder Group at VIT VELLORE
              </span> */}
          </h2>
          <p className="font-headline-md text-headline-md text-on-surface-variant mb-8 tracking-wider">
            Same Passion, Bigger Goals
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant mb-12 max-w-lg">
            We are a collective of driven students dedicated to mastering cloud technologies. Our evolution reflects our commitment to not just learning, but building robust, scalable solutions. We provide the ecosystem for technical minds to thrive.
          </p>

          {/* Stats Row */}
          <div ref={ref} className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 w-full max-w-lg">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-headline-xl text-[48px] text-white mb-2 font-bold">
                  <AnimatedCounter targetValue={stat.value} inView={isInView} />
                  {stat.suffix}
                </div>
                <div className="font-headline-md text-label-sm text-primary-container uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column — HQ Illustration */}
        <div className="relative h-full min-h-[500px] flex items-center justify-center p-4 overflow-hidden group">
          <img
            src={hqSvg}
            alt="AWS Club HQ"
            className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-700"
          />
        </div>
      </div>
    </section>
  );
}
