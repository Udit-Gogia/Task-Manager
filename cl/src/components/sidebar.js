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
      icon: images.IconHomeSelected,
      navigate: "/dashboard",
      selectedIcon: images.IconHome,
    },
    {
      title: "Profile",
      icon: images.IconUserForm,
      navigate: "/dashboard/profile",
      selectedIcon: images.IconUser,
    },
    // {
    //   title: "Chat",
    //   icon: images.IconMsgSelected,
    //   navigate: "/dashboard",
    //   selectedIcon: images.IconChat,
    // },
  ];
  return (
    <div
      className={`${fontLato.className} sticky top-0 bg-primaryBlack rounded-lg border-r-2 border-primaryBlack p-8 min-w-fit flex flex-col justify-between`}
    >
      <section className="flex flex-col gap-8">
        <section className="flex gap-2 items-center pb-4 border-b-2">
          <Image
            src={images.ImageAlmond}
            alt="almonds-logo"
            width={"40"}
            height={"40"}
            priority
            style={{ height: "auto", width: "auto" }}
          />
          <p className="font-LO text-2xl text-primaryBackground tracking-wide">
            ALMONDS.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          {sidebarOptions.map((option, index) => {
            return (
              <button
                onClick={() => router.push(option.navigate)}
                className={`${activePage === option.title &&
                  "bg-primaryBackground text-primaryBlack"
                  } flex gap-2 p-2 text-primaryBackground rounded-md items-center tracking-wide hover:cursor-pointer transition-all one`}
                key={index}
              >
                <Image
                  src={
                    activePage === option.title
                      ? option.selectedIcon
                      : option.icon
                  }
                  alt={option.title}
                  width={"25"}
                  height={"25"}
                />
                <p className="text-lg relative w-max">
                  <span>{option.title}</span>
                  <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-primaryBlue rounded-md"></span>
                </p>
              </button>
            );
          })}
        </section>
      </section>

      <button
        className="flex gap-2 p-2 text-primaryBackground rounded-md items-center tracking-wide hover:cursor-pointer transition-all one"
        onClick={async () => {
          await logoutUser(setErrMsg);
          router.push("/");
        }}
      >
        <Image
          src={images.IconLogout}
          alt={"icon-logout"}
          width={"22"}
          height={"22"}
        />

        {/* <p className="">Logout</p> */}
        <p className="text-lg relative w-max one">
          <span>Logout</span>
          <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-primaryBlue rounded-md"></span>
        </p>
      </button>
    </div>
  );
}
