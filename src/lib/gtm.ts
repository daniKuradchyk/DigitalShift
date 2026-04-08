export type DataLayerEvent = Record<string, unknown>;

export type LeadFormSuccessPayload = {
  formName?: string;
  pagePath?: string;
  serviceInterest?: string;
};

export type ContactChannel = "email" | "phone" | "whatsapp";

export type ContactChannelClickPayload = {
  channel: ContactChannel;
  placement: string;
  href?: string;
  pagePath?: string;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function cleanEvent(event: DataLayerEvent) {
  return Object.fromEntries(
    Object.entries(event).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );
}

function getCurrentPath() {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname;
}

export function pushToDataLayer(event: Record<string, unknown>) {
  if (typeof window === "undefined" || !Array.isArray(window.dataLayer)) {
    return false;
  }

  window.dataLayer.push(cleanEvent(event));
  return true;
}

export function trackLeadFormSuccess(payload: LeadFormSuccessPayload = {}) {
  const eventPayload = cleanEvent({
    form_name: payload.formName ?? "home_contact_form",
    page_path: payload.pagePath ?? getCurrentPath(),
    service_interest: payload.serviceInterest,
  });

  pushToDataLayer({ event: "contact_form_success", ...eventPayload });
  pushToDataLayer({ event: "generate_lead", ...eventPayload });
}

export function trackContactChannelClick(payload: ContactChannelClickPayload) {
  pushToDataLayer({
    event: "contact_channel_click",
    contact_channel: payload.channel,
    placement: payload.placement,
    href: payload.href,
    page_path: payload.pagePath ?? getCurrentPath(),
  });
}
