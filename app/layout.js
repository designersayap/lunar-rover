
import "./foundation/tokens.css";
import "./foundation/global.css";
import "./foundation/grid.css";
import "./foundation/accent-color.css";

export const metadata = {
  title: "Lunar: Template Generator",
  description: "Crafting perfection, ready to deploy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Poppins:wght@600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link id="theme-stylesheet" rel="stylesheet" href="/themes/primitives.css" />

      </head>
      <body>{children}</body>
    </html>
  );
}
