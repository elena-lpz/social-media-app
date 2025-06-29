import Link from "next/link";

//the global not found does not need the notFound function to work

//set-up done needs styling/copy
export default function NotFound() {
  return (
    <section className="mx-5 md:mx-16 flex flex-col items-center justify-center ">
      <h1 className="text-3xl text-center md:text-6xl font-bold md:mb-4 text-green-accent lg:max-w-[40dvw] py-6 md:py-8">
        Whatever you are looking for does not exist.
      </h1>
      <Link
        href={"/"}
        className="md:w-fit justify-between md:text-lg bg-white rounded-4xl text-background flex items-center gap-3 font-semibold px-5 py-2 hover:bg-neutral-700 hover:text-white"
      >
        Go home
      </Link>
    </section>
  );
}
