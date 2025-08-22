import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://portal-umber-theta.vercel.app"),
  title: "PORTAL — от нуля к ясности в технологиях",
  description:
    "PORTAL — системный курс по цифровым технологиям, программированию, ИИ и профессиям в IT. Переводим от нуля к кристально ясному пониманию.",
  keywords: [
    "PORTAL",
    "технологии",
    "программирование",
    "искусственный интеллект",
    "профессии в IT",
    "карьерные маршруты",
    "обучение",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    title: "PORTAL — от нуля к ясности в технологиях",
    description:
      "Системное понимание технологий, программирования и ИИ. От точки ноль — к ясной картине и практическим навыкам.",
    url: "https://portal-umber-theta.vercel.app/",
    siteName: "PORTAL",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://portal-umber-theta.vercel.app/myImg.png",
        width: 1200,
        height: 630,
        alt: "PORTAL — системный курс по цифровым технологиям",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PORTAL — от нуля к ясности в технологиях",
    description:
      "Курс, который телепортирует от точки ноль к кристально ясному пониманию технологий, программирования и ИИ.",
    images: ["https://portal-umber-theta.vercel.app/myImg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-WBNHVVDK";
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
