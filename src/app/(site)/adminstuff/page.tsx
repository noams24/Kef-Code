import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AdminStuff from './adminStuff';

interface PageProps {
  searchParams: {
    problemId: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  // console.log(searchParams.problemId);
  const session = await getServerSession(authOptions);
  if (session?.user.role !== 'ADMIN') {
    redirect('/');
  }

  if (!searchParams.problemId) {
    return <h3>no problemId was given</h3>;
  }

  const problemId = searchParams.problemId;
  const problemData = await db.problem.findFirst({
    where: { id: parseInt(problemId) },
  });
  if (!problemData) return <h3>problem not found</h3>;

  return (
    <>
      {problemData && (
        <div>
          <h3>{problemData.title}</h3>
          <p>{problemData.id}</p>
          <AdminStuff problemData={problemData} />
        </div>
      )}
    </>
  );
};
export default Page;
