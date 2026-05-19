import { useState, useRef, useEffect, useCallback } from 'react';

const cards = [
  { icon: '☁', num: '01', title: 'HANDS-ON WORKSHOPS', desc: 'Dive deep into AWS services. From EC2 basics to serverless architectures — you build, not just watch.' },
  { icon: '🏅', num: '02', title: 'AWS CREDITS & VOUCHERS', desc: '$25 AWS credits for core team. Certification exam vouchers to get you officially certified.' },
  { icon: '🎤', num: '03', title: 'SPEAKER SESSIONS', desc: 'Direct access to industry veterans, AWS community builders, and certified cloud architects.' },
  { icon: '🤝', num: '04', title: 'REAL NETWORKING', desc: 'Connect with the global AWS Cloud Clubs community and build relationships that outlast college.' },
  { icon: '🛠', num: '05', title: 'BUILD & DEPLOY', desc: 'Work on actual cloud projects. Ship real things. Add AWS-powered work to your resume.' },
  { icon: '📜', num: '06', title: 'CERTIFICATION TRACK', desc: 'Structured learning paths toward AWS certifications. Go from zero to certified with club support.' },
  { icon: '🌐', num: '07', title: 'COMMUNITY DAY', desc: 'Participate in AWS Student Community Day — a large-scale student-led event with clubs nationwide.' },
];

/* ── Special interactive Card 1 ── */
function WorkshopCard() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="wj-ws-outer">
      <div
        className={`wj-ws-card${expanded ? ' wj-ws-expanded' : ''}`}
        onClick={() => setExpanded(v => !v)}
      >
        <span className="wj-ws-number">01</span>
        <div className="wj-ws-cloud">
          <svg viewBox="0 0 280 160" preserveAspectRatio="none">
            <path d="M0,130 C18,95 42,78 72,94 C90,58 120,46 152,68 C170,34 200,30 230,52 C250,38 268,56 280,82" />
          </svg>
        </div>
        <span className="wj-ws-title">Hands on Workshop</span>
        <div className="wj-ws-desc">
          <p>Dive deep into AWS services. From EC2 basics to serverless architectures — you build, not just watch.</p>
        </div>
      </div>
    </div>
  );
}

/* ── Special interactive Card 2 ── */
function CreditsCard() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="wj-cr-outer">
      <div
        className={`wj-cr-card${expanded ? ' wj-cr-expanded' : ''}`}
        onClick={() => setExpanded(v => !v)}
      >
        {/* Left Ribbon — from exact top-left corner to medal top */}
        <div className="wj-cr-ribbon wj-cr-ribbon-left">
          <svg viewBox="0 0 140 240" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 L124,220 L140,240 L14,14 Z" />
            <path d="M0,0 L124,220 L112,212 L0,7 Z" />
          </svg>
        </div>

        {/* Right Ribbon — from exact top-right corner to medal top */}
        <div className="wj-cr-ribbon wj-cr-ribbon-right">
          <svg viewBox="0 0 140 240" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M140,0 L16,220 L0,240 L126,14 Z" />
            <path d="M140,0 L16,220 L28,212 L140,7 Z" />
          </svg>
        </div>

        {/* Medal circle with star */}
        <div className="wj-cr-medal">
          <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="28" />
            <circle cx="35" cy="35" r="24" />
            <polygon points="35,12 38.5,25 52,25 41,33 45,46 35,38 25,46 29,33 18,25 31.5,25" />
          </svg>
        </div>

        <span className="wj-cr-number">02</span>
        <span className="wj-cr-title">AWS Credits & Vouchers</span>
        <div className="wj-cr-desc">
          <p>$25 AWS credits for core team. Certification exam vouchers to get you officially certified.</p>
        </div>
      </div>
    </div>
  );
}

