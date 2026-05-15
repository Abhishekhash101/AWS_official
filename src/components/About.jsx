const stats = [
  { value: '50+', label: 'Members' },
  { value: '10+', label: 'Events' },
  { value: '3+', label: 'Projects' },
];

export default function About() {
  return (
    <section className="py-24 relative bg-background border-b border-white/10" id="about">
      <div className="max-w-7xl mx-auto px-container-padding relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left Column — Text Content */}
        <div className="flex flex-col">
          <h2 className="font-headline-lg text-[40px] md:text-[56px] text-white mb-6 uppercase tracking-widest leading-tight">
            AWS Cloud Club <br />at GCES →{' '}
            <br />
            <span className="text-primary-container">
              AWS Student Builder Group at GCES
            </span>
          </h2>
          <p className="font-headline-md text-headline-md text-on-surface-variant mb-8 tracking-wider">
            Same Passion, Bigger Goals
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant mb-12 max-w-lg">
            We are a collective of driven students dedicated to mastering cloud technologies. Our evolution reflects our commitment to not just learning, but building robust, scalable solutions. We provide the ecosystem for technical minds to thrive.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 w-full max-w-lg">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-headline-xl text-[48px] text-white mb-2 font-bold">
                  {stat.value}
                </div>
                <div className="font-headline-md text-label-sm text-primary-container uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column — Image Panel */}
        <div className="relative h-full min-h-[500px] border border-white/10 bg-surface-container-lowest overflow-hidden group p-4 flex flex-col justify-end">
          <img
            alt="Server Infrastructure"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNQOJp-1WvYEucoRa8MSofJqvyUz3cxbCQrOadhn-DJ6WKCEjdj_lG6YCqYi-98FkDRfLUmVdH_d2DJ4PTsY9HjLVBWvUMFpW4A7xR0oak3lKFnvMASCqziXb4Kum6ZQ4eHztm1rvbyuye-aaaGkmRgE0GZ6PUmdz_3WlzSO0AGxch_PxtCcgz17gKTCDXamyRp5QvpN8WFQU7axYUTZRsjhlu-b7OLcUM4rUbwYzuLjJ8lrwpLHom8aCIo8_LHYO3VZTadHV487Gh"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
          <div className="relative z-20 font-headline-md text-label-md text-primary-container tracking-widest uppercase">
            [INFRASTRUCTURE_VIEW_01]
          </div>
        </div>
      </div>
    </section>
  );
}
