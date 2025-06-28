import Link from "next/link";

export default function LoggedInNav() {
  return (
    <>
      <div className="flex gap-6 justify-evenly items-center">
        <Link className="md:text-lg font-medium" href={"/"}>
          Timeline
        </Link>
        <Link className="md:text-lg font-medium" href={"/profile"}>
          My profile
        </Link>
      </div>
    </>
  );
}
