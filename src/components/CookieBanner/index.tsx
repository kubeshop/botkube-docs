import React, { FC } from "react";
import { Link } from "react-router-dom";
import CookieBanner, { Cookies } from "react-cookie-banner";
import styles from "./index.module.scss";

export const CookiesMessageBanner: FC = () => {
  const cookies = new Cookies();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!cookies || cookies.get("accepts-cookies") || window.globalParams?.cookie?.hide) {
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
