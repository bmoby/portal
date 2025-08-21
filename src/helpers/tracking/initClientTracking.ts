import { collectClientInfo } from "./clientInfo";
import { trackPageView, trackScrollDepth, trackTimeOnPage } from "./events";

export function initClientTracking() {
  if (typeof window === "undefined") return;

  // Page view with client context
  const info = collectClientInfo();
  trackPageView({ context: info });

  // Scroll depth (25/50/75/100)
  let maxDepth = 0;
  const thresholds = [25, 50, 75, 100];
  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const percent =
      docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
    for (const t of thresholds) {
      if (percent >= t && t > maxDepth) {
        maxDepth = t;
        trackScrollDepth(t);
      }
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  // Time on page (every 15s)
  let seconds = 0;
  const interval = window.setInterval(() => {
    seconds += 15;
    trackTimeOnPage(seconds);
  }, 15000);

  // Cleanup
  return () => {
    window.removeEventListener("scroll", onScroll as any);
    clearInterval(interval);
  };
}
