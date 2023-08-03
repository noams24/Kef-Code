
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Add = async () => {
  const session = await getServerSession(authOptions)
  if (session?.user.role !== 'ADMIN') {
    // throw new Error('Unauthorized')
  }
  return (
    <>
        You are logged in as {session?.user.role}
    </>
  );
};

export default Add;
