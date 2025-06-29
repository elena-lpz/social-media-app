"use client";
// import React, { ChangeEvent } from 'react';
// tutorial said to import this but it seems like it's not needed?
// https://medium.com/@lior_amsalem/how-to-define-typescript-onchange-event-in-react-a68e50ec36d8

import { toast } from "sonner";

export function BookStatusDropdown({
  currentStatus,
  onChange,
}: {
  currentStatus: string;
  onChange: (newStatus: string) => void;
}) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    //the new status is the selected value // we can see this working in the console yay
    const newStatus = e.target.value;
    onChange(newStatus);
    toast("Book status updated successfully");
  }

  return (
    <select
      name="status"
      defaultValue={currentStatus}
      className="bg-purple-accent border border-neutral-600 text-background font-medium rounded-lg px-3 py-1 text-sm"
      onChange={handleChange}
    >
      <option value="wanttoread">Want to Read</option>
      <option value="reading">Reading</option>
      <option value="finished">Finished</option>
    </select>
  );
}
