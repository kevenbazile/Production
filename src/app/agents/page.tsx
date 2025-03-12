"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase"; // Import your supabase client
import { useRouter } from "next/navigation";

type UserRole = "spotlight" | "agent" | "filmmaker";

export default function AgentSignup() {
  const router = useRouter();

  // State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserRole>("agent"); // Default user type is "agent"

  // Handle Supabase Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      console.log("🔍 Attempting signup for:", email);

      // Step 1: Validate email format
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        setError("Invalid email address.");
        setIsLoading(false);
        return;
      }

      // Ensure previous session is cleared
      await supabase.auth.signOut();
      localStorage.clear();
      sessionStorage.clear();

      // Step 2: Check if user with the same email and role already exists
      const { data: existingUser, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .eq("role", userType)  // Check by both email and role
        .single();

      if (userError && userError.code !== 'PGRST116') {
        console.error("❌ Database Query Error:", userError.message);
        setError("An error occurred while checking for existing user.");
        setIsLoading(false);
        return;
      }

      if (existingUser) {
        setError("A user with this email and role already exists.");
        setIsLoading(false);
        return;
      }

      // Step 3: Sign up user in Supabase Auth (password handling done by Supabase)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error("❌ Signup Error:", authError.message);
        setError(authError.message.includes("Email not confirmed")
          ? "Your email is not confirmed. Resending confirmation email..."
          : "Invalid email or password.");

        if (authError.message.includes("Email not confirmed")) {
          await supabase.auth.resend({ type: "signup", email });
          setSuccessMessage("A new confirmation email has been sent. Please check your inbox.");
        }
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        setError("Signup failed. Please try again.");
        setIsLoading(false);
        return;
      }

      console.log("✅ Signup Successful:", authData.user);
      const userId = authData.user.id;

      // Step 4: Insert user into `users` table with additional agent details (no password)
      const { error: dbError } = await supabase
        .from("users")
        .insert([{
          id: userId,
          email,
          role: "agent", // Role set as "agent"
          linkedin,
          portfolio,
        }]);

      if (dbError) {
        console.error("❌ Database Insert Error:", dbError.message);
        setError("Could not save user data.");
        setIsLoading(false);
        return;
      }

      console.log("✅ User saved to database");

      // Step 5: Inform user of successful signup
      setSuccessMessage("Signup successful! You will receive an email about the decision in 48-72 business hours.");

    } catch (err) {
      console.error("❌ Unexpected Error:", err);
      setError("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Original Content */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Agents Signup Form</h1>
        <p className="text-gray-400">Welcome to the Sign-up form for agents.</p>
      </div>

      {/* Signup Form */}
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-xl font-extrabold text-white">
            Unlimited Data on movies, TV shows, and Negotiating deals with filmmakers
          </h2>
          <p className="mt-2 text-sm text-gray-400">Analytics and reports at the click of a button. Cancel anytime.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="email-address" className="sr-only">Email address</Label>
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
              <Label htmlFor="password" className="sr-only">Password</Label>
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

            {/* LinkedIn Input */}
            <div>
              <Label htmlFor="linkedin" className="sr-only">LinkedIn Profile URL</Label>
              <Input
                id="linkedin"
                name="linkedin"
                type="url"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 sm:text-sm"
                placeholder="LinkedIn Profile URL"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>

            {/* Portfolio Input */}
            <div>
              <Label htmlFor="portfolio" className="sr-only">Portfolio Link</Label>
              <Input
                id="portfolio"
                name="portfolio"
                type="url"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 sm:text-sm"
                placeholder="Portfolio Link"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
              />
            </div>
          </div>

          {/* Show Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Show Success Message */}
          {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {isLoading ? "Signing up..." : "Sign up"}
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
