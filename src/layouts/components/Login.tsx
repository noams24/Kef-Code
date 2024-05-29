'use client'
// import { authOptions, getAuthSession } from '@/lib/auth'
// import { getServerSession } from 'next-auth'
import { UserAccountNav } from '@/components/UserAccountNav'
// import Link from "next/link";
import LoginModal from '@/partials/LoginModal';
import { useSession } from "next-auth/react";

const Login: React.FC<{}> =  () => {
      const session = useSession()

    return (
      <>
      

      {(session && session.data && session.data.user) ? (
          <UserAccountNav user={session.data.user} />
        ) : (
          <LoginModal/>
        )} 
      </>
    );
  };

  export default Login;
  
  {/*@ts-ignore */}