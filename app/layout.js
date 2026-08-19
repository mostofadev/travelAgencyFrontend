import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import ChatWindow from "@/components/ChatBot/ChatWindow";
import ChatWidget from "@/components/ChatBot/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GoTripsBD | Visa, Flight & Tour Packages in Bangladesh",
  description:
    "Book visa processing, flight tickets, and tour packages easily with GoTripsBD. Trusted travel partner for hassle-free visa assistance, cheap flight booking, and customized holiday packages across Bangladesh.",
  keywords: [
    "GoTripsBD",
    "visa processing Bangladesh",
    "flight booking Bangladesh",
    "tour package Bangladesh",
    "travel agency Dhaka",
  ],
  icons: {
    icon: "/logo2.svg",
    shortcut: "/logo2.svg",
    apple: "/logo2.svg",
  },
  openGraph: {
    title: "GoTripsBD | Visa, Flight & Tour Packages",
    description:
      "Your trusted travel partner for visa, flight, and tour packages in Bangladesh.",
    url: "https://www.gotripsbd.com",
    siteName: "GoTripsBD",
    locale: "en_BD",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          {children}
          {/* <ChatWidget /> */}
        </QueryProvider>
      </body>
    </html>
  );
}
