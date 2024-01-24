import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./index.module.scss";

type Props = {
  title: string;
  body: ReactNode;
  buttonLabel: string;
  link: string;
};

export const CardTutorial: FC<Props> = ({ link, buttonLabel, body, title }) => {
  return (
    <div className={clsx(styles.card)}>
      <h2>{title}</h2>
      <p>{body}</p>
      <Link to={link}>
        <button className={clsx(styles.button)}>{buttonLabel}</button>
      </Link>
    </div>
  );
};
