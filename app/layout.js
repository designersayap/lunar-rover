import "./foundation/tokens.css";
import "./foundation/global.css";
import "./foundation/grid.css";
import "./foundation/accent-color.css";

export const metadata = {
  title: "Lunar: Template Generator",
  description: "Crafting perfection, ready to deploy",
  icons: {
    apple: [
      { url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/images/apple-touch-icon-precomposed.png", sizes: "180x180", type: "image/png", rel: "apple-touch-icon-precomposed" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
