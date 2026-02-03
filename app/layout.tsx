import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "SM Saúde e Seguros | Proteção para você e sua família",
  description: "Consultoria especializada em planos de saúde e seguros. Proteja o que mais importa com a SM Saúde e Seguros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${josefinSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
