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
import logo from "@/../public/images/logo/logo.svg";
import Link from "next/link";

export default async function Header() {
  const { userId } = await auth();
  return (
    <header className="mx-5 md:mx-16 my-8 flex flex-col gap-4 md:flex-row justify-between">
      <Link href={`/`}>
        <Image src={logo} alt="Booksy logo" width={42} height={42}></Image>
      </Link>

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
