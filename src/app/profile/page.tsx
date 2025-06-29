//TODO: include the user's personal details
// auth() --> {userId}
// currentUser() --> firstName, lastName, emailAddresses[0].emailAddress
import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import ReadingBooks from "@/components/ReadingBooks";
import WantToReadBooks from "@/components/WantToReadBooks";
import FinishedBooks from "@/components/FinishedBooks";
import AddBookForm from "@/components/AddBookForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { SquarePenIcon } from "lucide-react";

export default async function UserProfilePage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div>
        Please sign in first <SignIn />
      </div>
    );
  }
  async function getUser() {
    const user = await db.query(`SELECT * FROM user_profiles WHERE id = $1`, [
      userId,
    ]);
    return user.rows[0];
  }
  const user = await getUser();

  return (
    <>
      <section className="mx-5 md:mx-6 lg:mx-16 text-left mt-4">
        <div className="flex  justify-between items-center mb-10 ">
          <h1 className="text-4xl md:text-6xl font-bold text-green-accent ">
            Your <span className="text-purple-accent">profile</span>
          </h1>
          <AddBookForm userId={userId} />
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-4 justify-between  bg-card-bg rounded-2xl p-8  ">
          <div className="flex flex-col md:flex-row text-center gap-8 items-center">
            <Image
              src={user.avatar}
              alt="Profile picture"
              width={150}
              height={150}
              className="rounded-full border-6 border-white"
            />
            <div className="flex flex-col items-center md:items-start gap-4">
              <h2 className="text-xl text-purple-accent font-semibold">
                <span className="text-white">@ </span>
                {user.username}
              </h2>
              <p className="text-lg font-medium flex gap-3  items-center">
                {user.location}
              </p>
              <p>{user.bio}</p>
            </div>
          </div>

          <Link
            href={`/profile/${user.id}/update`}
            className="md:h-fit justify-between md:text-lg bg-green-accent rounded-4xl text-background flex items-center gap-3 font-semibold px-5  py-2 hover:bg-neutral-700 hover:text-white w-fit self-end md:self-start"
          >
            <SquarePenIcon size={18} />
          </Link>
        </div>

        <div className="flex flex-col gap-6 mt-6">
          <Tabs defaultValue="finished">
            <TabsList>
              <TabsTrigger value="finished">FINISHED</TabsTrigger>
              <TabsTrigger value="reading">READING</TabsTrigger>
              <TabsTrigger value="wanttoread">WANT TO READ</TabsTrigger>
            </TabsList>
            <TabsContent value="finished">
              <FinishedBooks />
            </TabsContent>
            <TabsContent value="reading">
              <ReadingBooks />
            </TabsContent>
            <TabsContent value="wanttoread">
              <WantToReadBooks />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
