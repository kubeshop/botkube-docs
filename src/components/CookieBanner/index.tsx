import React, { FC } from "react";
import { Link } from "react-router-dom";
import CookieBanner, { Cookies } from "react-cookie-banner";
import styles from "./index.module.scss";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useIsBrowser from "@docusaurus/useIsBrowser";

export const CookiesMessageBanner: FC = () => {
  const isBrowser = useIsBrowser();
  if (!isBrowser) {
    return null;
  }

  const cookies = new Cookies();

  if (!cookies || cookies.get("accepts-cookies") || isSiteEmbedded()) {
    console.log("disable cookie banner");
    return null;
  }

  console.log("enable cookie banner");

  return (
    <CookieBanner
      disableStyle={true}
      className={styles.banner}
      message="By continuing to use our site, you consent to Kubeshop using cookies in accordance with our "
      dismissOnScroll={false}
      buttonMessage={"Close"}
      link={
        <>
          <Link to="/privacy#cookie-policy">Cookie Policy.</Link>
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
