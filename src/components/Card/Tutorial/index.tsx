import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import Heading from "@theme/Heading";
import clsx from "clsx";
import styles from "./index.module.scss";

type Props = {
  title: string;
  body: ReactNode;
  buttonLabel: string;
  buttonLarge?: boolean;
  titleHeadingType?: string;
  link: string;
};

export const CardTutorial: FC<Props> = ({ link, buttonLabel, body, title, titleHeadingType, buttonLarge }) => {
  return (
    <div className={clsx(styles.card)}>
      <Heading as={titleHeadingType || "h3"}>{title}</Heading>
      <p>{body}</p>
      <Link to={link} className={clsx("button", "button--secondary", buttonLarge && "button--lg", styles.button)}>
        {buttonLabel}
      </Link>
    </div>
  );
};
