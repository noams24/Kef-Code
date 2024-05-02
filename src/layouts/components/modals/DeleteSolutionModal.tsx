"use client";

import { FC, useEffect} from "react";
import { Button } from "@/components/ui/Button2";
import { X } from "lucide-react";

interface DeleteSolutionModalProps {
  handleDelete: () => void
  setModal: any
}

const DeleteSolutionModal: FC<DeleteSolutionModalProps> = ({handleDelete, setModal}) => {

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
        if (!event.target.closest(".bg-white")) {
        setModal(false);
      }
    };
      document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [])

  return (
    <>
        <div className="fixed inset-0 bg-zinc-900/20 z-10">
          <div className="container flex items-center h-full max-w-lg mx-auto">
            <div className="relative border-2 border-black dark:border-white bg-white dark:bg-darkmode-body w-full h-fit py-20 px-2 rounded-lg">
              <div className="absolute top-4 right-4">
                {/* Close Modal Button */}
                <Button
                  variant="subtle"
                  className="h-6 w-6 p-0 rounded-md dark:bg-zinc-700 dark:text-white"
                  onClick={() => setModal(false)}
                >
                  <X aria-label="close modal" className="h-4 w-4" />
                </Button>
              </div>

              <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                <div className="flex flex-col space-y-2 text-center">
                  {/* <Icons.logo className='mx-auto h-6 w-6' /> */}
                  <h1 className="text-2xl font-semibold tracking-tight">
                    ?האם אתה בטוח
                  </h1>
                  <p className="text-sm max-w-xs mx-auto">
                    ?האם אתה בטוח רוצה למחוק את הפתרון
                  </p>
                </div>
                <div className="flex justify-center gap-10">
                  <button onClick={() => {
                    handleDelete();
                    setModal(false);
                  }}>מחיקה</button>
                  <button onClick={() => setModal(false)}>ביטול</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default DeleteSolutionModal;
