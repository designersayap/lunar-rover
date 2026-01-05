import { Lato, Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./foundation/tokens.css";
import "./foundation/global.css";
import "./foundation/grid.css";
import "./foundation/accent-color.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata = {
  title: "Lunar: Template Generator",
  description: "Crafting perfection, ready to deploy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lato.variable} ${poppins.variable} ${plusJakartaSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link id="theme-stylesheet" rel="stylesheet" href="/themes/theme.css" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
