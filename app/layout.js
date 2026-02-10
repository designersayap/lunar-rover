import "./foundation/tokens.css";
import "./foundation/global.css";
import "./foundation/grid.css";
import "./foundation/accent-color.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Lunar: Template Generator",
  description: "Crafting perfection, ready to deploy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
