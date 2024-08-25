// import { Inter } from "next/font/google";
//@ means that any import will interpreted relative to  root directory  social_media, so here it means social_media/utils/globals.css
import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "Social Media",
  description: "A place where you can connect to the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
