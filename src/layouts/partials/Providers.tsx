"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { createContext, useState, useMemo, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  createTheme,
  ThemeProvider as ThemProviderMui,
} from "@mui/material/styles";

import { useTheme } from "next-themes";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  
  const { setTheme, resolvedTheme } = useTheme();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "dark" ? "dark" : "light"));
      },
    }),
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersLightTheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const mode = prefersLightTheme ? "dark" : "light";
    setMode(mode);
  }, [prefersDarkMode]);

  useEffect(() => {
    document.body.setAttribute("theme", mode);
  }, [mode]);

  setTheme('dark')

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
// console.log(theme)
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemProviderMui theme={theme}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableColorScheme={false}
        >
          <QueryClientProvider client={queryClient}>
            <SessionProvider>{children}</SessionProvider>
          </QueryClientProvider>
        </ThemeProvider>
       </ThemProviderMui>
     </ColorModeContext.Provider>
  );
};

export default Providers;
