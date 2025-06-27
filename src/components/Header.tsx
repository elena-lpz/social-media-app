import { auth } from "@clerk/nextjs/server";
import LoggedInNav from "./LoggedInNav";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default async function Header() {
  const { userId } = await auth();
  return (
    <header className="flex justify-between">
      <h1 className="text-2xl">Booksy</h1>
      <nav className="flex">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>

        {userId ? <LoggedInNav /> : null}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
