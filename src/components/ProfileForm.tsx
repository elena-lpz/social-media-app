"use client";
import { CreateUserProfile } from "@/lib/actions";

export default function ProfileForm({ userId }: { userId: string }) {
  const createProfileWithId = CreateUserProfile.bind(null, userId);

  //got help from David here...

  // https://stackoverflow.com/questions/70487236/redirect-to-another-page-based-on-form-input-in-next-js
  // we want the user to be redirected after submitting the form....

  return (
    <section className="flex flex-col items-center justify-center">
      <form
        action={createProfileWithId}
        className="flex flex-col gap-3 w-[90dvw] lg:w-[30dvw]"
      >
        <fieldset>
          <label htmlFor="username" className="font-medium">
            Username:
          </label>
          <input
            name="username"
            type="text"
            placeholder="@username"
            className="w-full bg-white rounded text-background mb-4 p-2 mt-2"
            required
          />
          <label htmlFor="bio" className="font-medium">
            About you:
          </label>
          <textarea
            rows={3}
            name="bio"
            placeholder="Tell us a bit about yourself"
            className="w-full bg-white rounded text-background mb-4 p-2 mt-2"
            required
          />
          <label htmlFor="location" className="font-medium">
            Location:
          </label>
          <input
            type="text"
            name="location"
            placeholder="Enter your location"
            className="w-full bg-white rounded text-background mb-4 p-2 mt-2"
            required
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
            placeholder="Enter a valid URL for your avatar"
            className="w-full bg-white rounded text-background mb-4 p-2 mt-2"
          />
        </fieldset>
        <button
          type="submit"
          className=" justify-center md:text-lg bg-green-accent rounded-4xl text-background flex items-center gap-3 font-semibold px-5 py-2 hover:bg-neutral-700 hover:text-white mt-4"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
