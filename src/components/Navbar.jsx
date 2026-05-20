import { useState, useEffect, useRef } from 'react';
import awsIcon from '../assets/aws_icon.jpeg';

const navLinks = [
  { label: 'Home', href: '#home', sectionId: 'home' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Events', href: '#features', sectionId: 'features' },
  { label: 'Why ?', href: '#why-join-us', sectionId: 'why-join-us' },
  { label: 'The Builders', href: '#builders', sectionId: 'builders' },
  { label: 'Blog', href: '#blog', sectionId: 'blog' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const linkRefs = useRef([]);
  const navRef = useRef(null);
  const fullText = 'AWS STUDENT BUILDER GROUP @ VIT';

  // Update indicator position whenever activeSection changes
  useEffect(() => {
    const activeIdx = navLinks.findIndex((l) => l.sectionId === activeSection);
    const el = linkRefs.current[activeIdx];
    const nav = navRef.current;
    if (!el || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicatorStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    });
  }, [activeSection]);

  // Typewriter effect
  useEffect(() => {
    let timeout;
    if (!isDeleting && displayedText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      timeout = setTimeout(() => setIsDeleting(false), 500);
    } else {
      const delta = isDeleting ? 50 : 100;
      timeout = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting
            ? fullText.slice(0, prev.length - 1)
            : fullText.slice(0, prev.length + 1)
        );
      }, delta);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting]);

  // Active section tracker via IntersectionObserver
  useEffect(() => {
    const observers = [];
    navLinks.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sectionId);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="bg-background/80 backdrop-blur-xl border-b border-white/5 fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding py-4 max-w-full">
      {/* Logo */}
      <div className="font-headline-md text-headline-md text-on-surface tracking-tighter uppercase flex items-center gap-2">
        <img src={awsIcon} alt="AWS Club Logo" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
        <span className="min-w-[28ch] block sm:inline-block">
          {displayedText}
          <span className="animate-pulse">_</span>
        </span>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex gap-6 items-center relative" ref={navRef}>
        {navLinks.map((link, idx) => (
          <a
            key={link.label}
            ref={(el) => (linkRefs.current[idx] = el)}
            className={
              link.sectionId === activeSection
                ? 'text-white font-bold font-label-md text-label-md transition-colors duration-300 pb-1'
                : 'text-on-surface-variant font-label-md text-label-md hover:text-primary-container transition-colors duration-300 pb-1'
            }
            href={link.href}
          >
            {link.label}
          </a>
        ))}

        {/* Sliding indicator line */}
        <span
          className="absolute bottom-[-6px] h-[2px] bg-primary-container rounded-full pointer-events-none"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: indicatorStyle.opacity,
            transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
          }}
        />
      </div>

      {/* Desktop CTA */}
      <a
        className="hidden md:inline-flex bg-primary-container text-background font-headline-md text-label-md px-6 py-2 hover:bg-primary transition-colors items-center gap-2 uppercase tracking-widest animate-attention group"
        href="#join"
      >
        JOIN CLOUD
        <span className="material-symbols-outlined text-sm inline-block group-hover:animate-arrow-swing">arrow_forward</span>
      </a>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-on-surface"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation menu"
      >
        <span className="material-symbols-outlined">
          {mobileOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/10 flex flex-col items-start px-container-padding py-6 gap-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              className={
                link.sectionId === activeSection
                  ? 'text-white font-bold font-label-md text-label-md border-l-2 border-primary-container pl-3 transition-all duration-300'
                  : 'text-on-surface-variant font-label-md text-label-md hover:text-primary-container transition-colors duration-300'
              }
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="bg-primary-container text-background font-headline-md text-label-md px-6 py-2 hover:bg-primary transition-colors items-center gap-2 uppercase tracking-widest inline-flex mt-2 animate-attention group"
            href="#join"
            onClick={() => setMobileOpen(false)}
          >
            JOIN CLOUD
            <span className="material-symbols-outlined text-sm inline-block group-hover:animate-arrow-swing">arrow_forward</span>
          </a>
        </div>
      )}
    </nav>
  );
}
