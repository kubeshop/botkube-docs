import React, { FC } from "react";
import { Link } from "react-router-dom";
import CookieBanner, { Cookies } from "react-cookie-banner";
import styles from "./index.module.scss";
import { DocsConfigWindow } from "@site/src/clientModules/embed";

export const CookiesMessageBanner: FC = () => {
  const cookies = new Cookies();

  if (
    !cookies ||
    cookies.get("accepts-cookies") ||
    (window as DocsConfigWindow).displayConfig?.cookieBanner.forceHide
  ) {
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
          <Link to="/privacy#cookie-policy">Cookie Policy.</Link>
        </>
      }
      cookie="user-has-accepted-cookies"
    />
  );
};
