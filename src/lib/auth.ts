import { db } from '@/lib/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { nanoid } from 'nanoid';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_URL,
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.picture;
        session.user.username = token.username;
      }

      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (!dbUser) {
        token.id = user!.id;
        return token;
      }
      const userName = dbUser.name;
      if (!dbUser.username) {
        if (!dbUser.name) {
          await updateUserName({ name: nanoid(10), id: dbUser.id });
        } else {
          let isExists = await db.user.findFirst({
            where: {
              username: dbUser.name,
            },
          });
          if (!isExists) {
            await updateUserName({ name: dbUser.name, id: dbUser.id });
          } else {
            let i = 1;
            let userName = dbUser.name;
            while (true) {
              let exists = await db.user.findFirst({
                where: {
                  username: `${dbUser.name}${i}`,
                },
              });
              if (!exists) {
                await updateUserName({
                  name: `${dbUser.name}${i}`,
                  id: dbUser.id,
                });
                break;
              }
              i++;
            }
          }
        }
        // await db.user.update({
        //   where: {
        //     id: dbUser.id,
        //   },
        //   data: {
        //     username: userName,
        //   },
        // });
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        picture: dbUser.image,
        username: dbUser.username,
      };
    },
    // redirect() {
    //   return '/'
    // },
  },
};

async function updateUserName({ name, id }: { name: string; id: string }) {
  await db.user.update({
    where: {
      id: id,
    },
    data: {
      username: name,
    },
  });
}

export const getAuthSession = () => getServerSession(authOptions);
