"use client";
import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/sidebar";
import { getTasks, createTask, searchTask } from "../../scripts/task";
import { Dialog, Transition, Menu, Listbox } from "@headlessui/react";
import images from "../../assets/icons"
import Image from "next/image";
import Cookies from "js-cookie";
import ShowTasks from "./components/showTasks";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})


const TaskStatusOption = ({ taskStatus, setTaskStatus }) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="relative min-w-max inline-block px-4 py-2 font-medium group rounded-md text-xl">
            <span className="absolute inset-0  h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-primaryBlack group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-md"></span>
            <span
              className={`absolute inset-0 h-full ${taskStatus === "In Progress"
                ? "bg-green-500"
                : taskStatus === "Completed"
                  ? "bg-completed"
                  : taskStatus === "Cancelled"
                    ? "bg-cancelled"
                    : "bg-primaryBackground"
                }  border-2  group-hover:bg-black rounded-md  border-primaryBlack `}
            ></span>
            <span className="relative text-primaryBlack group-hover:text-primaryBackground rounded-md min-w-max">
              {taskStatus !== "" ? (
                taskStatus
              ) : (
                <span className="mx-6">Status</span>
              )}
            </span>
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
                  className={`${active && "bg-primaryBackground text-primaryBlack"
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
                  className={`${active && "bg-primaryBackground text-primaryBlack"
                    } group flex gap-4 w-full items-center p-4  text-primaryBackground`}
                >
                  <span className="bg-completed p-2 rounded-full"></span>
                  Completed
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => setTaskStatus("Cancelled")}
                  className={`${active && "bg-primaryBackground text-primaryBlack "
                    } group flex gap-4 w-full items-center p-4 text-primaryBackground `}
                >
                  <span className="bg-cancelled p-2 rounded-full"></span>
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

const TaskCreation = ({
  modalOpen,
  setModalOpen,
  formData,
  setFormdata,
  taskStatus,
  setTaskStatus,
  setTasks,
}) => {
  return (
    <Transition appear show={modalOpen} as={Fragment} >
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

                className={`w-full max-w-fit transform rounded-2xl bg-primaryBackground p-8 text-left align-middle shadow-xl transition-all`}
              >
                <form
                  className="flex flex-col gap-8"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <section className="flex gap-8 items-end">
                    <Dialog.Title
                      as="h3"
                      className="flex w-full items-center justify-between text-xl font-medium leading-6 text-primaryBlack"
                    >
                      <input
                        type="text"
                        value={formData.title || ""}
                        placeholder="Task Name"
                        onChange={(e) =>
                          setFormdata({
                            ...formData,
                            title: e.target.value,
                          })
                        }
                        className="text-xl border-b-2 py-2 border-primaryBlack focus-within:border-primaryBlue placeholder:text-gray-500 bg-primaryBackground focus:outline-none"
                      />
                    </Dialog.Title>

                    <TaskStatusOption
                      taskStatus={taskStatus}
                      setTaskStatus={setTaskStatus}
                    />
                    <button
                      type="button"
                      className="my-auto"
                      onClick={() => {
                        setModalOpen(false);
                        setTimeout(() => {
                          setFormdata({ title: "", description: "", })
                          setTaskStatus("")
                        }, 100)
                      }}
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

                  <button
                    className="relative inline-block px-4 py-2 font-medium group rounded-md text-xl"
                    onClick={async () => {
                      const res = await createTask(
                        {
                          ...formData,
                          status: taskStatus,
                        },
                        setTasks
                      );
                      setModalOpen(false)

                      setTimeout(() => {
                        setFormdata({ title: "", description: "" })
                        setTaskStatus("")
                      }, 100)
                      console.log("after api call inside component", res);
                    }}
                  >
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-md"></span>
                    <span className="absolute inset-0 w-full h-full bg-primaryBackground border-2 border-black group-hover:bg-black rounded-md"></span>
                    <span className="relative text-primaryBlack group-hover:text-primaryBackground rounded-md">
                      Create
                    </span>
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const SortTasks = ({ selected, setSelected, }) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-primaryBackground border-2 border-neutral-300 py-2 pl-3 pr-10 text-left sm:text-sm focus:outline-none hover:cursor-pointer hover:border-neutral-500 transition-all">

          <section className="flex gap-2">
            <Image src={images.IconSort} alt="icon-sort" width={"20"} height={"20"} />
            <span className="">Sort By</span>
          </section>
          <span className=" absolute inset-y-0 right-0 flex items-center pr-2">
            <Image src={images.IconDown} alt="icon-down" width={"20"} height={"20"} />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primaryBlack text-primaryBackground divide-y py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">

            <Listbox.Option
              key={"asc"}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 hover:cursor-pointer pr-4 ${active ? 'bg-primaryBackground text-primaryBlack' : 'text-primaryBackground bg-primaryBlack'
                }`
              }
              value="desc"
              onClick={() => setSelected("desc")}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${selected ? 'font-semibold' : 'font-normal'
                      }`}
                  >
                    Newest
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                      <Image src={images.IconOptionSelected} alt="icon-option-selected" width={"20"} height={"20"} />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
            <Listbox.Option
              key={"desc"}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 hover:cursor-pointer pr-4 ${active ? 'bg-primaryBackground text-primaryBlack' : 'text-primaryBackground bg-primaryBlack'
                }`
              }
              value="asc"
              onClick={() => setSelected("asc")}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${selected ? 'font-semibold' : 'font-normal'
                      }`}
                  >
                    Oldest
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                      <Image src={images.IconOptionSelected} alt="icon-option-selected" width={"20"} height={"20"} />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>


          </Listbox.Options>
        </Transition>
      </div>
    </Listbox >
  )
}

const FilterTasks = ({ selected, setSelected, }) => {

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className={`relative w-full cursor-default rounded-lg ${selected === "In Progress" ? "border-emerald-500" : selected === "Cancelled" ? "border-cancelled" : selected === "Completed" ? "border-primaryBlue" : "border-neutral-300"} bg-primaryBackground border-2 py-2 pl-3 pr-10 text-left sm:text-sm focus:outline-none hover:cursor-pointer hover:border-neutral-500 transition-all`}>
          <section className="flex gap-2">
            <Image src={images.IconFilter} alt="icon-filter" width={"20"} height={"20"} />
            <span className="">Filter</span>
          </section>
          <span className=" absolute inset-y-0 right-0 flex items-center pr-2">
            <Image src={images.IconDown} alt="icon-down" width={"20"} height={"20"} />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute min-w-max mt-1 max-h-60 w-full overflow-auto rounded-md bg-primaryBlack text-primaryBackground divide-y py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">

            <Listbox.Option
              key={"none"}
              className={({ active }) =>
                `relative cursor-default select-none p-4 hover:cursor-pointer pr-4 ${active ? 'bg-primaryBackground text-primaryBlack' : 'text-primaryBackground bg-primaryBlack'
                }`
              }
              value=""
              onClick={() => setSelected("")}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`flex gap-2 items-center ${selected ? 'font-semibold' : 'font-normal'
                      }`}
                  >
                    <span className="bg-primaryBrown p-2 h-1 w-1 rounded-full "></span>
                    <span>None</span>

                  </span>

                </>
              )}
            </Listbox.Option>
            <Listbox.Option
              key={"inp"}
              className={({ active }) =>
                `relative cursor-default select-none p-4 hover:cursor-pointer pr-4 ${active ? 'bg-primaryBackground text-primaryBlack' : 'text-primaryBackground bg-primaryBlack'
                }`
              }
              value="In Progress"
              onClick={() => setSelected("In Progress")}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`flex gap-2 items-center ${selected ? 'font-semibold' : 'font-normal'
                      }`}
                  >
                    <span className="bg-emerald-500 p-2 h-1 w-1 rounded-full "></span>
                    <span>In Progress</span>

                  </span>

                </>
              )}
            </Listbox.Option>
            <Listbox.Option
              key={"com"}
              className={({ active }) =>
                `relative cursor-default select-none p-4 hover:cursor-pointer pr-4 ${active ? 'bg-primaryBackground text-primaryBlack' : 'text-primaryBackground bg-primaryBlack'
                }`
              }
              value="Completed"
              onClick={() => setSelected("Completed")}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`flex gap-2 items-center ${selected ? 'font-semibold' : 'font-normal'
                      }`}
                  >
                    <span className="bg-completed p-2 rounded-full"></span>
                    Completed
                  </span>

                </>
              )}
            </Listbox.Option>
            <Listbox.Option
              key={"can"}
              className={({ active }) =>
                `relative cursor-default select-none p-4 hover:cursor-pointer pr-4 ${active ? 'bg-primaryBackground text-primaryBlack' : 'text-primaryBackground bg-primaryBlack'
                }`
              }
              value="Cancelled"
              onClick={() => setSelected("Cancelled")}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`flex gap-2 items-center ${selected ? 'font-semibold' : 'font-normal'
                      }`}
                  >
                    <span className="bg-cancelled p-2 rounded-full"></span>
                    Cancelled
                  </span>

                </>
              )}
            </Listbox.Option>


          </Listbox.Options>
        </Transition>
      </div>
    </Listbox >
  )
}

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormdata] = useState({
    title: "",
    description: "",
  });
  const [taskStatus, setTaskStatus] = useState("");
  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [sortMethod, setSortMethod] = useState("desc")
  const [filterTasks, setFilterTasks] = useState("")
  const router = useRouter();


  useEffect(() => {
    if (!Cookies.get("token")) {
      router.push("/");
    }
    (async () => {
      const res = await getTasks({ createdAt: sortMethod, status: filterTasks, token: Cookies.get("token") });


      setTasks(res);
    })();

    const debounce = setTimeout(async () => {
      await searchTask(query.toLowerCase(), setFilteredList);
    }, 1000);

    return () => {
      clearTimeout(debounce);
    };
  }, [query, sortMethod, filterTasks]);

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <div className="bg-primaryBackground h-screen w-screen flex overflow-x-hidden p-2">
      <Sidebar activePage={"Dashboard"} />

      <section className="w-full mx-2 flex flex-col">
        {tasks.length == 0 ? (
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

            <TaskCreation
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              formData={formData}
              setFormdata={setFormdata}
              taskStatus={taskStatus}
              setTaskStatus={setTaskStatus}
              setTasks={setTasks}
            />
          </div>
        ) : (
          <div className="w-full px-4">
            <header className="flex gap-4  pt-2 pb-4">
              <div className="w-full relative">
                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:border-primaryBlue bg-primaryBackground overflow-hidden border-primaryBlack border-2 ">
                  <div className="grid place-items-center h-full w-12 text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                        stroke="#161616"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <input
                    className="peer h-full w-full outline-none text-md text-gray-300  bg-primaryBackground"
                    type="text"
                    id="search"
                    placeholder="Search something.."
                    value={query}
                    onChange={async (e) => {
                      setQuery(e.target.value);

                      query !== "" &&
                        (await searchTask(query, setFilteredList));
                    }}
                  />
                  <button
                    onClick={() => setQuery("")}
                    className={`${query === "" && "hidden"
                      } grid place-items-center h-full w-12 text-gray-300 `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="#161616"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <section
                  className={`${query === "" && "hidden"
                    } bg-primaryBlack text-primaryBackground p-2 rounded-md absolute z-20 flex flex-col gap-2 w-full `}
                >
                  {Cookies.get("token") &&
                    filteredList.map((filteredTask, index) => {
                      return (
                        <span
                          key={index}
                          className="font-lg p-2 rounded-lg hover:bg-primaryGreen transition-all"
                        >
                          {filteredTask.title}
                        </span>
                      );
                    })}
                </section>
              </div>

              <section id="sort-filter" className="flex items-center gap-8 min-w-max">
                <SortTasks selected={sortMethod} setSelected={setSortMethod} />
                <FilterTasks selected={filterTasks} setSelected={setFilterTasks} />
              </section>

              <button
                className={`${inter.variable} relative inline-block px-4 py-2 font-medium  group rounded-md text-lg min-w-max `}
                onClick={() => setModalOpen(true)}
              >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-md"></span>
                <span className="absolute inset-0 w-full h-full bg-primaryYellow border-2 border-black group-hover:bg-black rounded-md"></span>
                <span className="relative text-primaryBlack group-hover:text-primaryYellow rounded-md">
                  Add New Task
                </span>
              </button>
            </header>

            <TaskCreation
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              formData={formData}
              setFormdata={setFormdata}
              taskStatus={taskStatus}
              setTaskStatus={setTaskStatus}
              setTasks={setTasks}
            />

            <div className="flex flex-col gap-8 my-4">
              {tasks.length !== undefined &&
                tasks.map((task, index) => {

                  return (
                    <ShowTasks key={index} task={task} onDelete={handleDeleteTask} />

                  );
                })}
            </div>

            {/* <ShowTasks tasks={tasks} setTasks={setTasks} /> */}
          </div>

          // <div className="grid grid-cols-3 gap-4">
          //   <div>
          //     <section className="bg-secondaryRed flex flex-col jusitfy-center items-center p-8 gap-4 rounded-lg self-baseline">
          //       <button
          //         type="button"
          //         onClick={() => setModalOpen(true)}
          //         className="opacity-50 hover:opacity-100 transition-all"
          //       >
          //         <Image
          //           src={images.IconCreate}
          //           alt="icon-create"
          //           width={"70"}
          //           height={"70"}
          //           className="m-2 rounded-full ring-4 ring-primaryBlack p-4"
          //         />
          //       </button>

          //       <h1 className="font-bold text-4xl">Lets get started</h1>
          //       <p className="">
          //         Click on the plus "+" button to create a new task
          //       </p>
          //     </section>
          //     <TaskCreation
          //       modalOpen={modalOpen}
          //       setModalOpen={setModalOpen}
          //       formData={formData}
          //       setFormdata={setFormdata}
          //       taskStatus={taskStatus}
          //       setTaskStatus={setTaskStatus}
          //     />
          //   </div>
          //   {tasks.map((task, index) => {
          //     return (
          //       <div
          //         key={index}
          //         className={`${
          //           task.status === "In Progress"
          //             ? "bg-[#3D405B] "
          //             : task.status === "Completed"
          //             ? "bg-primaryBlue"
          //             : task.status === "Cancelled"
          //             ? "bg-primaryRed"
          //             : "bg-primaryBackground"
          //         } py-4 px-8 rounded-lg flex flex-col gap-2 lg `}
          //       >
          //         <h1 className="font-semibold tracking-wide w-full text-3xl ">
          //           {task.title}
          //         </h1>

          //         <p>{task.description}</p>
          //       </div>
          //     );
          //   })}
          // </div>
        )}
      </section>
    </div>
  );
}
