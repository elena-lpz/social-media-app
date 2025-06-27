import { auth } from "@clerk/nextjs/server";
import AddBookForm from "@/components/AddBookForm";
import { SignIn } from "@clerk/nextjs";
import { getAllBooks } from "@/lib/actions";
import Image from "next/image";

export default async function HomePage() {
  const books = await getAllBooks();
  const { userId } = await auth();
  if (!userId) {
    // I kept getting this error when not logged in Error:
    // Clerk: The <SignIn/> component is not configured correctly.
    // I followed one of the suggestions given in the error and it seemed to fix it, so going with that: 'Alternatively, you can update the <SignIn/> component to use hash-based routing by setting the "routing" prop to "hash"'.
    return (
      <div>
        Please sign in first <SignIn routing="hash" />
      </div>
    );
  }

  return (
    <>
      <h1>This is the homepage</h1>
      {books.length === 0 ? (
        <p>No books have been added yet.</p>
      ) : (
        <div>
          {books.map((book) => (
            <div key={book.id}>
              <div className="flex gap-4">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={100}
                  height={150}
                />
                <div>
                  <h2 className="text-xl font-semibold">{book.title}</h2>
                  <p className="text-gray-600">by {book.author}</p>
                  <p>Status: {book.status}</p>
                  <p>Rating: {book.rating}</p>
                  <p className="text-sm text-gray-500">
                    Added on{" "}
                    {new Date(book.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddBookForm userId={userId} />
    </>
  );
}
