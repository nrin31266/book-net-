import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📝 Register info:", { name, email, password });
    // TODO: Gắn API đăng ký hoặc Keycloak register flow ở đây
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Đăng ký
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Họ tên
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border focus:outline-none placeholder:text-gray-400 border-gray-300 p-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border focus:outline-none placeholder:text-gray-400 border-gray-300 p-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white focus:outline-none placeholder:text-gray-400 py-3 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Tạo tài khoản
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <a onClick={() => navigate("/auth/login")} className="text-green-600 hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
