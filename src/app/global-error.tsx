"use client";

import Link from "next/link";
import { useEffect } from "react";
//https://nextjs.org/docs/app/getting-started/error-handling

//setup done needs copy/styling
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <>
      <section className="mx-5 md:mx-16 flex flex-col items-center justify-center">
        <h1>Oh no! Something went wrong</h1>
        <Link
          href={"/"}
          className="md:w-fit justify-between md:text-lg bg-white rounded-4xl text-background flex items-center gap-3 font-semibold ps-5 pe-3 py-2 hover:bg-neutral-700 hover:text-white"
        >
          Go home
        </Link>
        <button onClick={() => reset()}>Try again </button>
      </section>
    </>
  );
}
