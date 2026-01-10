import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import MobileNav from "@/components/MobileNav";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export const metadata: Metadata = {
    title: "BookingHub - Ultimate All-in-One Booking Platform",
    description: "Book hotels, flights, buses, car rentals, vacation homes, and experiences all in one place. Best prices guaranteed.",
    keywords: ["booking", "hotels", "flights", "buses", "car rental", "vacation", "travel"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${outfit.variable} font-sans`}>
                <MobileNav />
                {children}
            </body>
        </html>
    );
}
