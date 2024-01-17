import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import { Button } from "./ui/button";
import { Expand} from "lucide-react";
import { useResizeDetector } from "react-resize-detector";
import Image from "next/image";

interface ImageFullScreen {
  imageUrl: string;
}

const ImageFullScreen = ({ imageUrl }: ImageFullScreen) => {
  const [isOpen, setIsOpen] = useState(false);
  const { width, ref } = useResizeDetector();
  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(v) => {
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
        <DialogContent className="max-w-7xl w-full z-50">
          {/* <SimpleBar
            autoHide={false}
            className='max-h-[calc(100vh-10rem)] mt-6'> */}
          <div
            ref={ref}
            className="flex justify-center overflow-auto max-h-[calc(100vh-10rem)] mt-6 dark:invert "
          >
            <Image width={1000} height={1000} src={imageUrl} alt="Image" />
          </div>
          {/* </SimpleBar> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageFullScreen;
