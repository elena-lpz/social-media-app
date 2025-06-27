import { auth } from "@clerk/nextjs/server";
import { getBooksByStatus } from "@/lib/actions";
import Image from "next/image";
import { deleteBook } from "@/lib/actions";

export default async function WantToReadBooks() {
  const { userId } = await auth();

  if (!userId) {
    return <p>Sign in to see your books.</p>;
  }
  const books = await getBooksByStatus(userId, "toread");

  //cannot make my toast work with delete being a server action... will look into it later

  return (
    <section>
      <h2>Want to read books</h2>
      {books.length === 0 ? (
        <p>You have no books in this category.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex gap-4 items-center border border-neutral-700 p-4 hover:bg-neutral-900 transition-transform duration-600"
            >
              <Image
                src={book.image}
                alt={book.title}
                width={100}
                height={200}
              />
              <p>{book.rating}</p>
              <div>
                <h3 className="text-lg md:text-2xl font-semibold mt-2">
                  {book.title}
                </h3>
                <p>by {book.author}</p>
              </div>

              <form action={deleteBook.bind(null, book.id, "/profile")}>
                <button type="submit">Delete</button>
              </form>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
