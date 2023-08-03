"use client";
import { Lilita_One } from "next/font/google";
import { motion } from "framer-motion";
import { Formik } from "formik";
import Link from "next/link";
import images from "@/assets/icons";
import { signinUser } from "../../../scripts/authFunctions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

const LO = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Signup() {
  const router = useRouter();
  const [apiResMsg, setApiResMsg] = useState("");

  useEffect(() => {
    if (Cookies.get("token")) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <>
      <section className="flex h-screen cursor-almonds">
        <section className="basis-3/5 bg-primaryBackground flex flex-col gap-8 justify-center items-center">
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={async (values) => {
              const res = await signinUser(values, setApiResMsg);
              console.log("new user created", res);
              if (Object.keys(res).includes("err")) {
                console.log("res includes err");
              } else {
                router.push("/dashboard");
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 bg-primaryBlack p-8 shadow-custom rounded-lg px-10"
              >
                <label className="flex items-center border-b-2 focus-within:border-primaryBlue transition-all duration-200">
                  <Image
                    src={images.IconUsername}
                    alt="icon-name"
                    width={"20"}
                    height={"20 "}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    className="p-2 focus:outline-none bg-primaryBlack text-primaryBackground"
                  />
                </label>
                <section className="flex flex-col gap-2">
                  <label
                    className={`flex items-center border-b-2 focus-within:border-primaryBlue transition-all duration-200 ${
                      errors.email && "border-primaryRed"
                    }`}
                  >
                    <Image
                      src={images.IconEmail}
                      alt="icon-email"
                      width={"20"}
                      height={"20 "}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      value={values.email}
                      className="p-2 focus:outline-none bg-primaryBlack text-primaryBackground"
                    />
                  </label>
                  {errors.email && (
                    <p className="text-primaryRed font-semibold">
                      {errors.email && touched.email && errors.email}
                    </p>
                  )}
                </section>
                <label className="flex items-center border-b-2 focus-within:border-primaryBlue transition-all duration-200">
                  <Image
                    src={images.IconPassword}
                    alt="icon-password"
                    width={"20"}
                    height={"auto"}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={values.password}
                    className="p-2 focus:outline-none bg-primaryBlack text-primaryBackground"
                  />
                </label>
                {errors.password && (
                  <p className="text-primaryRed">
                    {errors.password && touched.password && errors.password}
                  </p>
                )}

                {apiResMsg && (
                  <p className="text-primaryRed w-full break-all font-semibold text-base">
                    {apiResMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center h-12 px-6 tracking-wide text-primaryBlack transition duration-200 bg-primaryBackground rounded-lg hover:bg-primaryBlue focus:shadow-outline focus:outline-none w-full font-semibold"
                >
                  Signup
                </button>
              </form>
            )}
          </Formik>

          <p className=" text-xl">
            Already on <span className="text-primaryBrown">Almonds??</span>{" "}
            <Link href="/auth/login" className="mx-2 underline ">
              Login{" "}
            </Link>
          </p>
        </section>

        <section className="bg-primaryBlack basis-2/5 h-screen text-white flex justify-center items-center">
          <motion.h1
            className={`${LO.className} text-7xl text-primaryBackground`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            Signup
          </motion.h1>
        </section>
      </section>
      {/* <motion.div
        className="slide-out"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      /> */}
    </>
  );
}
