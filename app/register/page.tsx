"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Registration failed");

      setMessage("✅ User created successfully! You can now log in.");
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage("❌ " + err.message);
      } else {
        setMessage("❌ An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your email below to register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 w-full mb-2"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 w-full mb-4"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" onClick={handleRegister} className="w-full">
            Register
          </Button>
          {message && <p className="text-red-500 mb-2">{message}</p>}
          <p className="text-center  mt-4">
            {" "}
            Already have an account?{" "}
            <a href="/login" className="hover:text-blue-500">
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
