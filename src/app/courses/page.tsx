import { getListPage } from "@/lib/contentParser";
import Testimonials from "@/partials/Testimonials";
import PageHeader from "@/partials/PageHeader";

const Courses = () => {
  const testimonial1 = getListPage("sections/ComputerScience.md");
  const testimonial2 = getListPage("sections/Math.md");
  const testimonial3 = getListPage("sections/Other.md");
  return (
    <>
      <PageHeader title="קורסים" />
      <Testimonials data={testimonial1} /> 
      <Testimonials data={testimonial2} /> 
      <Testimonials data={testimonial3} /> 
    </>
  );
};

export default Courses;
