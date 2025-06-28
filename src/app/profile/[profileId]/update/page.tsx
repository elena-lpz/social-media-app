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
//trying to fix vercel deployment error round 4
// https://stackoverflow.com/questions/64722812/what-typescript-type-should-nextjs-app-tsx-component-and-pageprops-be

interface PageProps {
  params: {
    profileId: string;
  };
}

export default async function UpdateProfilePage({ params }: PageProps) {
  const { profileId } = params;

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
    <section>
      <h1 className="text-xl font-semibold mb-4">Update Your Profile</h1>
      <Link href="/profile">Go back to profile</Link>
      <form action={handleUpdate} className="flex flex-col gap-3 max-w-md">
        <label>
          Username:
          <input
            type="text"
            name="username"
            required
            defaultValue={user.username}
            className="bg-white text-black border rounded p-2 w-full"
          />
        </label>
        <label>
          Bio:
          <textarea
            name="bio"
            rows={3}
            required
            defaultValue={user.bio}
            className="bg-white text-black border rounded p-2 w-full"
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="text"
            name="avatar"
            required
            defaultValue={user.avatar}
            className="bg-white text-black border rounded p-2 w-full"
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            required
            defaultValue={user.location}
            className="bg-white text-black border rounded p-2 w-full"
          />
        </label>
        <button type="submit" className="p-2 bg-neutral-400 rounded mt-2">
          Save Changes
        </button>
      </form>
    </section>
  );
}
