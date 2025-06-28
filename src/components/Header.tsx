import { auth } from "@clerk/nextjs/server";
import LoggedInNav from "./LoggedInNav";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import booksylogo from "@/../public/images/logo/booksylogo.png";

export default async function Header() {
  const { userId } = await auth();
  return (
    <header className="p-4 flex flex-col gap-4 md:flex-row justify-between">
      <Image src={booksylogo} alt="Booksy logo" width={148} height={34}></Image>
      <nav className="flex justify-between gap-4">
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
