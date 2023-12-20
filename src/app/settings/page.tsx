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
    return (
      <div>
        <h3 className="flex justify-center pt-10">עליך להתחבר לאתר כדי לראות דף זה</h3>
      </div>
    );
    // redirect("/sign-in");
  }

  return (
    <AccountForm
      user={{
        id: session.user.id,
        username: session.user.username || "",
      }}
    />
  );
}
