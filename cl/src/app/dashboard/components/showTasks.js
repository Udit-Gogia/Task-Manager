import images from "@/assets/icons";
import Cookies from "js-cookie";
import { Menu, Transition } from '@headlessui/react'
import Image from "next/image";
import { Inter } from "next/font/google";

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

export const Dropdown = ({ task }) => {
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
            {task.status !== "In Progress" && (
              <Menu.Item>
                {({ active }) => (
                  <section
                    className={`${active && 'bg-primaryBackground text-primaryBlack hover:cursor-pointer rounded-md transition-all'} px-4 py-2 `}
                    href="/account-settings"
                  >
                    Mark as In Progress
                  </section>
                )}
              </Menu.Item>
            )}
            {task.status !== "Completed" && (
              <Menu.Item>
                {({ active }) => (
                  <section
                    className={`${active && 'bg-primaryBackground text-primaryBlack hover:cursor-pointer rounded-md transition-all'} px-4 py-2 `}
                    href="/account-settings"
                  >
                    Mark as Completed
                  </section>
                )}
              </Menu.Item>
            )}
            {task.status !== "Cancelled" && (
              <Menu.Item>
                {({ active }) => (
                  <section
                    className={`${active && 'bg-primaryBackground text-primaryBlack hover:cursor-pointer rounded-md transition-all'} px-4 py-2 `}
                    href="/account-settings"
                  >
                    Mark as Cancelled
                  </section>
                )}
              </Menu.Item>
            )}


          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default function ShowTasks({ tasks }) {
  return (
    <div className="flex flex-col gap-8 my-4">
      {Cookies.get("token") &&
        tasks.map((task, index) => {
          return (
            <div
              key={index}
              className={`p-4 py-2 rounded-lg flex flex-col gap-4 text-primaryBlack bg-primaryBackground border-2 border-neutral-500 `}
            >
              <section className="py-2 border-b-2 border-neutral-300 flex items-center w-full justify-between">
                <span>{getDate(task?.createdAt)}</span>
                <span>{task?.status}</span>
              </section>

              <section className="flex justify-between items-center">
                <h1 className="font-bold tracking-wide text-3xl first-letter:capitalize ">
                  {task.title}

                </h1>

                <section className="flex items-center">
                  <Dropdown task={task} />
                </section>


                {/* <span className="text-primaryBlack opacity-60">{getDate(task?.createdAt)}</span> */}
              </section>

              <pre className={`${inter.className} whitespace-normal`}>{task.description}</pre>
            </div>
          );
        })}
    </div>
  );
}
