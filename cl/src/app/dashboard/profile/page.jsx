"use client";
import { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import { Formik } from "formik";
import images from "@/assets/icons";
import Sidebar from "@/components/sidebar";
import { getUserData, updateUserData } from "@/scripts/user";
import { Dialog, Transition } from "@headlessui/react";

export const DeleteUserAlert = () => {};

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
      <div className="bg-primaryBackground h-screen w-screen flex p-2">
        <Sidebar activePage={"Profile"} />

        <section className="bg-primaryBackground w-full p-4 flex flex-col mx-4 rounded-md gap-8 ">
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
                className="flex flex-col gap-8 p-8  w-1/2 mx-auto rounded-lg shadow-custom"
              >
                <label className="border-2 p-2 gap-4 rounded-md flex items-center focus-within:border-primaryBlue transition-all">
                  <section className="flex gap-2 items-center">
                    <Image
                      src={images.IconUser}
                      alt="icon-name"
                      width={"20"}
                      height={"20"}
                      className="h-fit"
                    />
                    <p>Name:</p>
                  </section>
                  <input
                    type="text"
                    name="name"
                    placeholder={userData?.name || "Name"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name || ""}
                    className="p-2 focus:outline-none text-primaryBlack bg-primaryBackground text-lg w-full"
                  />
                </label>
                <label className="border-2 p-2 gap-4 rounded-md flex items-center focus-within:border-primaryBlue transition-all">
                  <section className="flex gap-2 items-center">
                    <Image
                      src={images.IconEmail}
                      alt="icon-email"
                      width={"20"}
                      height={"20"}
                      className="h-fit"
                    />
                    <p>Email:</p>
                  </section>
                  <input
                    type="email"
                    name="email"
                    placeholder={userData?.email || "Email"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="p-2 focus:outline-none text-primaryBlack bg-primaryBackground text-lg w-full"
                  />
                </label>
                {errors.email && (
                  <p className=" text-primaryRed -my-4">
                    {errors.email && touched.email && errors.email}
                  </p>
                )}
                <label className="border-2 p-2 gap-4 rounded-md flex items-center focus-within:border-primaryBlue transition-all">
                  <section className="flex gap-2 items-center">
                    <Image
                      src={images.IconPassword}
                      alt="icon-password"
                      width={"18"}
                      height={"18"}
                      className="h-fit"
                    />
                    <p>Password:</p>
                  </section>
                  <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    minLength={7}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="p-2 focus:outline-none text-primaryBlack bg-primaryBackground text-lg w-full"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-12 px-6 tracking-wide text-primaryBackground transition duration-200 bg-primaryBlack rounded-lg hover:bg-primaryBlue focus:shadow-outline focus:outline-none w-full font-semibold my-4"
                >
                  Update
                </button>
              </form>
            )}
          </Formik>
          <button
            type="submit"
            className="inline-flex items-center justify-center h-12 px-6 tracking-wide text-primaryBlack transition duration-200 bg-primaryRed border-2 border-primaryRed rounded-lg hover:bg-primaryBackground focus:shadow-outline focus:outline-none  font-bold my-4 mx-auto w-1/2"
          >
            Delete Account
          </button>
        </section>
      </div>
    </>
  );
}
