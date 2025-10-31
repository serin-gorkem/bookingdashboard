// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route"; // adjust path if needed

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  console.log(session.user.role);
  

  // Route user by role
  if (session.user.role === "admin") {
    redirect("/dashboard/admin");
  } else {
    redirect("/dashboard/user");
  }
}