/* ── Regular card (cards 2–7) ── */
function RegularCard({ card }) {
  return (
    <div
      className="wj-card relative flex flex-col select-none flex-shrink-0 bg-surface-container-lowest border border-white/10 rounded-sm"
      style={{ width: 240, minWidth: 240, height: 280, borderTop: '2px solid var(--color-primary-container)', padding: '28px 24px', boxSizing: 'border-box' }}
    >
      <div className="flex items-center justify-center rounded-sm flex-shrink-0" style={{ width: 44, height: 44, background: 'rgba(255,153,0,0.1)', border: '1px solid rgba(255,153,0,0.3)' }}>
        <span className="text-[22px] leading-none" role="img" aria-label={card.title}>{card.icon}</span>
      </div>
      <span className="font-label-sm mt-4" style={{ fontSize: 10, color: 'rgba(255,153,0,0.5)', letterSpacing: '0.1em' }}>{card.num}</span>
      <span className="font-headline-md text-[14px] font-bold uppercase text-on-surface tracking-wider mt-1 leading-snug">{card.title}</span>
      <div className="w-full flex-shrink-0" style={{ height: 1, background: 'rgba(255,153,0,0.2)', margin: '12px 0' }} />
      <p className="font-body-md text-[13px] text-outline leading-relaxed m-0">{card.desc}</p>
    </div>
  );
}

