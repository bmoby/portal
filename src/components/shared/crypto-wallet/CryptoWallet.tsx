"use client";

import React, { useState } from "react";
import styles from "./CryptoWallet.module.css";

export type CryptoWalletProps = {
  className?: string;
};

export default function CryptoWallet({ className }: CryptoWalletProps) {
  const [copied, setCopied] = useState(false);
  const walletAddress = "0x552Ef5825ab60B69c02Ebf75F577f60C3870c5e2";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  return (
    <div className={`${styles.cryptoWallet} ${className || ""}`}>
      <div className={styles.walletHeader}>
        <div className={styles.networkInfo}>
          <span className={styles.networkBadge}>Wallet: USDT</span>
          <span className={styles.networkBadge}>Network: ETH</span>
        </div>
      </div>

      <div className={styles.walletAddress}>
        <span className={styles.addressText}>{walletAddress}</span>
        <button
          className={`${styles.copyButton} ${copied ? styles.copied : ""}`}
          onClick={handleCopy}
          aria-label="Копировать адрес кошелька"
          title="Копировать адрес"
        >
          {copied ? (
            <svg
              className={styles.copyIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          ) : (
            <svg
              className={styles.copyIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
            </svg>
          )}
        </button>
      </div>

      <p className={styles.walletDescription}>Мой криптокошелек</p>
    </div>
  );
}
