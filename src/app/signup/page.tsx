"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      console.log("🔍 Attempting signup for:", email);

      // ✅ Step 1: Sign up user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        console.error("❌ Signup Error:", error.message);
        setError(error.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError("Signup failed. Please try again.");
        setLoading(false);
        return;
      }

      console.log("✅ Signup Successful:", data);

      // ✅ Step 2: Insert user into `users` table (if not already inserted)
      const { error: dbError } = await supabase
        .from("users")
        .insert([{ id: data.user.id, email, password, role: "spotlight" }]);

      if (dbError) {
        console.error("❌ Database Insert Error:", dbError.message);
        setError("Could not save user data.");
        setLoading(false);
        return;
      }

      console.log("✅ User saved to database");

      // ✅ Step 3: Inform user to check email instead of redirecting
      setSuccessMessage("Signup successful! Please check your email to verify your account.");

    } catch (err) {
      console.error("❌ Unexpected Error:", err);
      setError("An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* ✅ Original Content */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Signup Form Page</h1>
        <p className="text-gray-400">Welcome to the Sign-up form section.</p>
      </div>

      {/* ✅ Signup Form */}
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-white">
            Unlimited movies, TV shows, and more
          </h2>
          <p className="mt-2 text-sm text-gray-400">Watch anywhere. Cancel anytime.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="email-address" className="sr-only">
                Email address
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Show error messages if any */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Show success message if signup is successful */}
          {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/signin" className="font-medium text-red-600 hover:text-red-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
