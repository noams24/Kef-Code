"use client";

import config from "@/config/config.json";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

const queryClient = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => {
  const { default_theme } = config.settings;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={default_theme}
      enableColorScheme={false}
    >
      <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
