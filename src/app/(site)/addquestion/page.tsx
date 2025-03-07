import SeoMeta from "@/partials/SeoMeta";
import { UploadQuestion } from "./UploadQuestion";
import { promises as fs } from "fs";
import path from "path";
import { getAuthSession } from "@/lib/auth";

const AddQuestion = async () => {
  const data = await fs.readFile(
    path.join(process.cwd(), "./src/app/(site)/addquestion/courses.json"),
  );
  const courses = JSON.parse(data.toString());
  const session = await getAuthSession();
  return (
    <>
      <SeoMeta
        title="העלאת שאלה"
        meta_title="העלאת שאלה"
        description="העלאת שאלה"
      />
      <UploadQuestion courses={courses} session={session} />
    </>
  );
};
export default AddQuestion;
