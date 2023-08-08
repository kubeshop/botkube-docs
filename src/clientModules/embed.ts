import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export interface DocsConfigWindow extends Window {
  displayConfig?: {
    cookieBanner: {
      forceHide: boolean;
    };
  };
}

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener("DOMContentLoaded", function () {
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
