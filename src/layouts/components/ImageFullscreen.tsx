import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import { Button } from "./ui/button";
import { Expand } from "lucide-react";
import Image from "next/image";
// import SimpleBar from "simplebar-react";

interface ImageFullScreen {
  imageUrl: string;
}

const ImageFullScreen = ({ imageUrl }: ImageFullScreen) => {
  const [isOpen, setIsOpen] = useState(false);
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
          {/* <SimpleBar className="max-h-[calc(100vh-10rem)] overflow-auto"> */}
            <div className="max-h-[calc(100vh-10rem)] flex justify-center mt-6 dark:invert">
              <div className=" overflow-auto">
              <Image width={1000} height={1000} src={imageUrl} alt="Image" />
              </div>
            </div>
          {/* </SimpleBar> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageFullScreen;
