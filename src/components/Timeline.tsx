import Image from "next/image";
import AddBookForm from "@/components/AddBookForm";
import { getAllBooks } from "@/lib/actions";
import { StarIcon } from "lucide-react";
import ad from "@/../public/images/other/ad.svg";

export default async function Timeline({ userId }: { userId: string }) {
  const books = await getAllBooks();

  return (
    <section className="mx-5  md:mx-16 text-left mt-4">
      <div className="flex justify-between items-center gap-3">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-green-accent ">
          Your Book <span className="text-purple-accent">Timeline</span>
        </h1>
        <AddBookForm userId={userId} />
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full mb-4">
        <div className="w-full">
          <h4 className="text-lg pb-4 mt-6">UPDATES</h4>
          {books.length === 0 ? (
            <p>No books have been added yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {books.map((book) => {
                // https://reactpatterns.js.org/docs/switch-case-operator/
                // we want the book status to display a certain way based on the status
                // for status 'reading' we want "is reading" etc
                let statusText = "";
                switch (book.status) {
                  case "reading":
                    statusText = "is reading";
                    break;
                  case "finished":
                    statusText = "has finished";
                    break;
                  case "wanttoread":
                    statusText = "wants to read";
                    break;
                  default:
                    statusText = "added this book";
                }

                return (
                  <div key={book.id}>
                    <div className="flex flex-col gap-4 bg-card-bg rounded-2xl p-8  ">
                      <div className="flex items-center gap-3 text-sm text-neutral-300  mb-6">
                        <Image
                          // not sure this default image will work... need to test later
                          src={
                            book.avatar || "./images/other/defaultavatar.svg"
                          }
                          alt={book.username}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="flex w-full justify-between items-center text-sm md:text-lg font-light">
                          <p>
                            <span className="text-green-accent font-medium">
                              {book.username}
                            </span>{" "}
                            {statusText}
                          </p>
                          <p className="self-end items-center flex font-semibold gap-3">
                            {book.rating}
                            <StarIcon fill="#E9CF81" strokeWidth={0} />
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center md:flex-row gap-4 md:items-start">
                        <Image
                          src={book.image}
                          alt={book.title}
                          width={165}
                          height={250}
                        />
                        <div className="sm:ps-4 text-center md:text-left pt-2 sm:pt-0">
                          <h2 className="text-xl md:text-2xl  font-semibold pb-1">
                            {book.title}
                          </h2>
                          <p className="text-white pb-3 text-sm md:text-base">
                            <span className="text-neutral-400">by </span>
                            {book.author}
                          </p>
                          {/* <p>Status: {book.status}</p> */}

                          <p className="text-xs md:text-sm text-neutral-300">
                            Added on{" "}
                            {new Date(book.created_at).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-lg pb-4 mt-6 ">NEWS</h4>
          <Image
            src={ad}
            alt="advert that reads have you set up your reading chanllenge yet?"
            height={382}
            width={271}
          />
        </div>
      </div>

      {/* <ReadingBooks />
      <WantToReadBooks /> */}
    </section>
  );
}
