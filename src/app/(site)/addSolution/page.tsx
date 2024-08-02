import { UploadSolution } from '@/components/UploadSolution';
import SeoMeta from '@/partials/SeoMeta';
import { getAuthSession } from '@/lib/auth';

const AddSolution = async () => {
  const session = await getAuthSession();
  if (session?.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  return (
    <>
      <SeoMeta
        title="add"
        meta_title="add Solution"
        description="add Solution"
      />
      <UploadSolution />
    </>
  );
};
export default AddSolution;
