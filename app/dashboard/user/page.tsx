// app/dashboard/user/page.tsx
"use client";

import { signOut } from "next-auth/react";

export default function UserDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <p>You can view and edit your reservations here until the last day.</p>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
