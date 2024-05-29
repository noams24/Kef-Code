import { UploadSolution } from "@/components/UploadSolution"
import SeoMeta from "@/partials/SeoMeta";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const AddSolution = async () => {
  const session = await getServerSession(authOptions)
  if (session?.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  return (
    <>
      <SeoMeta
        title="add"
        meta_title="add Solution"
        description="add Solution"
      />
      <UploadSolution/>
    </>
  );
};
export default AddSolution;
