import images from "@/assets/icons";
import Cookies from "js-cookie";
import { Menu, Transition } from '@headlessui/react'
import Image from "next/image";
import { Inter } from "next/font/google";
import { updateTask, deleteTask } from "@/scripts/task";
import { useState } from "react";

const inter = Inter({ subsets: ['latin'] })

export const getDate = (date) => {
  const dateObject = new Date(date);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const day = dateObject.getUTCDate();
  const month = monthNames[dateObject.getUTCMonth()];
  const year = dateObject.getUTCFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate
}

export const Dropdown = ({ task, currStatus, setCurrStatus, onDelete }) => {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        <Menu.Button>
          <Image src={images.IconDropdown} alt="icon-dropdown" width={"24"} height={"24"} />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >

          <Menu.Items className="absolute right-0 w-56 mt-2 p-1 origin-top-right bg-primaryBlack text-primaryBackground border divide-y divide-primaryBackground rounded-md shadow-lg outline-none flex flex-col">
            {currStatus !== "In Progress" && (
              <Menu.Item>
                {({ active }) => (
                  <section
                    className={`${active && 'bg-primaryBackground text-primaryBlack hover:cursor-pointer rounded-md transition-all'} px-4 py-2 `}
                    onClick={async () => {
                      const res = await updateTask(task?._id, { status: "In Progress" })
                      if (!res?.err) {
                        setCurrStatus("In Progress")
                      }
                    }}

                  >
                    Mark as In Progress
                  </section>
                )}
              </Menu.Item>
            )}
            {currStatus !== "Completed" && (
              <Menu.Item>
                {({ active }) => (
                  <section
                    className={`${active && 'bg-primaryBackground text-primaryBlack hover:cursor-pointer rounded-md transition-all'} px-4 py-2 `}
                    onClick={async () => {
                      const res = await updateTask(task?._id, { status: "Completed" })
                      if (!res?.err) {
                        setCurrStatus("Completed")
                      }
                    }}
                  >
                    Mark as Completed
                  </section>
                )}
              </Menu.Item>
            )}
            {currStatus !== "Cancelled" && (
              <Menu.Item>
                {({ active }) => (
                  <section
                    className={`${active && 'bg-primaryBackground text-primaryBlack hover:cursor-pointer rounded-md transition-all'} px-4 py-2 `}
                    onClick={async () => {
                      const res = await updateTask(task?._id, { status: "Cancelled" })
                      if (!res?.err) {
                        setCurrStatus("Cancelled")
                      }
                    }}
                  >
                    Mark as Cancelled
                  </section>
                )}
              </Menu.Item>
            )}

            <Menu.Item>
              {({ active }) => (
                <section
                  className={`${active && 'bg-primaryBackground hover:cursor-pointer rounded-md transition-all'} px-4 py-2 text-primaryRed font-semibold`}
                  onClick={async () => {
                    const res = await deleteTask(task?._id,);

                    if (res.code === "task-dl-success") {
                      onDelete()
                    }
                  }}
                >
                  Delete Task
                </section>
              )}
            </Menu.Item>


          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default function ShowTasks({ task, onDelete }) {

  const [currStatus, setCurrStatus] = useState(task?.status)

  return (
    <div
      className={`rounded-lg flex flex-col  text-primaryBlack bg-primaryBackground `}
    >
      <section className="p-2 px-6 bg-secondaryBlue font-semibold text-primaryBlack flex items-center w-full justify-between rounded-tr-md rounded-tl-md">
        <span>{getDate(task?.createdAt)}</span>
        <span>{currStatus}</span>
      </section>

      <section className="border-2 border-secondaryBlue border-t-0 p-4 flex flex-col gap-4 rounded-br-md rounded-bl-md">
        <section className="flex justify-between items-center">
          <h1 className="font-bold tracking-wide text-3xl first-letter:capitalize ">
            {task.title}

          </h1>

          <section className="flex items-center">
            <Dropdown task={task} setCurrStatus={setCurrStatus} currStatus={currStatus} onDelete={() => onDelete(task._id)} />
          </section>


          {/* <span className="text-primaryBlack opacity-60">{getDate(task?.createdAt)}</span> */}
        </section>

        <pre className={`${inter.className} whitespace-normal`}>{task.description}</pre>

      </section>

    </div>

  );
}
