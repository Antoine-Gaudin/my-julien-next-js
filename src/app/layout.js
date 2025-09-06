import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NameTag from "./componants/NameTag";
import Navigation from "./componants/Navigation";
import Footer from "./componants/Footer";
import Script from "next/script"; // 👈 ajoute ça

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vintage Automobiles 1856",
  description:
    "Vintage automobiles 1856 est spécialisé dans la vente et la reprise de véhicules récents multimarques mais propose et reprend également des automobiles de collection - youngtimer. Nous sommes à votre disposition, n’hésitez pas à prendre contact pour tous conseils !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Ajout direct de Font Awesome */}
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HBSHMTFK39"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HBSHMTFK39');
          `}
        </Script>

        <NameTag />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
