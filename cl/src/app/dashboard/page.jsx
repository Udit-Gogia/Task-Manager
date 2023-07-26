"use client";
import "./styles/dashboard.css";
import { useEffect } from "react";
import { Lilita_One } from "@next/font/google";
import { useRouter } from "next/navigation";

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
    <div className="bg-primaryBackground h-screen ">
      <h1>This is the Dashboard Page</h1>
    </div>
  );
}
