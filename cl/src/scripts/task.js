import Cookies from "js-cookie";

const token = Cookies.get("token");

export async function getTasks({ createdAt = "asc", status = "" }) {


  const response = await fetch(`/tasks?sortBy=createdAt-${createdAt}${status !== "" ? `&status=${status}` : ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  return result;
}

export async function createTask(taskObject, setTasks) {
  const response = await fetch("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskObject),
  });

  const result = await response.json();

  if (result.code === "task-cr-success") {
    setTasks((prev) => [result?.task, ...prev,]);
  }

  return result;
}

export async function searchTask(title, setFilteredList) {
  if (title !== "") {
    const response = await fetch(`/tasks/${title}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    await setFilteredList(result);

    return result;
  }
}
