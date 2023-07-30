"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Formik } from "formik";
import images from "@/assets/icons";
import { updateUser } from "@/scripts/authFunctions";
import Sidebar from "@/components/sidebar";
import { getUserData, updateUserData } from "@/scripts/user";

export default function Profile() {
  const [apiResMsg, setApiResMsg] = useState("");
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function getData() {
      const user = await getUserData();
      setUserData(user);
    }

    getData();
  }, []);

  return (
    <>
      <div className="bg-primaryBackground h-screen w-screen flex overflow-y-hidden p-4">
        <Sidebar activePage={"Profile"} />
        <section className="w-full p-4 flex flex-col m-4 gap-8 ">
          <h1 className="text-2xl font-semibold text-center">
            Edit Your Profile
          </h1>

          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validate={(values) => {
              const errors = {};

              if (
                values.email !== "" &&
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={async (values) => {
              const filteredValues = {};
              Object.keys(values).filter((value) => {
                if (values[value] !== "") {
                  return (filteredValues[value] = values[value]);
                }
              });

              console.log("passing userObject = ", filteredValues);

              await updateUserData(filteredValues);
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
                className="flex flex-col gap-8 p-8  w-1/2 mx-auto rounded-lg shadow-custom  bg-primaryBlack"
              >
                <label className="flex items-center py-2 mx-4 border-b-2 focus-within:border-primaryBlue transition-all duration-200">
                  <Image
                    src={images.IconUserForm}
                    alt="icon-name"
                    width={"20"}
                    height={"20"}
                    className="h-fit"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder={userData?.name || "Name"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name || ""}
                    className="px-2 focus:outline-none bg-primaryBlack text-primaryBackground "
                  />
                </label>

                <label
                  className={`flex items-center mx-4 py-2 border-b-2 focus-within:border-primaryBlue transition-all duration-200 ${
                    errors.email && "border-primaryRed "
                  }`}
                >
                  <Image
                    src={images.IconEmailForm}
                    alt="icon-email"
                    width={"20"}
                    height={"20"}
                    className="h-fit"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={userData?.email || "Email"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="w-full px-2 focus:outline-none bg-primaryBlack text-primaryBackground  placeholder:text-base"
                  />
                </label>
                {errors.email && (
                  <p className=" text-primaryRed">
                    {errors.email && touched.email && errors.email}
                  </p>
                )}

                <label className="flex items-center py-2 mx-4 border-b-2 focus-within:border-primaryBlue transition-all duration-200">
                  <Image
                    src={images.IconPasswordForm}
                    alt="icon-password"
                    width={"18"}
                    height={"18"}
                    className="h-fit"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    minLength={7}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="w-full px-2 focus:outline-none bg-primaryBlack text-primaryBackground"
                  />
                  {errors.password && (
                    <p className="ml-auto text-primaryRed">
                      {errors.password && touched.password && errors.password}
                    </p>
                  )}
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-12 px-6 tracking-wide text-primaryBlack transition duration-200 bg-primaryBackground rounded-lg hover:bg-primaryBlue focus:shadow-outline focus:outline-none w-full font-semibold my-4"
                >
                  Update
                </button>
              </form>
            )}
          </Formik>
        </section>
      </div>
    </>
  );
}
