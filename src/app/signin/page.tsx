"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import Next.js router for navigation
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignInPage() {
  const router = useRouter(); // ✅ Initialize Next.js router

  // ✅ State Variables
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userType, setUserType] = useState<"spotlight" | "agent" | "filmmaker">("spotlight");

  // ✅ Dummy user data
  const dummyEmail = "test@example.com";
  const dummyPassword = "password123";

  // ✅ Handle Sign-In
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === dummyEmail && password === dummyPassword) {
      setIsLoggedIn(true);
      setError(null);

      // ✅ Redirect users based on login type
      if (userType === "spotlight") {
        router.push("/user"); // ✅ CORRECTED Spotlight Route
      } else if (userType === "agent") {
        router.push("/profile"); // ✅ Agent Profile Selection
      } else if (userType === "filmmaker") {
        router.push("/hub"); // ✅ Filmmaker Profile Selection
      }
    } else {
      setError("Invalid email or password. Try again.");
      setIsLoggedIn(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-25%20040940-3N1cbNB3pOVoWNm842pCF7SHY0c3MB.png')`,
      }}
    >
      {/* ✅ Back to Home Button (Top Left) */}
      <div className="absolute top-6 left-8 z-10">
        <Link href="/">
          <button className="px-0 py-0 bg-black hover:bg-red-800 text-white font-bold rounded-sm transition duration-300">
            ← Back to Home
          </button>
        </Link>
      </div>

      <div className="w-full max-w-md space-y-6 p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Sign In</h1>

        {/* ✅ Toggle Buttons for Login Type */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-6 py-2 font-bold text-white rounded-md transition-all ${
              userType === "spotlight" ? "bg-[#E50914]" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setUserType("spotlight")}
          >
            Spotlight Login
          </button>
          <button
            className={`px-6 py-2 font-bold text-white rounded-md transition-all ${
              userType === "agent" ? "bg-[#E50914]" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setUserType("agent")}
          >
            Agent Login
          </button>
          <button
            className={`px-6 py-2 font-bold text-white rounded-md transition-all ${
              userType === "filmmaker" ? "bg-[#E50914]" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setUserType("filmmaker")}
          >
            Filmmaker Login
          </button>
        </div>

        {isLoggedIn ? (
          <div className="text-green-500 font-bold text-center">
            ✅ Login Successful! Redirecting to profile selection...
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* ✅ Email Input */}
            <Input
              type="text"
              placeholder="Email or mobile number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-[#333333] border-0 text-white placeholder:text-gray-400"
            />

            {/* ✅ Password Input */}
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-[#333333] border-0 text-white placeholder:text-gray-400"
            />

            {/* ❌ Show Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* ✅ Sign In Button */}
            <Button type="submit" className="w-full h-12 bg-[#E50914] hover:bg-[#C11119] text-white">
              Sign In
            </Button>

            <div className="text-center text-gray-400 my-2">OR</div>

            {/* ✅ Sign-In Code Button */}
            <Button variant="secondary" className="w-full h-12 bg-[#333333] hover:bg-[#454545] text-white">
              Use a Sign-In Code
            </Button>

            {/* ✅ Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked: boolean) => setRememberMe(checked)}
                  className="border-gray-400 data-[state=checked]:bg-[#E50914] data-[state=checked]:border-[#E50914]"
                />
                <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-gray-400 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* ✅ Sign Up Links */}
            <div className="text-gray-400 text-sm">
              New to Spotlight?{" "}
              <Link href="/signup" className="text-white hover:underline">
                Sign up now.
              </Link>
            </div>

            {/* ✅ Filmmaker & Agent Signup Links */}
            <div className="text-gray-400 text-sm">
              Are you an Indie Filmmaker?{" "}
              <Link href="/film" className="text-white hover:underline">
                Sign up now.
              </Link>
            </div>

            <div className="text-gray-400 text-sm">
              Are you a Film Agent?{" "}
              <Link href="/agents" className="text-white hover:underline">
                Sign up now.
              </Link>
            </div>

            {/* ✅ reCAPTCHA Info */}
            <div className="text-[13px] text-gray-400">
              This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.{" "}
              <Link href="/learn-more" className="text-[#0071EB] hover:underline">
                Learn more.
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
