import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const globalParams = {
  cookie: {
    hide: true,
  },
};

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Test DOM loaded");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.globalParams = globalParams;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log("window.globalParams", window.globalParams);
    const cookieBannerElem = document.querySelector<HTMLDivElement>(".react-cookie-banner");
    console.log("cookieBannerElem", cookieBannerElem);
    if (cookieBannerElem) {
      console.log("Cookie banner exist");
      cookieBannerElem.style.display = "none";
    }
  });
}
