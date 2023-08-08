import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export interface DocsConfigWindow extends Window {
  displayConfig?: {
    cookieBanner: {
      forceHide: boolean;
    };
  };
}

if (ExecutionEnvironment.canUseDOM && ExecutionEnvironment.canUseEventListeners && typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    if (!window) {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const isEmbedded = urlParams.get("embedded");
    if (!isEmbedded) {
      return;
    }

    console.log("embedded mode detected");

    (window as DocsConfigWindow).displayConfig = {
      ...(window as DocsConfigWindow).displayConfig,
      cookieBanner: {
        forceHide: true,
      },
    };
  });
}
