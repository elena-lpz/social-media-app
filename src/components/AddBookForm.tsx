"use client";
import { useState } from "react";
import { addBook } from "@/lib/actions";

export default function AddBookForm({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => setIsOpen(!isOpen);

  return (
    <>
      <button onClick={toggleForm}>Add Book</button>

      {isOpen && (
        <div>
          <form
            action={(formData) => {
              addBook(userId, formData);
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
              <option value="Not read">Not read yet.</option>
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
