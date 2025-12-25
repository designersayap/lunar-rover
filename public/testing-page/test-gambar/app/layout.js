import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lunar Export",
  description: "Exported from Lunar Page Builder",
  
  
  
  openGraph: {
    
    
    
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
        
      </head>
      <body className={inter.className}>
        {children}
        
        {/* Analytics Scripts */}
        

        

        

        
      </body>
    </html>
  );
}
