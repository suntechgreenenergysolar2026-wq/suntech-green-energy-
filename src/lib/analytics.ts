import { postAnalyticsEvent } from "@/lib/api";

const SESSION_KEY = "suntek.analytics.session";

const ensureSessionId = () => {
  const existingSessionId = window.localStorage.getItem(SESSION_KEY);

  if (existingSessionId) {
    return existingSessionId;
  }

  const nextSessionId = `sess_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
  window.localStorage.setItem(SESSION_KEY, nextSessionId);
  return nextSessionId;
};

export const getMarketingContext = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    path: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || "",
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    sessionId: ensureSessionId(),
  };
};

export const trackEvent = async (eventName: string, payload: Record<string, unknown> = {}) => {
  try {
    const context = getMarketingContext();
    await postAnalyticsEvent({
      eventName,
      ...context,
      payload,
    });
  } catch {
    // Analytics should never block the UI.
  }
};
