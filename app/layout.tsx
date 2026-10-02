import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { site } from "@/content/site";
import { ActionBar } from "@/components/ActionBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

const title = "Confortex Iași | Frig industrial, HVAC și centrale de tratare a aerului";
const description = "Confortex, Iași: livrare, montaj, punere în funcțiune, service și instruire pentru frig industrial și comercial, chillere, rooftop-uri și centrale de tratare a aerului (AHU).";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  title: { default: title, template: `%s | ${site.name} Iași` },
  description,
  robots: { index: false, follow: false }, // ponytail: demo is noindex and has no sitemap/robots, upgrade: remove at launch and add app/sitemap.ts + app/robots.ts (guidelines/08)
  openGraph: { title, description, locale: "ro_RO", type: "website", siteName: site.name },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = { themeColor: "#14171c" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: site.legalName,
  description,
  telephone: "+40232231900",
  email: site.email,
  taxID: site.cui,
  foundingDate: String(site.founded),
  address: { "@type": "PostalAddress", streetAddress: site.street, postalCode: site.zip, addressLocality: site.city, addressCountry: "RO" },
  areaServed: ["Iași", "Suceava", "Botoșani", "Neamț", "Vaslui", "Republica Moldova"],
  sameAs: [site.facebook],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro" className={geist.variable}>
      <body>
        <a href="#main" className="sr-only z-50 bg-white px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Sari la conținut
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ActionBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
