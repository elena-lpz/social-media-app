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
      <h1>Profile</h1>
      <Link
        href={`/profile/${user.id}/update`}
        className="underline text-amber-500 "
      >
        Edit Profile
      </Link>
      <Image
        src={user.avatar}
        alt="Profile picture"
        width={50}
        height={50}
        className="rounded-2xl"
      />
      <h2>@{user.username}</h2>
      <p>{user.location}</p>
      <p>{user.bio}</p>
      <AddBookForm userId={userId} />

      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="finished" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="finished">Finished</TabsTrigger>
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="toread">Want to read</TabsTrigger>
          </TabsList>
          <TabsContent value="finished">
            <FinishedBooks />
          </TabsContent>
          <TabsContent value="reading">
            <ReadingBooks />
          </TabsContent>
          <TabsContent value="toread">
            <WantToReadBooks />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
