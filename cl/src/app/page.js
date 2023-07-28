"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "./dashboard/components/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import images from "@/assets/icons";
import { Lilita_One } from "next/font/google";

const LO = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const router = useRouter();
  const [gif, setGif] = useState(images.GIFLogo);
  const [cursorLoc, setCursorLoc] = useState({});

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard");
    }
  }, []);

  function reloadImg() {
    setGif(images.GIFLogo);
  }

  return (
    <AnimatePresence mode="wait">
      <div className="bg-primaryBackground h-screen cursor-almonds">
        <Navbar />
        <div className="flex p-8 items-center justify-around px-12">
          <div className={` flex flex-col  gap-8`}>
            <section
              className={`${LO.className} flex flex-col text-7xl uppercase tracking-wider gap-2`}
            >
              <p>Manage Task</p>
              <p>
                With{" "}
                <span className="bg-primaryRed px-2 text-primaryBackground ">
                  Ease
                </span>
              </p>
            </section>

            <p className="text-xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
              excepturi natus architecto accusamus ad harum corrupti repellat
              sit debitis id nulla aliquam vitae provident, accusantium
              asperiores quo reiciendis repudiandae odio!
            </p>

            <button
              className={`${LO.className} text-xl relative inline-block px-4 py-2 font-medium group rounded-md w-fit`}
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-primaryBlack group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-md"></span>
              <span className="absolute inset-0 w-full h-full bg-primaryYellow border-2 border-primaryBlack group-hover:bg-primaryBlack rounded-md"></span>
              <span className="relative text-primaryBlack group-hover:text-primaryYellow rounded-md">
                Know More
              </span>
            </button>
          </div>
          <Image
            src={images.ImageMultitask}
            alt="image-multitask"
            priority={true}
            width={"400px"}
            height={"300px"}
            className="w-1/2"
          />
        </div>
      </div>
      {/* <motion.section
        className="fixed cursor-almonds left-0"
        initial={{ opacity: 1, top: 0 }}
        animate={{
          opacity: 0,
          top: "100vh",
          transition: {
            duration: 1,
            top: { delay: 0.99 },
            opacity: { delay: 0.5 },
          },
        }}
      >
        <Image
          src={gif}
          alt="logo-gif"
          width={"100vw"}
          height={"100vh"}
          className="w-screen m-0 h-screen"
        />
      </motion.section> */}

      {/* <section className="bg-black h-screen flex justify-center items-center fixed top-0 left-0 w-screen z-10">
        <Image
          src={images.ImgAlmond}
          alt="img-almond"
          width={"100"}
          height={"100"}
        />

        <h1 className="text-primaryBackground text-9xl font-LO">ALMONDS.</h1>
      </section> */}
    </AnimatePresence>
  );
}
