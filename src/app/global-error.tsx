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
      <h1>Oh no! Something went wrong</h1>
      <Link href={"/"}>Go home</Link>
      <button onClick={() => reset()}>Try again </button>
    </>
  );
}
