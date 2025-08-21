"use client";

import { useState } from "react";
import { Teleport } from "@/components/shared/teleport";
import { VideoCard, VideoModal, Footer, CSVModal } from "@/components/shared";
import { StartOverlay, DonationModal } from "@/components/shared/donations";
import type { DonationBinaryChoice } from "@/components/shared/donations";
import { getDonationAlertsUrl } from "@/services/donationService";
import styles from "./page.module.css";
import { initClientTracking } from "@/helpers/tracking/initClientTracking";
import {
  trackStartClick,
  trackDonationChoice,
  trackVideoPlay,
  trackCsvOpen,
} from "@/helpers/tracking/events";

// Types
type CourseData = {
  id: string;
  courseNumber: number;
  title: string;
  thumbnailUrl: string;
  youtubeVideoId: string;
  resources?: {
    roadmap?: string;
    csv?: string;
  };
};

// Données des cours
const coursesData: CourseData[] = [
  {
    id: "course-1",
    courseNumber: 1,
    title: "Презентация курса",
    thumbnailUrl: "/thumbnails/01.png",
    youtubeVideoId: "LgWIk3395Bk",
  },
  {
    id: "course-2",
    courseNumber: 2,
    title: "Цифровая информация",
    thumbnailUrl: "/thumbnails/02.png",
    youtubeVideoId: "25dO4MLTbik",
  },
  {
    id: "course-3",
    courseNumber: 3,
    title: "Что такое программирование?",
    thumbnailUrl: "/thumbnails/03.png",
    youtubeVideoId: "OIAw5x_p814",
  },
  {
    id: "course-4",
    courseNumber: 4,
    title: "Механизм искусственного интеллекта",
    thumbnailUrl: "/thumbnails/04.png",
    youtubeVideoId: "99fHgOTgcyU",
  },
  {
    id: "course-5",
    courseNumber: 5,
    title: "Профессии в сфере информатики",
    thumbnailUrl: "/thumbnails/05.png",
    youtubeVideoId: "QgMOgdthNBA",
  },
  {
    id: "course-6a",
    courseNumber: 6,
    title: "Часть 1 - Пути к профессиям в информатике",
    thumbnailUrl: "/thumbnails/06.png",
    youtubeVideoId: "PBv-oPXHp6Y",
    resources: {
      roadmap: "https://roadmap.sh/r/rdm-e4atc",
      csv: "learn.csv",
    },
  },
  {
    id: "course-6b",
    courseNumber: 7,
    title: "Часть 2 - Пути к профессиям в информатике",
    thumbnailUrl: "/thumbnails/06.png",
    youtubeVideoId: "_ZvtmVBiN-w",
    resources: {
      roadmap: "https://roadmap.sh/r/rdm-e4atc",
      csv: "learn.csv",
    },
  },
  {
    id: "course-6c",
    courseNumber: 8,
    title: "Часть 3 - Пути к профессиям в информатике",
    thumbnailUrl: "/thumbnails/06.png",
    youtubeVideoId: "",
    resources: {
      roadmap: "https://roadmap.sh/r/rdm-e4atc",
      csv: "learn.csv",
    },
  },
  {
    id: "course-9",
    courseNumber: 9,
    title: "ломаем стены непонимания",
    thumbnailUrl: "/thumbnails/07.png",
    youtubeVideoId: "lhV3Uw6QNow",
  },
];

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  // Init tracking once visible (CSR)
  useState(() => {
    if (typeof window !== "undefined") {
      initClientTracking();
    }
    return null;
  });
  const [isStartOpen, setIsStartOpen] = useState(true);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [videosUnlocked, setVideosUnlocked] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);

  const handleStart = () => {
    trackStartClick();
    setIsDonationOpen(true);
  };

  const handleDonationChoose = async (choice: DonationBinaryChoice) => {
    setIsDonationOpen(false);
    if (choice === "support") {
      const url = getDonationAlertsUrl(undefined, "EUR");
      window.open(url, "_blank", "noopener,noreferrer");
    }
    trackDonationChoice(choice);

    setVideosUnlocked(true);
    setIsStartOpen(false);
    setBanner("Bon visionnage !");
    setTimeout(() => setBanner(null), 3000);
  };

  const handlePlay = (youtubeVideoId: string) => {
    if (!videosUnlocked) {
      setBanner("Démarrez pour accéder aux cours");
      setTimeout(() => setBanner(null), 2000);
      return;
    }
    if (!youtubeVideoId) {
      setBanner("Bientôt disponible");
      setTimeout(() => setBanner(null), 2000);
      return;
    }
    trackVideoPlay(youtubeVideoId);
    setSelectedVideo(youtubeVideoId);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const handleOpenCSV = () => {
    trackCsvOpen();
    setIsCSVModalOpen(true);
  };

  return (
    <main className={styles.main}>
      <section
        className={styles.centerStage}
        aria-label="Téléportation"
        style={{
          position: "relative",
          minHeight: isStartOpen ? "100dvh" : undefined,
          transform: isStartOpen ? "translateY(0)" : undefined,
        }}
      >
        <Teleport className={!isStartOpen ? "lifted" : undefined}>
          {isStartOpen && <StartOverlay onStart={handleStart} />}
        </Teleport>
        {!isStartOpen && <div className={styles.portalText} />}
      </section>

      {videosUnlocked && (
        <section
          className={`${styles.courses} ${styles.coursesVisible}`}
          aria-label="Cours disponibles"
        >
          <div className={styles.coursesGrid}>
            {coursesData.map((course) => (
              <VideoCard
                key={course.id}
                id={course.id}
                courseNumber={course.courseNumber}
                title={course.title}
                thumbnailUrl={course.thumbnailUrl}
                youtubeVideoId={course.youtubeVideoId}
                onPlay={handlePlay}
                resources={course.resources}
                onOpenCSV={handleOpenCSV}
              />
            ))}
          </div>
        </section>
      )}

      {banner && <div className={styles.banner}>{banner}</div>}

      <VideoModal
        isOpen={!!selectedVideo}
        youtubeVideoId={selectedVideo || ""}
        onClose={handleCloseModal}
      />

      <DonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
        onChoose={handleDonationChoose}
      />

      <CSVModal
        isOpen={isCSVModalOpen}
        onClose={() => setIsCSVModalOpen(false)}
      />

      <Footer />
    </main>
  );
}
