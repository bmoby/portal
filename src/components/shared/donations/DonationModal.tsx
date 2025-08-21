"use client";

import React, { useEffect, useRef } from "react";
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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      ref={modalRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal
      aria-label="Сделайте выбор"
    >
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>
          Вы хотите поддержать меня донатом?
        </h2>
        <p className={styles.modalSubtitle}>
          Это позволит мне продолжать работу!
        </p>
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={() => onChoose("support")}
            autoFocus
            aria-label="Да, поддержать"
          >
            Да
          </button>
          <button
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => onChoose("free")}
            aria-label="Нет"
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}
