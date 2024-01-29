import { generateComponents } from "@uploadthing/react";
 
import type { OurFileRouter } from "@/app/api/uploadthing/coreOnlyImage";
 
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();