"use client";
// import { Input } from "@/components/ui/Input";
import SeoMeta from "@/partials/SeoMeta";
import PageHeader from "@/partials/PageHeader";
import { UploadDropzone } from "@/lib/uploadthing";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

const UsernameValidator = z.object({
  name: z
    .string()
    .min(3)
    .max(32)
    // .regex(/^[a-zA-Z0-9_]+$/),
});

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "username">;
}

type FormData = z.infer<typeof UsernameValidator>;

const AccountForm = ({ user, className, ...props }: UserNameFormProps) => {
  // const handleSubmit = async (e:any) => {
  //     e.preventDefault();
  //     console.log(e)
  // }
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.username || "",
    },
  });

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: FormData) => {
    // console.log(name)
      const payload: FormData = { name };

      const { data } = await axios.patch(`/api/changeUserName/`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "שם המשתמש תפוס",
            description: "נא לבחור שם אחר",
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "שגיאה",
        description: "שם המשתמש לא עודכן בהצלחה, נסה שוב יותר מאוחר",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "שם המשתמש שונה בהצלחה",
      });
        router.refresh()
    },
  });

  const { mutate: uploadImage } = useMutation({
    mutationFn: async ( url ) => {
      const { data } = await axios.patch(`/api/changeUserImage/`, {url});
      return data;
    },
    onError: (err) => {
      return toast({
        title: "שגיאה",
        description: "לא ניתן להחליף תמונה, נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "תמונתך שונתה בהצלחה",
      });
        router.refresh()
    },
  });

  return (
    <>
      <SeoMeta title="הגדרות" meta_title="הגדרות" description="הגדרות" />
      <PageHeader title="הגדרות" />
      {/* <section dir="rtl" className="section-sm mx-96"> */}
      <section dir="rtl" className="mx-96">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              {/* <form onSubmit={updateUsername} method="POST"> */}
              {/* <form onSubmit={handleSubmit} > */}
              <form
                onSubmit={handleSubmit((e) => updateUsername(e))}
                {...props}
              >
                <div className="mb-6">
                  <label htmlFor="name" className="form-label">
                    שם משתמש
                  </label>
                  <div className="flex gap-4">
                    <input
                      id="name"
                      className="form-input"
                      placeholder="שם משתמש"
                      type="text"
                      {...register("name")}
                    />
                    {errors?.name && (
                      <p className="px-1 text-xs text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="btn border-1 border-gray-200"
                    >
                      שנה
                    </button>
                  </div>
                </div>
              </form>
              <hr className="my-5 border-t-1 border-t-gray-400"></hr>
              <label htmlFor="name" className="form-label">
                תמונה
              </label>
              <UploadDropzone
                className="dark:border-sky-200"
                endpoint="imageUploader"
                onClientUploadComplete={(res:any) => {
                    uploadImage(res[0].fileUrl)
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountForm;
