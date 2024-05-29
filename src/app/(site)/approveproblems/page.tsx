import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ApproveProblem } from "./ApproveProblem";
import { redirect } from "next/navigation";

const approveproblem = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") {
    // throw new Error("Unauthorized");
    redirect("/");
  }

  const problems: any = await db.problemsneedverify.findMany({
    include: {
      user: true,
    },
  });
  return <>{problems && <ApproveProblem data={problems} />}</>;
};

export default approveproblem;
