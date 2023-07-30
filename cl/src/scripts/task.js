import Cookies from "js-cookie";

export async function getTasks() {
  const token = Cookies.get("token");

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
