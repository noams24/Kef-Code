
// import config from "@/config/config.json";
// import { getListPage } from "@/lib/contentParser";
// import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
// import { RegularPage } from "@/types";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
// import UploadProblemForm from "@/components/UploadProblemForm";
import { UploadProblem } from "@/components/UploadProblem";


const Add = async () => {
  const session = await getServerSession(authOptions)
  if (session?.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }
  return (
    <>
      <SeoMeta
        title="add"
        meta_title="add problem"
        description="add problem"
      />
      <UploadProblem/>
      {/* <UploadProblemForm/> */}
    </>
  );
};
export default Add;
