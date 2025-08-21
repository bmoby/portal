import React from "react";
import styles from "./VideoCard.module.css";

export type VideoCardProps = {
  id: string;
  courseNumber: number;
  title: string;
  thumbnailUrl: string;
  youtubeVideoId: string;
  onPlay: (youtubeVideoId: string) => void;
  className?: string;
  resources?: {
    roadmap?: string;
    csv?: string;
  };
  onOpenCSV?: () => void;
  onOpenRoadmap?: () => void;
};

export default function VideoCard({
  id,
  courseNumber,
  title,
  thumbnailUrl,
  youtubeVideoId,
  onPlay,
  className,
  resources,
  onOpenCSV,
  onOpenRoadmap,
}: VideoCardProps) {
  const isPlayable = Boolean(
    youtubeVideoId && youtubeVideoId.trim().length > 0
  );
  const handlePlayClick = () => {
    if (!isPlayable) return;
    onPlay(youtubeVideoId);
  };

  return (
    <article className={`${styles.videoCard} ${className || ""}`} id={id}>
      <div className={styles.courseNumber}>
        <span className={styles.number}>{courseNumber}</span>
      </div>
      <div className={styles.thumbnailContainer}>
        <img src={thumbnailUrl} alt={title} className={styles.thumbnail} />
        <div className={styles.overlay}>
          <button
            className={styles.playButton}
            onClick={handlePlayClick}
            aria-label={`Lire le cours ${courseNumber}: ${title}`}
            disabled={!isPlayable}
            title={isPlayable ? "" : "Bientôt disponible"}
          >
            <svg
              className={styles.playIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {resources && (
          <div className={styles.resources}>
            {resources.roadmap && (
              <button
                className={styles.resourceLink}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenRoadmap?.();
                }}
              >
                <svg
                  className={styles.resourceIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
                Карта
              </button>
            )}
            {resources.csv && (
              <button
                className={styles.resourceLink}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCSV?.();
                }}
              >
                <svg
                  className={styles.resourceIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                Таблица
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
