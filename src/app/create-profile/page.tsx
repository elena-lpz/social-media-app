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
      <section className="mx-5 md:mx-16 flex justify-center ">
        <h1 className="text-3xl text-center md:text-6xl font-bold md:mb-4 text-green-accent lg:max-w-[40dvw] py-6 md:py-8">
          Welcome, please complete the form below.
        </h1>
      </section>

      <ProfileForm userId={userId} />
    </>
  );
}
