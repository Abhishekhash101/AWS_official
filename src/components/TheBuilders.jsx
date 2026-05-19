import { useState, useEffect, useRef } from 'react';
import awsIcon from '../assets/aws_icon.jpeg';

const BUILDERS = [
  // Outer Ring (5 members) — indices 0-4
  { id: 1, initials: 'AS', fullName: 'Ankit Subedi', role: 'CHAIRPERSON', desc: 'Leads the club vision and drives the AWS community forward.', color: '#FF9900', insta: '#', linkedin: '#' },
  { id: 2, initials: 'AS', fullName: 'Aesha Singh', role: 'VICE CHAIRPERSON', desc: 'Orchestrates operations and strategic community growth.', color: '#008296', insta: '#', linkedin: '#' },
  { id: 3, initials: 'VJ', fullName: 'Vidhi Prashant Jain', role: 'SECRETARY', desc: 'Manages documentation, communication, and club coordination.', color: '#E1523D', insta: '#', linkedin: '#' },
  { id: 4, initials: 'TR', fullName: 'Tanishi Raj', role: 'CO-SECRETARY', desc: 'Supports administrative operations and event logistics.', color: '#8A2BE2', insta: '#', linkedin: '#' },
  { id: 5, initials: 'PG', fullName: 'Pihu Gupta', role: 'DESIGN HEAD', desc: 'Creates the visual identity and design language of the club.', color: '#C2185B', insta: '#', linkedin: '#' },
  // Inner Ring (5 members) — indices 5-9
  { id: 6, initials: 'AS', fullName: 'Arshi Saxena', role: 'EVENTS HEAD', desc: 'Plans and executes large-scale bootcamps and hackathons.', color: '#D13212', insta: '#', linkedin: '#' },
  { id: 7, initials: 'AN', fullName: 'Ayush Naugariya', role: 'FINANCE HEAD', desc: 'Manages budgets, sponsorships, and financial planning.', color: '#6A0DAD', insta: '#', linkedin: '#' },
  { id: 8, initials: 'JB', fullName: 'Jaanya Bagdi', role: 'OUTREACH HEAD', desc: 'Builds partnerships and expands the club network.', color: '#0052CC', insta: '#', linkedin: '#' },
  { id: 9, initials: 'VK', fullName: 'Vivek Kumar', role: 'PUBLICITY HEAD', desc: 'Drives social media presence and campus outreach.', color: '#0070BA', insta: '#', linkedin: '#' },
  { id: 10, initials: 'AB', fullName: 'Abhishek Kumar', role: 'TECHNICAL HEAD', desc: 'Architects hands-on cloud workshops and technical infrastructure.', color: '#2E7D32', insta: '#', linkedin: '#' },
];

const OUTER_R = 250;
const INNER_R = 170;
const OUTER_IDX = [0, 1, 2, 3, 4];
const INNER_IDX = [5, 6, 7, 8, 9];
const OUTER_SPEED = 0.0004;
const INNER_SPEED = -0.0006;

