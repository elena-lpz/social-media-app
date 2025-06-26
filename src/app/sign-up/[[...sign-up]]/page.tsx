import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import ProfileForm from "@/components/ProfileForm";

export default async function SignUpPage() {
  const { userId } = await auth();

  console.log(userId);

  if (!userId) {
    <SignUp />;
  }
  return (
    <>
      <h1> Welcome, please complete the form below</h1>
      <ProfileForm userId={userId} />
    </>
  );
}
