export type ClientInfo = {
  userAgent?: string;
  language?: string;
  screen?: { width: number; height: number; pixelRatio: number };
  viewport?: { width: number; height: number };
  timezone?: string;
  referrer?: string;
  url?: string;
  utm?: Record<string, string>;
};

export function collectClientInfo(): ClientInfo {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];
  const utm: Record<string, string> = {};
  utmKeys.forEach((key) => {
    const val = params.get(key);
    if (val) utm[key] = val;
  });

  // Persist first-touch UTM for session
  try {
    const stored = sessionStorage.getItem("first_utm");
    if (!stored && Object.keys(utm).length > 0) {
      sessionStorage.setItem("first_utm", JSON.stringify(utm));
    }
    const first = sessionStorage.getItem("first_utm");
    if (first) {
      Object.assign(utm, { first_touch: first });
    }
  } catch {}

  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      pixelRatio: window.devicePixelRatio || 1,
    },
    viewport: { width: window.innerWidth, height: window.innerHeight },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer,
    url: window.location.href,
    utm,
  };
}
