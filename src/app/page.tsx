"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "", message: "" }); // ✅ Added `message`
  const [message, setMessage] = useState("");

  // ✅ Handle Email Signup
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/landing-signup", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  }

  // ✅ Handle Contact Form Submission
  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contact),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* ✅ Hero Section */}
      <div data-uia="hero-vlv" className="relative w-full min-h-screen bg-black flex flex-col justify-center">
        {/* ✅ Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 z-0"
          style={{ backgroundImage: "url('/Background.png')" }}
        ></div>

        {/* ✅ Logo at Top Left */}
        <div className="absolute top-6 left-8 z-10">
          <Image src="/MoodSwang.png" alt="MoodSwang logo" width={180} height={38} priority />
        </div>

        {/* ✅ Sign In & Sign Up Buttons */}
        <div className="absolute top-6 right-8 z-10 flex space-x-4">
          <Link href="/signin">
            <button className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-md transition duration-300">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-6 py-3 bg-black border border-black hover:border-black hover:bg-black-600 hover:bg-black-700 text-white font-bold rounded-md transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>

        {/* ✅ Main Content */}
        <div className="relative z-10 flex flex-col items-center text-center text-white px-6 mt-20 sm:mt-32">
          <h1 className="text-6xl font-extrabold uppercase tracking-wide leading-tight max-w-4xl">
            Unlimited Movies, TV Shows, and More.
          </h1>
          <p className="text-xl mt-4 font-extrabold">Starts at $7.99. Cancel anytime.</p>
          <p className="text-lg mt-4 font-extrabold">Ready to watch? Enter your email to create or restart your membership.</p>

          {/* ✅ Email Form */}
          <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 w-full sm:w-72 rounded-md text-black outline-none"
              required
            />
            <button type="submit" className="px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition duration-300 text-lg">
              Get Started →
            </button>
          </form>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
      </div>

      {/* ✅ Smooth Transition Divider */}
      <div className="w-full h-12 bg-gradient-to-b from-black to-gray-900"></div>

      {/* ✅ Carousel Section */}
      <section className="w-full bg-gradient-to-b from-gray-900 to-black py-16 flex flex-col items-center">
        <h2 className="text-center text-3xl font-bold mb-6 text-white">Featured Movies</h2>
        <div className="w-full max-w-5xl mx-auto relative flex justify-center items-center min-h-[500px]">
          <Swiper modules={[Navigation, Pagination]} spaceBetween={20} slidesPerView={1} loop={true} navigation={true} pagination={{ clickable: true }} className="mySwiper">
            {[1, 2, 3].map((num) => (
              <SwiperSlide key={num}>
                <div className="flex justify-center items-center w-full h-[400px]">
                  <img src={`/film${num}.jpg`} alt={`Film ${num}`} className="max-h-full max-w-full object-contain mx-auto" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ✅ Contact Form Section */}
      <section className="w-full bg-gray-900 text-white py-16 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 w-full max-w-lg">
          <input
            type="text"
            placeholder="Your Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            className="p-4 w-full rounded-md text-black outline-none"
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            className="p-4 w-full rounded-md text-black outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="p-4 w-full rounded-md text-black outline-none"
            required
          />
          <textarea
            placeholder="Your Message"
            value={contact.message}
            onChange={(e) => setContact({ ...contact, message: e.target.value })}
            className="p-4 w-full rounded-md text-black outline-none"
            required
          />
          <button type="submit" className="px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition duration-300 text-lg">
            Send Message
          </button>
        </form>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </section>

      {/* ✅ Footer */}
      <footer className="flex gap-6 flex-wrap items-center justify-center p-4 text-white">
        {/* Footer content here */}
      </footer>
    </div>
  );
}
