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
        <link id="theme-stylesheet" rel="stylesheet" href="/themes/theme.css" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
