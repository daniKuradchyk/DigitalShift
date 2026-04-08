# Analytics with Google Tag Manager

## Where GTM is loaded

- Global GTM loading lives in `src/components/analytics/GoogleTagManagerLoader.tsx`.
- The loader is mounted once from `src/app/layout.tsx`, so the integration is global for the full App Router site.
- The container is only loaded when `NEXT_PUBLIC_GTM_ID` is present and the visitor has accepted analytics cookies.

## Environment variable

Add the public container id to your environment:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

The example lives in `.env.example`.

## dataLayer helpers

Reusable helpers live in `src/lib/gtm.ts`.

Available helpers:

- `pushToDataLayer(event)`
- `trackLeadFormSuccess(payload)`
- `trackContactChannelClick(payload)`

The legacy `trackEvent(...)` wrapper in `src/lib/analytics.ts` now pushes to `dataLayer`, so existing labs and calculator events remain centralized in GTM instead of direct `gtag.js`.

## Events currently pushed

### Lead form success

Triggered only after `/api/contact` returns a real success response:

- `contact_form_success`
- `generate_lead`

Payload fields:

- `form_name`
- `page_path`
- `service_interest` when available

No personal data is sent to `dataLayer`.

### Contact channel clicks

Triggered on the current commercial links already wired in the UI:

- `contact_channel_click`

Payload fields:

- `contact_channel`
- `placement`
- `href`
- `page_path`

Currently used for email and phone. The helper also supports `whatsapp` for future links.

## GTM setup

In GTM create:

1. Data Layer Variables:
   `form_name`, `page_path`, `service_interest`, `contact_channel`, `placement`, `href`
2. Custom Event Triggers:
   `contact_form_success`
   `generate_lead`
   `contact_channel_click` if you want to use it
3. Tags:
   A GA4 Event tag for `generate_lead`
   Optionally another GA4 Event tag for `contact_form_success` if you want the custom business event alongside the recommended GA4 event

Recommended mapping for the GA4 Event tag:

- Event name: `generate_lead`
- Parameters: `form_name`, `page_path`, `service_interest`

## Manual verification

1. Set `NEXT_PUBLIC_GTM_ID` locally and run the app.
2. Open the site and accept analytics cookies so GTM can load.
3. Start GTM Preview and connect Tag Assistant to the local site.
4. Confirm the GTM container appears on `/` and on a few additional routes.
5. Submit the contact form with a valid test case.
6. Check the `dataLayer` / Preview event stream for:
   `contact_form_success`
   `generate_lead`
7. Verify only one pair of lead events fires for a single successful submission.
8. Optionally click the email or phone links and confirm `contact_channel_click`.
