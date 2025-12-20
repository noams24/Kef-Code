'use client';

import { FunctionComponent, useContext } from 'react';
import { C1Component, ThemeProvider } from '@thesysai/genui-sdk';
import { themePresets } from '@crayonai/react-ui';
import { useTheme } from 'next-themes';
import '@crayonai/react-ui/styles/index.css';

interface WrapperProps {
  content: string;
}

const C1: FunctionComponent<WrapperProps> = ({ content }) => {
  const { theme } = useTheme();
  return (
    <div dir="rtl">
      <ThemeProvider
        theme={themePresets.candy.theme}
        darkTheme={themePresets.candy.darkTheme}
        mode={theme}
      >
        <C1Component c1Response={content} isStreaming={false} />
      </ThemeProvider>
    </div>
  );
};

export default C1;
