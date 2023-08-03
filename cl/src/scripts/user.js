import Cookies from "js-cookie";
const token = Cookies.get("token");

export async function getUserData() {
  // const token = Cookies.get("token");
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
  // const token = Cookies.get("token");

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

export async function deleteUserProfile() {
  const response = await fetch("/user/me", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })


  const result = await response.json()
  console.log(result);

  return result;
}