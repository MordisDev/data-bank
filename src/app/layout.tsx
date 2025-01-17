import type { Metadata } from "next";

import { Navigation } from "@/sections/Navigation/Navigation";

import StyledComponentsRegistry from "./registry";
import { GlobalStyle } from "./globalStyle";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <GlobalStyle />
        <body>
          <Navigation />
          {children}
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
