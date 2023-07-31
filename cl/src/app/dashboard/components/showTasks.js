import images from "@/assets/icons";
import Cookies from "js-cookie";

export default function ShowTasks({ tasks }) {
  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      {Cookies.get("token") &&
        tasks.map((task, index) => {
          return (
            <div
              key={index}
              className={`${
                task.status === "In Progress"
                  ? "bg-[#FFDFA0]"
                  : task.status === "Completed"
                  ? "bg-secondaryBlue"
                  : task.status === "Cancelled"
                  ? "bg-[#FFBBB1]"
                  : "bg-primaryBackground"
              } py-4 px-8 rounded-lg flex flex-col gap-2 shadow-md `}
            >
              <h1 className="font-semibold tracking-wide w-full text-3xl ">
                {task.title}
              </h1>

              <p>{task.description}</p>
            </div>
          );
        })}
    </div>
  );
}
