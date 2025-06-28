"use client";
import { useState } from "react";
import { addBook } from "@/lib/actions";
import { usePathname } from "next/navigation";

export default function AddBookForm({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => setIsOpen(!isOpen);

  //   https://nextjs.org/docs/app/api-reference/functions/use-pathname
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={toggleForm}
        className="md:w-fit justify-between md:text-lg bg-white rounded-4xl text-background flex items-center gap-3 font-semibold px-5 py-2 hover:bg-neutral-700 hover:text-white"
      >
        Add Book
      </button>

      {isOpen && (
        <div>
          <form
            action={(formData) => {
              addBook(userId, formData, pathname);
              setIsOpen(false);
            }}
          >
            <h2>Add a Book</h2>

            <input
              name="title"
              placeholder="Book Title"
              required
              className="w-full mb-2 p-2 border"
            />
            <input
              name="author"
              placeholder="Author"
              required
              className="w-full mb-2 p-2 border"
            />
            <input
              name="image"
              placeholder="Cover image URL"
              required
              className="w-full mb-2 p-2 border"
            />
            <select name="status" required className="w-full mb-2 p-2 border">
              <option value="">Select Status</option>
              <option value="toread">To Read</option>
              <option value="reading">Reading</option>
              <option value="wanttoread">Want to Read</option>
            </select>

            <select name="rating" required className="w-full mb-2 p-2 border">
              <option value="">Select rating</option>
              <option value="N/A">Not read yet.</option>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>

            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </>
  );
}
