"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import ChildrenProviders from "./ChildrenProviders";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableColorScheme={false}
    >
      <ChildrenProviders>{children}</ChildrenProviders>
    </ThemeProvider>
  );
};

export default Providers;
