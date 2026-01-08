export type AnalyticsParams = Record<string, string | number | boolean | undefined | null>;

export function trackEvent(name: string, params?: AnalyticsParams) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  const cleanParams: Record<string, string | number | boolean> = {};
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      cleanParams[key] = value;
    });
  }
  gtag("event", name, cleanParams);
}
