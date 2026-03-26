import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { APP_NAME, STORAGE_KEYS } from "@/lib/constants";

import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Interface moderna para gestão de tarefas com autenticação simulada.",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const themeScript = `
(() => {
  try {
    const rawValue = window.localStorage.getItem("${STORAGE_KEYS.theme}");
    const theme = rawValue ? JSON.parse(rawValue) : "light";
    const root = document.documentElement;
    const darkMode = theme === "dark";

    root.classList.toggle("dark", darkMode);
    root.style.colorScheme = darkMode ? "dark" : "light";
  } catch {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
