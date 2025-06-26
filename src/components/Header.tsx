import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default async function Header() {
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-2xl">Lomogram</h1>
        <nav className="flex gap-4 items-center">
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href={"/"}>Home</Link>
            <Link href={"/profile"}>Profile</Link>
            <UserButton />
          </SignedIn>
        </nav>
      </header>
    </>
  );
}
