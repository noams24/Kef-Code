import Testimonials from "@/partials/Testimonials";
import { getListPage } from "@/lib/contentParser";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "כיף קוד - קורסים"
  }
const Courses = () => {
  const testimonial1 = getListPage("sections/CS.md");
  const testimonial2 = getListPage("sections/Math.md");
  const testimonial3 = getListPage("sections/Other.md");

  return (
    <div className="flex flex-col gap-y-5 p-3">
      <Testimonials data={testimonial1} />
      <Testimonials data={testimonial2} />
      <Testimonials data={testimonial3} />
    </div>
  );
};

export default Courses;