import Link from "next/link";

export default function LoggedInNav() {
  return (
    <>
      <div className="flex gap-4">
        <Link href={"/"}>Timeline</Link>
        <Link href={"/profile"}>My profile</Link>
      </div>
    </>
  );
}
