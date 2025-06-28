'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { createContext, useState, useMemo, useEffect, ReactNode } from 'react';
import {
  createTheme,
  ThemeProvider as ThemProviderMui,
} from '@mui/material/styles';

import { useTheme as useThemee } from 'next-themes';

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const queryClient = new QueryClient();
export const QueryContext = createContext(queryClient);

// Add SessionContext
export const SessionContext = createContext<any>(null);

const ChildrenProviders = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme, resolvedTheme } = useThemee();

  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'light') setMode('light');
    else setMode('dark');
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  useEffect(() => {
    document.body.setAttribute('theme', mode);
  }, [mode]);

  const themee = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const myCache = createCache({
    key: 'my-prefix-key',
    stylisPlugins: [],
  });

  return (
    <CacheProvider value={myCache}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemProviderMui theme={themee}>
          <QueryClientProvider client={queryClient}>
            <QueryContext.Provider value={queryClient}>
              {/* Add SessionContext.Provider here, value will be set in WorkSpace */}
              <SessionContext.Provider value={null}>
                <SessionProvider>{children}</SessionProvider>
              </SessionContext.Provider>
            </QueryContext.Provider>
          </QueryClientProvider>
        </ThemProviderMui>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
};

export default ChildrenProviders;
