import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-around p-1.5 items-center bg-blue-500   text-white ">
      <Link href={"/"}>
        <img
          src={
            "https://static.vecteezy.com/system/resources/previews/021/615/866/large_2x/chatbot-3d-render-icon-illustration-png.png"
          }
          className="h-14"
        />
      </Link>
      <div>
        {" "}
        <ul className="flex gap-24 ">
          <Link href={"/"}>
            <li>Home</li>
          </Link>
          <li>Contact </li>
        </ul>
      </div>
      <Link href="/login">
        {" "}
        <button className="bg-[#fcd95e] text-black p-2 rounded-[13px] px-[17px] py-[8px] cursor-pointer">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Header;
