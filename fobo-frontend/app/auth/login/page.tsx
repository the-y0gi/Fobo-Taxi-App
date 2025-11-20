"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import authService from "@/api/authSevice"; // ← import your service

export default function UserLoginPage() {
  const router = useRouter();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  try {
    debugger
    setLoading(true);

    const response = await authService.login({
      email: emailOrPhone,
      password,
      userType: "user"
    });

    const apiData = response.data.data;

    const user = apiData.user;
    const tokens = apiData.tokens;

console.log("Saving token:", tokens.accessToken);
    localStorage.setItem("accessToken", tokens);
    console.log("Token after saving:", localStorage.getItem("accessToken"));
    localStorage.setItem("refreshToken", tokens);

    
    router.push("/user/dashboard");

  } catch (error) {
    console.error(error);
    alert("Invalid credentials");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-black">Login</h1>
      <p className="text-gray-600 text-center mt-2">
        Enter your details to continue your account.
      </p>

      <div className="w-full max-w-md bg-[#F4EFFF] rounded-3xl p-8 mt-8 shadow-sm border border-purple-100">

        <div className="space-y-2 mb-6">
          <label className="text-sm font-semibold text-black">Email</label>
          <Input
            placeholder="Enter your email"
            className="h-12 rounded-xl border-gray-300"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
        </div>

        <div className="space-y-2 mb-6">
          <label className="text-sm font-semibold text-black">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            className="h-12 rounded-xl border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Google Button (Optional) */}
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl border-gray-300 flex items-center gap-3 bg-white hover:bg-gray-100"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Continue with Google
        </Button>
      </div>

      <Button
        disabled={loading}
        onClick={handleLogin}
        className="w-full max-w-md mt-6 h-14 rounded-full text-lg font-semibold bg-[#9664F8] text-white hover:bg-[#8552e8]"
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      <p className="mt-4 text-gray-700 text-sm">
        Don’t have an account?{" "}
        <Link href="/user/auth/register" className="text-[#9664F8] font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
}
