"use client";
import { addBook } from "@/lib/actions";
import { usePathname } from "next/navigation";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";

export default function AddBookForm({ userId }: { userId: string }) {
  //   https://nextjs.org/docs/app/api-reference/functions/use-pathname
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // https://www.radix-ui.com/primitives/docs/components/dialog

  async function handleSubmit(formData: FormData) {
    await addBook(userId, formData, pathname);
    setOpen(false); ///close dialog after submit
    toast("This book has been added to your list"); //show toast after submit
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="md:h-fit justify-between md:text-lg bg-white rounded-4xl text-background flex items-center gap-3 font-semibold px-5  py-2 hover:bg-neutral-700 hover:text-white hover:cursor-pointer w-fit self-end md:self-start">
          Add Book
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg border-0">
        <form action={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              <p className="text-2xl text-center  font-bold md:mb-4 text-green-accent lg:max-w-[40dvw] py-3">
                Add a new <span className="text-purple-accent">book </span>to
                your shelf
              </p>
            </DialogTitle>
          </DialogHeader>
          <label htmlFor="title" className="font-medium">
            Book title
          </label>
          <input
            name="title"
            placeholder="Book Title"
            required
            className="w-full bg-white rounded text-background mb-4 p-2 mt-2"
          />
          <label htmlFor="title" className="font-medium">
            Author
          </label>
          <input
            name="author"
            placeholder="Author"
            required
            className="w-full bg-white rounded text-background mb-4 p-2 mt-2"
          />
          <label htmlFor="title" className="font-medium">
            Book cover{" "}
            <span className="text-neutral-400 text-sm">
              (please only use dropbox links starting with:
              dl.dropboxusercontent.com)
            </span>
          </label>

          <input
            name="image"
            placeholder="Cover image URL"
            required
            className="w-full bg-white rounded text-background mb-4 p-2 mt-2"
          />
          {/* added a new book and was wondering why it was not appearing under my want to read books, turns out, ive had to read and want to read as options this whole time, no options for finished...  */}
          <label htmlFor="title" className="font-medium">
            Reading status
          </label>
          <select
            name="status"
            required
            className="w-full bg-white rounded text-background mb-4 p-2 mt-2"
          >
            <option value="">Select Status</option>
            <option value="finished">Finished</option>
            <option value="reading">Reading</option>
            <option value="wanttoread">Want to Read</option>
          </select>
          <label htmlFor="title" className="font-medium">
            Rating
          </label>
          <select
            name="rating"
            required
            className="w-full bg-white rounded text-background mb-4 p-2 mt-2"
          >
            <option value="">Select rating</option>
            <option value="N/A">Not read yet.</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>

          <DialogFooter>
            <button
              type="submit"
              className=" w-full justify-center md:text-lg bg-green-accent rounded-4xl text-background flex items-center gap-3 font-semibold px-5 py-2 hover:bg-neutral-700 hover:text-white mt-4"
            >
              Save
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
