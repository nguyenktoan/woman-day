import { useState } from "react";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("rose"); // Default theme

  return (
    <div className={`${theme} ${roboto.className}`}>
      <Component {...pageProps} setTheme={setTheme} />
    </div>
  );
}
