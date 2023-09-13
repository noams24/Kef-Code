import { redirect } from "next/navigation";

// import { UserNameForm } from '@/components/UserNameForm'
import { authOptions, getAuthSession } from "@/lib/auth";
import AccountForm from "./AccountForm";

export const metadata = {
  title: "הגדרות",
  description: "נהל את הגדרות החשבון והאתר.",
};

export default async function SettingsPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return <AccountForm user={{
    id: session.user.id,
    username: session.user.username || '',
  }}/>;
}
