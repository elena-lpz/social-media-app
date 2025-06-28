import { auth } from "@clerk/nextjs/server";
// import AddBookForm from "@/components/AddBookForm";
// import { SignIn } from "@clerk/nextjs";
// import Image from "next/image";
import LandingPage from "@/components/LandingPage";
import Timeline from "@/components/Timeline";

export default async function HomePage() {
  const { userId } = await auth();
  if (!userId) {
    //So the error I fixed was gone but my homepage was behaving in mysterious ways... Decided to discard all that anyway as I want to display something diferent on the page depending on whether or not the user is logged in, not just the clerk modal thingy. So I created components that I will render conditionally

    return <LandingPage />;
  }
  return <Timeline userId={userId} />;
}
