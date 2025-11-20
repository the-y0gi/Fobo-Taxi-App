"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-white px-4 py-10">

      {/* Top Text */}
      <h1 className="text-4xl font-bold text-black">Register</h1>
      <p className="text-gray-600 mt-2">Create your new account.</p>

      {/* Form Container */}
      <div className="w-full max-w-md bg-[#F4EEFF] mt-8 p-6 rounded-3xl shadow-sm">

        {/* Full Name */}
        <div className="mb-4">
          <label className="text-sm font-medium text-black mb-1 block">
            Full Name
          </label>
          <Input
            placeholder="Enter your full name"
            className="h-12 rounded-xl"
          />
        </div>

        {/* Email / Mobile */}
        <div className="mb-4">
          <label className="text-sm font-medium text-black mb-1 block">
            Email / Mobile number
          </label>
          <Input
            placeholder="Enter your email or mobile number"
            className="h-12 rounded-xl"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm font-medium text-black mb-1 block">
            Password
          </label>
          <Input
            type="password"
            placeholder="Enter your password"
            className="h-12 rounded-xl"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="text-sm font-medium text-black mb-1 block">
            Confirm Password
          </label>
          <Input
            type="password"
            placeholder="Re-enter your password"
            className="h-12 rounded-xl"
          />
        </div>

        {/* Register Button */}
        <Button
          className="w-full h-12 rounded-2xl bg-[#9664F8] hover:bg-[#7e4fe0] text-white text-lg font-semibold"
        >
          Register
        </Button>

        {/* OR Divider */}
        <div className="flex items-center my-5 gap-3">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="text-gray-500 text-sm">OR</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {/* Google Login */}
        <Button
          variant="outline"
          className="w-full h-12 rounded-2xl border-gray-300 flex items-center justify-center gap-3"
        >
          <Image
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Icon"
            width={22}
            height={22}
          />
          Continue with Google
        </Button>
      </div>

      {/* Already have account? */}
      <p className="text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link href="/user/auth/login" className="text-[#9664F8] font-medium">
          Login
        </Link>
      </p>
    </div>
  );
}
