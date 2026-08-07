import type { Metadata } from "next";
import { Domine, Lato } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

import ScrollToTop from "@/components/ScrollToTop";

const domine = Domine({
    variable: "--font-domine",
    subsets: ["latin"],
    weight: ["400", "700"],
});

const lato = Lato({
    variable: "--font-lato",
    subsets: ["latin"],
    weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
    title: "Wiggle | Luxury Pet Essentials",
    description: "Experience the tier-god e-commerce for your pets.",
    icons: {
        icon: [
            { url: "/favicon.png", type: "image/png" },
            { url: "/favicon.ico" },
        ],
        shortcut: ["/favicon.png"],
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${domine.variable} ${lato.variable} antialiased`}>
                {children}
                <CookieBanner />
                <ScrollToTop />
            </body>
        </html>
    );
}
