import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import homepageimg from "@/../public/images/photos/homepageimg.png";
import Image from "next/image";

export default function LandingPage() {
  return (
    <section className="mx-5 md:mx-6 lg:mx-16 text-left">
      <div className="flex flex-col lg:flex-row justify-center items-center h-[auto] mt-4 md:h-[80dvh] gap-8 lg:gap-40">
        <div>
          <div className="w-[90dvw] lg:w-[auto] flex flex-col gap-8 mb-4">
            <h2>WELCOME TO BOOKSY</h2>
            <h1 className="text-6xl font-bold mb-4 text-green-accent lg:max-w-[25dvw]">
              Read it. Log it.{" "}
              <span className="text-purple-accent">Love it.</span>
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg mb-6 lg:max-w-[25dvw]">
              Track your reads, share your shelf, and explore what everyone else
              is loving.
            </p>

            <Link
              href={`/sign-up`}
              className="md:w-fit justify-between md:text-lg bg-white rounded-4xl text-background flex items-center gap-3 font-semibold ps-5 pe-3 py-2 hover:bg-neutral-700 hover:text-white"
            >
              Join today
              <span className="bg-purple-accent rounded-4xl p-2">
                <MoveRightIcon />
              </span>
            </Link>
          </div>
        </div>
        <div>
          <div className="rounded-4xl p-6 flex gap-2 flex-col items-start justify-end bg-purple-accent w-[93dvw] lg:w-[auto] h-[20dvh] lg:h-[40dvh]">
            <p className="text-sm md:text-lg font-medium">Join more than</p>
            <h3 className="text-xl lg:text-3xl font-semibold text-neutral-950 md:max-w-[20dvw]">
              20,000 users worldwide
            </h3>
          </div>

          <Image
            src={homepageimg}
            alt="Woman reading outside"
            height={400}
            className="hidden lg:block relative mt-[-6rem] lg:right-[-15rem] lg:mt-[-30rem] w-full max-w-[10dvw] z-0 "
          />
        </div>
      </div>
    </section>
  );
}
