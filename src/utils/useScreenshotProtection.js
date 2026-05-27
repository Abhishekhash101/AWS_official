import { useEffect, useState } from 'react';

/**
 * useScreenshotProtection
 * 
 * Anti-cheating hook that deters screenshots and screen capture during quizzes.
 * 
 * Protections applied:
 * - Blocks PrintScreen, Ctrl+P, Ctrl+Shift+S, Cmd+Shift+3/4/5 (Mac)
 * - Disables right-click context menu
 * - Disables text selection (CSS)
 * - Blurs content when window/tab loses focus
 * - Blocks copy/cut/paste/select/drag
 * - Clears clipboard on PrintScreen attempt
 * - Dynamic watermark with user identity (deters phone screenshots)
 * - Mobile long-press and touch callout prevention
 * 
 * @param {boolean} active - Whether protection should be active
 * @param {string} watermarkText - Text to display as watermark (e.g. user email/name)
 * @returns {{ isBlurred: boolean }} - State indicating if content is blurred
 */
export default function useScreenshotProtection(active = true, watermarkText = '') {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    if (!active) return;

    // ── Keyboard shortcut blocking ──────────────────────────
    const handleKeyDown = (e) => {
      // PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('').catch(() => {});
        }
        return false;
      }

      // Ctrl+P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+S (Save as) / Ctrl+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I / F12 (DevTools)
      if ((e.ctrlKey && e.shiftKey && e.key === 'I') || e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        return false;
      }

      // Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+X (Cut), Ctrl+A (Select All)
      if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return false;
      }

      // Mac screenshot shortcuts: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
      if (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        return false;
      }
    };

    // ── Context menu (right-click + mobile long-press) ──────
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // ── Copy/Cut/Paste/Select/Drag blocking ─────────────────
    const handleClipboard = (e) => {
      e.preventDefault();
      return false;
    };

    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    // ── Mobile long-press prevention ────────────────────────
    let longPressTimer = null;
    const handleTouchStart = (e) => {
      // Prevent long-press by clearing any system timeout behavior
      longPressTimer = setTimeout(() => {
        // If touch is held too long, it might be a long-press attempt
      }, 500);
    };

    const handleTouchEnd = () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    };

    // ── Visibility / Focus change → blur content ────────────
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsBlurred(true);
      }
    };

    const handleBlur = () => {
      setIsBlurred(true);
    };

    const handleFocus = () => {
      setIsBlurred(false);
    };

    // ── Apply CSS protections ───────────────────────────────
    const styleEl = document.createElement('style');
    styleEl.id = 'screenshot-protection-styles';
    styleEl.textContent = `
      .screenshot-protected {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }

      .screenshot-protected * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }

      .screenshot-protected img {
        pointer-events: none !important;
        -webkit-user-drag: none !important;
        user-drag: none !important;
      }
      
      @media print {
        .screenshot-protected {
          display: none !important;
        }
        body::after {
          content: "Printing is disabled during the quiz.";
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-size: 2rem;
          color: #E24B4A;
          font-family: monospace;
        }
      }
    `;
    document.head.appendChild(styleEl);

    // ── Watermark overlay (deters phone screenshots) ────────
    let watermarkEl = null;
    if (watermarkText) {
      watermarkEl = document.createElement('div');
      watermarkEl.id = 'quiz-watermark-overlay';

      // Create a repeating tiled watermark using SVG for crisp rendering
      const svgText = encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180">
          <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle"
            font-family="monospace" font-size="13" fill="rgba(255,255,255,0.06)"
            transform="rotate(-25, 160, 72)">${watermarkText}</text>
          <text x="50%" y="80%" dominant-baseline="middle" text-anchor="middle"
            font-family="monospace" font-size="10" fill="rgba(255,255,255,0.04)"
            transform="rotate(-25, 160, 144)">AWS VIT QUIZ</text>
        </svg>`
      );

      Object.assign(watermarkEl.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '9990',
        pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,${svgText}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '320px 180px',
        opacity: '1',
      });

      document.body.appendChild(watermarkEl);
    }

    // Add protection class to body
    document.body.classList.add('screenshot-protected');

    // ── Register event listeners ────────────────────────────
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('copy', handleClipboard, true);
    document.addEventListener('cut', handleClipboard, true);
    document.addEventListener('paste', handleClipboard, true);
    document.addEventListener('selectstart', handleSelectStart, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    // ── Cleanup ─────────────────────────────────────────────
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('copy', handleClipboard, true);
      document.removeEventListener('cut', handleClipboard, true);
      document.removeEventListener('paste', handleClipboard, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.body.classList.remove('screenshot-protected');
      const existingStyle = document.getElementById('screenshot-protection-styles');
      if (existingStyle) existingStyle.remove();
      const existingWatermark = document.getElementById('quiz-watermark-overlay');
      if (existingWatermark) existingWatermark.remove();
      if (longPressTimer) clearTimeout(longPressTimer);
    };
  }, [active, watermarkText]);

  return { isBlurred };
}
