'use client'
import Footer from "@components/layout/Footer";
import "./css/globals.css";
import { Provider } from "react-redux";
import { store } from "state/store";
import ScrollToTopButton from "@components/layout/ScrollToTopButton";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en" className="min-h-screen h-fit relative">
        <body className="min-h-screen">
          {children}
          <Footer />
          <ScrollToTopButton />
        </body>
      </html>
    </Provider>
  );
}
