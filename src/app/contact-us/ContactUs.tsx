"use client";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/table/registry/new-york/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/table/registry/new-york/ui/button";
import { submitContactData } from "../actions/contact";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/table/registry/new-york/ui/input";
import { useState } from "react";

const ContactUs = () => {
  const [isSubmitted, setSubmitted] = useState<boolean>(false);

  const profileFormSchema = z.object({
    name: z.string({
      required_error: "* חובה",
    }),
    email: z
      .string({
        required_error: "* חובה",
      })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "מייל לא תיקני"),
    content: z.string({
      required_error: "* חובה",
    }),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onSubmit",
  });

  function onSubmit(data: ProfileFormValues) {
    Submit(data);
  }

  const { mutate: Submit, isLoading } = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      const payload =  values ;
      await submitContactData(payload);
    },
    onError: () => {},
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  return (
    <div>
      {!isSubmitted ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 m-5"
            dir="rtl"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם מלא</FormLabel>
                  <FormControl className="bg-transparent border-gray-400">
                    <Input
                      className="form-input font-arial font-bold"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>מייל</FormLabel>
                  <FormControl className="bg-transparent border-gray-400">
                    <Input
                      className="form-input font-arial font-bold"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>תוכן</FormLabel>
                  <FormControl className="bg-transparent border-gray-400">
                    <textarea
                      className="form-input font-arial font-bold"
                      rows={8}
                      {...field}
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="hover:dark:text-sky-100 hover:dark:border-gray-500"
            >
              שלח הודעה
            </Button>
          </form>
        </Form>
      ) : (
        <h3 className="mt-10">תודה!</h3>
      )}
    </div>
  );
};

export default ContactUs;
