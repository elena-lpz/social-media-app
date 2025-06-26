"use client";
import { CreateUserProfile } from "@/lib/actions";

export default function ProfileForm({ userId }) {
  const createProfileWithId = CreateUserProfile.bind(null, userId);

  return (
    <form action={createProfileWithId}>
      <fieldset>
        <legend>Create your profile</legend>
        <label htmlFor="username">Username:</label>
        <input
          name="username"
          type="text"
          placeholder="@username"
          required
        ></input>
        <label htmlFor="bio">About you:</label>
        <textarea
          rows={3}
          name="bio"
          placeholder="Tell us a bit about yourself"
          required
        />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          name="location"
          placeholder="Enter your location"
          required
        />
        <label htmlFor="avatar">Avatar URL:</label>
        <input
          type="text"
          name="avatar"
          placeholder="Enter a valid URL for your avatar"
          required
        />
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
}
