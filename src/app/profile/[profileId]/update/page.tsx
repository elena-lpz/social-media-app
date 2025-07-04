// TODO imprement an update action

// update user profile
// server function to trigger the update
// form as UI
// (UX improvement) - prefill the form
//select the current user and add these values to the form inputs
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ParamsProfileId } from "@/types/datatypes";
//trying to fix vercel deployment error round 765785875 help

import { MoveLeftIcon } from "lucide-react";

export default async function UpdateProfilePage({ params }: ParamsProfileId) {
  const { profileId } = await params;

  // select the current user profile
  const result = await db.query(`SELECT * FROM user_profiles WHERE id = $1`, [
    profileId,
  ]);
  const user = result.rows[0];

  if (!user) return <p>User not found.</p>;

  // handle profile update
  async function handleUpdate(formData: FormData) {
    "use server";
    const formValues = {
      username: formData.get("username"),
      bio: formData.get("bio"),
      avatar: formData.get("avatar"),
      location: formData.get("location"),
    };

    //update profile
    await db.query(
      `UPDATE user_profiles 
       SET username = $1, bio = $2, avatar = $3, location = $4
       WHERE id = $5`,
      [
        formValues.username,
        formValues.bio,
        formValues.avatar,
        formValues.location,
        profileId,
      ]
    );
    //revalidate and take them back to profile
    revalidatePath(`/profile`);
    redirect(`/profile`);
  }
  //default value = prefilled inputs
  return (
    <section className="flex flex-col items-center justify-center">
      <Link
        className="flex  gap-3 hover:underline items-center self-start mx-4 md:mx-16 text-green-accent font-semibold text-lg md:text-xl"
        href="/profile"
      >
        <MoveLeftIcon /> Go back to profile
      </Link>

      <h1 className="text-3xl text-center md:text-6xl font-bold md:mb-4 text-green-accent lg:max-w-[40dvw] py-6 md:py-8">
        Update Your <span className="text-purple-accent">Profile</span>
      </h1>

      <form
        action={handleUpdate}
        className="flex flex-col gap-3 w-[90dvw] lg:w-[30dvw]"
      >
        <label htmlFor="username" className="font-medium">
          Username:{" "}
        </label>
        <input
          type="text"
          name="username"
          required
          defaultValue={user.username}
          className="bg-white text-black border rounded p-2 w-full"
        />
        <label htmlFor="bio" className="font-medium">
          Bio:{" "}
        </label>
        <textarea
          name="bio"
          rows={3}
          required
          defaultValue={user.bio}
          className="bg-white text-black border rounded p-2 w-full"
        />
        <label htmlFor="avatar" className="font-medium">
          Avatar URL{" "}
          <span className="text-neutral-400 text-sm">
            (please only use dropbox links starting with:
            dl.dropboxusercontent.com. Link in README)
          </span>
        </label>
        <input
          type="text"
          name="avatar"
          required
          defaultValue={user.avatar}
          className="bg-white text-black border rounded p-2 w-full"
        />
        <label htmlFor="location" className="font-medium">
          Location:
        </label>

        <input
          type="text"
          name="location"
          required
          defaultValue={user.location}
          className="bg-white text-black border rounded p-2 w-full"
        />
        <button
          type="submit"
          className=" justify-center md:text-lg bg-green-accent rounded-4xl text-background flex items-center gap-3 font-semibold px-5 py-2 hover:bg-neutral-700 hover:text-white mt-4"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
}
