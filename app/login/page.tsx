"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaUserCircle } from "react-icons/fa";
import { FaUnlockKeyhole } from "react-icons/fa6";

const login = () => {
  const router = useRouter();
  const [formLogin, setFormLogin] = useState<{
    phone: string;
    password: string;
  }>({
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormLogin((formLogin) => ({
      ...formLogin,
      [name]: value,
    }));
  };
  console.log(formLogin, "formLogin");
  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formLogin),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        setFormLogin({ phone: "", password: "" });
        router.push("/");
      } else {
        if (!res.ok) {
          if (result.errors) {
            console.log("Zod validation errors:", result.errors);
            alert(result.errors[0].message);
          } else {
            alert(result.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="items-center bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <div className="flex justify-center  text-5xl text-blue-500">
          <FaUserCircle />
        </div>

        <div className="text-3xl p-3 mb-5 flex justify-center ">
          <span>Login</span>
        </div>

        {/*  */}
        <div className="space-y-4">
          <div className="flex items-center hover:border-blue-500 border border-gray-300 rounded-lg px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Phone"
              className="outline-none flex-1"
              value={formLogin.phone}
              name="phone"
              onChange={handleChange}
            />
          </div>
          {/* */}

          <div className="flex items-center hover:border-blue-500 border border-gray-300 rounded-lg px-3 py-2">
            <FaUnlockKeyhole className="text-gray-400 mr-2" />
            <input
              placeholder="Password"
              className="outline-none flex-1"
              value={formLogin.password}
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-500 ml-2"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
          >
            Login
          </button>
          <span>
            Don't have an account?{" "}
            <span>
              <Link href={"/register "}>
                <span className="text-blue-600">Sign Up</span>
              </Link>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default login;
