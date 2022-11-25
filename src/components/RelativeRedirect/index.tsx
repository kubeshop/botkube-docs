import React, { FC } from "react";
import { Redirect, useLocation } from "@docusaurus/router";

export interface RelativeRedirectProps {
  to: string;
}

export const RelativeRedirect: FC<RelativeRedirectProps> = ({ to }) => {
  const { pathname } = useLocation();

  let location = to;
  if (pathname.endsWith("/")) {
    location = `../${to}`;
  }

  return <Redirect to={location} />;
};
