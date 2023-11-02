import { db } from "@/lib/db";
import { UserAvatar } from "@/components/UserAvatar";
import { humanize, slugify } from "@/lib/utils/textConverter";

const User = async ({ params }: { params: { name: string } }) => {
  try {
    const user: any = await db.user.findUnique({
      where: {
        username: decodeURIComponent(params.name),
      },
    });
    if (!user) return <div>No user found</div>;

    const data: any = await db.submissions.findMany({
      where: {
        userId: user.id,
        isPublic: true,
      },
    });

    // console.log(data);
    return (
      <div className="pt-8">
        <div className="flex justify-center items-center mb-2">
          <h2>{humanize(user.username)} </h2>
          <UserAvatar
            user={{ name: "" || null, image: user.image || null }}
            className="h-32 w-32 -mt-1 ml-2 inline-block"
          />
        </div>
      </div>
    );
  } catch {}
};

export default User;
