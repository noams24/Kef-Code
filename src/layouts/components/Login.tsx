import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { UserAccountNav } from '@/components/UserAccountNav'
import Link from "next/link";

const Login: React.FC<{}> = async () => {
  let session = undefined
  // const develop = (process.env.NODE_ENV === "development")
    try{
      session = await getServerSession(authOptions);
    }
    catch{
      
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
  