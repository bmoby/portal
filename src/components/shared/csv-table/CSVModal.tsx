import React from "react";
import styles from "./CSVModal.module.css";
import CSVTable from "./CSVTable";

type CSVModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CSVModal({ isOpen, onClose }: CSVModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Карьера в информатике</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ width: "16px", height: "16px", marginRight: "8px" }}
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
            Закрыть
          </button>
        </div>
        <div className={styles.modalBody}>
          <CSVTable />
        </div>
      </div>
    </div>
  );
}
