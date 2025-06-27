//TODO: include the user's personal details
// auth() --> {userId}
// currentUser() --> firstName, lastName, emailAddresses[0].emailAddress
import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

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
      <Image src={user.avatar} alt="Profile picture" width={100} height={100} />
      <h2>@{user.username}</h2>
      <p>{user.location}</p>
      <p>{user.bio}</p>

      {/* render user's posts */}
    </>
  );
}
