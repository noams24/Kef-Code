import { getListPage } from "@/lib/contentParser";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import { cn } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import UserAuthForm from "@/components/UserAuthForm"

const Login = () => {
  // const data: RegularPage = getListPage("pages/about.md");
  // const { frontmatter, content } = data;
  // const { title, meta_title, description, image } = frontmatter;

  return (
    <>
      {/* <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      /> */}
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center md:col-10 lg:col-7">
              <div className="content">
                {/*<SignIn /> */}
                <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            !ברוך הבא
          </h1>
          <p className="text-sm text-muted-foreground">
            בהתחברות לאתר אני מאשר את
            <Link href="/privacy">תנאי השימוש</Link>
          </p>
          
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          {/* <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link> */}
        </p>
      </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;