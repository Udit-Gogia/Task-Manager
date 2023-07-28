export async function getUserData() {
  const token = localStorage.getItem("token");
  const response = await fetch("/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  return result;
}

export async function updateUserData(userData) {
  const token = localStorage.getItem("token");

  const response = await fetch("/user/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  console.log(result);
}
