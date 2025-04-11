"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const register = () => {
  const router = useRouter();
  const [formRegister, setFormRegister] = useState<{
    name: string;
    phone: string;
    email: string;
    password: string;
  }>({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRegister((formRegister) => ({
      ...formRegister,
      [name]: value,
    }));
  };
  const handleRegister = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formRegister),
      });

      const result = await res.json();
      console.log(result, "sasssssssssssssssssss");

      if (res.ok) {
        alert(result.message);
        setFormRegister({
          name: "",
          phone: "",
          email: "",
          password: "",
        });

        router.push("/login");
      } else {
        if (result.error) {
          const errors = result.error;
          const emailError = errors.email?._errors?.[0];
          const phoneError = errors.phone?._errors?.[0];
          const nameError = errors.name?._errors?.[0];
          const passwordError = errors.password?._errors?.[0];

          const firstError =
            nameError ||
            phoneError ||
            emailError ||
            passwordError ||
            "Đăng ký thất bại.";
          alert(firstError);
        } else {
          alert(result.message || "Đăng ký thất bại.");
        }
      }
    } catch (error) {
      console.error("Lỗi khi gửi request:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <div className="items-center bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <div className="flex justify-center  text-5xl text-blue-500">
          <FaUserCircle />
        </div>

        <div className="text-3xl p-3 mb-5 flex justify-center ">
          <span>Register</span>
        </div>

        {/*  */}
        <div className="space-y-4">
          <div className="flex items-center hover:border-blue-500 border border-gray-300 rounded-lg px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Name"
              className="outline-none flex-1"
              name="name"
              value={formRegister.name}
              onChange={handleChange}
            />
          </div>
          {/*  */}
          <div className="flex items-center hover:border-blue-500 border border-gray-300 rounded-lg px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Phone"
              className="outline-none flex-1"
              name="phone"
              value={formRegister.phone}
              onChange={handleChange}
            />
          </div>

          {/* */}
          <div className="flex items-center hover:border-blue-500 border border-gray-300 rounded-lg px-3 py-2">
            <MdEmail className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="outline-none flex-1"
              name="email"
              value={formRegister.email}
              onChange={handleChange}
            />
          </div>

          {/*  */}

          <div className="flex items-center hover:border-blue-500 border border-gray-300 rounded-lg px-3 py-2">
            <FaUnlockKeyhole className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="outline-none flex-1"
              name="password"
              value={formRegister.password}
              onChange={handleChange}
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
          >
            Create account
          </button>
          <span>
            Already have an account?{" "}
            <span>
              <Link href="/login ">
                <span className="text-blue-600">Login</span>
              </Link>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default register;
