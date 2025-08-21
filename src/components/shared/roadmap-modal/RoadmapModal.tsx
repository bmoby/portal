import React, { useEffect, useRef } from "react";
import styles from "./RoadmapModal.module.css";

export type RoadmapModalProps = {
  isOpen: boolean;
  embedId: string; // roadmap.sh embed id
  onClose: () => void;
};

export default function RoadmapModal({
  isOpen,
  embedId,
  onClose,
}: RoadmapModalProps) {
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
    >
      <div className={styles.modalContent} role="dialog" aria-modal>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fermer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
        <div className={styles.embedContainer}>
          <iframe
            src={`https://roadmap.sh/r/embed?id=${embedId}`}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Roadmap"
          />
        </div>
      </div>
    </div>
  );
}
