"use client";

import { FC, useEffect } from "react";
import { Button } from "@/components/ui/Button2";
import { X } from "lucide-react";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/table/registry/new-york/ui/form";
import { Input } from "@/components/table/registry/new-york/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from 'axios'
import { toast } from "@/hooks/use-toast";

interface AddVideoModalProps {
  handleVideo: () => void;
  setVideoModal: any;
  submissionId: String;
}

const FormSchema = z.object({
//   videoUrl:  z.string().regex(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/,
//   {message:"קישור לא תקין"})
videoUrl: z.string().min(1, {message:"קישור לא תקין"})
});
type FormValues = z.infer<typeof FormSchema>;

const AddVideoModal: FC<AddVideoModalProps> = ({
  handleVideo,
  setVideoModal,
  submissionId,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (!event.target.closest(".bg-white")) {
        setVideoModal(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function onSubmit(data: FormValues) {
    Submit(data);
  }

  const { mutate: Submit, isLoading } = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = { values, submissionId};
      const { data } = await axios.post("/api/addVideo", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 402) {
          return toast({
            title: "שגיאה",
            description: "הקישור לא תקין",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "שגיאה",
        description: "לא ניתן לשמור את התשובה כרגע",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "הצלחה",
        description: "העלאת סרטון בוצעה בהצלחה",
        variant: "destructive",
      });
    },
  });

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
                onClick={() => setVideoModal(false)}
              >
                <X aria-label="close modal" className="h-4 w-4" />
              </Button>
            </div>

            <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
              <div className="flex flex-col space-y-2 text-center">
                {/* <Icons.logo className='mx-auto h-6 w-6' /> */}
                <h1 className="text-2xl font-semibold tracking-tight">
                  הוספת סרטון
                </h1>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 m-5"
                    dir="rtl"
                  >
                    <FormField
                      control={form.control}
                      name="videoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>קישור</FormLabel>
                          <FormControl className="bg-transparent border-gray-400">
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                    //   onClick={() => {
                    //     // handleVideo();
                    //     setVideoModal(false);
                    //     window.location.reload();
                    //   }}
                      // disabled={isLoading}
                      className="hover:dark:text-sky-100 hover:dark:border-gray-500"
                    >
                      העלאת סרטון{" "}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVideoModal;
