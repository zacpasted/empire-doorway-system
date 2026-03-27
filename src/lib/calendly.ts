type CalendlyApi = {
  initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
};

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_READY_TIMEOUT_MS = 8000;

export const PASTED_CALENDLY_URL =
  "https://calendly.com/getpasted/pasted-partner-discovery?hide_event_type_details=1&hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=e4ce6f";

let calendlyScriptPromise: Promise<CalendlyApi> | null = null;
let calendlyPrefetched = false;

const getCalendlyApi = (): CalendlyApi | null => {
  if (typeof window === "undefined") return null;
  const api = (window as Window & { Calendly?: CalendlyApi }).Calendly;
  return api?.initInlineWidget ? api : null;
};

const waitForCalendlyApi = (timeoutMs = CALENDLY_READY_TIMEOUT_MS) =>
  new Promise<CalendlyApi>((resolve, reject) => {
    const startedAt = Date.now();

    const check = () => {
      const api = getCalendlyApi();
      if (api) {
        resolve(api);
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        reject(new Error("Calendly script did not become ready in time."));
        return;
      }

      requestAnimationFrame(check);
    };

    check();
  });

const prefetchCalendlyBookingPage = () => {
  if (typeof document === "undefined" || calendlyPrefetched) return;
  calendlyPrefetched = true;

  const prefetchLink = document.createElement("link");
  prefetchLink.rel = "prefetch";
  prefetchLink.as = "document";
  prefetchLink.href = PASTED_CALENDLY_URL;
  document.head.appendChild(prefetchLink);

  void fetch(PASTED_CALENDLY_URL, {
    mode: "no-cors",
    cache: "force-cache",
    credentials: "omit",
  }).catch(() => {});
};

export const ensureCalendlyScript = async (): Promise<CalendlyApi> => {
  const existingApi = getCalendlyApi();
  if (existingApi) return existingApi;

  if (!calendlyScriptPromise) {
    const existingScript = document.querySelector(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`,
    ) as HTMLScriptElement | null;

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }

    calendlyScriptPromise = waitForCalendlyApi().catch((error) => {
      calendlyScriptPromise = null;
      throw error;
    });
  }

  return calendlyScriptPromise;
};

export const primeCalendly = () => {
  void ensureCalendlyScript()
    .then(() => {
      prefetchCalendlyBookingPage();
    })
    .catch(() => {});
};

const onCalendlyIframeReady = (container: HTMLElement, onReady: () => void) => {
  let fired = false;

  const markReady = () => {
    if (fired) return;
    fired = true;
    onReady();
  };

  const attachToIframe = () => {
    const iframe = container.querySelector("iframe");
    if (!iframe) return false;

    iframe.addEventListener("load", markReady, { once: true });
    // Fallback when iframe is already ready before listener attachment.
    setTimeout(markReady, 250);
    return true;
  };

  if (attachToIframe()) return;

  const observer = new MutationObserver(() => {
    if (attachToIframe()) observer.disconnect();
  });

  observer.observe(container, { childList: true, subtree: true });
  setTimeout(() => {
    observer.disconnect();
    markReady();
  }, 2500);
};

export const initCalendlyInlineWidget = async ({
  container,
  url,
  onReady,
}: {
  container: HTMLElement;
  url: string;
  onReady?: () => void;
}) => {
  const calendly = await ensureCalendlyScript();

  container.innerHTML = "";
  calendly.initInlineWidget({
    url,
    parentElement: container,
  });

  if (onReady) onCalendlyIframeReady(container, onReady);
};
