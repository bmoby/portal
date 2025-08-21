"use client";

import React from "react";
import styles from "./Footer.module.css";

const youtubeUrl = "https://www.youtube.com/@Tsarag";
const telegramUrl = "https://t.me/tsarag_ch";
const instagramUrl =
  "https://www.instagram.com/strasbourgov?igsh=MXQ4amo5bnB4b3VtcQ%3D%3D&utm_source=qr";
const tiktokUrl = "https://www.tiktok.com/@tsarag?_t=ZN-8z4Y8mTozah&_r=1";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>PORTAL</div>
        <nav className={styles.socials} aria-label="Réseaux sociaux">
          <a
            className={styles.link}
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
              <path
                fill="currentColor"
                d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.3-1.9.5-3.8.5-5.8s-.2-3.9-.5-5.8zM9.8 15.5v-7l6.2 3.5-6.2 3.5z"
              />
            </svg>
          </a>
          <a
            className={styles.link}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
              <path
                fill="currentColor"
                d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.25a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 18 6.25z"
              />
            </svg>
          </a>
          <a
            className={styles.link}
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
              <path
                fill="currentColor"
                d="M14 3h2a5 5 0 0 0 5 5V10a7 7 0 0 1-5-2v7.5A5.5 5.5 0 1 1 10 10h2a3.5 3.5 0 1 0 3.5 3.5V3z"
              />
            </svg>
          </a>
          <a
            className={styles.link}
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
              <path
                fill="currentColor"
                d="M21.9 3.3a1 1 0 0 0-1.1-.1L3.2 11.2a1 1 0 0 0 .1 1.8l4.9 1.6 1.9 5a1 1 0 0 0 1.7.3l2.7-3.1 4.8 3.5a1 1 0 0 0 1.6-.6l2.9-15a1 1 0 0 0-.9-1.3zM9 13.5l8.9-5.5-6.8 7.4-.3 3.5-1.8-5.4z"
              />
            </svg>
          </a>
        </nav>
        <div className={styles.copy}>
          © {new Date().getUTCFullYear()} Tsarag
        </div>
      </div>
    </footer>
  );
}
