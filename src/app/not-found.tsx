import Link from "next/link";

//the global not found does not need the notFound function to work

//set-up done needs styling/copy
export default function NotFound() {
  return (
    <>
      <h1>Whatever you are looking for does not exist</h1>
      <Link href={"/"}>Go home</Link>
    </>
  );
}
