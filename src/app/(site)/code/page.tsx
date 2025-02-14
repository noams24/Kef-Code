'use client';
import { Editor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const CodePage = () => {
  const [editorTheme, setEditorTheme] = useState('');

  const handleEditorChange = (value: string | undefined, event: any) => {
    console.log(value);
  };

  var theme = useTheme();

  useEffect(() => {
    if (theme.theme === 'dark') {
      setEditorTheme('vs-dark');
    } else if (theme.theme === 'light') {
      setEditorTheme('vs-light');
    }
  }, [theme.theme]);

  return (
    <>
      <Editor
        height="600px"
        language={'java'}
        onChange={handleEditorChange}
        theme={editorTheme}
        //   beforeMount={defineMonacoThemes}
        //   onMount={(editor) => setEditor(editor)}
        defaultValue="public static void main"
        options={{
          minimap: { enabled: false },
          // fontSize,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          renderWhitespace: 'selection',
          fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
          fontLigatures: true,
          cursorBlinking: 'smooth',
          smoothScrolling: true,
          contextmenu: true,
          renderLineHighlight: 'all',
          lineHeight: 1.6,
          letterSpacing: 0.5,
          roundedSelection: true,
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </>
  );
};

export default CodePage;
