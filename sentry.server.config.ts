// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://02149fbed80e832f339c6849b61d9490@o4506883288989696.ingest.us.sentry.io/4506883293184000",
  enabled: process.env.NODE_ENV === "production",
  tracesSampleRate: 1,
  debug: false,
});