export default function WhyJoinUs() {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const SCROLL_AMOUNT = 256;

  const handleScrollLeft = useCallback(() => { scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' }); }, []);
  const handleScrollRight = useCallback(() => { scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' }); }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { e.preventDefault(); el.scrollLeft += e.deltaY; } };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.scrollBehavior = 'auto';
  };
  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeftPos.current - (x - startX.current) * 1.2;
  }, []);
  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (scrollRef.current) { scrollRef.current.style.cursor = 'grab'; scrollRef.current.style.scrollBehavior = 'smooth'; }
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    return () => { document.removeEventListener('mouseup', onMouseUp); document.removeEventListener('mousemove', onMouseMove); };
  }, [onMouseUp, onMouseMove]);

  return (
    <>
      <style>{`
        /* ── Scroll infrastructure ── */
        .wj-scroll-wrapper{position:relative}
        .wj-scroll-wrapper::after{content:'';position:absolute;right:0;top:0;height:100%;width:80px;background:linear-gradient(to right,transparent,var(--color-background));pointer-events:none;z-index:2}
        .wj-scroll-track{scrollbar-width:none;-ms-overflow-style:none}
        .wj-scroll-track::-webkit-scrollbar{display:none}

        /* ── Regular cards hover ── */
        .wj-card{transition:all .3s ease}
        .wj-card:hover{border-color:rgba(255,153,0,.5)!important;box-shadow:0 0 20px rgba(255,153,0,.2);transform:translateY(-4px)}
        .wj-card::after{content:'';position:absolute;bottom:8px;right:8px;width:10px;height:10px;border-right:1px solid rgba(255,153,0,.4);border-bottom:1px solid rgba(255,153,0,.4);pointer-events:none}
        .wj-nav-btn{transition:background .2s ease}
        .wj-nav-btn:hover{background:rgba(255,153,0,.1)}

        /* ══════════════════════════════════════
           Workshop Card 1 — Interactive
           ══════════════════════════════════════ */
        .wj-ws-outer{flex-shrink:0}
        .wj-ws-card{
          position:relative;width:280px;min-width:280px;height:340px;
          background:transparent;
          border:1.5px solid #C8A882;border-radius:14px;
          overflow:hidden;cursor:pointer;flex-shrink:0;
          transition:all .65s cubic-bezier(.4,0,.2,1);
        }

        /* — 01 label — */
        .wj-ws-number{
          position:absolute;top:18px;left:20px;
          font-family:'Courier New',monospace;font-size:40px;font-weight:900;
          color:transparent;-webkit-text-stroke:2.5px #fff;
          z-index:3;
          transition:all .65s cubic-bezier(.4,0,.2,1);
        }
        .wj-ws-card:hover .wj-ws-number{-webkit-text-stroke-color:#FF9900}
        .wj-ws-expanded .wj-ws-number{
          opacity:0;pointer-events:none;
        }

        /* — Cloud SVG — */
        .wj-ws-cloud{
          position:absolute;bottom:0;left:0;width:100%;z-index:2;
          transform-origin:bottom center;
          transition:all .65s cubic-bezier(.4,0,.2,1);
        }
        .wj-ws-cloud svg{display:block;width:100%}
        .wj-ws-cloud path{fill:none;stroke:#7A5230;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round;transition:stroke .3s ease}
        .wj-ws-card:hover .wj-ws-cloud{transform:scale(1.02)}
        .wj-ws-card:hover .wj-ws-cloud path{stroke:#FF9900}
        .wj-ws-expanded .wj-ws-cloud{bottom:155px}
        .wj-ws-expanded .wj-ws-cloud path{stroke:#FF9900}

        /* — Title text — */
        .wj-ws-title{
          position:absolute;top:calc(100% - 38px);left:50%;transform:translateX(-50%);
          font-family:'Courier New',monospace;font-size:14px;font-weight:800;
          text-transform:uppercase;letter-spacing:1.5px;white-space:nowrap;
          color:transparent;-webkit-text-stroke:1.3px #fff;
          z-index:3;
          transition:all .65s cubic-bezier(.4,0,.2,1);
        }
        .wj-ws-expanded .wj-ws-title{top:18px;font-size:12px;letter-spacing:2px;-webkit-text-stroke-color:#5A3A1A}

        /* — Description (expand only) — */
        .wj-ws-desc{
          position:absolute;bottom:16px;left:0;right:0;
          padding:0 22px;
          background:transparent;
          z-index:4;opacity:0;transform:translateY(10px);
          transition:opacity .4s ease 0s,transform .4s ease 0s;
        }
        .wj-ws-expanded .wj-ws-desc{opacity:1;transform:translateY(0);transition:opacity .4s ease .4s,transform .4s ease .4s}
        .wj-ws-desc p{font-family:'Courier New',monospace;font-size:13px;color:#dbc2ad;line-height:1.6;text-align:center;margin:0}

        /* ══════════════════════════════════════
           Credits Card 2 — Interactive
           ══════════════════════════════════════ */
        .wj-cr-outer{flex-shrink:0}
        .wj-cr-card{
          position:relative;width:280px;min-width:280px;height:340px;
          background:transparent;
          border:1.5px solid #C8A882;border-radius:14px;
          overflow:hidden;cursor:pointer;flex-shrink:0;
          transition:all .65s cubic-bezier(.4,0,.2,1);
        }

        /* — 02 label (z-index 5, always in front of ribbons) — */
        .wj-cr-number{
          position:absolute;top:18px;left:20px;
          font-family:'Courier New',monospace;font-size:40px;font-weight:900;
          color:transparent;-webkit-text-stroke:2.5px #fff;
          z-index:5;
          transition:all .65s cubic-bezier(.4,0,.2,1);
        }
        .wj-cr-card:hover .wj-cr-number{-webkit-text-stroke-color:#FF9900}
        .wj-cr-expanded .wj-cr-number{opacity:0;pointer-events:none}

        /* — Ribbons (span from top corners to medal, z-index 1) — */
        .wj-cr-ribbon{
          position:absolute;top:0;
          width:50%;height:57%;
          z-index:1;
          transition:all .65s cubic-bezier(.4,0,.2,1);
        }
        .wj-cr-ribbon svg{display:block;width:100%;height:100%}
        .wj-cr-ribbon path{
          fill:none;stroke:#7A5230;stroke-width:3;
          stroke-linecap:round;stroke-linejoin:round;
          transition:stroke .3s ease;
        }
        .wj-cr-ribbon-left{left:0}
        .wj-cr-ribbon-right{right:0}
        .wj-cr-card:hover .wj-cr-ribbon path{stroke:#FF9900}
        .wj-cr-expanded .wj-cr-ribbon path{stroke:#FF9900}
        .wj-cr-expanded .wj-cr-ribbon{height:22%}

        /* — Medal circle (at 70% height, moves up on expand) — */
        .wj-cr-medal{
          position:absolute;top:68%;left:50%;
          transform:translate(-50%,-50%);
          width:90px;z-index:2;
          transition:all .65s cubic-bezier(.4,0,.2,1);
        }
        .wj-cr-medal svg{display:block;width:100%;height:auto}
        .wj-cr-medal circle,.wj-cr-medal polygon{
          fill:none;stroke:#7A5230;stroke-width:2;
          stroke-linecap:round;stroke-linejoin:round;
          transition:stroke .3s ease;
        }
        .wj-cr-card:hover .wj-cr-medal circle,
        .wj-cr-card:hover .wj-cr-medal polygon{stroke:#FF9900}
        .wj-cr-card:hover .wj-cr-medal{transform:translate(-50%,-50%) scale(1.05)}
        .wj-cr-expanded .wj-cr-medal{top:33%;transform:translate(-50%,-50%) scale(0.75)}
        .wj-cr-expanded .wj-cr-medal circle,
        .wj-cr-expanded .wj-cr-medal polygon{stroke:#FF9900}

        /* — Title text — */
        .wj-cr-title{
          position:absolute;top:calc(100% - 38px);left:50%;transform:translateX(-50%);
          font-family:'Courier New',monospace;font-size:14px;font-weight:800;
          text-transform:uppercase;letter-spacing:1.5px;white-space:nowrap;
          color:transparent;-webkit-text-stroke:1.3px #fff;
          z-index:3;
          transition:all .65s cubic-bezier(.4,0,.2,1);
        }
        .wj-cr-expanded .wj-cr-title{top:18px;font-size:12px;letter-spacing:2px;-webkit-text-stroke-color:#5A3A1A}

        /* — Description (expand only) — */
        .wj-cr-desc{
          position:absolute;bottom:16px;left:0;right:0;
          padding:0 22px;
          background:transparent;
          z-index:4;opacity:0;transform:translateY(10px);
          transition:opacity .4s ease 0s,transform .4s ease 0s;
        }
        .wj-cr-expanded .wj-cr-desc{opacity:1;transform:translateY(0);transition:opacity .4s ease .4s,transform .4s ease .4s}
        .wj-cr-desc p{font-family:'Courier New',monospace;font-size:13px;color:#dbc2ad;line-height:1.6;text-align:center;margin:0}

      `}</style>

      <section id="why-join" className="relative py-24 px-container-padding bg-background border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'linear-gradient(rgba(255,153,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,153,0,0.04) 1px,transparent 1px)', backgroundSize:'40px 40px' }} />

        <div className="w-full relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-16">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-3 h-3 bg-primary-container flex-shrink-0" />
                <span className="font-label-sm text-[11px] tracking-[0.15em] text-primary-container uppercase leading-none">CORE BENEFITS</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-white uppercase tracking-widest leading-tight m-0 mb-2">WHY JOIN US?</h2>
              <p className="font-body-md text-body-md text-outline m-0">Everything you need to accelerate your cloud career.</p>
            </div>
            <div className="flex gap-2 flex-shrink-0 mt-1">
              <button className="wj-nav-btn w-9 h-9 bg-transparent border border-primary-container/40 text-primary-container font-headline-md text-base cursor-pointer flex items-center justify-center rounded-sm p-0 leading-none" aria-label="Scroll left" onClick={handleScrollLeft}>←</button>
              <button className="wj-nav-btn w-9 h-9 bg-transparent border border-primary-container/40 text-primary-container font-headline-md text-base cursor-pointer flex items-center justify-center rounded-sm p-0 leading-none" aria-label="Scroll right" onClick={handleScrollRight}>→</button>
            </div>
          </div>

          {/* Carousel */}
          <div className="wj-scroll-wrapper">
            <div className="wj-scroll-track flex gap-4 items-start overflow-x-auto cursor-grab pb-1" style={{ scrollBehavior:'smooth', WebkitOverflowScrolling:'touch' }} ref={scrollRef} onMouseDown={onMouseDown}>
              {/* Card 1 — Special interactive workshop card */}
              <WorkshopCard />
              {/* Card 2 — Special interactive credits card */}
              <CreditsCard />
              {/* Cards 3–7 — Regular */}
              {cards.slice(2).map(card => <RegularCard key={card.num} card={card} />)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
