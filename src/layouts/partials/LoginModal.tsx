"use client";
// import { Icons } from '@/components/Icons'
import UserAuthForm from "@/components/UserAuthForm";
// import Link from "next/link";
// import CloseModal from "./CloseModal";
import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button2";
import { X } from "lucide-react";

const LoginModal: FC = () => {
  const [isOpen, setModal] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (isOpen && !event.target.closest(".bg-white")) {
        setModal(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="btn btn-outline-primary btn-sm hidden lg:inline-block"
        onClick={() => setModal(true)}
      >
        כניסה
      </button>
      {!isOpen ? null : (
        <div className="fixed inset-0 bg-zinc-900/20 z-10">
          <div className="container flex items-center h-full max-w-lg mx-auto">
            <div className="relative bg-white dark:bg-black w-full h-fit py-20 px-2 rounded-lg">
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
                    !ברוך הבא
                  </h1>
                  <p className="text-sm max-w-xs mx-auto">
                    בהתחברות לאתר אני מאשר את תנאי השימוש
                  </p>
                </div>
                <UserAuthForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
