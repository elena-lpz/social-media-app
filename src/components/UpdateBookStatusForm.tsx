import { updateBookStatus } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import { BookStatusDropdown } from "./BookStatusDropdown";

// www.w3schools.com/jsref/event_onchange.asp

// books dropdown displays the current status, when it changes via the dropdown call updateStatus (we update the status)
export function UpdateBookStatusForm({
  bookId,
  currentStatus,
}: {
  bookId: number;
  currentStatus: string;
}) {
  async function updateStatus(newStatus: string) {
    "use server";
    await updateBookStatus(bookId, newStatus);
    revalidatePath("/profile");
  }

  return (
    <BookStatusDropdown currentStatus={currentStatus} onChange={updateStatus} />
  );
}
