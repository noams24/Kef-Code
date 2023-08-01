import Testimonials from "@/partials/Testimonials";
import { getListPage } from "@/lib/contentParser";

const Courses = async () => {
  const testimonial1 = getListPage("sections/ComputerScience2.md");
  const testimonial2 = getListPage("sections/Math.md");
  const testimonial3 = getListPage("sections/Other.md");
  return (
    <>
      <div className="flex flex-col gap-y-5 p-3">
        <Testimonials data={testimonial1} />
        <Testimonials data={testimonial2} />
        <Testimonials data={testimonial3} />
      </div>
    </>
  );
};

export default Courses;
