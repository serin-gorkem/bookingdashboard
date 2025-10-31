// app/dashboard/admin/page.tsx
"use client";

import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>You can manage all reservations here.</p>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
