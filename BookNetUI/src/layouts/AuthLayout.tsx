import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="h-screen flex">
      {/* Cột trái: thông tin, branding, background */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">BookNet 📚</h1>
        <p className="text-lg opacity-90 text-center">
          Khám phá, mua sắm và chia sẻ sách yêu thích của bạn với cộng đồng.
        </p>
      </div>

      {/* Cột phải: form login/register */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md shadow-lg rounded-2xl border p-8">
          <Outlet />
        </div>

        <footer className="mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} BookNet. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
