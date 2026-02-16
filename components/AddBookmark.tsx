"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddBookmark({ onAdd }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user?.id,
      },
    ]);

    setTitle("");
    setUrl("");
    onAdd();
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />{" "}
      <button onClick={addBookmark} className="bg-blue-500 text-white px-4">
        Add{" "}
      </button>{" "}
    </div>
  );
}
