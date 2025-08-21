type EventPayload = Record<string, any>;

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export function pushToDataLayer(event: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

export function trackPageView(payload: EventPayload = {}) {
  pushToDataLayer("page_view", payload);
}

export function trackStartClick(payload: EventPayload = {}) {
  pushToDataLayer("start_click", payload);
}

export function trackDonationChoice(
  choice: string,
  payload: EventPayload = {}
) {
  pushToDataLayer("donation_choice", { choice, ...payload });
}

export function trackVideoPlay(id: string, payload: EventPayload = {}) {
  pushToDataLayer("video_play", { video_id: id, ...payload });
}

export function trackCsvOpen(payload: EventPayload = {}) {
  pushToDataLayer("csv_open", payload);
}

export function trackScrollDepth(depthPercent: number) {
  pushToDataLayer("scroll_depth", { depth: depthPercent });
}

export function trackTimeOnPage(seconds: number) {
  pushToDataLayer("time_on_page", { seconds });
}

export function trackError(message: string, area?: string) {
  pushToDataLayer("error", { message, area });
}
