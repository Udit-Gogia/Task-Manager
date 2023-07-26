import { useRouter } from "next/navigation";
import { Lilita_One } from "next/font/google";

const LO = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="flex p-4 justify-between px-12">
      <h1 className={` text-4xl tracking-wide font-LO`}>ALMONDS.</h1>

      <button
        className="relative inline-block px-4 py-2 font-medium group rounded-md font-LO text-xl"
        onClick={() => router.push("/auth/login")}
      >
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-md"></span>
        <span className="absolute inset-0 w-full h-full bg-primaryYellow border-2 border-black group-hover:bg-black rounded-md"></span>
        <span className="relative text-black group-hover:text-primaryYellow rounded-md">
          Login
        </span>
      </button>
    </div>
  );
}
