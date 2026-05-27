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
 * - Blocks copy/cut/paste
 * - Clears clipboard on PrintScreen attempt
 * 
 * @param {boolean} active - Whether protection should be active
 * @returns {{ isBlurred: boolean }} - State indicating if content is blurred
 */
export default function useScreenshotProtection(active = true) {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    if (!active) return;

    // ── Keyboard shortcut blocking ──────────────────────────
    const handleKeyDown = (e) => {
      // PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        // Attempt to clear clipboard
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

    // ── Context menu (right-click) blocking ─────────────────
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
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.body.classList.remove('screenshot-protected');
      const existingStyle = document.getElementById('screenshot-protection-styles');
      if (existingStyle) existingStyle.remove();
    };
  }, [active]);

  return { isBlurred };
}
