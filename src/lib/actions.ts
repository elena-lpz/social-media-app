"use server";

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";

export async function CreateUserProfile({ id, formData }) {
  console.log("Saving user to the database...");

  const profileData = {
    username: formData.get("username"),
    bio: formData.get("bio"),
    location: formData.get("location"),
    avatar: formData.get("avatar"),
  };

  await db.query(
    `INSERT INTO profiles (id, username, bio, location, avatar) VALUES ($1, $2, $3, $4, $5)`,
    [
      id,
      profileData.username,
      profileData.bio,
      profileData.location,
      profileData.avatar,
    ]
  );
  revalidatePath(`/`);
}
