import { Inter } from 'next/font/google'

import "./globals.css";

import { Web3Modal } from "../context/Web3Modal";
import { RealEstatePropertyProvider } from "../context/chainestateconnect";

export const metadata = {
  title: "Web3Modal",
  description: "Web3Modal Example",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RealEstatePropertyProvider>
          <Web3Modal>
            {children}
          </Web3Modal>
        </RealEstatePropertyProvider>
      </body>
    </html>
  );
}