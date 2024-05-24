import React, { FC } from "react";
import CookieBanner, { Cookies } from "react-cookie-banner";
import styles from "./index.module.scss";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useIsBrowser from "@docusaurus/useIsBrowser";
import Link from "@docusaurus/Link";

export const CookiesMessageBanner: FC = () => {
  const isBrowser = useIsBrowser();
  if (!isBrowser) {
    return null;
  }

  const cookies = new Cookies();

  if (!cookies || cookies.get("accepts-cookies") || isSiteEmbedded()) {
    return null;
  }

  return (
    <CookieBanner
      disableStyle={true}
      className={styles.banner}
      message="By continuing to use our site, you consent to Kubeshop using cookies in accordance with our "
      dismissOnScroll={false}
      buttonMessage={"Close"}
      link={
        <>
          <Link target="_blank" href="https://botkube.io/privacy-policy">
            Privacy Policy.
          </Link>
        </>
      }
      cookie="user-has-accepted-cookies"
    />
  );
};

function isSiteEmbedded(): boolean {
  if (!ExecutionEnvironment.canUseDOM || typeof window === "undefined") {
    return false;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const embeddedValue = urlParams.get("embedded");
  return embeddedValue === "true";
}
