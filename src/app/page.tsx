"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
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

        {/* ✅ Sign In & Sign Up Buttons - Fixed Layout */}
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
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-lg mx-auto">
            <input type="email" placeholder="Email address" className="p-4 w-full sm:w-72 rounded-md text-black outline-none" required />
            <button className="px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition duration-300 text-lg">
              Get Started →
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Smooth Transition Divider */}
      <div className="w-full h-12 bg-gradient-to-b from-black to-gray-900"></div>

      {/* ✅ Carousel Section */}
      <section className="w-full bg-gradient-to-b from-gray-900 to-black py-16 flex flex-col items-center">
        <h2 className="text-center text-3xl font-bold mb-6 text-white">Featured Movies</h2>
        <div className="w-full max-w-5xl mx-auto relative flex justify-center items-center min-h-[500px]">
          <Swiper modules={[Navigation, Pagination]} spaceBetween={20} slidesPerView={1} loop={true} navigation={true} pagination={{ clickable: true }} className="mySwiper">
            <SwiperSlide>
              <div className="flex justify-center items-center w-full h-[400px]">
                <img src="/film1.jpg" alt="Film 1" className="max-h-full max-w-full object-contain mx-auto " />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center w-full h-[400px]">
                <img src="/film2.jpg" alt="Film 2" className="max-h-full max-w-full object-contain mx-auto" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center w-full h-[400px]">
                <img src="/film3.jpg" alt="Film 3" className="max-h-full max-w-full object-contain mx-auto" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* ✅ More Reasons to Watch Section */}
      <section className="w-full bg-black py-16 text-white flex flex-col items-center">
        <h2 className="text-center text-4xl font-extrabold mb-10">More Reasons to Watch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {[
            {
              title: "Enjoy The Latest Films and TV Shows",
              text: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
              icon: "/tv-icon.png"
            },
            {
              title: "Download your shows to watch offline and Attend Film Festivals",
              text: "Save your favorites easily and always have something to watch and do.",
              icon: "/download-icon.png"
            },
            {
              title: "Watch everywhere.",
              text: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without boring.",
              icon: "/mobile-icon.png"
            }
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-b from-gray-800 to-black p-6 rounded-lg flex flex-col justify-between shadow-lg transition transform hover:scale-105 duration-300">
              <div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm opacity-80">{item.text}</p>
              </div>
              <div className="flex justify-end mt-4">
                <img src={item.icon} alt="icon" className="w-10 h-10" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Contact Form Section */}
      <section className="w-full bg-gray-900 text-white py-16 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <form className="flex flex-col gap-4 w-full max-w-lg">
          <input type="text" placeholder="Your Name" className="p-4 w-full rounded-md text-black outline-none" required />
          <input type="tel" placeholder="Your Phone Number" className="p-4 w-full rounded-md text-black outline-none" required />
          <input type="email" placeholder="Your Email" className="p-4 w-full rounded-md text-black outline-none" required />
          <button type="submit" className="px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition duration-300 text-lg">
            Send Message
          </button>
        </form>
      </section>

      {/* ✅ Footer */}
      <footer className="flex gap-6 flex-wrap items-center justify-center p-4 text-white">
        {/* Footer content here */}
      </footer>
    </div>
  );
}
