"use client";

import React from "react";
import styles from "./DonationModal.module.css";

export type DonationBinaryChoice = "support" | "free";

export type DonationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onChoose: (choice: DonationBinaryChoice) => void;
};

export default function DonationModal({
  isOpen,
  onClose,
  onChoose,
}: DonationModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div
        className={`${styles.modalContent} ${styles.fullscreen}`}
        role="dialog"
        aria-modal
      >
        {/* Grille des choix */}
        <div className={styles.splitGrid}>
          {/* Choix 1: Soutien */}
          <button
            className={`${styles.pane} ${styles.paneSupport}`}
            onClick={() => onChoose("support")}
          >
            <div className={styles.paneInner}>
              <h3 className={styles.headline}>Помочь с донатом</h3>
            </div>
          </button>

          {/* Choix 2: Gratuit */}
          <button
            className={`${styles.pane} ${styles.paneFree}`}
            onClick={() => onChoose("free")}
          >
            <div className={styles.paneInner}>
              <h3 className={styles.headline}>Получить бесплатно</h3>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
