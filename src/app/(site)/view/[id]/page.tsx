import { db } from "@/lib/db";
import View from "./View";
import { generateHtml } from "@/layouts/editor/utils/generateHtml";
// import { JSDOM } from "jsdom";
import parse from "html-react-parser";
import SeoMeta from "@/partials/SeoMeta";

const ViewPage = async ({ params }: { params: { id: string } }) => {
  try {
    const data: any = await db.submissions.findUnique({
      where: {
        id: params.id,
      },
      include: {
        problem: true,
        user: true,
      },
    });
    const htmlData = await generateHtml(data.content);
    const solution = parse(htmlData);
    if (!data) {
      return <h1 className="flex justify-center mt-5">הדף לא קיים</h1>;
    }
    return (
      <div>
        <SeoMeta
          title={`כיף קוד - ${data.problem.title}`}
          meta_title={`כיף קוד - ${data.problem.title}`}
          description={`כיף קוד - ${data.problem.title}`}
        />
        {data && <View data={data}>{solution}</View>}
      </div>
    );
  } catch {
    return <h1 className="flex justify-center mt-5">הדף לא קיים</h1>;
  }
};

export default ViewPage;
