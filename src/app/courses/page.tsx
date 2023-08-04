import Testimonials from "@/partials/Testimonials";
import { getListPage } from "@/lib/contentParser";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const parseFrontmatter = (frontmatter: any) => {
  const frontmatterString = JSON.stringify(frontmatter);
  return JSON.parse(frontmatterString);
};

async function getPage(folder: string) {

  const pageData = await fs.readFile(
    path.join(process.cwd(), folder)
  )
  const { content, data: frontmatter } = matter(pageData);
  return {
    frontmatter: parseFrontmatter(frontmatter),
    content,
  };
}

const Courses = async () => {

  const testimonial1 = await getPage("src/content/sections/ComputerScience2.md");
  const testimonial2 = await getPage("src/content/sections/Math.md");
  const testimonial3 = await getPage("src/content/sections/Other.md");

  return (
    <div className="flex flex-col gap-y-5 p-3">
      <Testimonials data={testimonial1} />
      <Testimonials data={testimonial2} />
      <Testimonials data={testimonial3} />
    </div>
  );
};

export default Courses;
