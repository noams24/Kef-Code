import SeoMeta from "@/partials/SeoMeta";
import { UploadQuestion } from "./UploadQuestion";
import { promises as fs } from "fs";
import path from "path";

const AddQuestion = async () => {
  const data = await fs.readFile(
    path.join(process.cwd(), "./src/app/addquestion/courses.json"),
  );
  const courses = JSON.parse(data.toString());

  return (
    <>
      <SeoMeta
        title="העלאת שאלה"
        meta_title="העלאת שאלה"
        description="העלאת שאלה"
      />
      <UploadQuestion courses={courses} />
    </>
  );
};
export default AddQuestion;
