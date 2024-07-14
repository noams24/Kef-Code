import { useToast } from '@/hooks/use-toast';
import { Expand, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useResizeDetector } from 'react-resize-detector';
import { Dialog, DialogContent, DialogTrigger } from './ui/Dialog';
import { Button } from './ui/button';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

interface PdfFullscreenProps {
  fileUrl: string;
}

const PdfFullscreen = ({ fileUrl }: PdfFullscreenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>();

  const { toast } = useToast();

  const { width, ref } = useResizeDetector();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={v => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button variant="ghost" className="gap-1.5" aria-label="fullscreen">
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="z-50 w-full max-w-7xl">
        <div ref={ref} className="mt-6 max-h-[calc(100vh-10rem)] overflow-auto">
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
            file={fileUrl}
            className="max-h-full dark:invert"
          >
            {new Array(numPages).fill(0).map((_, i) => (
              <Page key={i} width={width ? width : 1} pageNumber={i + 1} />
            ))}
          </Document>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullscreen;
