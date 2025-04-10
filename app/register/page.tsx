import Link from "next/link";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const register = () => {
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
              placeholder="Phone"
              className="outline-none flex-1"
            />
          </div>
          {/* */}
          <div className="flex items-center hover:border-blue-500 border border-gray-300 rounded-lg px-3 py-2">
            <MdEmail className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="outline-none flex-1"
            />
          </div>

          {/*  */}

          <div className="flex items-center hover:border-blue-500 border border-gray-300 rounded-lg px-3 py-2">
            <FaUnlockKeyhole className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="outline-none flex-1"
            />
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg">
            Create account
          </button>
          <span>
            Already have an account?{" "}
            <span>
              <Link href={"/login "}>
                <span className="text-blue-600">login</span>
              </Link>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default register;
