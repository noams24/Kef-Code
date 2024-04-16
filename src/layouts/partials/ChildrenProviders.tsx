"use client";

// import { ThemeProvider } from "next-themes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import {
  createContext,
  useState,
  useMemo,
  useEffect,
  ReactNode,
  // useContext,
} from "react";
// import { NextUIProvider } from "@nextui-org/react";
import {
  createTheme,
  ThemeProvider as ThemProviderMui,
} from "@mui/material/styles";

import { useTheme as useThemee } from "next-themes";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
// import { prefixer } from 'stylis'

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const queryClient = new QueryClient();
export const QueryContext = createContext(queryClient);
// export const useQueryClient = () => useContext(QueryContext);
// export const QueryContext = createContext(queryClient);
// console.log(queryClient);
const ChildrenProviders = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme, resolvedTheme } = useThemee();

  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme === "light") setMode("light");
    else setMode("dark");
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

  const myCache = createCache({
    key: "my-prefix-key",
    stylisPlugins: [],
  });

  return (
    <CacheProvider value={myCache}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemProviderMui theme={themee}>
          <QueryClientProvider client={queryClient}>
            <QueryContext.Provider value={queryClient}>
              <SessionProvider>{children}</SessionProvider>
            </QueryContext.Provider>
          </QueryClientProvider>
        </ThemProviderMui>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
};

export default ChildrenProviders;
