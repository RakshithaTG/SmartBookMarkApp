"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AddBookmark from "@/components/AddBookmark";
import BookmarkList from "@/components/BookmarkList";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        fetchBookmarks,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="dashboard-bg min-vh-100">
      <Navbar />

      <div className="container py-5">
        <div className="text-center text-white mb-5">
          <h2 className="fw-bold">📚 Your Bookmarks</h2>
          <p className="text-light opacity-75 mb-0">
            Manage and access your saved links in real-time
          </p>
        </div>

        <div className="glass-card p-4 p-md-5 mx-auto">
          <div className="mb-4">
            <AddBookmark onAdd={fetchBookmarks} />
          </div>

          <hr className="border-light opacity-25" />

          <BookmarkList bookmarks={bookmarks} onDelete={fetchBookmarks} />
        </div>
      </div>
    </div>
  );
}
