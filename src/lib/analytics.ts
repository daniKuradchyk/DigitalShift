import { pushToDataLayer } from "@/lib/gtm";

export type AnalyticsParams = Record<string, string | number | boolean | undefined | null>;

export function trackEvent(name: string, params?: AnalyticsParams) {
  pushToDataLayer({
    event: name,
    ...params,
  });
}
