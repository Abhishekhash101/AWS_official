import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#home', active: true },
  { label: 'About', href: '#about', active: false },
  { label: 'Features', href: '#features', active: false },
  { label: 'Events', href: '#events', active: false },
  { label: 'The Builders', href: '#builders', active: false },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = 'AWS STUDENT BUILDER @ VIT';

  useEffect(() => {
    let timeout;

    if (!isDeleting && displayedText === fullText) {
      // Pause at the end before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      // Pause when empty before typing again
      timeout = setTimeout(() => setIsDeleting(false), 500);
    } else {
      // Typing or Deleting speed
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

  return (
    <nav className="bg-background/80 backdrop-blur-xl border-b border-white/5 fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding py-4 max-w-full">
      {/* Logo */}
      <div className="font-headline-md text-headline-md text-on-surface tracking-tighter uppercase flex items-center gap-2">
        <span
          className="material-symbols-outlined text-on-surface"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          cloud
        </span>
        <span className="min-w-[28ch] block sm:inline-block">
          {displayedText}
          <span className="animate-pulse">_</span>
        </span>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex gap-6 items-center">
        {navLinks.map((link) => (
          <a
            key={link.label}
            className={
              link.active
                ? 'text-on-surface font-bold border-b-2 border-primary-container pb-1 font-label-md text-label-md hover:text-primary-container transition-all duration-300'
                : 'text-on-surface-variant font-label-md text-label-md hover:text-primary-container transition-colors duration-300'
            }
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <a
        className="hidden md:inline-flex bg-primary-container text-background font-headline-md text-label-md px-6 py-2 hover:bg-primary transition-colors items-center gap-2 uppercase tracking-widest"
        href="#join"
      >
        JOIN CLOUD
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
                link.active
                  ? 'text-on-surface font-bold border-b-2 border-primary-container pb-1 font-label-md text-label-md'
                  : 'text-on-surface-variant font-label-md text-label-md hover:text-primary-container transition-colors duration-300'
              }
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="bg-primary-container text-background font-headline-md text-label-md px-6 py-2 hover:bg-primary transition-colors items-center gap-2 uppercase tracking-widest inline-flex mt-2"
            href="#join"
            onClick={() => setMobileOpen(false)}
          >
            JOIN CLOUD
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      )}
    </nav>
  );
}
