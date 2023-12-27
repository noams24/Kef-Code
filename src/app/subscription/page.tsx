import Subscription from "./Subscription";
import { getAuthSession } from "@/lib/auth";


export const metadata = {
  title: "פרימיום",
  description: "פרימיום",
};

const Page = async () => {
  const session = await getAuthSession();
  return (
    <Subscription session={session}/>
  );
};

export default Page;
