import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB" },
    pdf: { maxFileSize: "4MB" },
  })
    .middleware(async (req) => {
      return req;
    })
    .onUploadComplete(async ({ metadata, file }) => {}),
    imageUploader2: f({
      image: { maxFileSize: "2MB" },
    })
      .middleware(async (req) => {
        return req;
      })
      .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
