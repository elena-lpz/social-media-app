import { auth } from "@clerk/nextjs/server";
import { getBooksByStatus } from "@/lib/actions";
import Image from "next/image";
import { deleteBook } from "@/lib/actions";

export default async function ReadingBooks() {
  const { userId } = await auth();

  if (!userId) {
    return <p>Sign in to see your books.</p>;
  }

  const books = await getBooksByStatus(userId, "reading");

  return (
    <section>
      <h2>Reading books</h2>
      {books.length === 0 ? (
        <p>You have no books in this category.</p>
      ) : (
        <div>
          {books.map((book) => (
            <div key={book.id}>
              <Image
                src={book.image}
                alt={book.title}
                width={100}
                height={200}
              />
              <p>Rating:{book.rating}</p>
              <h3>{book.title}</h3>
              <p>by {book.author}</p>

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
