'use client'
import "./css/globals.css";
import { Provider } from "react-redux";
import { store } from "state/store";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className="h-full w-full">
          {children}
        </body>
      </html>
    </Provider>
  );
}
