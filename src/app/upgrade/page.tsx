// pages/upgrade.js
"use client"
import React from "react";
import Link from "next/link";

const UpgradePage = () => {
  // Example boolean indicating whether the user already has the Pro plan
  const isProActive = true; // Set this based on your app's data

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 relative">
      {/* Back to Dashboard with solid blue border */}
      <Link
        href="/hub"
        className="absolute top-4 right-4 border border-blue-600 p-2 rounded text-blue-600 hover:underline"
      >
        Back to Dashboard
      </Link>

      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Upgrade Your Plan</h1>
        <p className="text-lg text-gray-600 mt-2">
          Select the plan that best suits your needs.
        </p>
      </header>

      <main className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Distribution Pro Card */}
        <div
          className={
            // If the user already has the Pro plan, apply a gray-out effect
            `bg-white rounded-lg shadow p-6 flex-1 flex flex-col ${
              isProActive ? "opacity-50 pointer-events-none" : ""
            }`
          }
        >
          <h2 className="text-2xl font-semibold mb-4">Distribution Pro</h2>
          <p className="text-3xl font-bold mb-4">$50</p>
          <ul className="flex-1 mb-6 space-y-2 text-gray-700">
            <li>Basic distribution features</li>
            <li>Email support</li>
            <li>Basic analytics</li>
          </ul>
          {isProActive ? (
            // Show a label if the user already has this plan
            <p className="mt-2 text-center text-green-600 font-semibold">
              Currently Active
            </p>
          ) : (
            <Link
              href="/payment/pro"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
            >
              Upgrade to Pro
            </Link>
          )}
        </div>

        {/* Distribution Plus Card */}
        <div className="bg-white rounded-lg shadow p-6 flex-1 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Distribution Plus</h2>
          <p className="text-3xl font-bold mb-4">$125</p>
          <ul className="flex-1 mb-6 space-y-2 text-gray-700">
            <li>Advanced distribution features</li>
            <li>Priority support</li>
            <li>Enhanced analytics</li>
            <li>Custom branding</li>
          </ul>
          <Link
            href="/payment/plus"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
          >
            Upgrade to Plus
          </Link>
        </div>

        {/* Distribution Enterprise Card */}
        <div className="bg-white rounded-lg shadow p-6 flex-1 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Distribution Enterprise</h2>
          <p className="text-3xl font-bold mb-4">Contact Us</p>
          <ul className="flex-1 mb-6 space-y-2 text-gray-700">
            <li>All Plus features</li>
            <li>Dedicated account manager</li>
            <li>Custom integrations</li>
            <li>Enterprise-level support</li>
          </ul>
          <Link
            href="/contact-sales"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
          >
            Contact Sales
          </Link>
        </div>
      </main>
    </div>
  );
};

export default UpgradePage;
