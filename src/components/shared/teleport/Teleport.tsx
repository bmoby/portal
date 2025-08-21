import React from "react";
import styles from "./Teleport.module.css";

export type TeleportProps = {
  gradientCss?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function Teleport({
  gradientCss,
  className,
  children,
}: TeleportProps) {
  const styleVar: React.CSSProperties = {
    position: "relative",
    ...(gradientCss
      ? ({ ["--portal-color"]: gradientCss } as React.CSSProperties)
      : {}),
  };

  return (
    <div
      className={`${styles["portal-frame"]} ${className || ""}`}
      style={styleVar}
    >
      <div className={styles.portal} />
      {children}
    </div>
  );
}
