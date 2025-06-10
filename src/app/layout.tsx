'use client';

import { metadata } from "./metadata";
import "./globals.css";
import { Inter, Roboto } from "next/font/google";
import ClientLayout from "./components/ClientLayout";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="description" content={metadata.description} />
        <meta name="title" content={metadata.title} />
      </head>
      <body
        className={`${inter.variable} ${roboto.variable} transition-colors duration-200 bg-white text-black dark:bg-[#0a0a0a] dark:text-white`}
        suppressHydrationWarning={true}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CookiesProvider>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                theme="dark"
                toastStyle={{
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '12px',
                  width: '15rem'
                }}
                progressClassName="toast-progress"
              />
              <ClientLayout>{children}</ClientLayout>
            </CookiesProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
