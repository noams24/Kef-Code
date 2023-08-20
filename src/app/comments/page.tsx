import CommentsSection from "@/components/comments/CommentsSection";
import Accordion from "@/shortcodes/Accordion";

const page = () => {
  return (
    <>
      <Accordion className="mt-8" title="דיון">
        <CommentsSection problemId={1} comments={[]} />
      </Accordion>
    </>
  );
};
export default page;
