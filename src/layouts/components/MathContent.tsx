'use client';

import { FunctionComponent, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax/browser';
import remarkBreaks from 'remark-breaks';
import '../../styles/md_code.scss';

interface MathProps {
  content: string;
}
const MathContent: FunctionComponent<MathProps> = ({ content }) => {
  useEffect(() => {
    if (!window.MathJax && !document.getElementById('mathjax-script')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'mathjax-script';
      script.src =
        'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      script.onload = () => {
        if (window.MathJax && window.MathJax.typesetPromise) {
          window.MathJax.typesetPromise().catch(err =>
            console.error('MathJax typesetting failed:', err)
          );
        }
      };
      document.head.appendChild(script);
    } else if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch(err =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, [content]);
  return (
    <div dir="rtl" className="math-content text-right">
      <ReactMarkdown
        rehypePlugins={[rehypeMathjax]}
        remarkPlugins={[remarkMath, remarkBreaks]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

declare global {
  interface Window {
    MathJax: {
      typesetPromise: () => Promise<void>;
    };
  }
}

export default MathContent;
