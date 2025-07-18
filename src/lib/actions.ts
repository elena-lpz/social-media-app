"use server";

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  redirect("/profile");
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
export async function addBook(
  userId: string,
  formData: FormData,
  pathname: string
) {
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
  //want the path to change depending on where the bookform is submitted
  // function accepts a path
  revalidatePath(pathname);
}

// Delete books
// The books on the profile page are not a separate page but different components, so I'm not sure I can use what Manny showed us this week... I am using the same method to delete I used last week instead.

// https://dev.to/bhanufyi/understanding-on-delete-cascade-and-on-update-cascade-in-sql-foreign-key-relationships-70o
// https://www.reddit.com/r/nextjs/comments/1c0ybvj/server_actions_deleting_from_db_any_wizards_out/

export async function deleteBook(bookId: number, pathname: string) {
  await db.query(`DELETE FROM books WHERE id = $1`, [bookId]);
  revalidatePath(pathname);
}

//get all books in db

// export async function getAllBooks() {
//   const result = await db.query(`SELECT * FROM books ORDER BY created_at DESC`);
//   return result.rows;
// }

//changing this so I can get the user data too for the timeline
//we want all rows from books and username and avatar from user_profiles with the same id
export async function getAllBooks() {
  const result = await db.query(`
    SELECT 
      books.*, 
      user_profiles.username, 
      user_profiles.avatar
    FROM books
    JOIN user_profiles ON books.user_id = user_profiles.id
    ORDER BY books.created_at DESC
  `);

  return result.rows;
}

//update status query

export async function updateBookStatus(bookId: number, newStatus: string) {
  await db.query(
    `
    UPDATE books
    SET status = $1
    WHERE id = $2
  `,
    [newStatus, bookId]
  );
}
