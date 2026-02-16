"use client";

import { supabase } from "@/lib/supabaseClient";

export default function BookmarkList({ bookmarks, onDelete }: any) {
  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    onDelete();
  };

  return (
    <ul className="space-y-2">
      {bookmarks.map((b: any) => (
        <li key={b.id} className="border p-3 flex justify-between bg-white">
          {" "}
          <a href={b.url} target="_blank" className="text-blue-600">
            {b.title}{" "}
          </a>
          <button onClick={() => deleteBookmark(b.id)} className="text-red-500">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
