import { auth } from "@clerk/nextjs/server";
import ProfileForm from "@/components/ProfileForm";
import { SignIn } from "@clerk/nextjs";

export default async function CreateProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div>
        Please sign in first <SignIn />
      </div>
    );
  }

  return (
    <>
      <h1> Welcome, please complete the form below</h1>
      <ProfileForm userId={userId} />
    </>
  );
}
