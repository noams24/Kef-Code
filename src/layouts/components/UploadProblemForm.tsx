"use client"

import { UploadDropzone } from "@/lib/uploadthing";
import { useState, useEffect } from 'react'
import "@uploadthing/react/styles.css";
import * as React from "react"
import * as z from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"


const uploadFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof uploadFormSchema>


const UploadProblemForm = () => {

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(uploadFormSchema),
  })
  const [url, setUrl] = useState<string>("");
  const [inputValue, setInputValue] = useState(''); // Initial input value

  useEffect(() => {
    // Update the input value when the 'url' changes
    setInputValue(url);
  }, [url]);


  function onSubmit(data: z.infer<typeof uploadFormSchema>) {
    console.log(data);
  }


  return (
    <>
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6 text-center">
              <form onSubmit={form.handleSubmit(onSubmit)}>

                <Select >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>


                <div className="mb-6">
                  <label htmlFor="title" className="form-label">
                    שם השאלה
                  </label>
                  <input
                    id="title"
                    className="form-input"
                    type="text"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="course" className="form-label">
                    קורס
                  </label>
                  <input
                    id="mail"
                    className="form-input"
                    type="email"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="chapter" className="form-label">
                    פרק
                  </label>
                  <input
                    id="chapter"
                    className="form-input"
                    type="chapter"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="difficulty" className="form-label">
                    רמת קושי
                  </label>
                  <input
                    id="difficulty"
                    className="form-input"
                    type="difficulty"
                  />
                </div>

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
                <button type="submit" className="btn btn-primary">
                  העלאה
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default UploadProblemForm;
