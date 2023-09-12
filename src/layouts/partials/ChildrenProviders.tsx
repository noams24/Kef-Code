
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

import { useTheme as useThemee } from "next-themes";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const queryClient = new QueryClient();
const ChildrenProviders = ({ children }: { children: ReactNode }) => {

    const { theme, setTheme, resolvedTheme } = useThemee();

    const [mode, setMode] = useState<"light" | "dark">("light");
    
    useEffect(() => {
    if (theme === "light") setMode("light")
    else setMode("dark")
}, []);
  
    const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   const prefersLightTheme = window.matchMedia(
  //     "(prefers-color-scheme: light)",
  //   ).matches;
  //   const mode = prefersLightTheme ? "dark" : "light";
  //   setMode(mode);
  // }, [prefersDarkMode]);

  useEffect(() => {
    document.body.setAttribute("theme", mode);
  }, [mode]);

  const themee = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemProviderMui theme={themee}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </ThemProviderMui>
  </ColorModeContext.Provider>
  );
};

export default ChildrenProviders;
