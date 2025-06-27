import { auth } from "@clerk/nextjs/server";
import AddBookForm from "@/components/AddBookForm";
import { SignIn } from "@clerk/nextjs";

export default async function HomePage() {
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
      <h1>This is the homepage</h1>
      <AddBookForm userId={userId} />
    </>
  );
}
