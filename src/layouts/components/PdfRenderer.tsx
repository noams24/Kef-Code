'use client';

import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ChevronDown, Loader2, RotateCw, Search } from 'lucide-react';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useResizeDetector } from 'react-resize-detector';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropDownMenu';

import PdfFullscreen from './PdfFullscreen';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

interface PdfRendererProps {
  url: string;
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const { toast } = useToast();

  const [numPages, setNumPages] = useState<number>();
  // const [currPage, setCurrPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  const isLoading = renderedScale !== scale;
  const { width, ref } = useResizeDetector();

  return (
    <div className="w-full items-center rounded-md border border-zinc-200 shadow dark:border-zinc-500">
      <div className="flex h-10 w-full items-center justify-between border-b border-zinc-200 px-2 dark:border-zinc-500">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1.5" aria-label="zoom" variant="ghost">
                <Search className="h-4 w-4" />
                {scale * 100}%
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-body dark:bg-darkmode-body">
              <DropdownMenuItem onSelect={() => setScale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.25)}>
                125%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2.5)}>
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Button
            onClick={() => setRotation(prev => prev + 90)}
            variant="ghost"
            aria-label="rotate 90 degrees"
          >
            <RotateCw className="h-4 w-4" />
          </Button>

          <PdfFullscreen fileUrl={url} />
        </div>
      </div>

      <div className="w-full">
        <div ref={ref} className="max-h-[calc(100vh-24rem)] overflow-auto">
          <Document
            loading={
              <div className="flex justify-center">
                <Loader2 className="my-24 h-6 w-6 animate-spin" />
              </div>
            }
            onLoadError={() => {
              toast({
                title: 'Error loading PDF',
                description: 'Please try again later',
                variant: 'destructive',
              });
            }}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            file={url}
            className=""
          >
            {isLoading && renderedScale ? (
              <Page
                width={width ? width : 1}
                // pageNumber={currPage}
                pageNumber={1}
                scale={scale}
                rotate={rotation}
                key={'@' + renderedScale}
              />
            ) : null}
            {new Array(numPages).fill(0).map((_, i) => (
              <Page
                className={cn(isLoading ? 'hidden' : 'dark:invert')}
                width={width ? width : 1}
                pageNumber={i + 1}
                scale={scale}
                rotate={rotation}
                key={i}
                loading={
                  <div className="flex justify-center">
                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(scale)}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
