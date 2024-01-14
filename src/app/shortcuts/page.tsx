// import PageHeader from "@/partials/PageHeader";
import dynamic from "next/dynamic";
const Shortcuts = dynamic(() => import("./Shortcuts"), { ssr: false });
export const metadata = {
  title: "קיצורי מקלדת",
  description: "קיצורי מקלדת",
};

const Page = () => {
  return (
    <div>
        <Shortcuts/>
    </div>
  );
};

export default Page;
