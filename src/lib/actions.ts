"use server";

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";

//create profile
export async function CreateUserProfile(id: string, formData: FormData) {
  console.log("Saving user to the database...");

  const profileData = {
    username: formData.get("username"),
    bio: formData.get("bio"),
    location: formData.get("location"),
    avatar: formData.get("avatar"),
  };

  await db.query(
    `INSERT INTO user_profiles (id, username, bio, location, avatar) VALUES ($1, $2, $3, $4, $5)`,
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

// sort books by status / pass id and the status
export async function getBooksByStatus(userId: string, status: string) {
  const booksQuery = await db.query(
    `SELECT * FROM books WHERE user_id = $1 AND status = $2 ORDER BY created_at DESC`,
    [userId, status]
  );
  return booksQuery.rows;
}

// add book action
export async function addBook(userId: string, formData: FormData) {
  const title = formData.get("title");
  const author = formData.get("author");
  const image = formData.get("image");
  const status = formData.get("status");
  const rating = formData.get("rating");
  console.log("Saving book to the database...");

  await db.query(
    `INSERT INTO books (title, author, image, status, rating, user_id) VALUES ($1, $2, $3, $4, $5, $6)`,
    [title, author, image, status, rating, userId]
  );
  console.log("Book saved!");
  //to revalidate? but what path....
}
