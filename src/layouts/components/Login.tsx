import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { UserAccountNav } from '@/components/UserAccountNav'
import Link from "next/link";

const Login: React.FC<{}> = async () => {
  let session = undefined
  // const develop = (process.env.NODE_ENV === "development")
  const develop = process.env.DATABASE_URL !== undefined && process.env.DATABASE_URL !== null;
  if (develop){
    session = await getServerSession(authOptions);
  }
    return (
      <>
      {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
            <Link
            className="btn btn-outline-primary btn-sm hidden lg:inline-block"
            href="/sign-in"
          >
            כניסה
          </Link>
        )} 
      </>
    );
  };

  export default Login;
  