"use client";
import "./styles/dashboard.css";
import { useEffect } from "react";
import { Lilita_One } from "next/font/google";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import { AnimatePresence, motion } from "framer-motion";

const LO = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ y: "10vh" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="bg-primaryBackground h-screen w-screen flex overflow-hidden"
      >
        <Sidebar activePage={"Dashboard"} />
        <h1>This is the Dashboard Page</h1>
      </motion.div>
    </AnimatePresence>
  );
}
