
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Poppins:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link id="theme-stylesheet" rel="stylesheet" href="/themes/theme.css" />

      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
