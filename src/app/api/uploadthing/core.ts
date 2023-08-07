import { getToken } from 'next-auth/jwt'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async (req) => {
      // console.log(req)
      // const user = await getToken({ req })
      // console.log(user)
      // if (!user) throw new Error('Unauthorized')
      return req
    //  return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // console.log("file url", file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
