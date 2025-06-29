"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
//active links
//https://www.youtube.com/watch?v=FfO7syq_t6E

export default function LoggedInNav() {
  const currentRoute = usePathname();
  return (
    <>
      <div className="flex gap-6 justify-evenly items-center">
        <Link
          href={"/"}
          className={`${
            currentRoute === "/"
              ? "text-green-accent text-lg font-medium "
              : "text-white text-lg font-medium hover:underline"
          }`}
        >
          Timeline
        </Link>
        <Link
          href={"/profile"}
          className={`${
            currentRoute === "/profile"
              ? "text-green-accent text-lg font-medium"
              : "text-white text-lg font-medium hover:underline"
          }`}
        >
          My profile
        </Link>
      </div>
    </>
  );
}
