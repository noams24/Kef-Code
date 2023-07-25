import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { UserAccountNav } from '@/components/UserAccountNav'
import Link from "next/link";

const Login: React.FC<{}> = async () => {
    
    const session = await getServerSession(authOptions);
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
  