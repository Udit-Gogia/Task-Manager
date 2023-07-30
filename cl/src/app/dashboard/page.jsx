"use client";
import "./styles/dashboard.css";
import { useEffect, useState, Fragment } from "react";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import { getTasks } from "@/scripts/task";
import { Dialog, Transition, Menu } from "@headlessui/react";
import images from "@/assets/icons";
import Image from "next/image";
import Cookies from "js-cookie";

const TaskStatusOption = ({ taskStatus, setTaskStatus }) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={`inline-flex w-full border-2  justify-center rounded-md ${
              taskStatus === "In Progress"
                ? "bg-primaryGreen border-primaryGreen"
                : taskStatus === "Completed"
                ? "bg-primaryBlue border-primaryBlue"
                : taskStatus === "Cancelled"
                ? "bg-primaryRed border-primaryRed"
                : "bg-primaryBlack border-primaryBlack"
            }   bg-opacity-100 px-4 py-2 text-sm font-medium text-primaryBackground hover:bg-primaryBackground hover:text-primaryBlack transition-all min-w-max `}
          >
            {taskStatus !== "" ? (
              taskStatus
            ) : (
              <span className="px-4">Status</span>
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-max origin-top-right divide-y overflow-hidden divide-primaryBackground rounded-lg bg-primaryBlack shadow-lg focus:outline-none text-sm">
            <Menu.Item>
              {({ active }) => (
                <div
                  type="button"
                  onClick={() => setTaskStatus("In Progress")}
                  className={`${
                    active && "bg-primaryBackground text-primaryBlack"
                  } group flex gap-4  items-center p-4 text-primaryBackground w-fit`}
                >
                  <span className="bg-emerald-500 p-2 rounded-full "></span>
                  <p className="">In Progress</p>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => setTaskStatus("Completed")}
                  className={`${
                    active && "bg-primaryBackground text-primaryBlack"
                  } group flex gap-4 w-full items-center p-4  text-primaryBackground`}
                >
                  <span className="bg-primaryBlue p-2 rounded-full"></span>
                  Completed
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => setTaskStatus("Cancelled")}
                  className={`${
                    active && "bg-primaryBackground text-primaryBlack "
                  } group flex gap-4 w-full items-center p-4 text-primaryBackground `}
                >
                  <span className="bg-primaryRed p-2 rounded-full"></span>
                  Cancelled
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormdata] = useState({
    title: "",
    description: "",
  });
  const [taskStatus, setTaskStatus] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get("token")) {
      router.push("/");
    }

    (async () => {
      const res = await getTasks();

      setTasks(res);
    })();

    return () => {};
  }, []);

  return (
    <div className="bg-primaryBackground h-screen w-screen flex overflow-hidden p-2">
      <Sidebar activePage={"Dashboard"} />

      <section className="w-full mx-2 flex flex-col">
        {tasks?.length == 0 ? (
          <div className=" flex h-full justify-between items-center rounded-lg gap-4">
            <section className="bg-secondaryRed flex flex-col jusitfy-center items-center p-8 gap-4 rounded-lg self-baseline">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="opacity-50 hover:opacity-100 transition-all"
              >
                <Image
                  src={images.IconCreate}
                  alt="icon-create"
                  width={"70"}
                  height={"70"}
                  className="m-2 rounded-full ring-4 ring-primaryBlack p-4"
                />
              </button>

              <h1 className="font-bold text-4xl">Lets get started</h1>
              <p className="">
                Click on the plus "+" button to create a new task
              </p>
            </section>

            <section className="basis-1/2 self-end">
              <Image
                src={images.ImageDashboardBg}
                alt="img-dashboard"
                width={"600"}
                height={"600"}
              />
            </section>

            <Transition appear show={modalOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setModalOpen(false)}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-primaryBlack bg-opacity-40" />
                </Transition.Child>

                <div className="fixed inset-0 max-h-1/2">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel
                        className={`w-full max-w-fit transform rounded-2xl bg-primaryBackground  p-8 text-left align-middle shadow-xl transition-all`}
                      >
                        <form className="flex flex-col gap-8">
                          <section className="flex gap-8 items-end">
                            <Dialog.Title
                              as="h3"
                              className="flex w-full items-center justify-between text-xl font-medium leading-6 text-primaryBlack"
                            >
                              <input
                                type="text"
                                value={formData.title}
                                placeholder="Task Name"
                                onChange={(e) =>
                                  setFormdata({
                                    ...formData,
                                    title: e.target.value,
                                  })
                                }
                                className="text-xl border-b-2 py-2 border-primaryBlack focus-within:border-primaryBlue placeholder:text-gray-500 bg-primaryBackground focus:outline-none capitalize"
                              />
                            </Dialog.Title>

                            <TaskStatusOption
                              taskStatus={taskStatus}
                              setTaskStatus={setTaskStatus}
                            />
                            <button
                              type="button"
                              className="my-auto"
                              onClick={() => setModalOpen(false)}
                            >
                              <Image
                                src={images.IconCross}
                                alt="icon-cross"
                                width={"40"}
                                height={"40"}
                              />
                            </button>
                          </section>

                          <section>
                            <textarea
                              id="newTask"
                              className="w-full border-2 border-primaryBlack rounded-lg p-4 resize-none bg-primaryBackground"
                              placeholder="Type something about the task..."
                              value={formData.description}
                              onChange={(e) =>
                                setFormdata({
                                  ...formData,
                                  description: e.target.value,
                                })
                              }
                              rows={5}
                            />
                          </section>

                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-secondaryBlue px-4 py-2 text-primaryBlack hover:bg-primaryBlue "
                              onClick={() => setModalOpen(false)}
                            >
                              Create
                            </button>
                          </div>
                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        ) : (
          <div>
            <p>There are tasks in the list</p>
          </div>
        )}
      </section>
    </div>
  );
}
