import React from "react";
import OriginalFooter from "@theme-original/Footer";
import { CookiesMessageBanner } from "@site/src/components/CookieBanner";

export default function Footer(props) {
  return (
    <>
      <CookiesMessageBanner />
      <OriginalFooter {...props} />
    </>
  );
}
