"use client";

import React from "react";
import styles from "./StartOverlay.module.css";

export type StartOverlayProps = {
  onStart: () => void;
};

export default function StartOverlay({ onStart }: StartOverlayProps) {
  return (
    <div className={styles.overlay} role="dialog" aria-label="Начать">
      <div className={styles.meltingContainer}>
        <button
          className={styles.meltingText}
          data-text="НАЧАТЬ"
          onClick={onStart}
          aria-label="Начать"
        >
          НАЧАТЬ
        </button>
      </div>
    </div>
  );
}
