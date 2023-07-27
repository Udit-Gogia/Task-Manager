"use client";
import Sidebar from "@/components/sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Formik } from "formik";
import images from "@/assets/icons";
import { updateUser } from "@/scripts/authFunctions";

export default function Profile() {
  const [apiResMsg, setApiResMsg] = useState("");
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ y: "10vh" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="bg-primaryBackground h-screen w-screen flex overflow-hidden"
      >
        <Sidebar activePage={"Profile"} />
        <section className="w-full p-4 flex flex-col m-4 gap-8 ">
          <h1 className="text-2xl font-semibold text-center">
            Edit Your Profile
          </h1>

          <Formik
            initialValues={{ email: "", password: "" }}
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
              await updateUser(values, setApiResMsg);
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
                className="flex flex-col gap-8 p-8 w-1/2 mx-auto rounded-lg shadow-custom  bg-white"
              >
                <label className="flex px-4 border-b-2 focus-within:border-primaryBlue transition-all duration-200">
                  <Image
                    src={images.IconUsername}
                    alt="icon-name"
                    width={"22"}
                    height={"22"}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="p-2 focus:outline-none "
                  />
                </label>

                <label className="flex px-4 border-b-2 focus-within:border-primaryBlue transition-all duration-200">
                  <Image
                    src={images.IconEmail}
                    alt="icon-email"
                    width={"22"}
                    height={"22"}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="p-2 focus:outline-none "
                  />
                </label>

                <label className="flex px-4 border-b-2 focus-within:border-primaryBlue transition-all duration-200">
                  <Image
                    src={images.IconPassword}
                    alt="icon-password"
                    width={"22"}
                    height={"22"}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="p-2 focus:outline-none "
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center h-12 px-6 tracking-wide text-primaryBackground transition duration-200 bg-primaryBlue rounded-lg hover:bg-secondaryBlue focus:shadow-outline focus:outline-none w-full text-xl font-semibold my-4"
                >
                  Update
                </button>
              </form>
            )}
          </Formik>
        </section>
      </motion.div>
    </AnimatePresence>
  );
}
