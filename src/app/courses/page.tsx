import { getListPage } from "@/lib/contentParser";
import Testimonials from "@/partials/Testimonials";
//import { getAuthSession } from "@/lib/auth";
import { UserAccountNav } from "@/components/UserAccountNav";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
const Courses = async () => {
  //const session = await getAuthSession()
  const testimonial1 = getListPage("sections/ComputerScience2.md");
  const testimonial2 = getListPage("sections/Math.md");
  const testimonial3 = getListPage("sections/Other.md");
  return (
    <>
      {/* 
    {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>
        )}  
      {session ? <p>אתה מחובר</p> : <p>אתה לא מחובר</p>} */}
      <Testimonials data={testimonial1} />
      {/* <Testimonials data={testimonial2} /> 
      <Testimonials data={testimonial3} />  */}
    </>
  );
};

export default Courses;
