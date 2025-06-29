import { auth } from "@clerk/nextjs/server";
import { getBooksByStatus } from "@/lib/actions";
import Image from "next/image";
import { deleteBook } from "@/lib/actions";
import { StarIcon } from "lucide-react";
import { UpdateBookStatusForm } from "./UpdateBookStatusForm";
import { Trash2Icon } from "lucide-react";

export default async function ReadingBooks() {
  const { userId } = await auth();

  if (!userId) {
    return <p>Sign in to see your books.</p>;
  }

  const books = await getBooksByStatus(userId, "reading");

  return (
    <section>
      {books.length === 0 ? (
        <p>You have no books in this category.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {books.map((book) => (
            <div key={book.id}>
              <div className="flex flex-col-reverse md:flex-row gap-4 bg-card-bg rounded-2xl p-8 ">
                <div className="flex flex-col md:flex-row items-center gap-3 text-sm text-neutral-300 mb-6 mt-6 w-full">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={165}
                    height={250}
                  />

                  <div className="md:ps-4 pt-2 sm:pt-0 flex flex-col  items-center md:items-start ">
                    <p className=" flex font-semibold gap-3">
                      {book.rating}
                      <StarIcon fill="#E9CF81" strokeWidth={0} />
                    </p>{" "}
                    <h2 className="text-xl text-center md:text-2xl font-semibold pb-1">
                      {book.title}
                    </h2>
                    <p className="text-white pb-3 text-sm md:text-base ">
                      <span className="text-neutral-400">by </span>
                      {book.author}
                    </p>
                    <p className="text-xs md:text-sm text-neutral-300">
                      Added on{" "}
                      {new Date(book.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex h-fit justify-between gap-6 text-sm md:text-lg font-light">
                  <UpdateBookStatusForm
                    bookId={book.id}
                    currentStatus={book.status}
                  />
                  <form action={deleteBook.bind(null, book.id, "/profile")}>
                    <button
                      type="submit"
                      className="md:w-fit justify-between md:text-lg bg-green-accent rounded-4xl text-background flex items-center gap-3 font-semibold px-5 py-2 hover:bg-neutral-700 hover:text-white"
                    >
                      <Trash2Icon size={18} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
