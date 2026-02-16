"use client";

import { signOut } from "@/lib/auth";

export default function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold">Smart Bookmarks</h1>
      <button onClick={signOut} className="text-red-500">
        Logout
      </button>
    </div>
  );
}
