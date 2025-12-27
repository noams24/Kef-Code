'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import { C1Component, ThemeProvider } from '@thesysai/genui-sdk';
import { themePresets } from '@crayonai/react-ui';
import { useTheme } from '@mui/material/styles';
import '@crayonai/react-ui/styles/index.css';
import './extrac1.css';

interface WrapperProps {
  content: string;
}

const C1: FunctionComponent<WrapperProps> = ({ content }) => {
  const theme = useTheme();
  const resolvedTheme = theme.palette.mode;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div dir="rtl">
      <ThemeProvider
        theme={themePresets.candy.theme}
        darkTheme={themePresets.candy.darkTheme}
        mode={resolvedTheme}
      >
        <C1Component c1Response={content} isStreaming={false} />
      </ThemeProvider>
    </div>
  );
};

export default C1;