export default function TheBuilders() {
  const [selectedBuilder, setSelectedBuilder] = useState(null);
  const containerRef = useRef(null);
  const anglesRef = useRef(
    BUILDERS.map((_, i) => {
      if (OUTER_IDX.includes(i)) return (i / OUTER_IDX.length) * Math.PI * 2;
      const j = i - 5;
      return (j / INNER_IDX.length) * Math.PI * 2;
    })
  );
  const pausedRef = useRef(false);
  const animRef = useRef(null);
  const anchorEls = useRef([]);

  // Direct DOM animation loop — matches the reference HTML approach exactly
  useEffect(() => {
    function animate() {
      if (!pausedRef.current && !selectedBuilder) {
        const angles = anglesRef.current;
        for (let i = 0; i < BUILDERS.length; i++) {
          const speed = OUTER_IDX.includes(i) ? OUTER_SPEED : INNER_SPEED;
          angles[i] += speed;
        }
      }

      // Update positions
      const angles = anglesRef.current;
      for (let i = 0; i < BUILDERS.length; i++) {
        const r = OUTER_IDX.includes(i) ? OUTER_R : INNER_R;
        const x = Math.cos(angles[i]) * r;
        const y = Math.sin(angles[i]) * r;
        const el = anchorEls.current[i];
        if (el) {
          el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [selectedBuilder]);

  const openPopup = (builder) => {
    pausedRef.current = true;
    setSelectedBuilder(builder);
  };

  const closePopup = () => {
    setSelectedBuilder(null);
    pausedRef.current = false;
  };

  return (
    <section className="tb-section" id="builders">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* ═══════════════════════════════════════════
           The Builders — Orbital Section
           ═══════════════════════════════════════════ */

        .tb-section {
          position: relative;
          padding: 96px 24px;
          overflow: hidden;
          background: var(--color-background);
        }

        .tb-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .tb-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #FF9900;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .tb-title {
          font-family: 'Space Mono', monospace;
          font-size: 32px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #f1dfd1;
          line-height: 1.2;
          margin: 0;
        }

        /* — Orbit Scene — */
        .tb-orbit-scene {
          position: relative;
          width: 100%;
          min-height: 620px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }
        .tb-orbit-container {
          position: relative;
          width: 560px;
          height: 560px;
          flex-shrink: 0;
        }

        /* — Dashed Rings — */
        .tb-ring {
          position: absolute;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .tb-ring-outer {
          width: 500px;
          height: 500px;
          border: 1.5px dashed rgba(255,153,0,0.25);
        }
        .tb-ring-inner {
          width: 340px;
          height: 340px;
          border: 1.5px dashed rgba(255,153,0,0.35);
        }

        /* — Center Logo — */
        .tb-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 110px;
          height: 110px;
          border-radius: 50%;
          z-index: 10;
          box-shadow: 0 0 0 6px rgba(255,153,0,0.15), 0 0 0 12px rgba(255,153,0,0.07);
          overflow: hidden;
        }
        .tb-center img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* — Anchors & Avatars — */
        .tb-anchor {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
        }
        .tb-avatar {
          position: absolute;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          transform: translate(-50%, -50%);
          z-index: 5;
          border: 2.5px solid #FF9900;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          user-select: none;
        }
        .tb-avatar:hover {
          transform: translate(-50%, -50%) scale(1.18);
          z-index: 20;
          box-shadow: 0 0 0 4px rgba(255,153,0,0.4);
        }
        .tb-name-tag {
          position: absolute;
          bottom: -22px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          font-weight: 600;
          color: #a38d7a;
          white-space: nowrap;
          pointer-events: none;
          background: #0A0C10;
          padding: 2px 6px;
          border-radius: 4px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .tb-avatar:hover .tb-name-tag {
          opacity: 1;
        }

        /* — Popup — */
        .tb-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tb-popup {
          background: #140d06;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 32px;
          width: 340px;
          position: relative;
          animation: tbPopIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @keyframes tbPopIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .tb-popup-close {
          position: absolute;
          top: 14px;
          right: 14px;
          background: #271e15;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          color: #a38d7a;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }
        .tb-popup-close:hover { color: #fff; }
        .tb-popup-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          border: 3px solid #FF9900;
        }
        .tb-popup-name {
          font-family: 'Space Mono', monospace;
          font-size: 20px;
          font-weight: 700;
          color: #f1dfd1;
          margin-bottom: 6px;
        }
        .tb-popup-role {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: #FF9900;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 16px;
          background: rgba(255,153,0,0.08);
          border: 1px solid rgba(255,153,0,0.25);
          padding: 4px 12px;
          border-radius: 20px;
        }
        .tb-popup-desc {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #a38d7a;
          text-align: center;
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .tb-popup-links {
          display: flex;
          gap: 12px;
          width: 100%;
        }
        .tb-popup-link {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 0;
          border-radius: 8px;
          text-decoration: none;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          transition: opacity 0.15s;
          border: 1px solid rgba(255,255,255,0.1);
          color: #f1dfd1;
          background: #271e15;
          cursor: pointer;
        }
        .tb-popup-link:hover { opacity: 0.75; }
        .tb-popup-link.insta { color: #E1306C; border-color: rgba(225,48,108,0.3); }
        .tb-popup-link.linkedin { color: #0077B5; border-color: rgba(0,119,181,0.3); }
      `}} />

      <div className="tb-header">
        <p className="tb-label">meet</p>
        <h2 className="tb-title">The Builders</h2>
      </div>

      <div className="tb-orbit-scene">
        <div className="tb-orbit-container" ref={containerRef}>
          {/* Rings */}
          <div className="tb-ring tb-ring-outer" />
          <div className="tb-ring tb-ring-inner" />

          {/* Center Logo — uses club image */}
          <div className="tb-center">
            <img src={awsIcon} alt="AWS Cloud Club" />
          </div>

          {/* Avatars */}
          {BUILDERS.map((builder, i) => (
            <div
              key={builder.id}
              ref={el => (anchorEls.current[i] = el)}
              className="tb-anchor"
            >
              <div
                className="tb-avatar"
                style={{ background: builder.color }}
                onMouseEnter={() => (pausedRef.current = true)}
                onMouseLeave={() => { if (!selectedBuilder) pausedRef.current = false; }}
                onClick={() => openPopup(builder)}
                aria-label={`${builder.fullName}, ${builder.role}`}
              >
                {builder.initials}
                <span className="tb-name-tag">{builder.fullName.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedBuilder && (
        <div className="tb-overlay" onClick={closePopup}>
          <div className="tb-popup" onClick={e => e.stopPropagation()}>
            <button className="tb-popup-close" aria-label="Close" onClick={closePopup}>✕</button>
            <div className="tb-popup-avatar" style={{ background: selectedBuilder.color }}>
              {selectedBuilder.initials}
            </div>
            <p className="tb-popup-name">{selectedBuilder.fullName}</p>
            <span className="tb-popup-role">{selectedBuilder.role}</span>
            <p className="tb-popup-desc">{selectedBuilder.desc}</p>
            <div className="tb-popup-links">
              <a className="tb-popup-link linkedin" href={selectedBuilder.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="tb-popup-link insta" href={selectedBuilder.insta} target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
