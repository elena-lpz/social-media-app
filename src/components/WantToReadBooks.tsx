import { auth } from "@clerk/nextjs/server";
import { getBooksByStatus } from "@/lib/actions";
import Image from "next/image";

export default async function WantToReadBooks() {
  const { userId } = await auth();

  if (!userId) {
    return <p>Sign in to see your books.</p>;
  }

  const books = await getBooksByStatus(userId, "toread");

  return (
    <section>
      <h2>Want to read books</h2>
      {books.length === 0 ? (
        <p>You have no books in this category.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <Image
                src={book.image}
                alt={book.title}
                width={100}
                height={200}
              />
              <p>Rating:{book.rating}</p>
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
