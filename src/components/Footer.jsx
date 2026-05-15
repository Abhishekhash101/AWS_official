const footerLinks = [
  { icon: 'description', label: 'Documentation', href: '#', highlight: false },
  { icon: 'shield', label: 'Privacy Policy', href: '#', highlight: false },
  { icon: 'gavel', label: 'Code of Conduct', href: '#', highlight: false },
  { icon: 'school', label: 'AWS Academy', href: '#', highlight: true },
];

export default function Footer() {
  return (
    <footer className="bg-background w-full px-container-padding py-16 grid grid-cols-1 md:grid-cols-2 gap-base border-t border-white/10">
      {/* Left Column */}
      <div className="flex flex-col gap-4">
        <div className="font-headline-md text-headline-md text-white flex items-center gap-2 uppercase tracking-widest">
          <span
            className="material-symbols-outlined text-primary-container"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            cloud
          </span>
          SBG @ GCES
        </div>
        <p className="font-headline-md text-label-sm text-on-surface-variant uppercase tracking-widest mt-4">
          © 2024 AWS STUDENT BUILDER GROUP @ GCES. ARCHITECTED FOR THE CLOUD.
        </p>
      </div>

      {/* Right Column — Links */}
      <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end items-start font-headline-md text-label-md tracking-widest uppercase">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            className={
              link.highlight
                ? 'text-primary-container hover:text-white transition-colors duration-300 flex items-center gap-2 font-bold'
                : 'text-on-surface-variant hover:text-primary-container transition-colors duration-300 flex items-center gap-2'
            }
            href={link.href}
          >
            <span className="material-symbols-outlined text-sm">{link.icon}</span>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
