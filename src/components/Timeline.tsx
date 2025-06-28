import Image from "next/image";
import AddBookForm from "@/components/AddBookForm";
import { getAllBooks } from "@/lib/actions";

export default async function Timeline({ userId }: { userId: string }) {
  const books = await getAllBooks();
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Your Book Timeline</h1>
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
                  <p>by {book.author}</p>
                  <p>Status: {book.status}</p>
                  <p>Rating: {book.rating}</p>
                  <p>
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
