"use client";
import images from "@/assets/icons";
import Image from "next/image";
import { Lato } from "next/font/google";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/scripts/authFunctions";
import { useState } from "react";

const fontLato = Lato({
  subsets: ["latin"],
  weight: "400",
});

export default function Sidebar({ activePage }) {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");
  const sidebarOptions = [
    {
      title: "Dashboard",
      icon: images.IconHome,
      navigate: "/dashboard",
    },
    {
      title: "Profile",
      icon: images.IconUser,
      navigate: "/dashboard/profile",
    },
    {
      title: "Chat",
      icon: images.IconChat,
      navigate: "/dashboard",
    },
  ];
  return (
    <div
      className={`${fontLato.className} h-screen border-r-2 shadow-lg p-8 min-w-fit flex flex-col justify-between`}
    >
      <section className="flex flex-col gap-8">
        <section className="flex gap-2 items-center pb-4 border-b-2">
          <Image
            src={images.ImgAlmond}
            alt="almonds-logo"
            width={"30"}
            height={"30"}
          />
          <p className="font-LO text-2xl">ALMONDS.</p>
        </section>

        <section className="flex flex-col gap-4">
          {sidebarOptions.map((option, index) => {
            return (
              <button
                onClick={() => router.push(option.navigate)}
                className={`${
                  activePage === option.title &&
                  "bg-primaryBlue text-primaryBackground"
                } flex gap-2 p-2  rounded-md items-center border-2 tracking-wide border-primaryBackground hover:cursor-pointer transition-all one`}
                key={index}
              >
                <Image
                  src={option.icon}
                  alt={option.title}
                  width={"25"}
                  height={"25"}
                />
                <p className="text-lg relative w-max">
                  <span>{option.title}</span>
                  <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-black rounded-md"></span>
                </p>
              </button>
            );
          })}
        </section>
      </section>

      <button
        className="flex gap-2 p-2 rounded-md items-center border-2 border-primaryBackground hover:cursor-pointer transition-all"
        onClick={async () => {
          await logoutUser(setErrMsg);
          router.push("/");
        }}
      >
        <Image
          src={images.IconLogout}
          alt={"icon-logout"}
          width={"25"}
          height={"25"}
        />

        {/* <p className="">Logout</p> */}
        <p className="text-lg relative w-max one">
          <span>Logout</span>
          <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-black rounded-md"></span>
        </p>
      </button>
    </div>
  );
}
