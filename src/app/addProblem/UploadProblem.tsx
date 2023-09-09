"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/table/registry/new-york/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/table/registry/new-york/ui/form";
import { Input } from "@/components/table/registry/new-york/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/table/registry/new-york/ui/select";
import { Textarea } from "@/components/table/registry/new-york/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { useState, useEffect } from "react";
import "@uploadthing/react/styles.css";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useCustomToasts } from "@/hooks/use-custom-toast";

const profileFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 1 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  course: z.string({
    required_error: "Please select an course.",
  }),
  chapter: z.string({
    required_error: "Please select an chapter.",
  }),
  difficulty: z.string({
    required_error: "Please select difficulty.",
  }),
  url: z.string().max(160).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function UploadProblem(courses: any) {
  const { loginToast } = useCustomToasts();
  const [url, setUrl] = useState<string>("");
  const [inputValue, setInputValue] = useState(""); // Initial input value

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    // Update the input value when the 'url' changes
    setInputValue(url);
  }, [url]);

  // function onSubmit(data: ProfileFormValues) {
  // toast({
  //   title: "You submitted the following values:",
  //   description: (
  //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //     </pre>
  //   ),
  // })
  // }

  function onSubmit(data: ProfileFormValues) {
    Submit(data);
  }

  const { mutate: Submit, isLoading } = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      // const payload: any = { problemId, jsonState }
      const { data } = await axios.post("/api/uploadproblem", values);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
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
        title: "נשמר",
        description: "השאלה נשמרה בהצלחה",
        variant: "destructive",
      });
    },
  });

  let mappedCourses: any = null;
  if (Array.isArray(courses.courses)) {
    mappedCourses = courses.courses.map((item: any) => (
      <SelectItem value={item.courseName}>{item.hebrew}</SelectItem>
    ));
  }

  const [chapters, setchapters] = useState([]);

  function handleCourseChange(event: any) {
    const filteredList = courses.courses.filter(
      (item: { courseName: any }) => item.courseName === event,
    );
    setchapters(filteredList[0].chapters);
  }

  return (
    <div className="mx-80">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>שם השאלה</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>קורס</FormLabel>
                {/* <Select onValueChange={field.onChange} defaultValue={field.value}> */}
                <Select
                  onValueChange={(event) => {
                    field.onChange, handleCourseChange(event);
                  }}
                  defaultValue={field.value}
                >
                  {/* <Select onValueChange={(event) => {
          form.setFieldValue("course", event.target.value);
        }} defaultValue={field.value}> */}
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="בחר קורס" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-32 overflow-y-auto bg-body dark:bg-darkmode-body">
                    {mappedCourses}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chapter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>פרק</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-32 overflow-y-auto bg-body dark:bg-darkmode-body">
                    {/* <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem> */}
                    {chapters &&
                      chapters.map((item: any) => (
                        <SelectItem value={item.link}>{item.title}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>רמת קושי</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-32 overflow-y-auto bg-body dark:bg-darkmode-body">
                    <SelectItem value="קל">קל</SelectItem>
                    <SelectItem value="בינוני">בינוני</SelectItem>
                    <SelectItem value="קשה">קשה</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>קישור לשאלה</FormLabel>
                <FormControl>
                  <Textarea placeholder="" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            העלאת שאלה{" "}
          </Button>
        </form>
      </Form>
      <div className="mb-6">
        <label htmlFor="url" className="form-label">
          קישור לשאלה
        </label>
        <input
          id="url"
          className="form-input"
          type="url"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            setUrl(res[0].fileUrl);
          }
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
