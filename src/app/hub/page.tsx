"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const profiles = [
  { name: "John", avatar: "/placeholder.svg?height=150&width=150" },
  { name: "Jane", avatar: "/placeholder.svg?height=150&width=150" },
  { name: "Kids", avatar: "/placeholder.svg?height=150&width=150" },
  { name: "Add Profile", avatar: null },
];

export default function HubProfiles() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Who's watching?</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
        {profiles.map((profile, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer group">
            {profile.avatar ? (
              <div className="w-[150px] h-[150px] rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200">
                <img
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-[150px] h-[150px] rounded-md overflow-hidden border-2 border-gray-600 flex items-center justify-center group-hover:border-white transition-all duration-200 bg-gray-800">
                <PlusCircle className="w-1/2 h-1/2 text-gray-400" />
              </div>
            )}
            <span className="mt-2 text-gray-400 group-hover:text-white transition-colors duration-200">
              {profile.name}
            </span>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        className="border-gray-600 text-gray-400 hover:text-white hover:border-white transition-colors duration-200"
      >
        Manage Profiles
      </Button>
    </div>
  );
}
