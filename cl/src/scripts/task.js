import Cookies from "js-cookie";

const token = Cookies.get("token");

export async function getTasks() {
  const response = await fetch("/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  console.log(result);

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

  // setTasks();

  if (result.code === "task-cr-success") {
    setTasks((prev) => [...prev, result?.task]);
  }
  console.log(result);

  return result;
}
