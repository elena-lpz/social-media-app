import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="md:mt-12 mx-5 md:mx-6 flex flex-col md:flex-row justify-center lg:gap-40 items-center">
      <div className="flex flex-col gap-3 md:gap-6">
        <h1 className="text-4xl md:text-6xl font-bold md:mb-4 text-green-accent lg:max-w-[25dvw]">
          Join the
          <span className="text-purple-accent"> Booksy</span> club
        </h1>
        <p className="text-sm md:text-lg mb-6 lg:max-w-[20dvw]">
          Set up your profile, build your bookshelf, and start logging your
          reads.
        </p>
      </div>
      <div className="p-8 bg-purple-accent rounded-2xl">
        <SignUp />
      </div>
    </section>
  );
}
